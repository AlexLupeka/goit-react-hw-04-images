import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export default function Button({ onClick }) {
  const loadMore = () => {
    onClick();
  };

  return (
    <ButtonLoadMore onClick={loadMore} type="button">
      Load more
    </ButtonLoadMore>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
