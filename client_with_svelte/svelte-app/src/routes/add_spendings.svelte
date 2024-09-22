<script>
  let newSpending = {
    userid: "",
    count: "",
    type: "",
    model: "",
  };

  let message = "";
  let messageType = ""; // 'success' or 'error'

  const addSpending = async () => {
    const response = await fetch("http://localhost:8080/spendings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSpending),
    });

    if (response.ok) {
      message = "Spending added successfully!";
      messageType = "success";
      newSpending = { userid: "", count: "", type: "", model: "" };
    } else {
      message = "Failed to add spending.";
      messageType = "error";
      console.error("Failed to add spending");
    }
  };
</script>

<div class="form-container">
  <form on:submit|preventDefault={addSpending} class="max-w-sm mx-auto">
    <div class="mb-5">
      <label for="userid" class="input-label">User ID</label>
      <input type="number" id="userid" bind:value={newSpending.userid} class="input-field" placeholder=" " required />
    </div>
    <div class="mb-5">
      <label for="count" class="input-label">Count</label>
      <input type="number" id="count" bind:value={newSpending.count} class="input-field" placeholder=" " required />
    </div>
    <div class="mb-5">
      <label for="type" class="input-label">Type</label>
      <input type="text" id="type" bind:value={newSpending.type} class="input-field" placeholder=" " required />
    </div>
    <div class="mb-5">
      <label for="model" class="input-label">Model</label>
      <input type="text" id="model" bind:value={newSpending.model} class="input-field" placeholder=" " required />
    </div>
    <button type="submit" class="submit-button">Add Spending</button>
    {#if message}
      <div class={messageType === 'success' ? 'text-green-600' : 'text-red-600'}>{message}</div>
    {/if}
  </form>
</div>

<style>
  

  .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
  }

  .input-label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937; 
  }

  .input-field {
      display: block;
      width: 100%;
      padding: 1rem; 
      color: #1f2937; 
      border: 1px solid #d1d5db; 
      border-radius: 0.5rem; 
      background-color: #f9fafb; 
      font-size: 1rem; 
      transition: border-color 0.3s;
  }

  .input-field:focus {
      outline: none;
      border-color: #a11; 
  }

  .submit-button {
      color: white;
      background-color: #a11; 
      transition: background-color 0.3s, ring 0.3s;
      padding: 0.625rem 1.25rem; 
      border-radius: 0.5rem; 
      width: 100%; 
      font-size: 0.875rem; 
  }

  .submit-button:hover {
      background-color: #a11; 
  }

  .submit-button:focus {
      outline: none;
      box-shadow: 0 0 0 4px #a11; 
  }

  .text-green-600 {
      color: #a11; 
      margin-top: 1rem;
  }

  .text-red-600 {
      color: #dc2626;
      margin-top: 1rem;
  }
</style>
