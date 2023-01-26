export class AppException {
  constructor(code: number, message: string) {
    this.message = message
    this.code = code
  }
  private message: string
  private code: number
  getMessage() {
    return this.message
  }
  setMessage(message: string) {
    this.message = message
  }
  getCode() {
    return this.code
  }
  setCode(code: number) {
    this.code = code
  }
}
