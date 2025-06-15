import bcrypt from 'bcrypt';

export const hashValue = async (password: string,saltRounds:number): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

export const compareValue = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};