const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async id => {
  const tweetData = await Cache(`https://api.twitter.com/1/statuses/oembed.json?id=${id}&dnt=1`, {
    duration: "1d", // save for 1 day
    type: "json"    // we’ll parse JSON for you
  })

  return `<figure class="dd-embed dd-embed-tweet">${tweetData.html}</figure>`
}