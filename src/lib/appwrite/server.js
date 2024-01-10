import sdk from "node-appwrite";

const client = new sdk.Client();
const users = new sdk.Users(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6555255e2967f4fed115")
  .setKey(import.meta.env.APW_KEY);

export const databases = new sdk.Databases(client);
export const Query = sdk.Query;

export async function checkJwt(request) {
  const jwt = request.headers.get("x-appwrite-user-jwt");

  client.setJWT(jwt);
  let account = new sdk.Account(client);

  const promise = account.get();

  promise.then(
    function (response) {
      console.log(response);
      return true;
    },
    function (error) {
      return false;
      console.log(error);
    }
  );
}
