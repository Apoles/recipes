import axios from 'axios';

import { setCookie } from 'nookies';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { myEmail, myPassword } = req.body;

    const currentUser = await axios.get(`https://dummyjson.com/users/search?q=${myEmail}`);

    if (currentUser.data.users.length == 0) {
      console.log('+++++++++++++++++++++++++++');
      return res.status(401).json({ success: false, message: 'Kullanici bulunamadi  ' });
    }

    if (currentUser.data.users[0].password == myPassword) {
      console.log('ife girdi');
      const userToken = await axios
        .post(
          'https://dummyjson.com/auth/login',
          {
            username: currentUser.data.users[0].username,
            password: myPassword,
            // expiresInMins: 60, // optional
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        .catch((error) => {
          res.status(401).json({ success: false, message: 'invalid credential ' });
        });

      const token = userToken.data.token;

      setCookie({ res }, 'authToken', token, {
        maxAge: 3600, // Cookie geçerlilik süresi, örneğin 3600 saniye (1 saat)
        path: '/', // Cookie'nin geçerli olduğu yol
        sameSite: 'strict', // CSRF koruması için 'strict' olarak ayarlanabilir
        httpOnly: true, // JavaScript tarafından erişilememesini sağlar
      });

      /*   const userAuth = await axios
        .get('https://dummyjson.com/auth/me', {
          headers: {
            Authorization: `Bearer ${userToken.data.token}`,
          },
        })

        .catch((error) => {
          res.status(401).json({ success: false, message: 'invalid  token ' });
        });

      console.log(userAuth, ')asdasd userAuth');*/

      res.status(200).json({ success: true, message: 'giriş başarılı ' });
    } else {
      res.status(401).json({ success: false, message: 'Password incorrect ' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Yalnızca POST istekleri desteklenmektedir' });
  }
}
