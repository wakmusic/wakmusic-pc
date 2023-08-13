export default (list: any[], divisor: number) => {
  return list.reduce((acc: any[][], _, index) => {
    if (index % divisor === 0) acc.push(list.slice(index, index + divisor));

    return acc;
  }, []);
};
