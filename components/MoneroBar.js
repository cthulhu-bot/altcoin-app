import React from "react";
import { Image, Text, View } from "react-native";

export default class MoneroBar extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          marginLeft: 30,
          marginRight: 30
        }}
      >
        <Image
          source={require("../assets/images/monero.png")}
          style={{
            width: 30,
            height: 30,
            resizeMode: "contain"
          }}
        />
        <Text
          style={{
            color: "rgba(96,100,109, 1)",
            fontSize: 20,
            marginTop: 2
          }}
        >
          Monero
        </Text>
        <Text
          style={{
            color: "rgba(96,100,109, 1)",
            fontSize: 20,
            marginTop: 2
          }}
        >
          {this.props.XMR ? (
            `${this.props.XMR} BTC`
          ) : (
            <Image
              source={require("../assets/images/ajax_loader_blue_32.gif")}
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain"
              }}
            />
          )}
        </Text>
      </View>
    );
  }
}
