// getWeekly count from localStorage
export const getTodayCount = (): number => {
  const today = new Date().toISOString().split('T')[0];
  const storedData = localStorage.getItem(`count_${today}`);
  return storedData ? parseInt(storedData, 10) : 0;
};

export const setTodayCount = (count: number): void => {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem(`count_${today}`, count.toString());
};

// increment today's count by 1
export const incrementTodayCount = (): void => {
  const currentCount = getTodayCount();
  setTodayCount(currentCount + 1);
};

export const getCountByDate = (date: string): number => {
  const storedData = localStorage.getItem(`count_${date}`);
  return storedData ? parseInt(storedData, 10) : 0;
};

// sun, mon, tue, wed, thu, fri, sat
export const getWeeklyCounts = (): Array<number> => {
  const today = new Date();
  const weeklyCounts: Array<number> = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStringParts = date.toISOString().split('T');
    const dateString = dateStringParts[0] ?? '';
    const count = getCountByDate(dateString);
    weeklyCounts.push(count);
  }

  return weeklyCounts;
};
