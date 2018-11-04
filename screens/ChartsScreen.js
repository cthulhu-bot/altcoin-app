import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { View, Text } from "react-native";

export default class ChartsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ltcPrices: [],
      ltcHighLow: {
        high: 0,
        low: 0
      },
      dogePrices: [],
      dogeHighLow: {
        high: 0,
        low: 0
      },
      moneroPrices: [],
      moneroHighLow: {
        high: 0,
        low: 0
      }
    };
  }

  static navigationOptions = {
    title: "BTC Price Charts"
  };

  componentDidMount() {
    // https://min-api.cryptocompare.com/data/histohour?fsym=LTC&tsym=BTC&limit=24&aggregate=3&e=Kraken
    // https://min-api.cryptocompare.com/data/histohour?fsym=LTC&tsym=BTC&limit=24&aggregate=3&e=Kraken
    // https://min-api.cryptocompare.com/data/histohour?fsym=LTC&tsym=BTC&limit=24&aggregate=3&e=Kraken
    fetch(
      "https://min-api.cryptocompare.com/data/histohour?fsym=LTC&tsym=BTC&limit=24&aggregate=3&e=Kraken"
    )
      .then(response => response.json())
      .then(result => {
        let ltcHigh = 0;
        let ltcLow = 0;
        const parsedResult = result.Data.map(timeslice => {
          ltcHigh = timeslice.high > ltcHigh ? timeslice.high : ltcHigh;
          ltcLow = timeslice.low < ltcLow ? timeslice.low : ltcLow;
          return {
            x: new Date(timeslice.time * 1000),
            y: timeslice.close
          };
        });
        this.setState({
          ltcPrices: parsedResult,
          ltcHighLow: { high: ltcHigh, low: ltcLow }
        });
      });
    fetch(
      "https://min-api.cryptocompare.com/data/histohour?fsym=DOGE&tsym=BTC&limit=24&aggregate=3&e=Kraken"
    )
      .then(response => response.json())
      .then(result => {
        let dogeHigh = 0;
        let dogeLow = 0;
        const parsedResult = result.Data.map(timeslice => {
          dogeHigh = timeslice.high > dogeHigh ? timeslice.high : dogeHigh;
          dogeLow = timeslice.low < dogeLow ? timeslice.low : dogeLow;
          return {
            x: new Date(timeslice.time * 1000),
            y: timeslice.close
          };
        });
        this.setState({
          dogePrices: parsedResult,
          dogeHighLow: { high: dogeHigh, low: dogeLow }
        });
      });
    fetch(
      "https://min-api.cryptocompare.com/data/histohour?fsym=XMR&tsym=BTC&limit=24&aggregate=3&e=Kraken"
    )
      .then(response => response.json())
      .then(result => {
        let xmrHigh = 0;
        let xmrLow = 0;
        const parsedResult = result.Data.map(timeslice => {
          xmrHigh = timeslice.high > xmrHigh ? timeslice.high : xmrHigh;
          xmrLow = timeslice.low < xmrLow ? timeslice.low : xmrLow;
          return {
            x: new Date(timeslice.time * 1000),
            y: timeslice.close
          };
        });
        this.setState({
          moneroPrices: parsedResult,
          moneroHighLow: { high: xmrHigh, low: xmrLow }
        });
      });
  }

  render() {
    const ltcData =
      this.state.ltcPrices.length > 0
        ? this.state.ltcPrices.map(({ x, y }) => {
            return {
              date: x,
              litecoinPrice: y
            };
          })
        : [];
    const dogeData =
      this.state.dogePrices.length > 0
        ? this.state.dogePrices.map(({ x, y }) => {
            return {
              date: x,
              dogePrice: y
            };
          })
        : [];
    const moneroData =
      this.state.moneroPrices.length > 0
        ? this.state.moneroPrices.map(({ x, y }) => {
            return {
              date: x,
              moneroPrice: y
            };
          })
        : [];

    return (
      <ScrollView style={styles.container}>
        {ltcData.length > 0 ? (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>Litecoin</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ paddingLeft: 20, color: "green" }}>
                High: {this.state.ltcHighLow.high}
              </Text>
              <Text style={{ paddingLeft: 200, color: "red" }}>
                Low: {this.state.ltcHighLow.low}
              </Text>
            </View>
            <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={ltcData}
                x="date"
                y="litecoinPrice"
              />
            </VictoryChart>
          </View>
        ) : (
          <VictoryChart />
        )}
        {dogeData.length > 0 ? (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>Dogecoin</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ paddingLeft: 20, color: "green" }}>
                High: {this.state.dogeHighLow.high}
              </Text>
              <Text style={{ paddingLeft: 200, color: "red" }}>
                Low: {this.state.dogeHighLow.low}
              </Text>
            </View>
            <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={dogeData}
                x="date"
                y="dogePrice"
              />
            </VictoryChart>
          </View>
        ) : (
          <VictoryChart />
        )}
        {moneroData.length > 0 ? (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>Monero</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ paddingLeft: 20, color: "green" }}>
                High: {this.state.moneroHighLow.high}
              </Text>
              <Text style={{ paddingLeft: 200, color: "red" }}>
                Low: {this.state.moneroHighLow.low}
              </Text>
            </View>
            <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={moneroData}
                x="date"
                y="moneroPrice"
              />
            </VictoryChart>
          </View>
        ) : (
          <VictoryChart />
        )}
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
