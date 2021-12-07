import "./css/index.css"

import 'imgix.js'
import 'lazysizes'
import FitVids from "./js/fitvids"
import _ from "lodash"

const { imgix } = window

imgix.init({
  useHttps: true,
  host: 'ddimg.imgix.net',
  srcAttribute: 'data-src',
  srcsetAttribute: 'data-srcset',
  sizesAttribute: 'data-sizes'
});

FitVids.init()

document.querySelectorAll('.deorphan').forEach(elem => {
  const words = elem.innerHTML.split(' ')
  if(words.length < 3) return null

  const lastWord = _.slice(words, -1)[0]
  const wordsMinusLast = _.slice(words, 0, -1).join(" ") + "&nbsp;" + lastWord
  elem.innerHTML = wordsMinusLast 
});