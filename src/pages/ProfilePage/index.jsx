import React from "react";
import Headings from "@/components/Headings";
import MyHeader from "@/components/MyHeader";
import Image from "next/image";
import { BsPen } from "react-icons/bs";
import { getSession, signOut } from "next-auth/react";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <>
      <MyHeader>
        <Link
          style={{
            marginRight: "8px",
            fontSize: "23px",
            alignSelf: "center",
          }}
          href={"/DashBoard"}
        >
          <RxDashboard />
        </Link>
        <button onClick={signOut}>Log Out</button>
      </MyHeader>
      <Headings headingName={"PROFILE PAGE"} />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 bg-white rounded-md shadow-lg border border-gray-300">
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "90%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <BsPen />
          </div>
          <Image
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
            width={150}
            height={120}
            alt="Picture of the author"
            style={{
              borderRadius: "10px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            padding: "20px 0px 0px 0px",
          }}
        >
          <span>Muddussir Raza</span>
          <span
            style={{
              marginLeft: "6px",
            }}
          >
            <BsPen />
          </span>
        </div>
        <br />
        <h1>PASSWORD</h1>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <div className="mt-2 py-1">
              <input
                id="oldPassword"
                name="oldPassword"
                type="oldPassword"
                placeholder="Old Password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-2"
              />
            </div>

            <div className="mt-2 py-1">
              <input
                id="newPassword"
                name="newPassword"
                type="newPassword"
                placeholder="New Password"
                autoComplete="newPassword"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-2"
              />
            </div>

            <div className="mt-2 py-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="confirmPassword"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
