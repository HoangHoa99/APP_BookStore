import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
//API
import { GetBookAsync, BooksByCateAsync } from "../../services/BookService";
// import Carousel from "react-native-snap-carousel";

// import Product from "../../constants/Product";
import { ScrollView } from "react-native-gesture-handler";

// CONSTANTS

export default function BookListScreen({ navigation }) {
  const [vanHoc, setVanHoc] = React.useState([]);
  const [tamLy, setTamLy] = React.useState([]);
  const [tieuSu, setTieuSu] = React.useState([]);
  const [ngoaiNgu, setNgoaiNgu] = React.useState([]);
  const [kinhTe, setKinhTe] = React.useState([]);
  const [thieuNhi, setThieuNhi] = React.useState([]);
  const [hotBooks, setHotBooks] = React.useState([]);
  const [newBooks, setNewBooks] = React.useState([]);

  const cateLists = [
    {
      _id: "5f789d047c17be338c676ef5",
      name: "Văn học",
      __v: 0,
    },
    {
      _id: "5f789d147c17be338c676ef6",
      name: "Sách thiếu nhi",
      __v: 0,
    },
    {
      _id: "5f789d1d7c17be338c676ef7",
      name: "Kinh tế",
      __v: 0,
    },
    {
      _id: "5f789d427c17be338c676ef8",
      name: "Tiểu sử-hồi ký",
      __v: 0,
    },
    {
      _id: "5f789d757c17be338c676ef9",
      name: "Tâm lý",
      __v: 0,
    },
    {
      _id: "5f789d7d7c17be338c676efa",
      name: "Ngoại ngữ",
      __v: 0,
    },
  ];

  // const carouselItems = [
  //   {
  //     title: "Slide 1",
  //     images: "../../assets/slide1.png",
  //   },
  //   {
  //     title: "Slide 2",
  //     images: "../../assets/slide2.png",
  //   },
  //   {
  //     title: "Slide 3",
  //     images: "../../assets/3.png",
  //   },
  // ];

  React.useEffect(() => {
    const getBookLists = async () => {
      GetBookAsync().then((res) => {
        setNewBooks(res.newBook);
      });
    };

    const getTieuSu = async () => {
      BooksByCateAsync(cateLists[3]._id).then((res) => {
        setTieuSu(res.data);
      });
    };

    const getTamLy = async () => {
      BooksByCateAsync(cateLists[4]._id).then((res) => {
        setTamLy(res.data);
      });
    };

    const getNgoaiNgu = async () => {
      BooksByCateAsync(cateLists[5]._id).then((res) => {
        setNgoaiNgu(res.data);
      });
    };

    const getVanHoc = async () => {
      BooksByCateAsync(cateLists[0]._id).then((res) => {
        setVanHoc(res.data);
      });
    };

    const getThieuNhi = async () => {
      BooksByCateAsync(cateLists[1]._id).then((res) => {
        setThieuNhi(res.data);
      });
    };

    const getKinhTe = async () => {
      BooksByCateAsync(cateLists[2]._id).then((res) => {
        setKinhTe(res.data);
      });
    };

    getBookLists();
    getTamLy();
    getTieuSu();
    getNgoaiNgu();
    getVanHoc();
    getThieuNhi();
    getKinhTe();
  }, []);

  // function _renderItem({ item, index }) {
  //   return (
  //     // <View
  //     //   style={{
  //     //     backgroundColor: "floralwhite",
  //     //     borderRadius: 5,
  //     //   }}
  //     // >
  //     //   <Text style={{ fontSize: 30 }}>{item.title}</Text>
  //     //   <Text>{item.images}</Text>
  //     // </View>
  //     //<a href='https://www.freepik.com/vectors/school'>School vector created by pch.vector - www.freepik.com</a>
  //     <Image
  //       source={{
  //         uri:
  //           "https://cdn.pixabay.com/photo/2017/09/26/19/56/discount-2789863_1280.png",
  //       }}
  //       width={200}
  //       height={150}
  //     />
  //   );
  // }

  return (
    <>
      {/* <Carousel
        layout={"default"}
        // ref={(ref) => (this.carousel = ref)}
        data={carouselItems}
        sliderWidth={windowWidth}
        itemWidth={windowWidth - 20}
        renderItem={_renderItem}
        // onSnapToItem={(index) => this.setState({ activeIndex: index })}
      /> */}
      {/* banner */}
      <ScrollView
        style={{ flexDirection: "column" }}
        showsVerticalScrollIndicator={false}
      >
        {/* new */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              fontSize: 18,
              color: "#4f4a4a",
            }}
          >
            New Book
          </Text>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: "#f11",
            }}
          ></View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          tyle={styles.list}
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          numColumns={1}
          data={newBooks}
          renderItem={({ item }) => (
            <Book item={item} navigation={navigation} />
          )}
        />
        {/* tieu su */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              fontSize: 18,
              color: "#4f4a4a",
            }}
          >
            {cateLists[3].name}
          </Text>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: "#000",
            }}
          ></View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          tyle={styles.list}
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          numColumns={1}
          data={tieuSu}
          renderItem={({ item }) => (
            <Book item={item} navigation={navigation} />
          )}
        />
        {/* tam ly */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              fontSize: 18,
              color: "#4f4a4a",
            }}
          >
            {cateLists[4].name}
          </Text>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: "#000",
            }}
          ></View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          tyle={styles.list}
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          numColumns={1}
          data={tamLy}
          renderItem={({ item }) => (
            <Book item={item} navigation={navigation} />
          )}
        />
        {/* van hoc */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              fontSize: 18,
              color: "#4f4a4a",
            }}
          >
            {cateLists[0].name}
          </Text>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: "#000",
            }}
          ></View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          tyle={styles.list}
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          numColumns={1}
          data={vanHoc}
          renderItem={({ item }) => (
            <Book item={item} navigation={navigation} />
          )}
        />
        {/* thieu nhi */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              fontSize: 18,
              color: "#4f4a4a",
            }}
          >
            {cateLists[1].name}
          </Text>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: "#000",
            }}
          ></View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          tyle={styles.list}
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          numColumns={1}
          data={thieuNhi}
          renderItem={({ item }) => (
            <Book item={item} navigation={navigation} />
          )}
        />
        {/* kinh te */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              fontSize: 18,
              color: "#4f4a4a",
            }}
          >
            {cateLists[2].name}
          </Text>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: "#000",
            }}
          ></View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          tyle={styles.list}
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          numColumns={1}
          data={kinhTe}
          renderItem={({ item }) => (
            <Book item={item} navigation={navigation} />
          )}
        />
        {/* ngoai ngu */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              fontSize: 18,
              color: "#4f4a4a",
            }}
          >
            {cateLists[5].name}
          </Text>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: "#000",
            }}
          ></View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          tyle={styles.list}
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          numColumns={1}
          data={ngoaiNgu}
          renderItem={({ item }) => (
            <Book item={item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </>
  );
}

// function Book({ item, navigation }) {
//   return (
//     <>
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => {
//           navigation.navigate("BookDetailScreen", {
//             book: item,
//           });
//         }}
//       >
//         <Image
//           style={styles.bookImage}
//           source={{
//             uri: item.images,
//           }}
//         />
//         <View style={styles.cardFooter}>
//           <View>
//             <Text
//               style={{
//                 fontWeight: "500",
//                 fontSize: 18,
//                 width: 130,
//                 height: 40,
//               }}
//             >
//               {item.title}
//             </Text>
//             <Text
//               style={{
//                 fontStyle: "italic",
//                 marginTop: 0,
//                 width: 130,
//                 height: 30,
//               }}
//             >
//               {item.author}
//             </Text>
//             <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 2 }}>
//               {item.price} $
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </>
//   );
// }

function Book({ item, navigation }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BookDetailScreen", {
            book: item,
          });
        }}
        style={{
          marginTop: 15,
          backgroundColor: "#FFF",
          height: 260,
          width: 175,
          elevation: 2,
          borderRadius: 8,
          padding: 15,
          marginRight: 8,
          marginLeft: 2,
          marginBottom: 5,
        }}
      >
        <Image
          source={{ uri: item.images }}
          style={{
            marginLeft: 12,
            width: 120,
            height: 170,
            borderRadius: 8,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontWeight: "bold",
              color: "#4f4a4a",
              fontSize: 12,
            }}
          >
            {item.title}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 9,
            color: "#4f4a4a",
            fontFamily: "Regular",
          }}
        >
          {item.author}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.price} $
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 1,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7.49,
    elevation: 3,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: "40%",
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  bookImage: {
    marginTop: 15,
    height: 140,
    width: 120,
    alignSelf: "center",
    borderColor: "#DCDCDC",
    borderWidth: 3,
  },
  name: {
    fontSize: 10,
    flex: 1,
    alignSelf: "center",
    color: "#008080",
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  icon: {
    height: 20,
    width: 20,
  },
  tinyLogo: {
    width: 120,
    height: 160,
  },
});
