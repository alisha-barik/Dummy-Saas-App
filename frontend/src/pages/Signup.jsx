import React from "react";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e.target.value=======>>> ", input);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg flex flx-col gap-5 p-8"
      >
        <div className="gap-2 flex">
          <label className="flex-col">Email</label>
          <input
            type="text"
            name="email"
            className="flex-col"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter your Email Id"
          />
        </div>
        <div className="gap-2 flex">
          <label className="flex-col">Password</label>
          <input
            type="password"
            name="password"
            className="flex-col"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter your Password"
          />
        </div>
        <div className="gap-2 flex">
          <label className="flex-col">name</label>
          <input
            className="flex-col"
            value={input.name}
            name="name"
            type="text"
            onChange={changeEventHandler}
            placeholder="Enter your Name"
          />
        </div>
        <button className="bg-sky-500 hover:bg-sky-700 rounded p-2">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
