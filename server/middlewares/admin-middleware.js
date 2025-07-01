const adminMiddleware = async (req, res, next) => {
  try {
    // console.log(req.user);
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied, Admin Access Required" });
    }
    // res.status(200).json({ message: req.user.isAdmin });
    // if user is admin, proceed to next middleware or controller
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
