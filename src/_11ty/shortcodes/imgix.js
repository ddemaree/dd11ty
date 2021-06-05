const _ = require('lodash');
const imgixClient = require('../imgixClient')

module.exports = (path, width=null, height=null, alt="Image for post") => {
  let attrs = {}

  const src = imgixClient.buildURL(path, {
    w: width,
    h: height
  })

  const srcset = imgixClient.buildSrcSet(
    path, 
    {}, 
    {
      minWidth: 300,
      maxWidth: 2400,
      widthTolerance: 0.1
    }
  )

  attrs = _.pickBy({
    src,
    srcset,
    height,
    width,
    alt,
    class: "lazyload",
    sizes: "(max-width: 675px) 100vw, 1200px"
  })

  const attrsString = _.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')

  return `<img ${attrsString}>`;
}