export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (min - max + 1)) + max;
