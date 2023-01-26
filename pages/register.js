import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

function Register() {
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [resError, setResError] = useState("");
  const [resData, setResData] = useState("");

  const handleSubmit = async (e) => {
    try {
      setResData("");
      setResError("");
      e.preventDefault();
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/signup`, value)
        .then((res) => {
          setResData(res.data);
        })
        .catch((err) => {
          setResError(err.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flexCenter h-screen">
        <div className="w-2/4  border-2 p-6 shadow-xl">
          <div className="font-bold tracking-wider">
            Regis<span className="text-green-500">tration</span>
          </div>
          <form onSubmit={handleSubmit}>
            {resError ? (
              <Alert className="shadow" severity="error">
                {resError}
              </Alert>
            ) : (
              ""
            )}
            {resData ? (
              <Alert className="shadow" severity="success">
                {resData}
              </Alert>
            ) : (
              ""
            )}
            <div className="py-4 grid lg:grid-cols-2 gap-4">
              <TextField
                id="firstname"
                label="Firstname"
                variant="standard"
                name="firstname"
                onChange={handleChange}
              />
              <TextField
                id="lastname"
                label="Lastname"
                variant="standard"
                name="lastname"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <TextField
                id="email"
                label="Email"
                variant="standard"
                name="email"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineMail size={20} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="standard"
                name="password"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillLock size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="text-center my-4">
              <Button
                type="submit"
                variant="contained"
                className="w-full font-bold bg-green-500 hover:bg-white hover:text-green-500"
              >
                Submit
              </Button>
            </div>
              You have an acount{"  "}
            <Link href="/login" className="text-sm text-blue-700 hover:text-black">
               Login Now?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
