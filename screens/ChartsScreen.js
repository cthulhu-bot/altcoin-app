import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MoneroChart from "../components/MoneroChart";
import DogeChart from "../components/DogeChart";
import LitecoinChart from "../components/LitecoinChart";

export default class ChartsScreen extends React.Component {
  static navigationOptions = {
    title: "BTC Price Charts"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <LitecoinChart />
        <DogeChart />
        <MoneroChart />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
