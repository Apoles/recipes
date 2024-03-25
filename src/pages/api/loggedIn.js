import { parseCookies } from 'nookies';
import axios from 'axios';

export default async function LoggedIn(req, res) {
  const tokent = req.body.authToken;

  console.log(tokent);

  const userAuth = await axios
    .get('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `Bearer ${tokent}`,
      },
    })
    .catch((e) => {
      console.log(e);
      return res.status(401).json({ success: false, error: 'hatta', text: '401' });
    });

  if (userAuth) {
    res.status(200).json({ name: 'başarılı', success: true, data: userAuth.data });
  } else {
    res.status(401).json({ success: false, error: 'error', statusText: '401' });
  }
}
