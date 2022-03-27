import { fs, vol } from 'memfs';

const json = {
  './posts/2022-03-26-beep-boop.md': `---
title: Beep boop
---
# Beep! Boop!`,
  './posts/bork-bork.md': `---
title: Power of the dog
date: 2022-03-15
---
# diary of a french bulldog
`,
'./posts/2022-04-01-foolishness/index.md': `---
title: April Foolishness
---
`
};
vol.fromJSON(json, '/tmp/content');

export default fs;