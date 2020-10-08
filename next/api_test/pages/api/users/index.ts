import { NextApiRequest, NextApiResponse } from 'next'

const sleep = (sec) => {
	return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  await sleep(1);

  switch (req.method) {

    case 'GET': {
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
        name:req.body.params.name,
        outline:req.body.params.outline
      })
      break
    }
    case 'PUT': {
      res.status(200).json({
        status:"success",
        name:req.body.params.name,
        outline:req.body.params.outline
      })
      break
    }
    case 'DELETE': {
      res.status(200).json({
        status:"success",
        outline:"delete user id:" + req.query.id
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