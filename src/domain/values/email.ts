export class Email {
  value: string

  constructor(value: string) {
    this.value = value.toLowerCase().trim()
  }
}
