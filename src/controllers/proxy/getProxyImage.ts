import type { Context } from "hono";

export default async function getProxyImage(c: Context) {
  const url = c.req.query("url");

  if (!url) {
    return c.json({ message: 'Missing "url" query parameter' }, 400);
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return c.json({ message: `Failed to fetch image. Status: ${response.status}` }, 500);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const body = await response.arrayBuffer();

    return new Response(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return c.text("Error fetching image.", 500);
  }
}
