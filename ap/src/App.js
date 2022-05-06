import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import PrivateComponent from "./components/PrivateComponent";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        
        <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/Add" element={<h1>Add listing Component</h1>} />
          <Route path="/Update" element={<h1>Update listing Component</h1>} />
          <Route path="/Logout" element={<h1>Logout</h1>} />
          <Route path="/Profile" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
