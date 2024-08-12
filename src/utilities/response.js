export const response = (res, status, message, object) => {
    res.status(status).json({
      error: false,
      status: status,
      message: message,
      object: object,
    });
};
