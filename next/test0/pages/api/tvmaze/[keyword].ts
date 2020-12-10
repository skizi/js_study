import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.keyword) {
    return res.status(404).end();
  }

  const content = await fetch(`https://api.tvmaze.com/search/shows?q=${req.query.keyword}`)
    .then((res) => res.json())
    .catch((error) => error);

  if (!content) {
    return res.status(400).json({ status: 'error', message: 'Invalid keyword' });
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(content);
};
