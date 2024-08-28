// pages/api/autocomplete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import localities from '../../data/localities.json';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  const filteredLocalities = localities.filter(locality =>
    locality.localityName.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json(filteredLocalities);
};

export default handler;
