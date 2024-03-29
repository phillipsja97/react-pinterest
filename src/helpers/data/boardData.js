import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allBoardsObj = result.data;
      const boards = [];
      if (allBoardsObj != null) {
        Object.keys(allBoardsObj).forEach((boardId) => {
          const newBoard = allBoardsObj[boardId];
          newBoard.id = boardId;
          boards.push(newBoard);
        });
      }
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const saveBoard = (boardInfo) => axios.post(`${baseUrl}/boards.json`, boardInfo);

const updateBoard = (boardId, newBoardInfo) => axios.put(`${baseUrl}/boards/${boardId}.json`, newBoardInfo);

export default {
  getBoardsByUid,
  getSingleBoard,
  saveBoard,
  updateBoard,
};
