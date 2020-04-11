import React, { Component } from "react";
import PropTypes from "prop-types";

class AddFishForm extends Component {
    static propTypes = {
        addFish: PropTypes.func.isRequired
    };
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    createFish = event => {
        event.preventDefault();

        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        };
        this.props.addFish(fish);
        event.currentTarget.reset();
    };

    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input
                    type="text"
                    ref={this.nameRef}
                    name="name"
                    placeholder="Name"
                />

                <input
                    type="text"
                    ref={this.priceRef}
                    name="price"
                    placeholder="Price"
                />

                <select type="text" ref={this.statusRef} name="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>

                <textarea ref={this.descRef} name="desc" placeholder="Desc" />

                <input
                    ref={this.imageRef}
                    type="text"
                    name="image"
                    placeholder="Image"
                />
                <button type="submit">+ Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;
