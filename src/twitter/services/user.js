import API from "../connect/connect_v1.js";
import logger from "../../logging.js";

async function fetchUsers(userList, userType) {
  let usersString = userList.toString();
  //   console.log("userString", usersString);
  let data = await API.get("users/lookup", {
    user_id: usersString,
  })
    .then((response) => response.data)
    .catch((error) => logger.error(error));

  //   console.log(data);
  let users = data.map((user) => ({
    _id: user.id_str,
    userName: user.name,
    userType: userType,
    screenName: user.screen_name,
    followers: user.followers_count,
    following: user.friends_count,
    favorites: user.favourites_count,
  }));

  return users;
}

export async function fetchUsersInTimeline(userList) {
  return await fetchUsers(userList, "Normal");
}
