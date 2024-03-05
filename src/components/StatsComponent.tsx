export interface Stats {
  totalWords: number;
  totalRequest: number;
  avgProcessingTime: number;
}

export function StatsComponent({
  totalWords,
  totalRequest,
  avgProcessingTime,
}: Stats) {
  return (
    <>
      <div>Total Words: {totalWords} </div>
      <div>Total Requests: {totalRequest}</div>
      <div>Average Processing Time: {avgProcessingTime} miliseconds</div>
    </>
  );
}
