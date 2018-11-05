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
          padding: 20,
          borderRadius: 10,
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 30
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
          {this.props.LTC ? `${this.props.LTC} BTC` : ""}
        </Text>
      </View>
    );
  }
}
