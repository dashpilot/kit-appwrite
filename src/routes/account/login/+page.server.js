import sdk from "node-appwrite";

const client = new sdk.Client();
const users = new sdk.Users(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6555255e2967f4fed115")
  .setKey(import.meta.env.APW_KEY);

export const actions = {
  default: async ({ request }) => {
    // console.log(request);
    // const jwt = request.headers["x-appwrite-user-jwt"];
    const jwt = request.headers.get("x-appwrite-user-jwt");
    const { userId } = await request.json();

    if (jwt) {
      client.setJWT(jwt);
      console.log("ok2");
      try {
        const user = await users.get(userId);
        console.log("ok3");
        // If the JWT is valid, the user's data will be returned
        console.log(user);
      } catch (error) {
        // If the JWT is not valid, an error will be thrown
        console.log(error);
        return { status: 401, body: "Invalid JWT" };
      }
    } else {
      return { status: 401, body: "Please sign in, JWT not found" };
    }
  },
};
