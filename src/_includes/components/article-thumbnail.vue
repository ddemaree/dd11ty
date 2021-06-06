<template>
  <figure>
    <img :src="_src" :alt="alt" class="post-thumbnail w-full h-full object-cover" />
  </figure>
</template>

<script>
import { v2 as cloudinary } from 'cloudinary'
import Imgix from '@imgix/js-core'

export default {
  props: ['src', 'alt'],
  computed: {
    _srcUrl() {
      return new URL(this.src, "http://localhost")
    },
    _src() {
      // TODO: Handle local URLs with Eleventy Image
      // TODO: Handle remote URLs with Cloudinary fetch

      if(this._srcUrl.hostname === 'res.cloudinary.com') {
        const pathname = this.src.replace(/^https?:\/\/res.cloudinary.com\/demaree\/(?:images?\/)*(?:(?:upload|fetch)\/)*/, '')

        return cloudinary.url(pathname, {cloud_name: 'demaree', secure: true, width: 320, height: 240, gravity: "faces:center", crop: "fill"})
      }
      else if(this._srcUrl.hostname === 'images.unsplash.com') {
        const imgix = new Imgix({
          domain: "images.unsplash.com",
          useHTTPS: true
        })

        return imgix.buildURL(this._srcUrl.pathname, {
          w: 320,
          h: 240,
          fit: 'crop',
          crop: 'faces,center'
        })
      }

      return this.src
    },
    _srcset() {
    }
  }
}
</script>