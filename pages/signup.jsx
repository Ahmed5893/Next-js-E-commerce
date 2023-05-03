import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../components/Error";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import bcryptjs from 'bcryptjs';

const signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.match(/^[A-Z]\w{6,24}$/)) {
      setError(
        "Passwords should be at least 7 characters long, 15 characters max, and start with a capital letter"
      );
      toast.error(error);
      console.log(error);
    } else if (password !== confirmPassword) {
      setError("Password Does Not Match");
      toast.error(error);
    } else {
      setError(null);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
     
      try {
        await axios.post("/api/auth/signup", {
          name,
          email,
          password: bcryptjs.hashSync(password),
        });
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (result.error) toast.error(result.error);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  return (
    <div>
      <div className="bg-grey-300 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <span className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 ">
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              ProShop
            </span>
            {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl py-1 text-center ">
                Sign Up
              </h1>            */}
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bold text-black"
              >
                Name
              </label>
              <input
                type="text"
                className="block border border-grey-400 w-full p-3 rounded mb-4"
                name="Name"
                placeholder=" Name"
                value={name}
                id="name"
                autoFocus
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-black"
              >
                Email
              </label>

              <input
                type="text"
                className="block border border-grey-400 w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                value={email}
                id="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-black"
              >
                Password
              </label>

              <input
                type="password"
                className="block border border-grey-400 w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={password}
                id="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-bold text-black"
              >
                Confirm Password
              </label>

              <input
                type="password"
                className="block border border-grey-400 w-full p-3 rounded mb-4"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                id="confirmPassword"
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-900 focus:outline-none my-1"
              >
                Create Account
              </button>

              <div className="text-center text-sm text-grey-800 mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-800"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-800"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
              <div className="text-grey-dark mt-6 text-center">
                Already have an account?
                <Link
                  className="no-underline border-b border-blue text-blue-500 px-2 hover:underline hover:text-blue-800"
                  href={redirect ? `/login?redirect=${redirect}` : "/login"}
                >
                  Log in
                </Link>
                .
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" limit={1} />
    </div>
  );
};

export default signup;
