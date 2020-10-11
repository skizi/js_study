import { NextApiRequest, NextApiResponse } from 'next'

const sleep = (sec) => {
	return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  await this.sleep(1);

  switch (req.method) {
    case 'GET': {
      // データの取得処理
      res.status(200).json({
        status:"success",
  	    users:[
          { name:"yoshida", outline:"よろしくね！" },
          { name:"yamada", outline:"今年は暑い" },
          { name:"suzuki", outline:"今年は寒い" },
          { name:"oota", outline:"来年は暑い" },
        ]
  	  });
      break
    }
    case 'POST': {
      res.status(200).json({
        status:"success",
        name:req.query.name,
        outline:req.query.outline
      })
      break
    }
    case 'PUT': {
      // データの更新処理
      res.status(200).json({
        status:"success",
        name:req.query.name,
        outline:req.query.outline
      })
      break
    }
    case 'DELETE': {
      // データの更新処理
      res.status(200).json({
        status:"success",
      })
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE'])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
    }
  }
}
export default handler