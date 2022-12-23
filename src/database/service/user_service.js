import User from "../model/user.js";
import "../connect.js";
class UserService {
  static async findUsersByIds(userIds) {
    return new Set(
      (await User.find().where("_id").in(userIds).exec()).map((res) => res._id)
    );
  }
}
const test = UserService.findUsersByIds(["123"]);
// console.log(await test);

export default UserService;
// console.log(await UserInterface.findUsersByIds(["123"]));
