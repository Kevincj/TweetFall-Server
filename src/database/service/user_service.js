import User from "../model/user.js";
class UserInterface {
  static async findUsersByIds(userIds) {
    return new Set(
      (await User.find().where("_id").in(userIds).exec()).map((res) => res._id)
    );
  }
}
const test = UserInterface.findUsersByIds(["123"]);
// console.log(await test);

export default UserInterface;
// console.log(await UserInterface.findUsersByIds(["123"]));
