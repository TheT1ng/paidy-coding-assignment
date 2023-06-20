export const getNumberCharactersInString = (string) => {
  return string.split('').filter((char) => !Number.isNaN(+char))
}