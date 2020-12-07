function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

export default async (req, res) => {
  await sleep(1);
  const now = new Date().toISOString();
  res.status(200).json({
    date: now,
    message: 'Hello',
  });
};
