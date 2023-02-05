import PropTypes from 'prop-types';
import Button from 'components/Button';

const Loading = ({ onBtnClick }) => {
  return <Button type="button" text="load more" onBtnClick={onBtnClick} />;
};

Loading.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};

export default Loading;
