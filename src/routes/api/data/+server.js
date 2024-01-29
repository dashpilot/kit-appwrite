import { redirect, json } from "@sveltejs/kit";

export async function GET({ request }) {
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

  const data = await response.json();
  console.log(data);

  return json(data);
}
