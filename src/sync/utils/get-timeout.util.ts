export const getTimeout = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 1000));
