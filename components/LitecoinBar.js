import React from "react";
import { Image, Text, View } from "react-native";

export default class LitecoinBar extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 20,
          maxHeight: 100
        }}
      >
        <Image
          source={require("../assets/images/litecoin.png")}
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
          Litecoin
        </Text>
        <Text
          style={{
            color: "rgba(96,100,109, 1)",
            fontSize: 20,
            marginTop: 2
          }}
        >
          {this.props.LTC ? (
            `${this.props.LTC} BTC`
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
