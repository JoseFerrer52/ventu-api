class ForbiddenError extends Error {
  private status: number;

  constructor(error: any) {
    super(error.message);

    this.name = "Forbidden";
    this.status = 403;
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

export { ForbiddenError };
