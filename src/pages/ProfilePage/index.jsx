import React, { useRef, useState } from "react";
import Headings from "@/components/Headings";
import MyHeader from "@/components/MyHeader";
import Image from "next/image";
import { BsPen } from "react-icons/bs";
import { getSession, signOut, useSession } from "next-auth/react";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";
import { getByEmail } from "@/services/users";

const ProfilePage = ({ user }) => {
  const { data } = useSession();
  function email() {
    const user = data?.user;
    return user?.email;
  }

  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Both Password do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password must have at least 8 characters.");
      return;
    }

    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);

    if (!hasCapitalLetter || !hasSmallLetter) {
      alert("Password must contain both capital and small letters.");
      return;
    }

    try {
      const response = await fetch("/api/blogs/editUserPassword", {
        method: "POST",
        body: JSON.stringify({
          hashedPassword: user.password,
          oldPassword,
          newPassword: password,
          email: email(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Password Change Successful");
      } else {
        const responseBody = await response.json();
        const errorMessage = responseBody.errorMessage;
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert(
        "An error occurred while changing password. Please try again later: " +
          error.message
      );
    }
  };

  const nameButton = async () => {
    const nameChangeValue = nameChange.value;
    try {
      const response = await fetch("/api/blogs/editBlogs", {
        method: "POST",
        body: JSON.stringify({ nameChangeValue, email: email() }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Name Change Successful");
      } else {
        alert("Name Change Failed");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert("An error occurred while updating name");
    }
  };

  return (
    <>
       <MyHeader name={user.firstName}>
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
          <div className="mt-2 py-1">
            <input
              id="nameChange"
              name="nameChange"
              type="text"
              placeholder="Change Name"
              autoComplete="fisrt-name"
              required
              width={"50px"}
              minLength="3"
              maxLength="20"
              defaultValue={user.firstName}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-2"
            />
          </div>
          <button
            onClick={nameButton}
            style={{
              marginLeft: "6px",
            }}
          >
            <BsPen />
          </button>
        </div>
        <br />
        <h1>PASSWORD</h1>
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            <div className="mt-2 py-1">
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                ref={oldPasswordRef}
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
                type="password"
                ref={passwordRef}
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
                type="password"
                ref={confirmPasswordRef}
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

  const userEmail = session.user.email;
  const user = getByEmail(userEmail);
  return {
    props: {
      session,
      user,
    },
  };
}
