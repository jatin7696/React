import React from "react";
// import ProductList from "./components/ProductList";
const Home = () => {
  const getUsers = () => {
    //const result = await db.userdetails.find({"education":"M.C.A."}).pretty();
  };
  return (
    <div className="container">
      <header className="header">
        <h1>My Products</h1>
        <button onClick={getUsers}>get Data</button>
      </header>
    </div>
  );
};

export default Home;
