import { T4Bold, T4Light, T5Bold } from "@components/Typography";

interface HelloWorldProps {}

const HelloWorld = ({}: HelloWorldProps) => {
  return (
    <div>
      <T4Bold>This is T6Bold</T4Bold>
      <T5Bold>This is T5Bold</T5Bold>
      <T4Light>This is T4Light</T4Light>
    </div>
  );
};

export default HelloWorld;
