import { RecommendListMetaType } from "@templates/playlist";

export default (list: RecommendListMetaType[], divisor: number) => {
  return list.reduce((acc: RecommendListMetaType[][], _, index) => {
    if (index % divisor === 0) acc.push(list.slice(index, index + divisor));

    return acc;
  }, []);
};
