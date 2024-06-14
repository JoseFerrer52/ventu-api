export const response = (res, status, message, object) => {
    res.status(status).json({
      error: false,
      message: message,
      object: object,
    });
};
