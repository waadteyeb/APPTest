<script lang="ts">
    export let tableData = [];
    export let columns = [];
</script>

<main>
    <div class="relative overflow-x-auto">
        <h2> Filtred Spendings Table</h2>
        <table class="w-full text-sm text-left border-collapse">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {#each columns as { title }}
                        <th scope="col" class="px-6 py-3">{title}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each tableData as row}
                    <tr class="bg-white border-b">
                        {#each columns as { key }}
                            <td class="px-6 py-4">{row[key]}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<style>
    .relative {
        position: relative;
    }

    .overflow-x-auto {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    thead {
        background-color: #f9fafb; 
    }

    th {
        padding: 1rem; 
        text-align: left;
        color: #374151; 
        text-transform: uppercase;
        font-size: 0.75rem; 
    }

    tbody tr {
        background-color: #ffffff; 
        border-bottom: 1px solid #e5e7eb; 
    }

    tbody tr:hover {
        background-color: #f1f5f9; 
    }

    td {
        padding: 1rem; 
        color: #4b5563; 
    }
</style>
