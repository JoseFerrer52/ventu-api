class ValidationError extends Error {
  private status: number;
  constructor(error: any) {
    super(error.message);

    this.name = "validationError";
    this.status = 400;
    this.message = this.message;
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}

export { ValidationError };
