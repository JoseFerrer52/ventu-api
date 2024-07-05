class ClientError extends Error {
  constructor(error) {
    super(error.message);

    this.name = "Not Found";
    this.status = 404;
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

export { ClientError };