import { v4 as uuidv4 } from "uuid";

export function generateInvoiceID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = Array.from(
    { length: 2 },
    () => letters[Math.floor(Math.random() * letters.length)]
  );

  const numbers = "0123456789";
  const randomNumbers = Array.from(
    { length: 4 },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  );

  const uniqueID = randomLetters.join("") + randomNumbers.join("") + uuidv4();
  return uniqueID;
}
