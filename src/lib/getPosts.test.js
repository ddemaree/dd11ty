import { describe, expect, test } from '@jest/globals';
import { MdStore, generateSlug, getParentPaths } from './getPosts';

import fs from 'fs';
jest.mock('fs');

describe("MdStore", () => {
  test("reads and paginates documents", () => {
    const store = MdStore('/tmp/content');
    const data = store.getPosts()
    expect(data.posts.length).toEqual(4);
    expect(data.totalPages).toEqual(1);
  })
  
  test("finds documents in subdirectories", () => {
    const store = MdStore('/tmp/content');
    const post = store.getPost('about')
    expect(post.title).toEqual('About Me')
    expect(post.path).toEqual('about/index.md')
  })

  test("gets section based on root directory", () => {
    const store = MdStore('/tmp/content');

    const sectionPost = store.getPost('foolishness')
    expect(sectionPost.section).toEqual('posts')

    const otherSectionPost = store.getPost('about')
    expect(otherSectionPost.section).toEqual('about')
  })

  test("returns format based on file extension", () => {
    const store = MdStore('/tmp/content');
    const post = store.getPost('foolishness')
    expect(post.format).toEqual('md') 
  })

  test.skip("loads data from sibling json file", () => {
    const store = MdStore('/tmp/content');
    const post = store.getPost('foolishness')
    expect(post.layout).toEqual('PostLayout') 
  })
})

describe("generateSlug", () => {
  test("handles regular post filenames", () => {
    const slug = generateSlug('posts/2022-04-01-foolish.md')
    expect(slug).toEqual('foolish')
  })

  test("handles root/slug/index.md", () => {
    const slug = generateSlug('about/index.md')
    expect(slug).toEqual('about')
  })

  test("handles nested slug/index.md", () => {
    const slug = generateSlug('posts/2022-04-01-foolish/index.md')
    expect(slug).toEqual('foolish')
  })
})

describe("getParentPaths", () => {
  test("gets all parent paths as an array", () => {
    const paths = getParentPaths("/tmp/content/posts")
    expect(paths).toEqual([
      "/tmp/content/posts",
      "/tmp/content",
      "/tmp",
      "/"
    ])
  })

  test("handles relative paths", () => {
    const paths = getParentPaths("posts/2022-04-01-foolishness") 
    expect(paths).toEqual([
      "posts/2022-04-01-foolishness",
      "posts",
    ])
  })
})