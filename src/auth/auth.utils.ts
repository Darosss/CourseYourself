import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}
