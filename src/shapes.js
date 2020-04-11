import PropTypes from "prop-types";

export const fishShape = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};
