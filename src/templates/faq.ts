export type FAQCategory = string;

export type FAQ = {
  category: FAQCategory;
  question: string;
  description: string;
  createAt: number;
};
