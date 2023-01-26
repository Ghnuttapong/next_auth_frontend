import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import useTokenStore from "../store/token";

function Navbar() {
  const router = useRouter();
  const removeToken = useTokenStore((state) => state.removeToken)

  const [navActive, setNavActive] = useState(false);

  const handleNav = () => {
    setNavActive(!navActive);
  };
  const handleLogout = () => {
    removeToken();
  };

  return (
    <div className="shadow-xl z-[1000] bg-white fixed w-full">
      <div className="p-4">
        <div className="flexBetween">
          <div className="font-bold text-xl">Branner</div>
          {/* mobile reponsive */}
          <div className="navbar-container md:hidden">
            <button onClick={handleNav} className="p-1">
              <RiMenu3Fill size={20} />
            </button>
            <div className={navActive ? "block" : "hidden"}>
              <div className="h-screen w-full top-0 left-0 z-[1000] absolute bg-[rgba(0,0,0,0.7)]">
                <div className="center text-white">
                    <button className="bg-base1 p-2" onClick={handleNav}>Close</button>
                </div>
              </div>
            </div>
          </div>
          {/* desktop reponsive */}
          <ul className="md:flex hidden list-none gap-4">
            <li>
              <Link href="">Home</Link>
            </li>
            <li>
              <Link href="">About</Link>
            </li>
            <li>
              <Link href="">Contact</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
