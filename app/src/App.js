import React from "react";
import { Router } from "@reach/router";
import Header from "./Header";

const App = () => (
  <>
    <Header />
    <main>
      <Router>
        <Home path="/" />
        <Dashboard path="dashboard" />
      </Router>
    </main>
    <footer>MP 2020.</footer>
  </>
);

const Home = () => (
  <div>
    <h2>Welcome</h2>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

export default App;
