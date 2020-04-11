import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    componentWillMount() {
        console.log("DEPRECATED", this.constructor.name, "will mount");
    }
    componentDidMount() {
        console.log(this.constructor.name, "did mount");
    }
    componentDidUpdate() {
        console.log(this.constructor.name, "did update");
    }
    componentWillUnmount() {
        console.log(this.constructor.name, "will unmount");
    }
    storeInput = React.createRef();
    goToStore = event => {
        // 1. prevent reload
        event.preventDefault();
        // 2. get text from unput
        const storeName = this.storeInput.current.value;
        // 3. change page to /store/...
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        // console.log(this);
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input
                    type="text"
                    ref={this.storeInput}
                    required
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                />
                <button type="submit">Visit Store →</button>
            </form>
        );
    }
}

export default StorePicker;
