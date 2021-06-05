const markdown = require('../markdown');
const _c = require('classnames')

module.exports = (content, options={}) => {
  const classNames = _c([
    'dd-block-gallery',
    (options.style && `is-style-${options.style}`),
    (options.align && `align${options.align}`),
    (options.cols && `cols-${options.cols}`)
  ])

  const galleryItems = markdown.render(content)
  const output = `<figure class="${classNames}">${galleryItems}</figure>`;
  return output;
}