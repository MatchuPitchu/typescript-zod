// CODE

import { expect, it } from 'vitest';
import { z } from 'zod';

const PersonResult = z.object({
  name: z.string(),
});
//                   ^ 🕵️‍♂️

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch('https://www.totaltypescript.com/swapi/people/' + id + '.json').then((res) => res.json());

  const parsedData = PersonResult.parse(data);
  // Zod has stripped away all of the keys of data that we aren't
  // interested in, and gives us only the name.
  console.log(parsedData);

  return parsedData.name;
};

// TESTS

it('Should return the name', async () => {
  expect(await fetchStarWarsPersonName('1')).toEqual('Luke Skywalker');
  expect(await fetchStarWarsPersonName('2')).toEqual('C-3PO');
});
