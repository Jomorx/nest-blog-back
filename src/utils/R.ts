export const success = (data: object, message = "") => {
  return { code: 200, data, message }
}
