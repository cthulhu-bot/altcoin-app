import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

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
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/bitcoin.png")
                  : require("../assets/images/bitcoin.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={{ flex: 1, flexDirection: "column" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.getStartedText}>
                <Text>Litecoin</Text>
                <Text>
                  {this.state.LTC ? `            ${this.state.LTC} BTC` : ""}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.getStartedText}>
                <Text>Dogecoin</Text>
                <Text>
                  {this.state.DOGE
                    ? `                   ${this.state.DOGE} BTC`
                    : ""}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.getStartedText}>
                <Text>Monero</Text>
                <Text>
                  {this.state.XMR
                    ? `                ${this.state.XMR} BTC`
                    : ""}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4885ed"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedText: {
    fontSize: 24,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "left",
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    width: 360,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "space-between"
  }
});
