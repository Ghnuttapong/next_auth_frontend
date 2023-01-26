import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useTokenStore from "../../store/token";
import Link from "next/link";
import Layout from "../admin/layout";

function EditMember() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    id: ''
  });
  const token = useTokenStore((state) => state.token);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const config = await { headers: { Authorization: token } };
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, user , config)
      .then((res) => {
          if(res.status == 200) router.push('/member')
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  };

  const fetcher = async () => {
    const config = await { headers: { Authorization: token } };
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, config)
      .then((res) => {
        res.data[0].password = ''
        setUser(res.data[0])
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <Layout>
      <div className="w-full  border-2 p-6 shadow-xl">
        <div className="font-bold tracking-wider">
          Edit <span className="text-green-500">Form</span>
        </div>
        {user && (
          <form onSubmit={handleSubmit}>
            <div className="py-4 grid lg:grid-cols-2 gap-4">
              <TextField
                id="firstname"
                label="Firstname"
                variant="standard"
                value={user.firstname}
                name="firstname"
                onChange={handleChange}
              />
              <TextField
                id="lastname"
                label="Lastname"
                variant="standard"
                value={user.lastname}
                name="lastname"
                onChange={handleChange}
              />
              <TextField
                id="email"
                label="Email"
                disabled={true}
                value={user.email}
                variant="standard"
                name="email"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="standard"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="text-center mt-4 grid grid-cols-2 gap-4">
              <Button
                type="submit"
                variant="contained"
                className="font-bold bg-green-500 hover:bg-white hover:text-green-500"
              >
                Submit
              </Button>
              <Link href="/member">
                <Button
                  type="button"
                  variant="contained"
                  className="font-bold w-full hover:bg-green-500 hover:text-white bg-white text-green-500"
                >
                  Back
                </Button>
              </Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

export default EditMember;
