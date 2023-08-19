import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const { data } = getSession();
    if (!data) {
      router.replace("/DashBoard");
    }
  }, [router]);

  return <></>;
}
