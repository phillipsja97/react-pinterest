import PropTypes from 'prop-types';

const pinShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { pinShape };
