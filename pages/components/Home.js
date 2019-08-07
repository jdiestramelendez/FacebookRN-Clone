import React, { Component } from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Header";
import AddStatus from "./components/AddStatus";
import Status from "./components/Status";
import Story from "./components/Story";

class Home extends Component {
    render() {
        const photo = require("../src/img/photo.jpeg");
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#30477C"
                    translucent={true}
                />
                <Header componentId={this.props.componentId} />
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <AddStatus photo={photo} />
                    <Story />
                    <View style={styles.lineBorder} />
                    <Status componentId={this.props.componentId}/>
                </ScrollView>
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lineBorder: {
        borderColor: "#DDDDE4",
        borderWidth: 2
    }
});
