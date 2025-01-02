class ConflictError extends Error {
  private status: number;

  constructor(error: any) {
    super(error.message);
    this.name = "Conflict";
    this.status = 409;
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

export { ConflictError };
