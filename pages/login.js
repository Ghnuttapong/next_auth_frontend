import {
  Alert,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import {
  AiFillLock,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import useTokenStore from "../store/token";
import useAdminStore from "../store/isAdmin";

function Login() {
  const router = useRouter();
  const setToken = useTokenStore((state) => state.setToken);
  const setIsAdmin = useAdminStore((state) => state.setIsAdmin);
  const inputRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [resError, setResError] = useState("");
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setResError("");
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/signin`, value)
      .then((res) => {
        setToken(res.data.token);
        if (res.data.role === "admin") {
          setIsAdmin(res.data.role);
        }
        router.push("/");
      })
      .catch((err) => {
        setResError(err.response.data);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleLogin}
          id="form-login"
          className=" p-4 lg:w-1/4 md:w-2/4  w-full  rounded-md shadow-xl"
        >
          <div className="flex justify-center">
            <BsPersonCircle
              size={100}
              className="shadow-xl bg-gray-300 text-white rounded-full"
            />
          </div>
          <div className="flex flex-col mt-4 space-y-8">
            {resError ? (
              <Alert className="shadow" severity="error">
                {resError}
              </Alert>
            ) : (
              ""
            )}
            <TextField
              id="input-email"
              name="email"
              ref={inputRef}
              label="Email"
              type="email"
              variant="standard"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineMail size={20} />
                  </InputAdornment>
                ),
              }}
            />
            {/* password */}
            <FormControl sx={{ width: "100" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="input-password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <AiFillLock size={20} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <MdOutlineVisibility />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          <div className="text-center mt-3 w-full ">
            <Button
              className="shadow-md transition delay-100 duration-100 ease-in text-white bg-green-500 hover:bg-white hover:text-green-500 w-full font-bold tracking-widest"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </div>
          <p className="mt-3">
            <Link href="/register" className="text-blue-700 hover:text-black">
              You don{`'`}t have an account?
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
