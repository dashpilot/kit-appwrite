import { databases, Query } from "$lib/appwrite/server.js";

export async function load() {
  /*
  var posts = await databases.listDocuments("blog", "posts", [
    Query.select(["$id", "title", "body", "json", "images"]),
  ]);
  */

  // const response = await fetch("/api/data");

  const response = await fetch(
    "https://cloud.appwrite.io/v1/databases/blog/collections/posts/documents",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": "6555255e2967f4fed115",
        "X-Appwrite-Key": import.meta.env.APW_KEY,
      },
    }
  );

  const posts = await response.json();

  return { posts: posts.documents.reverse() };
}
