import PropTypes from 'prop-types';

export const storeItem = PropTypes.shape({
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    delete: PropTypes.string,
  }),
 ),
  details: PropTypes.string,
  sizes: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  costPerItem: PropTypes.number,
  link: PropTypes.string,
  fontSize: PropTypes.number
});