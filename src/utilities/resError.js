export const resError = (res, status, message, name, path) => {
  res.status(status || 500).json({
    error: true,
    message: message || "Error Interno",
    name: name,
    path: path,
  });
};
