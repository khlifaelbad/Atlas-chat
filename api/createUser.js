import axios from 'axios';

const createUser = async (req, res) => {
  const { userId, userName } = req.body;

  axios
    .post('https://api.chatengine.io/projects/people/',
      { username: userName, secret: userId },
      { headers: { 'Private-Key':'e4e31b91-7c68-4c0d-a835-47ddd96096cc'}},
    )
    .then(apiRes => {
      res.json({
        body: apiRes.data, 
        error: null,
      });
    })
    .catch(() => {
      
      res.json({
        body: null,
        error: 'There was an error creating the user',
      });
    });
};

export default createUser;
