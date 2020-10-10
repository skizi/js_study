import { NextApiRequest, NextApiResponse } from 'next'

const sleep = (sec) => {
	return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

let users = [
  { name:"yoshida", outline:"よろしくね！", id:0 },
  { name:"yamada", outline:"今年は暑い", id:1 },
  { name:"suzuki", outline:"今年は寒い", id:2 },
  { name:"oota", outline:"来年は暑い", id:3 },
];
let idCount = 3;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  await sleep(1);

  switch (req.method) {

    case 'GET': {
      res.status(200).json({
        status:"success",
  	    users:users
  	  });
      break
    }
    case 'POST': {
      idCount += 1;
      let user = {
        name:req.body.params.name,
        outline:req.body.params.outline,
        id:idCount
      };
      users.push(user);
      res.status(200).json({
        status:"success",
        name:user.name,
        outline:user.outline,
        id:user.id
      })
      break
    }
    case 'PUT': {
      const { name, outline, id } = req.body.params;
      users = users.map((item, i)=>{
        if( item.id === id ){
          item.name = name;
          item.outline = outline;
        }
        return item;
      });
      res.status(200).json({
        status:"success",
        name:name,
        outline:outline,
        id:id
      })
      break
    }
    case 'DELETE': {
      const id = req.query.id;
      users = users.filter((item, i)=>{
        return item.id != id;
      });
      res.status(200).json({
        status:"success",
        outline:"delete user id:" + id
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