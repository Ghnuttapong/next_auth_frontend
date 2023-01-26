import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((response) => res.status(200).send(response))
        .catch((err) => console.log(err));
      break;

    default:
      res.setHeader("Allow", ["GET"], ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  // const body = req.body;
  // console.log('body: ', body)
}
