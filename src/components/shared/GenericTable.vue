<template>
    <div class="table-container">
        <h3>{{ title }}</h3>
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index">
                    <td v-for="(column, colIndex) in row" :key="colIndex">{{ column }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

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
        }
    }
});
</script>

<style scoped>
.table-container {
    margin: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
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
}
</style>