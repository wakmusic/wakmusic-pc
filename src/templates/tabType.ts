export interface Query {
  [key: string]: string;
}

interface TabType {
  text: string;
  to: string | Query | null;
}

export default TabType;
