import React from 'react';
import PropTypes from 'prop-types';
import Pins from '../Pins/Pins';
import boardData from '../../helpers/data/boardData';
import pinsData from '../../helpers/data/pinsData';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  getPinData = (selectedBoardId) => {
    pinsData.getPinsByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((errorFromGetPins) => console.error({ errorFromGetPins }));
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromSingleBoard) => console.error(errorFromSingleBoard));
  }

  addPin = (newPin) => {
    pinsData.savePin(newPin)
      .then(() => {
        this.getPinData(this.props.selectedBoardId);
      })
      .catch((errorFromAddPin) => console.error(errorFromAddPin));
  }

  deleteSinglePin = (pinId) => {
    const { selectedBoardId } = this.props;
    pinsData.deletePin(pinId)
      .then(() => {
        this.getPinData(selectedBoardId)
      })
      .catch((errorFromDeletePin) => console.error({ errorFromDeletePin }));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  render() {
    const { board, pins } = this.state;
    const { selectedBoardId } = this.props;
    return (
      <div>
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
            <PinForm addPin={this.addPin} selectedBoardId={selectedBoardId} />
          <div className="d-flex flex-wrap">
            { pins.map((pin) => <Pins pin={pin} deleteSinglePin={this.deleteSinglePin} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
