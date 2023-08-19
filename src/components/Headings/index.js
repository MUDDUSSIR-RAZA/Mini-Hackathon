import { Layout } from "antd";
const { Header } = Layout;

const Headings = ({headingName}) => {
  return (
    <>
      <Header
        style={{
          backgroundColor: "##102e4b",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>{headingName}</h1>
      </Header>
    </>
  );
};

export default Headings;