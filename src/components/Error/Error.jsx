import PropTypes from 'prop-types';

export default function Error({ message }) {
  return (
    <div>{/* <p>Sorry, something went wrong. Error: {message}</p> */}</div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
