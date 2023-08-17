export default <T>(list: T[], divisor: number) => {
  return list.reduce((acc: T[][], _, index) => {
    if (index % divisor === 0) acc.push(list.slice(index, index + divisor));

    return acc;
  }, []);
};
