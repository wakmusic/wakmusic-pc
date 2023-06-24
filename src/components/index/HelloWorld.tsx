import { T6Bold, T6Medium, T10Light } from "@components/Typography";

interface HelloWorldProps {}

const HelloWorld = ({}: HelloWorldProps) => {
  return (
    <div>
      <T6Bold>This is T6 Bold</T6Bold>
      <T10Light>This is T10 Light</T10Light>
      <T6Medium
        style={{
          position: "fixed",
          top: "62px",
        }}
      >
        This is T6 Medium
      </T6Medium>
    </div>
  );
};

export default HelloWorld;
