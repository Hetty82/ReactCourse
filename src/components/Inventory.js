import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import { fishShape } from "../shapes";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends Component {
    static propTypes = {
        fishes: PropTypes.objectOf(PropTypes.shape(fishShape)).isRequired,
        storeId: PropTypes.string.isRequired,
        addFish: PropTypes.func.isRequired,
        updateFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        loadSampleFishes: PropTypes.func.isRequired
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            // console.log({ user });
            if (user) {
                this.authHandler({ user });
            }
        });
    }
    authHandler = async authData => {
        // 1. lookup current store in firebase
        const store = await base.fetch(this.props.storeId, { context: this });
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect te current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        // console.log(store);
        // console.log(authData);
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
        console.log("logging in with", provider);
    };

    logout = async () => {
        console.log("logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });
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
    render() {
        const logout = <button onClick={this.logout}>Log out!</button>;
        // 1. Check if logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}></Login>;
        }

        // 2. Check if current user is the owner
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>"Hey you don't own me!";</p>
                    {logout}
                </div>
            );
        }

        // 3. Otherwise, render inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.entries(this.props.fishes).map(([key, fish]) => {
                    return (
                        <EditFishForm
                            key={key}
                            fishId={key}
                            fish={fish}
                            deleteFish={this.props.deleteFish}
                            updateFish={this.props.updateFish}
                        />
                    );
                })}

                <AddFishForm addFish={this.props.addFish}></AddFishForm>

                <button onClick={this.props.loadSampleFishes}>
                    Load samples
                </button>
                {logout}
            </div>
        );
    }
}
export default Inventory;
