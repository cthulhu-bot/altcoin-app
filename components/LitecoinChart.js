import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { View, Text, Image } from "react-native";

export default class LitecoinChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ltcPrices: [],
      ltcHighLow: {
        high: 0,
        low: 0
      }
    };
  }
  componentDidMount() {
    const thirtyMinutesAgo = Date.now() - 60000;
    fetch(
      `https://min-api.cryptocompare.com/data/histominute?fsym=LTC&tsym=BTC&limit=30&aggregate=3&toTs=${thirtyMinutesAgo}`
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

    return (
      <React.Fragment>
        {ltcData.length > 0 ? (
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
                source={require("../assets/images/litecoin.png")}
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
                Litecoin
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
                High: {this.state.ltcHighLow.high}
              </Text>
              <Text style={{ color: "red" }}>
                Low: {this.state.ltcHighLow.low}
              </Text>
            </View>
            <VictoryChart
              padding={{ left: 60, top: 50, right: 45, bottom: 50 }}
              theme={VictoryTheme.material}
              scale={{ x: "time" }}
            >
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={ltcData}
                x="date"
                y="litecoinPrice"
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
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
