import Headings from "@/components/Headings";
import MyHeader from "@/components/MyHeader";
import {getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signinUser } from "../utils/signinUser";


export default function Form(email, password) {

  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await signinUser(email, password);

      if (response.ok) {
        router.replace('/DashBoard');
      } else {
        console.error(response.error);
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <>
     <ToastContainer autoClose={1000} />
      <MyHeader>
        <Link href={"/auth/signup"}>Sign Up</Link>
      </MyHeader>
      <Headings headingName={"LOGIN"} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 bg-white rounded-md shadow-lg border border-gray-300">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <div className="mt-2 py-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-2"
                />
              </div>

              <div className="mt-2 py-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  placeholder="Password"
                  autoComplete="current-password"
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/DashBoard",
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
