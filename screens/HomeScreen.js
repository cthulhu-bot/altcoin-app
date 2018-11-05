import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import LitecoinBar from "../components/LitecoinBar";
import DogeBar from "../components/DogeBar";
import MoneroBar from "../components/MoneroBar";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LTC: 0,
      DOGE: 0,
      XMR: 0
    };
  }

  static navigationOptions = {
    header: null
  };

  fetchPrices(symbols) {
    symbols.forEach(symbol => {
      const baseUrl = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=BTC`;
      fetch(baseUrl)
        .then(result => result.json())
        .then(response => {
          this.setState({ [symbol]: response.BTC });
        });
    });
  }

  componentDidMount() {
    // litecoin: https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=BTC
    // dogecoin: https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=BTC
    // monero: https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=BTC
    this.fetchPrices(["LTC", "DOGE", "XMR"]);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.viewportContainer}>
          <Image
            source={require("../assets/images/bitcoin.png")}
            style={styles.btcImage}
          />
        </View>
        <LitecoinBar LTC={this.state.LTC} />
        <DogeBar DOGE={this.state.DOGE} />
        <MoneroBar XMR={this.state.XMR} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4885ed"
  },
  contentContainer: {
    paddingTop: 30
  },
  viewportContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40
  },
  btcImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  }
});
