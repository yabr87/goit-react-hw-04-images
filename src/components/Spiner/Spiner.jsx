import PropTypes from 'prop-types';
import { RotatingTriangles } from 'react-loader-spinner';

const Spiner = ({ loading }) => {
  return (
    <RotatingTriangles
      visible={loading}
      height="70"
      width="70"
      ariaLabel="rotating-triangels-loading"
      wrapperClass="rotating-triangels-wrapper"
    />
  );
};

Spiner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spiner;
