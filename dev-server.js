const path = require('path')
const connect = require('connect')
const express = require('express')
const serve = require('serve-handler')
const { createServer: createHTTPServer } = require('http')
const { createServer: createViteServer } = require('vite')
const { nextTick } = require('process')

const sirv = require('sirv')

const Eleventy = require('@11ty/eleventy')
const elev = new Eleventy("./src", "./_site", {
  configPath: "./.eleventy.js",
  source: "cli"
})

// const viteConfig = require('./vite.config')

const portNumber = process.env.PORT || 3003

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    clearScreen: false,
    server: { 
      middlewareMode: 'ssr',
    },
    build: {
      // outDir: "_site",
      assetsDir: "assets",
      sourcemap: true,
      manifest: true,
      rollupOptions: {
        input: path.join(process.cwd(), "src/client/main.js"),
      },
    },
  })

  app.use(vite.middlewares)

  const static = sirv("_site", {
    dev: true
  })

  app.use(static)

  elev.init()
    .then(() => {
      elev.watch()
        .catch(e => console.log(`There was an error: ${e}`))
        .then(_ => {
          createHTTPServer(app).listen(portNumber)
        })
    })  
}

createServer();


