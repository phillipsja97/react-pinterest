import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((result) => {
      const allPinsObj = result.data;
      const pins = [];
      if (allPinsObj != null) {
        Object.keys(allPinsObj).forEach((pinId) => {
          const newPins = allPinsObj[pinId];
          newPins.id = pinId;
          pins.push(newPins);
        });
      }
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export default { getPinsByBoardId, getSinglePin, deletePin };
