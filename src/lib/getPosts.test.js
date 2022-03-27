import { MdStore } from './getPosts';

import fs from 'fs';
jest.mock('fs');

it("reads and paginates documents", () => {
  const store = MdStore('/tmp/content');
  const data = store.getPosts()
  expect(data.posts.length).toEqual(3);
  expect(data.totalPages).toEqual(1);
})