import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiHome, BiLogOut } from "react-icons/bi";
import { BsPersonBadgeFill } from "react-icons/bs";
import useAdminStore from "../store/isAdmin";
import useTokenStore from "../store/token";

function Sidebar() {
  const router = useRouter();

  const token = useTokenStore((state) => state.token);
  const removeToken = useTokenStore((state) => state.removeToken);
  const removeIsAdmin = useAdminStore((state) => state.removeIsAdmin);

  const handleClick = (e) => {
    e.preventDefault();
    removeToken();
    removeIsAdmin();
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <div>
      {/* large screen */}
      <div className="sidebar-lg bg-white hidden lg:block fixed w-2/12 z-[1000] top-0 left-0 p-4 border-r-2 shadow-lg  h-screen ">
        <p className="text-xl">Company <span className="text-green-500">name</span></p>
        <hr className="my-4" />
        <div className="mt-3 pl-4">
          <ul className="list-none">
            <li
              className={`sidebar-item ${
                router.asPath === "/" ? "active" : ""
              }`}
            >
              <BiHome size={20} />
              <Link href="/">Home</Link>
            </li>
            <li className={`sidebar-item ${ router.asPath === "/member" ? "active" : "" }`} >
              <BsPersonBadgeFill size={20} />
              <Link href="/member">Member</Link>
            </li>
            <li className="sidebar-item">
              <BiLogOut size={20} />
              <button onClick={handleClick}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-md fixed h-screen lg:hidden">
        <ul className="w-full flex flex-col border-r-2 shadow-lg rounded-md gap-5 p-1 text-green-500 bg-white overflow-hidden">
          <Link
            className="sidebar-md-item"
            href="/"
          >
            <BiHome />
          </Link>
          <Link
            className="sidebar-md-item"
            href="/member"
          >
            <BsPersonBadgeFill />
          </Link>
          <button
            onClick={handleClick}
            className="sidebar-md-item"
          >
            <BiLogOut />
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
