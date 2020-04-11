import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
    static propTypes = {
        match: PropTypes.object
    };
    state = {
        fishes: {},
        order: {}
    };

    componentWillMount() {
        console.log("DEPRECATED", this.constructor.name, "will mount");
    }
    componentDidMount() {
        console.log(this.constructor.name, "did mount");

        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(`${params.storeId}:order`);
        if (localStorageRef) {
            const order = JSON.parse(localStorageRef);
            this.setState({ order });
        }

        this.dbRef = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }
    componentDidUpdate() {
        console.log(this.constructor.name, "did update");
        // console.log(this.state.order);
        const { params } = this.props.match;
        localStorage.setItem(
            `${params.storeId}:order`,
            JSON.stringify(this.state.order)
        );
    }
    componentWillUnmount() {
        console.log(this.constructor.name, "will unmount");
        base.removeBinding(this.dbRef);
    }

    addFish = fish => {
        const fishes = {
            ...this.state.fishes,
            [`fish-${Date.now()}`]: fish
        };
        this.setState({ fishes });
    };

    updateFish = (key, fish) => {
        const fishes = {
            ...this.state.fishes,
            [key]: fish
        };
        this.setState({ fishes });
    };

    deleteFish = key => {
        // set to null so firebase alse deletes the value
        const fishes = {
            ...this.state.fishes,
            [key]: null
        };
        this.setState({ fishes });
    };

    addToOrder = key => {
        const order = { ...this.state.order };
        order[key] = order[key] ? order[key] + 1 : 1;
        this.setState({ order });
    };

    removeFromOrder = key => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order });
    };

    loadSampleFishes = () => {
        const fishes = {
            ...this.state.fishes,
            ...sampleFishes
        };
        this.setState({ fishes });
    };

    render() {
        // console.log(this.constructor.name, "rendering");
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                fishId={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>

                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />

                <Inventory
                    addFish={this.addFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    updateFish={this.updateFish}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;
