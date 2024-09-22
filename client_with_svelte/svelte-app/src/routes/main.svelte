<script>
    import { onMount } from "svelte";
    import BarChart from "../componenets/BarChart.svelte";
    import Table from "../componenets/Table.svelte";
  
    let spendings = [];
    let filters = {
        userid: "",
        startdate: "",
        enddate: "",
        type: "",
        model: "",
    };
  
    const fetchSpendings = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:8080/spendings?${query}`);
    
    if (response.ok) {
        spendings = await response.json();
    } else if (response.status === 404) {
        spendings = []; // Clear the spendings array or set a specific state for no data
        alert("No spendings found."); 
    } else {
        console.error("Error fetching spendings:", response.statusText);
    }
};

  
    onMount(fetchSpendings);
  
    const columns = [
      { title: 'User ID', key: 'userid' },
      { title: 'Count', key: 'count' },
      { title: 'Created At', key: 'createdAt' },
      { title: 'Type', key: 'type' },
      { title: 'Model', key: 'model' },
    ];
  </script>
  
  <div class="space-y-4">
    <h2> Here you can filter the spendings</h2>

      <!-- Filters Input Section -->
      <div class="filter-inputs flex space-x-2">
        <input type="number" bind:value={filters.userid} placeholder="User ID" class="filter-input" />
        <input type="date" bind:value={filters.startdate} class="filter-input" />
        <input type="date" bind:value={filters.enddate} class="filter-input" />
        <input type="text" bind:value={filters.type} placeholder="Type" class="filter-input" />
        <input type="text" bind:value={filters.model} placeholder="Model" class="filter-input" />
        <button on:click={fetchSpendings} class="filter-button">Filter</button>
      </div>

     <!-- BarChart section -->
      <BarChart data={spendings} />

      <!-- Table Section -->
      <Table tableData={spendings} columns={columns} />

  
     
    
  </div>
  <style>
   
    .filter-inputs {
        margin-bottom: 1rem;
    }

    .filter-input {
        border: 1px solid #d1d5db; 
        padding: 0.5rem;
        border-radius: 0.25rem;
        width: 16rem;
    }

    .filter-input:focus {
        border-color: #3b82f6; 
        outline: none;
    }

    .filter-button {
        background-color: #a11; 
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        transition: background-color 0.3s;
    }

    .filter-button:hover {
        background-color: rgb(195, 79, 79);
    }

  

    
  </style>