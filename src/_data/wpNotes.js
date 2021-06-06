// https://demaree.space/wp-json/wp/v2/posts?per_page=50&categories_exclude=584&_fields=id,acf,title,content,date_gmt,guid,custom_excerpt,_links,_embedded.wp%3Aterm&_embed=wp%3Aterm

const axios = require('axios')
const wpClient = axios.create({
  baseURL: "https://demaree.space/wp-json"
})

module.exports = async () => {
  const allPosts = []
  let currentPage = 1;
  
  const data = await wpClient.get("/wp/v2/posts", {
    params: {
      per_page: 50,
      categories_exclude: 584,
      _embed: 'wp:term'
    }
  }).then(res => res.data)
  // console.log(data)

  return data
}