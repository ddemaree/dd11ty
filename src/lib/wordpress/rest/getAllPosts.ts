export default async function getAllPosts() {
  const posts = await fetch("https://wp2.demaree.me/wp-json/wp/v2/posts").then(
    (r) => r.json()
  );
  console.log(posts);
}
