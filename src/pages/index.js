import { getSession } from "next-auth/react";

export default function Home() {
  return <></>;
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
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signup",
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

