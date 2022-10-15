const short = require('short-uuid');

export const generateRandomNumbers = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generateRandomString = (): string => short.generate();
