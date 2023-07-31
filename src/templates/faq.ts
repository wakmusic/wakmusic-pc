export type Faq = {
  question: string;
  description: string;
  createAt: number;
  category: { type: string; category: string };
};
