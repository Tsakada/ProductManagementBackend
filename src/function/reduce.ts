export const reduceArray = (array: number[]) => {
    if (array?.length === 0) return 0
    return array.reduce((a: number, b: number) => (a + b), 0)
}