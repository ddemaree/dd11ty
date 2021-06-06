const path = require('path');
const _ = require('lodash');
const { JSDOM } = require('jsdom')

async function responsifyHTML(content, outputPath) {
  const sizes = [380, 760, 1280, 2560]

  if(path.extname(outputPath) === ".html") {
    const dom = new JSDOM(content)
    const { document } = dom.window

    const imageNodes = document.querySelectorAll(':not(figure) > img:not([srcset], .post-thumbnail)')
    _.forEach(imageNodes, img => {
      let srcset = '';
      const { parentNode } = img
      const src = img.src
      const srcUrl = new URL(src, (process.env.BASE_URL || "http://localhost/"))

      if(path.extname(src) === '.gif') {
        // Do nothing, a resized GIF won't animate
      }
      else if(srcUrl.hostname.match(/imgix\.net|unsplash\.com$/)) {
        srcset = sizes.map(size => `${src}?w=${size} ${size}w`).join(', ')
      }

      if(srcset) img.srcset = srcset
      img.setAttribute('loading', 'lazy')
      img.setAttribute('sizes', `(max-width: 42rem) 100vw, 56rem`)

      const newFigure = document.createElement('figure')
      newFigure.className = img.parentNode.className

      // This *moves* the image into the figure element, so we need to re-append for it to stay in the output
      newFigure.appendChild(img)
      
      if(img.getAttribute('title')) {
        const caption = document.createElement('figcaption')
        caption.innerHTML = img.getAttribute('title') 
        newFigure.appendChild(caption)
      }

      if(parentNode.tagName === 'P') {
        parentNode.replaceWith(newFigure)
      }
      else {
        parentNode.appendChild(newFigure)
      }
    })

    return dom.serialize()
  }

  return content
}

module.exports = responsifyHTML