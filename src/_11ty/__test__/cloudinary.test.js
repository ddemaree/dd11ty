const _ = require('lodash')
const getURLFromSrc = src => new URL(src, "http://localhost")

function inferImageSourceFromURL(src) {
  const url = getURLFromSrc(src)

  if(url.hostname.match(/(?:imgix\.net|unsplash\.com)$/))
    return 'imgix';
  else if(url.hostname.match(/res\.cloudinary\.com/))
    return 'cloudinary';
  else if(url.hostname !== 'localhost')
    return 'remote';
  else
    return 'local';
}

function getCloudinaryPublicID(src) {
  const url = getURLFromSrc(src)

  const pathname = url.pathname.replace(/^\/demaree\/(?:(?:images?|videos?|files?|raw)\/(?:upload|fetch|twitter_.+)\/)*/, '')

  return _.reduce(_.split(pathname, '/'), (coll, segment) => {
    if(!segment.match(/^(?:[a-z]{1,2}_[a-z\d\:\.,_]+|v\d+)$/))
      coll.push(segment)
    
    return coll
  }, []).join('/')
}

test('can infer imgix images', () => {
  const testSrc = "https://ddimg.imgix.net/2021/test.jpeg";
  const result = inferImageSourceFromURL(testSrc)
  expect(result).toBe('imgix');
})

test('infer unsplash images as imgix', () => {
  const testSrc = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixid=MnwyMTM5OTN8MHwxfGFsbHx8fHx8fHx8fDE2MTgxNjQ3Mzg&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=1024";
  const result = inferImageSourceFromURL(testSrc)
  expect(result).toBe('imgix');
})

test('infer cloudinary images', () => {
  const testSrc = "https://res.cloudinary.com/demaree/image/upload/IMG_3257-2_vpsqb4.jpg";
  const result = inferImageSourceFromURL(testSrc)
  expect(result).toBe('cloudinary');
})

test('infer remote images', () => {
  const testSrc = "https://awesomesau.ce/thing.jpeg";
  const result = inferImageSourceFromURL(testSrc)
  expect(result).toBe('remote');
})

test('infer local images', () => {
  const testSrc = "/thing.jpeg";
  const result = inferImageSourceFromURL(testSrc)
  expect(result).toBe('local');
})

test('infer local images with relative paths', () => {
  const testSrc = "pathname/thing.jpeg";
  const result = inferImageSourceFromURL(testSrc)
  expect(result).toBe('local');
})

test('can get cloudinary public IDs with a simple URL', () => {
  const testSrc = 'https://res.cloudinary.com/demaree/hi.jpeg'
  const result = getCloudinaryPublicID(testSrc)
  expect(result).toBe('hi.jpeg')
})

test('can get cloudinary public IDs with a clean path', () => {
  const testSrc = 'https://res.cloudinary.com/demaree/image/upload/hi.jpeg'
  const result = getCloudinaryPublicID(testSrc)
  expect(result).toBe('hi.jpeg')
})

test('can get cloudinary public IDs with some simple transforms', () => {
  const testSrc = 'https://res.cloudinary.com/demaree/image/upload/w_320,h_240/hi.jpeg'
  const result = getCloudinaryPublicID(testSrc)
  expect(result).toBe('hi.jpeg')
})

test('can get cloudinary public IDs with some more complex transforms', () => {
  const testSrc = 'https://res.cloudinary.com/demaree/image/upload/w_300,ar_3:2,c_thumb,g_face,z_0.75/2021/my-post-slug/cover.jpg'
  const result = getCloudinaryPublicID(testSrc)
  expect(result).toBe('2021/my-post-slug/cover.jpg')
})

test('can get cloudinary public IDs with a version number', () => {
  const testSrc = 'https://res.cloudinary.com/demaree/image/upload/fl_getinfo/v1621124270/bitsandletters-assets/memoji.png'
  const result = getCloudinaryPublicID(testSrc)
  expect(result).toBe('bitsandletters-assets/memoji.png')
})