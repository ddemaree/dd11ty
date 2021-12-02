const imgixClient = require('../imgixClient')

const postThumbnail = async uri => {
  const urlObj = new URL(uri, "http://localhost/")
  // console.log(urlObj)
  
  if(urlObj.host === 'localhost') {
    // TODO: Handle using Eleventy Image
  }
  else if(urlObj.host.match(/imgix\.net$/)) {
    // TODO: Handle as Imgix source
    return imgixClient.buildURL(urlObj.pathname, {
      w: 320,
      h: 240,
      fit: 'crop'
    })
  }
  else if(urlObj.host.match('unsplash.com')) {
    // TODO: Can also handle as Imgix! Just pass images.unsplash.com as the domain
  }
  // else if(urlObj.host.match('res.cloudinary.com')) {
  //   const publicID = getCloudinaryIDFromURL(uri)
  //   console.log(publicID)

  //   return cloudinary.url(publicID, { width: 320, height: 240, crop: "thumbnail" })
  // }
  else {
    // TODO: Remote image, for now handle as Cloudinary or Eleventy Image 
  }

  // TODO: Special handling for Substack's CDN (Cloudinary)?

  return urlObj
}

module.exports = postThumbnail