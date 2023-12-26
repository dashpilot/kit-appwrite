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
    const { userId, email } = await request.json();

    if (jwt) {
      try {
        client.setJWT(jwt);
        console.log("ok");
        let account = new sdk.Account(client);

        const promise = account.get();

        promise.then(
          function (response) {
            console.log(response);

            console.log(response.email);
            console.log(email);

            if (response.email == email) {
              // you can now set the cookie

              console.log("cookie can be set");
            }
          },
          function (error) {
            console.log(error);
          }
        );

        // console.log(account);
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
