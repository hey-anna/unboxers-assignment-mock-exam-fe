export const formatMinutesSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}분 ${seconds}초`;
};

export const formatSecondsOnly = (totalSeconds: number) => {
  return `${totalSeconds}초`;
};

export const getProgressPercent = (current: number, total: number) => {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, (current / total) * 100));
};
