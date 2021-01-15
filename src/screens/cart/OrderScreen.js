import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default function OrderScreen({ navigation }) {
  return <View style={{ flex: 1 }}></View>;
}

const buttonTextStyle = {
  color: "#393939",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  footerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 90,
  },
});
