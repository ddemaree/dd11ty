import _fs from 'fs'
import path from 'path'
import * as matter from 'gray-matter'
import { DateTime } from 'luxon'
import FastGlob from 'fast-glob';
import _, { chunk } from 'lodash';

export function getParentPaths(pathname) {
  let parts = pathname.split("/")
  let paths = []

  while(parts.length > 0) {
    if(parts.length === 1 && parts[0] === "") {
      paths.push("/")
    }
    else {
      paths.push( parts.join("/") )
    }
    parts.pop()
  }

  return paths
}

export function generateSlug(pathname) {
  const pathInfo = path.parse(pathname)
  const dirs = pathInfo.dir.split('/')

  let rawslug;

  if(pathInfo.name === 'index' && dirs.length) {
    rawslug = dirs.slice(-1)[0];
  }
  else {
    rawslug = pathInfo.name
  }

  let reg = rawslug.match(/\d{4}-\d{2}-\d{2}-(.*)/);
  if (reg) {
    return reg[1];
  }
  else {
    return rawslug
  }
}

function getPostDateTime(pathname, data) {
  if("date" in data && data.date) {
    if (data.date instanceof Date) return data.date;
    
    let date = DateTime.fromISO(data.date, { zone: 'utc' });
    if (!date.isValid) {
      throw new Error(`date front matter value (${data.date}) is invalid for ${pathname}`);
    }

    return date.toJSDate();
  }
  else {
    let filepathRegex = pathname.match(/(\d{4}-\d{2}-\d{2})/);
    if (filepathRegex !== null) {
      let dateObj = DateTime.fromISO(filepathRegex[1], {
        zone: "utc",
      }).toJSDate();
      return dateObj;
    }
  }

  return DateTime.fromISO('1980-12-03').toJSDate();
  // throw new Error(`No date found for path '${pathname}'`)
}

export function MdStore(baseDir = './content', options = {}) {
  baseDir = path.normalize( baseDir.replace(/\/$/, "") )  // strip trailing slash

  const extensions = options.extensions || ['md', 'mdx']
  const filesGlob = path.join(baseDir, `**/*.{${extensions.join(',')}}`)
  const fs = options.fs || _fs

  const readFile = filepath => {
    let subpath = filepath.replace(baseDir, '').replace(/^\//, '')
    let pathInfo = path.parse( subpath )
    let dirs = pathInfo.dir.split('/')
    
    let fileString = fs.readFileSync(filepath)
    let { data, content } = matter.default(fileString);
    data.path = subpath

    // let dataDirs = []
    // let lastPath = null
    // let fullDir = path.join(baseDir, pathInfo.dir).split('/')
    // fullDir.forEach(() => {
    //   dataDirs.push(fullDir.join('/'))
    //   dataDirs.pop()
    // })

    // console.log(dataDirs)
    // console.log(fullDir)

    // const dataDirs = dirs.map(dir => path.join(baseDir, dir))

    data.section = dirs.shift()
    
    if(!data.slug) {
      data.slug = generateSlug(filepath)
    }

    let filedate = getPostDateTime(filepath, data);
    data.ts = filedate.getTime();
    data.date = filedate.toJSON()
    
    return Object.assign({}, data, { 
      content,
      format: pathInfo.ext.replace(/^\./, '')
    });
  }

  const getAllPosts = (opts = {}) => {
    const fields = opts.fields || []
    const includeDrafts = !!opts.includeDrafts

    const allFiles = FastGlob.sync( filesGlob, { fs } )
      .map( f => readFile(f) )
      .sort( (a, b) => (b.ts - a.ts) )
      .filter( post => ( includeDrafts || !post.draft ) )
      .map( post => {
        let outPost = {}
        for(var key in post) {
          if(!fields.length || _.includes(fields, key)) {
            outPost[key] = post[key]
          }
        }
        return outPost
      } )
    return allFiles
  }

  const getPosts = (opts = {}) => {
    const perPage = opts.perPage || 20
    const page = opts.page || 1
    const fields = opts.fields || []
    const includeDrafts = !!opts.includeDrafts

    const allPosts = getAllPosts({ fields, includeDrafts })
    const pages = chunk(allPosts, perPage)

    return {
      posts: pages[page - 1] || [],
      totalPages: pages.length
    }
  }

  const getPost = slug => {
    const _all = getAllPosts({ includeDrafts: true })
    const thisPost = _all.filter(p => (p.slug === slug))
    return thisPost ? thisPost[0] : null
  }

  return {
    getPost,
    getPosts,
    getAllPosts
  }
}