<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'SearchBox',
    emits: ['update:searchQuery'],
    setup(_, { emit }) {
        const searchQuery = ref('');

        const handleInput = () => {
            emit('update:searchQuery', searchQuery.value);
        };

        watch(searchQuery, handleInput);

        return {
            searchQuery,
            handleInput
        };
    }
});
</script>

<template>
    <div class="searchbox">
        <div class="input-container">
            <input v-model="searchQuery" type="text" placeholder="Buscar..." class="form-control"
                @input="handleInput" />
            <span class="material-icons">search</span>
        </div>
    </div>
</template>


<style scoped>
.searchbox {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}

.input-container {
    position: relative;
    width: 100%;
    max-width: 30%;
}

.form-control {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.material-icons {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #888;
    pointer-events: none;
}
</style>
