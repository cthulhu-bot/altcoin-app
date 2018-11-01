import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ETH: 0,
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
    // eth: https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=BTC
    // doge: https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=BTC
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
              <Text
                style={styles.getStartedText}
                onPress={() => console.log("BTC")}
              >
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
              <Text
                style={styles.getStartedText}
                onPress={() => console.log("DOGE")}
              >
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
              <Text
                style={styles.getStartedText}
                onPress={() => console.log("XMR")}
              >
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
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
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
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
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
    overflow: "hidden"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
