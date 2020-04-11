import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { fishShape } from "../shapes";

const Fish = props => {
    const { image, name, price, desc, status } = props.details;
    const isAvailable = status === "available";
    return (
        <li className="menu-fish">
            <img src={image} alt={name} />

            <h3 className="fish-name">
                {name}
                <span className="price">{formatPrice(price)}</span>
            </h3>

            <p className="description">{desc}</p>

            <button
                onClick={() => props.addToOrder(props.fishId)}
                disabled={!isAvailable}
            >
                {isAvailable ? "Add To Order" : "Sold Out"}
            </button>
        </li>
    );
};

Fish.propTypes = {
    addToOrder: PropTypes.func.isRequired,
    details: PropTypes.shape(fishShape).isRequired,
    fishId: PropTypes.string.isRequired
};

export default Fish;
