import User from "../model/user.js";
class UserService {
  static async findUsersByIds(userIds) {
    return new Set(
      (await User.find().where("_id").in(userIds).exec()).map((res) => res._id)
    );
  }
  static async insertMany(users) {
    return User.insertMany(users);
  }

  static async insertOne(user) {
    return User.create(user);
  }

  static async deleteOne(userId) {
    return User.deleteOne({ _id: userId });
  }

  static async deleteMany(userIds) {
    return User.deleteMany({ _id: { $in: userIds } });
  }
}

export default UserService;
