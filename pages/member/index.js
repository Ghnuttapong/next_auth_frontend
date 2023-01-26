import React, { useEffect, useRef, useState } from "react";
import Layout from "../admin/layout";
import useTokenStore from "../../store/token";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import Link from "next/link";
import {
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";


const label = { inputProps: { 'aria-label': 'Switch demo' } };
function Member() {
  const [users, setUsers] = useState([]);
  const token = useTokenStore((state) => state.token);

  const fetcher = async () => {
    const config = await { headers: { Authorization: token }};
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users`, config)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetcher();
  }, [1]);


  const handleDelete = (id) => {
    const config = { headers: { Authorization: token }};
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, config)
    .then((res) => fetcher())
    .catch((err) => console.log(err));
  };

  const handleEnabled = (id, status) => {
    const config = { headers: { Authorization: token }};
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/enabled/${id}`,{status}, config)
    .then((res) => fetcher())
    .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <TableContainer className="shadow-xl border-2" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold" align="center">
                Enabled
              </TableCell>
              <TableCell className="font-bold" align="center">
                Firstname
              </TableCell>
              <TableCell className="font-bold" align="center">
                Lastname
              </TableCell>
              <TableCell className="font-bold" align="center">
                Email
              </TableCell>
              <TableCell className="font-bold" align="center">
                Role
              </TableCell>
              <TableCell className="font-bold" align="center">
                Created At
              </TableCell>
              <TableCell className="font-bold" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {user.enabled? <Switch {...label} defaultChecked onChange={() => handleEnabled(user.id, 0)} /> : <Switch {...label} onChange={() => handleEnabled(user.id, 1)} />}
                
                <TableCell component="th" scope="row">
                  {user.firstname}
                </TableCell>
                <TableCell align="right">{user.lastname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">{user.created_at}</TableCell>
                <TableCell align="center" className="md:text-xl flex items-center">
                  <Link href={`/member/${user.id}`} className="hover:text-gray-500">
                    <button>
                      <AiOutlineEdit />
                    </button>
                  </Link>
                  <button
                    className="hover:text-red-600 ml-3"
                    onClick={() => handleDelete(user.id)}
                  >
                    <AiFillDelete />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default Member;
