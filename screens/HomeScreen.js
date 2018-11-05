import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  Text
} from "react-native";
import LitecoinBar from "../components/LitecoinBar";
import DogeBar from "../components/DogeBar";
import MoneroBar from "../components/MoneroBar";
import LitecoinChart from "../components/LitecoinChart";
import DogeChart from "../components/DogeChart";
import MoneroChart from "../components/MoneroChart";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LTC: 0,
      DOGE: 0,
      XMR: 0,
      modalVisible: false,
      modalType: ""
    };
  }

  static navigationOptions = {
    header: null
  };

  toggleModal(type) {
    this.setState({ modalVisible: !this.state.modalVisible, modalType: type });
  }

  renderModal() {
    switch (this.state.modalType) {
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
      <React.Fragment>
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
          <TouchableHighlight
            style={{
              borderRadius: 10,
              margin: 30
            }}
          >
            <LitecoinBar LTC={this.state.LTC} />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              borderRadius: 10,
              margin: 30
            }}
          >
            <DogeBar
              DOGE={this.state.DOGE}
              onPress={() =>
                this.setState({ modalVisible: true, modalType: "doge" })
              }
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              borderRadius: 10,
              margin: 30
            }}
          >
            <MoneroBar
              XMR={this.state.XMR}
              onPress={() =>
                this.setState({ modalVisible: true, modalType: "xmr" })
              }
            />
          </TouchableHighlight>
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View>{this.renderModal()}</View>
        </Modal>
      </React.Fragment>
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
