import { UsersService } from "../services/users.service.js";

export class usersController {
  static modifyRole = async (req, res) => {
    try {
      const uid = req.params.uid;
      const user = await UsersService.getUserById(uid);
      if (user.role === "premium") {
        user.role = "user";
      } else if (user.role === "user") {
        user.role = "premium";
      } else {
        res.json({ status: "error", message: "Unable to modify user role" });
      }
      await UsersService.updateUser(user._id, user);
      res.json({
        status: "success",
        message: "user role modified successfully",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
