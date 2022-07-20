import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.log(name, Username, Password);

    let result = await fetch("http://localhost:8080/register/", {
      method: "post",
      body: JSON.stringify({ name, Username, Password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json(result);
    console.log("result data  ", result);
    if (result) {
      console.log("unser if");

      console.log(
        "this is local  === ",
        localStorage.setItem("user", JSON.stringify(result))
      );  

      //navigate("/");
    }
  };
  return (
    <div className="register">
      <h4>SignUp</h4>
      <input
        className="input-box"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        className="input-box"
        type="text"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />

      <input
        className="input-box"
        type="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button className="appButton" onClick={collectData}>
        Signup
      </button>
    </div>
  );
};

export default SignUp;
