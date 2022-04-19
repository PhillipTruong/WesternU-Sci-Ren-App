const axios = require('axios').default;

export const getAllEvents = async () => {
  await axios.get('https://uwo-sr-app-server.herokuapp.com/api/data/getAllEvents')
    .then(res => {
      return res.body
    })
    .catch(error => {
      console.error(error);
    });
}