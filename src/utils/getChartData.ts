import { ChartData, RawSong } from "@templates/song";

export default (song: RawSong) => {
  // 타입스크립트 수듄...........

  // 5개의 타입에서 map로 song 객체에서 해당하는 타입을 뽑아옴
  // 그 중 undefined가 아닌 것을 찾아서 반환
  return ["hourly", "daily", "weekly", "monthly", "total"]
    .map(
      (chart) =>
        song[chart as keyof RawSong] as unknown as ChartData | undefined
    )
    .filter((chart) => chart !== undefined)[0] as ChartData;
};
