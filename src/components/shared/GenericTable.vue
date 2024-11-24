<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
    name: 'GenericTable',
    props: {
        title: {
            type: String,
            required: true
        },
        headers: {
            type: Array as PropType<string[]>,
            required: true
        },
        data: {
            type: Array as PropType<any[]>,
            required: true
        },
        headerToPropertyMap: {
            type: Object as PropType<Record<string, string>>,
            required: true
        }
    },
    emits: ['rowClicked', 'rowDoubleClicked'],
    setup(_, { emit }) {
        const selectedRowIndex = ref<number | null>(null);

        const handleClick = (row: any, index: number) => {
            selectedRowIndex.value = index;
            emit('rowClicked', row);
        };

        const handleDoubleClick = (row: any) => {
            emit('rowDoubleClicked', row);
        };

        return {
            selectedRowIndex,
            handleClick,
            handleDoubleClick
        };
    }
});
</script>

<template>
    <div class="container">
        <h3>{{ title }}</h3>
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index" :class="{ selected: index === selectedRowIndex }"
                    @click="handleClick(row, index)" @dblclick="handleDoubleClick(row)">
                    <td v-for="(header, colIndex) in headers" :key="colIndex" :class="header.toLowerCase()">
                        {{ row[headerToPropertyMap[header]] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    margin: 20px !important;
    width: 100%;
    max-width: fit-content !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: calc(100vh - 200px);
    overflow: auto;
}

table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead {
    background-color: #f4f4f4;
    position: sticky;
    top: 0;
    z-index: 1;
}

th,
td {
    width: 100%;
    padding: 10px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
}

h3 {
    text-align: center;
    margin-bottom: 15px;
    position: sticky;
    top: 0;
    z-index: 2;
    padding: 10px 0;
}

.container table {
    height: 100%;
    overflow: auto;
    display: block;
}

tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
}

tbody tr:nth-child(even) {
    background-color: #ffffff;
}

tbody tr {
    cursor: pointer;
}

tbody tr.selected {
    background-color: #e0f7fa;
}

tbody tr:hover {
    background-color: #f1f8ff;
}
</style>
