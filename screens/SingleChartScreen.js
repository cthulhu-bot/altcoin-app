import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MoneroChart from "../components/MoneroChart";
import DogeChart from "../components/DogeChart";
import LitecoinChart from "../components/LitecoinChart";

export default class ChartsScreen extends React.Component {
  static navigationOptions = {
    title: "Price Chart"
  };

  findChart() {
    switch (this.props.chartName) {
      case "litecoin":
        return <LitecoinChart />;
      case "doge":
        return <DogeChart />;
      case "monero":
        return <MoneroChart />;
      default:
        return <View />;
    }
  }
  render() {
    return <ScrollView style={styles.container}>{this.findChart()}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
