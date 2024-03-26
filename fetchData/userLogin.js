const axios = require('axios');

export default async function GetUser() {
  await axios
    .get('https://dummyjson.com/users')
    .then(function (response) {
      return response;
    })
    .catch(function (error) {})
    .finally(function () {});
}
