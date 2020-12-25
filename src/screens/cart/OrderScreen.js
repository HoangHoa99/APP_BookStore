import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const labels = [
    "Cart",
    "Delivery Address",
    "Order Summary",
    "Payment Method",
    "Track",
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };
  function onPageChange(position) {
    setCurrentPosition(position);
  }
  return (
    <>
      <StepIndicator
        labels={labels}
        currentPosition={currentPosition}
        // customStyles={customStyles}
        onPress={(number) => onPageChange(number)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
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
