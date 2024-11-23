<script lang="ts">
import { defineComponent, PropType } from 'vue';

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
    }
});
</script>

<template>
    <div class="table-container container">
        <h3>{{ title }}</h3>
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index">
                    <td v-for="(header, colIndex) in headers" :key="colIndex">
                        {{ row[headerToPropertyMap[header]] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.table-container {
    margin: 20px !important;
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
    overflow-y: auto;
}

thead {
    position: sticky;
    top: 0;
    z-index: 1;
}

th,
td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

h3 {
    text-align: center;
    margin-bottom: 15px;
    position: sticky;
    top: 0;
    z-index: 2;
    padding: 10px 0;
}

.table-container table {
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
</style>
