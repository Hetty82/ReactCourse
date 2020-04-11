import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { formatPrice } from "../helpers";
import { fishShape } from "../shapes";

class Order extends Component {
    static propTypes = {
        fishes: PropTypes.objectOf(PropTypes.shape(fishShape)).isRequired,
        order: PropTypes.objectOf(PropTypes.number).isRequired,
        removeFromOrder: PropTypes.func.isRequired
    };
    // componentWillMount() {
    //     console.log("DEPRECATED", this.constructor.name, "will mount");
    // }
    // componentDidMount() {
    //     console.log(this.constructor.name, "did mount");
    // }
    // componentDidUpdate() {
    //     console.log(this.constructor.name, "did update");
    // }
    // componentWillUnmount() {
    //     console.log(this.constructor.name, "will unmount");
    // }

    renderItem = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        };

        if (!fish) return null;
        const removeButton = (
            <button onClick={() => this.props.removeFromOrder(key)}>
                &times;
            </button>
        );
        const isAvailable = fish.status === "available";

        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry {fish ? fish.name : "fish"} is no longer available
                        {removeButton}
                    </li>
                </CSSTransition>
            );
        }

        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lsb {fish.name}({formatPrice(count * fish.price)})
                        {removeButton}
                    </span>
                </li>
            </CSSTransition>
        );
    };
    render() {
        // console.log(this.constructor.name, "rendering");

        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === "available";
            if (isAvailable) {
                return prevTotal + count * fish.price;
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>

                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderItem)}
                </TransitionGroup>

                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;
