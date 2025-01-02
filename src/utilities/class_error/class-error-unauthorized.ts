class UnauthorizedError extends Error {
  status: number;
  constructor(error: any) {
    super(error.message);

    this.name = "unauthorizedError";
    this.status = 401;
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

export { UnauthorizedError };
