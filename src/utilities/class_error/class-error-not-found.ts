class ClientError extends Error {
  private status: number;

  constructor(error: any) {
    super(error.message);

    this.name = "Not Found";
    this.status = 404;
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

export { ClientError };
