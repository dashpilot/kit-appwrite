import sdk from "node-appwrite";
import { client } from "$lib/appwrite/server.js";

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
