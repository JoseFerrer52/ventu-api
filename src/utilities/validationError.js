class validationError extends Error {
  constructor(error) {
    super(error.message);

    this.name = "validationError";
    this.status = 400;
    this.message = this.message;
    this.path = error.path;

  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
      path: this.path,
    };
  }
}

export { validationError };
