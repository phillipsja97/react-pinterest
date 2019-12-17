import React from 'react';
import PropTypes from 'prop-types';
import boardData from '../../helpers/data/boardData';
import authData from '../../helpers/data/authData';
import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((error) => console.error(error));
  }


  addBoard = (newBoard) => {
    boardData.saveBoard(newBoard)
      .then(() => {
        this.getBoards();
      })
      .catch((errorFromSaveBoard) => console.error(errorFromSaveBoard));
  }

  render() {
    const { setSingleBoard, addBoard } = this.props;
    return (
    <div className="d-flex flex-wrap justify-content-center">
      <BoardForm addBoard={this.addBoard}/>
      {this.state.boards.map((board) => (<Board key={board.id} board={board} setSingleBoard={setSingleBoard} />))}
    </div>
    );
  }
}

export default BoardsContainer;
