export function authenticate(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({
      status: false,
      message: "Session expired. Please log in again.",
    });
  }
  next();
}
