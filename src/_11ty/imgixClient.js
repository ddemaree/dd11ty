const Imgix = require("@imgix/js-core");

const imgixClient = new Imgix({
  domain: 'ddimg.imgix.net',
  useHTTPS: true
});

module.exports = imgixClient