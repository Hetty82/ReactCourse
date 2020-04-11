import React, { Component } from "react";
import PropTypes from "prop-types";
import { fishShape } from "../shapes";

class EditFishForm extends Component {
    static propTypes = {
        fish: PropTypes.shape(fishShape).isRequired,
        fishId: PropTypes.string.isRequired,
        deleteFish: PropTypes.func.isRequired,
        updateFish: PropTypes.func.isRequired
    };

    handleChange = event => {
        event.preventDefault();

        const fish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.fishId, fish);
    };

    render() {
        return (
            <div className="fish-edit">
                <input
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.props.fish.name}
                />

                <input
                    type="text"
                    name="price"
                    onChange={this.handleChange}
                    value={this.props.fish.price}
                />

                <select
                    type="text"
                    name="status"
                    onChange={this.handleChange}
                    value={this.props.fish.status}
                >
                    <option onChange={this.handleChange} value="available">
                        Fresh!
                    </option>
                    <option onChange={this.handleChange} value="unavailable">
                        Sold out!
                    </option>
                </select>

                <textarea
                    name="desc"
                    onChange={this.handleChange}
                    value={this.props.fish.desc}
                />

                <input
                    type="text"
                    name="image"
                    onChange={this.handleChange}
                    value={this.props.fish.image}
                />

                <button
                    onClick={() => this.props.deleteFish(this.props.fishId)}
                >
                    Remove Fish
                </button>
            </div>
        );
    }
}

export default EditFishForm;
