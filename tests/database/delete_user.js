import UserService from "../../src/database/service/user_service.js";
import User from "../../src/database/model/user.js";
import "../../src/database/connect.js";
async function deleteOneTest() {
  await User.create({
    _id: "3456",
    userName: "Test User",
    screenName: "test_user",
    follower: 20,
    following: 5,
    favorites: 30,
  });

  await UserService.deleteOne("3456")
    .then(console.log("Success."))
    .catch((err) => console.log(err));
}

async function deleteManyTest() {
  await User.insertMany([
    {
      _id: "3456",
      userName: "Test User",
      screenName: "test_user",
      follower: 20,
      following: 5,
      favorites: 30,
    },
    {
      _id: "2345",
      userName: "Test User2",
      screenName: "test_user2",
      follower: 3,
      following: 4,
      favorites: 1,
    },
  ]);

  await UserService.deleteMany(["3456", "2345"])
    .then(console.log("Success."))
    .catch((err) => console.log(err));
}

deleteOneTest();
deleteManyTest();
