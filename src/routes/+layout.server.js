import { databases, Query } from "$lib/appwrite/server.js";

export async function load() {
  var posts = await databases.listDocuments("blog", "posts", [
    Query.select(["$id", "title", "body", "json", "images"]),
  ]);

  return { posts: posts.documents.reverse() };
}
