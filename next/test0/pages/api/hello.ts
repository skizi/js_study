import { NextApiRequest, NextApiResponse } from "next";

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

export default async (req: NextApiRequest, res: NextApiResponse): void => {
  await sleep(1);
  const now = new Date().toISOString();
  res.status(200).json({
    date: now,
    message: "Hello",
  });
};
