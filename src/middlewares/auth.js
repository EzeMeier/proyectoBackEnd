export const checkRole = (role) => {
  return (req, res, next) => {
    console.log(req.user);
    // if (!role.includes(req.user.role)) {
    //   res.json({ status: "error", message: "you don't have access" });
    // } else {
    //   next();
    // }
  };
};
