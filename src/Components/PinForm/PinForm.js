import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    addPin: PropTypes.func,
    selectedBoardId: PropTypes.string,
  }

  state = {
    pinTitle: '',
    imageUrl: '',
  }

  savePinEvent = (e) => {
    const { addPin, selectedBoardId } = this.props;
    e.preventDefault();
    const newPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.imageUrl,
      uid: authData.getUid(),
      boardId: selectedBoardId,
    };
    // actually save the object
    addPin(newPin);
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  pinImageChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  render() {
    // const { pinTitle, pinImageUrl } = this.state;

    return (
      <form className='col-6 offset-3 PinForm'>
      <div className="form-group">
        <label htmlFor="pin-title">Pin Name:</label>
        <input
          type="text"
          className="form-control"
          id="pin-title"
          placeholder="Enter Pin name"
          value={this.state.pinTitle}
          onChange={this.titleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pin-image-url">Pin Image Url:</label>
        <input
          type="text"
          className="form-control"
          id="pin-image-url"
          placeholder="Enter pin description"
          value={this.state.imageUrl}
          onChange={this.pinImageChange}
        />
      </div>
      <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>
    </form>
    );
  }
}

export default PinForm;
