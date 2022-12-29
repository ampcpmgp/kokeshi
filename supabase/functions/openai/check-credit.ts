export function checkCredit (credit: number) {
  if (credit <= 0) throw new Error("No Credit")
}
