import * as React from "react";
import { useEffect, useState } from "react";
import { trunk, useStore } from "../store";
import { observer } from "mobx-react-lite";
import { ActivityIndicator, FlatList, ImageStyle, SafeAreaView, Text, TextStyle, View, ViewStyle } from "react-native";
import ImageModal from "../component/ImageModal";
import { ImageItemType } from "../store/ImagesStore";
import { Notification } from "../component/Notification";
import { SCREEN_HEIGHT } from "../utils/consts";
import { $center } from "../utils/style";

type MainScreenProps = {};

const keyExtractor = (item: ImageItemType) => item.id;

const renderItem = ({ item: { url, id } }: { item: ImageItemType }) => (
  <ImageModal
    id={id}
    style={$imageModal}
    source={{ uri: url }} />
);

const ListEmptyComponent = () => (
  <View style={$emptyContainer}>
    <Text style={$text}>Нет данных</Text>
  </View>
);

export const MainScreen = observer(({}: MainScreenProps) => {
  const { images } = useStore();
  
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const init = async () => {
      await trunk.init();
      await images.create();
      setLoading(false);
    };
    init();
  }, []);
  
  const onRefresh = () => {
    setRefresh(true);
    images.create().then(() => setRefresh(false));
  };
  
  
  const onEndReached = () => {
    setRefresh(true);
    images.newPage().then(() => setRefresh(false));
  };
  
  if (loading)
    return (
      <View style={$loaderContainer}>
        <ActivityIndicator size="large" color={"#dabc2d"} />
      </View>
    );
  
  return (
    <SafeAreaView style={$container}>
      <Notification />
      <FlatList
        ListEmptyComponent={ListEmptyComponent}
        refreshing={refresh}
        onRefresh={onRefresh}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        data={images.items}
        numColumns={3}
        renderItem={renderItem} />
    </SafeAreaView>
  );
});

const $container: ViewStyle = {
  backgroundColor: "#303030",
  position: "relative",
  flex: 1
};
const $text: TextStyle = {
  color: "white",
  fontSize: 24
};

const $loaderContainer: ViewStyle = {
  ...$center,
  backgroundColor: "#303030"
};

const $emptyContainer: ViewStyle = {
  ...$center,
  height: SCREEN_HEIGHT
};

const $imageModal: ImageStyle = {
  width: "100%",
  height: 200
};




