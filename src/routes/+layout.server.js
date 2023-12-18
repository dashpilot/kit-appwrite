import sdk from "node-appwrite";

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6555255e2967f4fed115")
  .setKey(import.meta.env.APW_KEY);

const databases = new sdk.Databases(client);
const Query = sdk.Query;

export async function load() {
  var posts = await databases.listDocuments("blog", "posts", [
    Query.select(["$id", "title", "body"]),
  ]);

  return { posts: posts.documents.reverse() };
}
