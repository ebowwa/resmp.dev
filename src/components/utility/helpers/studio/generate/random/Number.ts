// helpers/generateRandomNumber.ts
export function generateRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}