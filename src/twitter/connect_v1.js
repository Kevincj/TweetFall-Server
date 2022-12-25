import Twit from "twit";
import config from "config";
const API = new Twit({
  consumer_key: config.get("twitter.OAuth1.api_key"),
  consumer_secret: config.get("twitter.OAuth1.api_secret"),
  access_token: config.get("twitter.OAuth1.access_token"),
  access_token_secret: config.get("twitter.OAuth1.access_secret"),
});

export default API;

async function fetchUsers(userList) {
  let usersString = userList.toString();
  console.log(usersString);
  let data = await API.get("users/lookup", {
    user_id: usersString,
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));

  console.log(data);
  let users = data.map((user) => ({
    _id: user.id_str,
    userName: user.name,
    screenName: user.screen_name,
    followers: user.followers_count,
    following: user.friends_count,
    favorites: user.favourites_count,
  }));

  console.log(users);
}
fetchUsers(["3660925521"]);
