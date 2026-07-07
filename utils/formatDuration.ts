export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}時間${remainingMinutes}分`;
  }

  if (hours > 0) {
    return `${hours}時間`;
  }

  return `${remainingMinutes}分`;
};
