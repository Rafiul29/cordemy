import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useSession } from "next-auth/react";

const Navbar = () => {

  const {data:session}=useSession()

  return (
    <div className="h-20 bg-black text-gray-400 flex items-center">
      <div className="wrapper flex justify-between items-center">
        <Link href="/" className="text-white font-semibold text-xl">
          Codemy
        </Link>
        <div className="flex gap-5 ">
          <Link href="/" className="hover:text-white transition-color">
            Home
          </Link>
          <Link href="/courses" className="hover:text-white transition-color">
            Courses
          </Link>
          {
            session && (
              <Link href="/orders" className="hover:text-white transition-color">
              Orders
            </Link>
            )
          }
          <Link href="/about" className="hover:text-white transition-color">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-color">
            Contact
          </Link>
        </div>
        <div>
          {!session ? (<Button
            href="/users/login"
            placeholder="Sign in"
            color="secondary"
            size="default"
          />):(<Button
            href="/users/profile"
            placeholder="Profile"
            color="secondary"
            size="default"
          />)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
