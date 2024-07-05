class ForbiddenError extends Error {
    constructor(error) {
      super(error.message);
  
      this.name = "Forbidden";
      this.status = 403;
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
  
  export { ForbiddenError };