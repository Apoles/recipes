import { destroyCookie } from 'nookies';

export default async function handler(req, res) {
  destroyCookie({ res }, 'authToken', { path: '/' });

  res.status(200).end();
}
