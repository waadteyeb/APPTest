<script>
  import "./app.css";
  import { Router, Route, Link } from 'svelte-routing';
  import Main from './routes/main.svelte';
  import AddSpendings from "./routes/add_spendings.svelte";
</script>

<main>
  <Router>
      <nav class="navbar">
          <h1 class="nav-title"> Spendings App</h1>
          <ul class="nav-links">
              <li>
                  <Link to="/" class="nav-link">Home</Link>
              </li>
              <li>
                  <Link to="/add" class="nav-link">Add Spending</Link>
              </li>
          </ul>
      </nav>
      
      <Route path="/" component={Main} />
      <Route path="/add" component={AddSpendings} />
      
  </Router>
</main>

<style>
  .navbar {
      background-color: white; 
      padding: 1rem;
      display: flex;
      justify-content: space-between; 
      align-items: center; 
  }

  .nav-title {
      color: black; 
      font-size: 1.5rem; 
  }

  .nav-links {
      color: white;
      list-style-type: none;
      display: flex;
      gap: 1rem; 
      margin: 0;
      padding: 0;
  }



 
</style>
