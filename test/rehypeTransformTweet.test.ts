import { describe, expect } from 'vitest';
import { test } from './fixture';

import { rehypeTransformTweets } from '../src/lib/remark/rehypeTransformTweets/index.mjs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

import { screen } from '@testing-library/dom';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeTransformTweets)
  .use([rehypeRaw])
  .use(rehypeStringify, { allowDangerousHtml: true });

describe('rehypeTransformTweet', () => {
  test('rehypeTransformTweet', async ({ markdowns }) => {
    const source = markdowns['tweet.md'];
    const result = await processor.process(source);

    document.body.innerHTML = result.toString();
    const r = await screen.findByText('@ddemaree');
    expect(r).toBeTruthy();

    const rr = await screen.findByAltText('Twitter profile picture for ddemaree');
    expect(rr).toBeTruthy();
  });
});
