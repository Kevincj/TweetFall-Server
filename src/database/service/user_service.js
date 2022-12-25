import User from "../model/user.js";
class UserService {
  static async findUsersByIds(userIds) {
    return new Set(
      (await User.find().where("_id").in(userIds).exec()).map((res) => res._id)
    );
  }
  static async insertMany(users) {
    return await User.insertMany(users);
  }

  static async insertOne(user) {
    return await User.create(user);
  }

  static async deleteOne(userId) {
    return await User.deleteOne({ _id: userId });
  }

  static async deleteMany(userIds) {
    return await User.deleteMany({ _id: { $in: userIds } });
  }
}

export default UserService;
