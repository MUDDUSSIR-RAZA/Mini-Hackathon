import React from "react";
import { Layout } from "antd";
import Link from "next/link";
const { Header } = Layout;

const MyHeader = () => {
  return (
    <>
      <Header
        style={{
          backgroundColor: "#6F42C1",
          display: "flex",
          justifyContent: "space-between", // Aligns items at both ends
          alignItems: "center", // Vertically centers items
          padding: "0 16px", // Add horizontal padding
          color: "white",
        }}
      >
        <div>
          <h1>Personel Blogging App</h1>
        </div>
        <div
          style={{
            backgroundColor: "#6F42C1",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between", // Aligns items at both ends
            alignItems: "center", // Vertically centers items
            padding: "0 16px", // Add horizontal padding
            color: "white",
          }}
        >
          <div
            style={{
              marginRight: "16px",
            }}
          >
            Muddussir Raza
          </div>
          <div style={{
              fontSize:"12px"
            }}>
            <Link href={"/auth/signup"}>Sign Up</Link>
          </div>
        </div>
      </Header>
    </>
  );
};

export default MyHeader;
