import { parseCookies } from 'nookies';
import axios from 'axios';

export default async function LoggedIn(req, res) {
  const myCookie = parseCookies({ req });

  const userAuth = await axios
    .get('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `Bearer ${myCookie.authToken}`,
      },
    })
    .catch((e) => {
      return res.status(401).json({ success: false, error: 'hatta', text: '401' });
    });

  if (userAuth) {
    // const recipes = await axios.get('https://dummyjson.com/recipes?limit=10');

    res.status(200).json({
      name: 'başarılı',
      success: true,
      user: {
        firstName: userAuth.data.firstName,
        lastName: userAuth.data.lastName,
        email: userAuth.data.email,
      },
    });
  } else {
    res.status(401).json({ success: false, error: 'error', statusText: '401' });
  }
}
