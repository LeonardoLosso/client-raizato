<script lang="ts">
import api from '@/core/http/interceptors/httpRequest';
import { defineComponent, onMounted, ref, watch } from 'vue';

interface Option {
    id: number;
    name: string;
}

export default defineComponent({
    name: 'DropdownBase',
    props: {
        label: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        apiUrl: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            required: false,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        hide: {
            type: Boolean,
            default: false,
        },
        firstQuery: {
            type: [String, null]
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const options = ref<Option[]>([]);
        const selectedValue = ref<Option | null>(null);
        const loading = ref(false);
        const error = ref('');
        const searchQuery = ref('');
        const autocompleteHint = ref('');
        const isDropdownVisible = ref(false);

        const fetchOptions = async (query: string) => {
            if (!query) {
                options.value = [];
                autocompleteHint.value = '';
                return;
            }

            loading.value = true;
            error.value = '';
            try {
                const response = await api.get(`${props.apiUrl}?search=${query}`);
                const data = response.data;
                options.value = data.map((item: any) => ({
                    id: item.id,
                    name: item.name ?? item.nome,
                }));

                autocompleteHint.value = options.value.length ? options.value[0].name : '';
                isDropdownVisible.value = true;
            } catch (err) {
                error.value = 'Erro ao carregar opções';
            } finally {
                loading.value = false;
            }
        };

        const handleSelection = (option: Option) => {
            selectedValue.value = option;

            emit('update:modelValue', option.id);
            isDropdownVisible.value = false;
            searchQuery.value = option.name;
            autocompleteHint.value = '';
        };

        const handleBlur = () => {
            setTimeout(() => (isDropdownVisible.value = false), 200);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.key === 'Tab' || event.key === 'Enter') && options.value.length) {
                handleSelection(options.value[0]);
                event.preventDefault();
            }
        };

        const handleFocus = () => {
            isDropdownVisible.value = true;
            fetchOptions(searchQuery.value || '');
        };

        watch(searchQuery, (newQuery) => {
            if (newQuery) {
                searchQuery.value = newQuery.charAt(0).toUpperCase() + newQuery.slice(1);
            }

            if (!newQuery) emit('update:modelValue', null);


            if (!options.value.length || options.value[0].name.indexOf(newQuery) !== 0) {
                autocompleteHint.value = '';
            }
        });

        onMounted(() => {
            searchQuery.value = props.firstQuery ?? '';
        });

        return {
            options,
            selectedValue,
            loading,
            error,
            searchQuery,
            autocompleteHint,
            isDropdownVisible,
            fetchOptions,
            handleSelection,
            handleBlur,
            handleKeyDown,
            handleFocus,
        };
    },
});

</script>

<template>
    <div class="dropdown-container">
        <label v-if="!hide" :for="id">{{ label }}</label>
        <span v-if="isRequired" class="required-indicator">*</span>
        <div class="input-wrapper">
            <input v-model="searchQuery" :id="id" class="form-control" :placeholder="`Buscar por ${label}`"
                @input="fetchOptions(searchQuery)" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeyDown"
                :required="isRequired" />
            <span v-if="autocompleteHint && searchQuery" class="autocomplete-hint">
                {{ autocompleteHint }}
            </span>
            <span class="material-icons">search</span>
        </div>
        <ul v-if="isDropdownVisible && options.length" class="dropdown-list">
            <li v-for="(option, index) in options" :key="index" class="dropdown-item" @click="handleSelection(option)">
                {{ option.name }}
            </li>
        </ul>
        <div v-if="error" class="error-message">{{ error }}</div>
    </div>
</template>

<style scoped>
.material-icons {
    position: absolute;
    right: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 100%;
}

.dropdown-container {
    position: relative;
    margin-bottom: 15px;
    border: none;
}

.input-wrapper {
    position: relative;
    width: 100%;
    background-color: #fff;
}

.form-control {
    position: relative;
    z-index: 2;
    background-color: transparent;
}

.autocomplete-hint {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #ccc;
    z-index: 1;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-list {
    position: absolute;
    z-index: 10;
    background-color: #fafafa;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
    padding: 10px;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #f0f0f0;
}

.error-message {
    color: red;
    font-size: 12px;
}
</style>
