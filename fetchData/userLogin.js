const axios = require('axios');

export default async function GetUser() {
  await axios
    .get('https://dummyjson.com/users')
    .then(function (response) {
      console.log('response', response);

      return response;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
}
