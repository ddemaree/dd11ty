const express = require('express')
const sirv = require('sirv')
const { createServer: createViteServer } = require('vite')

const Eleventy = require('@11ty/eleventy')
const elev = new Eleventy("./src", "./_site", {
  configPath: "./.eleventy.js",
  source: "cli",
  quietMode: true
})

elev.setIncrementalBuild(true)

const portNumber = process.env.PORT || 3003

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    clearScreen: false,
    server: { 
      middlewareMode: 'ssr',
      watch: {
        ignored: [
          "**/src/**/*",
          "**/_site/**/*",
          "**/static/**/*"
        ]
      }
    }
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
          elev.watcher.on("change", file => {
            console.log(`Eleventy changed ${file}`)
          })
        })
        .then(_ => {
          app.listen(portNumber)
        })
    })  
}

createServer();


