import Headings from "@/components/Headings";
import MyHeader from "@/components/MyHeader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Form() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const router = useRouter();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const { data } = useSession();
  if (data) {
    router.replace("/DashBoard");
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (password !== repeatPassword) {
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

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Sign up Successful");
      router.replace("/auth/login");
    } else {
      const data = await response.json();
      alert(`Sign up failed: ${data.message}`);
    }
  };
  return (
    <>
      <MyHeader>
        <Link href={"/auth/login"}>Log In</Link>
      </MyHeader>
      <Headings headingName={"SIGNUP PAGE"} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup for new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 bg-white rounded-md shadow-lg border border-gray-300">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <div className="mt-2 py-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  ref={firstNameRef}
                  placeholder="First Name"
                  autoComplete="given-name"
                  required
                  minLength="3"
                  maxLength="20"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-2"
                />
              </div>

              <div className="mt-2 py-1">
                <input
                  id="lastName"
                  name="last-name"
                  type="text"
                  ref={lastNameRef}
                  placeholder="Last Name"
                  autoComplete="family-name"
                  required
                  minLength="1"
                  maxLength="20"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-2"
                />
              </div>

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

              <div className="mt-2 py-1">
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  ref={repeatPasswordRef}
                  placeholder="Repeat Password"
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
