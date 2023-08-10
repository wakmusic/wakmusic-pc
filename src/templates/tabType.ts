export interface Query {
  [key: string]: string;
}

interface tabType {
  text: string;
  to: string | Query | null;
}

export default tabType;
