import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { View, Text, Image } from "react-native";

export default class MoneroChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moneroPrices: [],
      moneroHighLow: {
        high: 0,
        low: 0
      }
    };
  }
  componentDidMount() {
    const thirtyMinutesAgo = Date.now() - 60000;
    fetch(
      `https://min-api.cryptocompare.com/data/histominute?fsym=XMR&tsym=BTC&limit=30&aggregate=3&toTs=${thirtyMinutesAgo}`
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
      <React.Fragment>
        {moneroData.length > 0 ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: "#4885ed",
                paddingLeft: 100,
                borderRadius: 10,
                borderWidth: 0.5
              }}
            >
              <Image
                source={require("../assets/images/monero.png")}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain"
                }}
              />
              <Text
                style={{
                  color: "#ffff",
                  fontSize: 20,
                  paddingBottom: 10,
                  paddingTop: 15,
                  paddingLeft: 30,
                  textAlign: "center"
                }}
              >
                Monero
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 20 }}>
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
      </React.Fragment>
    );
  }
}
