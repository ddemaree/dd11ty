#!/usr/bin/env zx
import "zx/globals";

let files = await glob(["./_posts/*.md"]);
let copiedFiles = await glob("./src/posts/*.md");

copiedFiles = copiedFiles.map((f) => path.basename(f));

let batchSize = 5;
let currentIndex = 0;
let copies = [];

files.reverse().map((filePath) => {
  let basename = path.basename(filePath);
  if (currentIndex < batchSize && !copiedFiles.includes(basename)) {
    copies.push(
      new Promise(async () => {
        echo(basename);
        await $`cp ${filePath} ./src/posts/${basename}`;
      })
    );

    currentIndex++;
  }
});

await Promise.all(copies);
