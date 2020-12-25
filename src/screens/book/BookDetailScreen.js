import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Alert,
} from "react-native";
import { FONTS, COLORS, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../../context/AppContext";

export default function BookDetailScreen({ route, navigation }) {
  const addToCartContext = useContext(AppContext);

  const addToCart = async (book) => {
    try {
      const cartList = await AsyncStorage.getItem("@cartList");
      let res = cartList != null ? JSON.parse(cartList) : [];
      const itemCopy = res.find((item) => item.itemId === book._id);
      if (itemCopy) {
        itemCopy.qty += 1;
      } else {
        let item = {
          itemId: book._id,
          name: book.title,
          thumbnailImage: book.images,
          color: "",
          qty: 1,
          salePrice: book.price,
          checked: 1,
        };
        res.push(item);
      }

      AsyncStorage.setItem("@cartList", JSON.stringify(res));
      addToCartContext.addItemToCart();
      Alert.alert("Success!", "Add " + book.title + " to your cart");
    } catch (e) {}
  };

  const [book, setBook] = React.useState(null);
  const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(
    0
  );

  const indicator = new Animated.Value(0);

  React.useEffect(() => {
    let { book } = route.params;
    setBook(book);
  }, [book]);

  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <ImageBackground
          source={{ uri: book.images }}
          resizeMode="contain"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 65,
            left: 0,
          }}
        />

        {/* Book Name and Author */}
        <View
          style={{
            flex: 1.8,
            top: 230,
            right: 0,
            bottom: 0,
            left: 20,
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            {book.title}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.white,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            {book.author}
          </Text>
        </View>
      </View>
    );
  }

  function renderBookDescription() {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const difference =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;

    return (
      <View style={{ flex: 1, flexDirection: "row", padding: SIZES.padding }}>
        {/* Custom Scrollbar */}
        <View
          style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}
        >
          <Animated.View
            style={{
              width: 4,
              height: indicatorSize,
              backgroundColor: COLORS.lightGray4,
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />
        </View>

        {/* Description */}
        <ScrollView
          contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) => {
            setScrollViewWholeHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: { x, y, width, height },
            },
          }) => {
            setScrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: indicator } } }],
            { useNativeDriver: false }
          )}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              marginBottom: SIZES.padding,
            }}
          >
            Description
          </Text>
          <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>
            {book.description}
          </Text>
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Price */}
        <View
          style={{
            width: 60,
            backgroundColor: COLORS.secondary,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.white }}>{book.price} $</Text>
        </View>

        {/* Add to cart */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => addToCart(book)}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Book Cover Section */}
        <View style={{ flex: 4 }}>{renderBookInfoSection()}</View>

        {/* Description */}
        <View style={{ flex: 2 }}>{renderBookDescription()}</View>

        {/* Buttons */}
        <View style={{ height: 70, marginBottom: 10 }}>
          {renderBottomButton()}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
}
