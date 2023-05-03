import connectDB from "@/config/db";
import User from "@/models/userModels";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import bcryptjs from 'bcryptjs';

const Profile = ({ user }) => {
  const { data: session } = useSession();
  const [update, setUpdate] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const id = user._id;
  const updateProfile = async (e) => {
    setUpdate(!update);
    if (update) {
      try {
        await axios.post("/api/auth/update", {
          name,
          id,
          email,
          password: bcryptjs.hashSync(password),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      {session?.user && (
        <form className="w-full max-w-lg mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={name}
                disabled={!update}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="email"
                value={email}
                disabled={!update}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                value={password}
                disabled={!update}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={updateProfile}
              >
                {`${update ? "Save" : "Update"}`}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
Profile.auth=true;

export default Profile;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await connectDB();
  const data = await User.findById(id).lean();

  return {
    props: {
      user: JSON.parse(JSON.stringify(data)),
    },
  };
}
