import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { View, Text, Image } from "react-native";

export default class DogeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogePrices: [],
      dogeHighLow: {
        high: 0,
        low: 0
      }
    };
  }
  componentDidMount() {
    const thirtyMinutesAgo = Date.now() - 60000;
    fetch(
      `https://min-api.cryptocompare.com/data/histominute?fsym=DOGE&tsym=BTC&limit=30&aggregate=3&toTs=${thirtyMinutesAgo}`
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
  }

  render() {
    const dogeData =
      this.state.dogePrices.length > 0
        ? this.state.dogePrices.map(({ x, y }) => {
            return {
              date: x,
              dogePrice: y
            };
          })
        : [];

    return (
      <React.Fragment>
        {dogeData.length > 0 ? (
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
                source={require("../assets/images/doge.png")}
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
                Dogecoin
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingTop: 20,
                justifyContent: "space-between"
              }}
            >
              <Text style={{ paddingLeft: 20, color: "green" }}>
                High: {this.state.dogeHighLow.high}
              </Text>
              <Text style={{ color: "red" }}>
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
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "space-around",
              alignItems: "center",
              padding: 20
            }}
          >
            <Image
              source={require("../assets/images/ajax_loader_blue_32.gif")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain"
              }}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}
