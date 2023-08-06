export type FaqType = {
  question: string;
  description: string;
  createAt: number;
  category: { type: string; category: string };
};
