import React, { memo, useState } from "react";
import { Image, ImageStyle, Modal, Pressable, ViewStyle } from "react-native";
import { ImageProps } from "react-native/Libraries/Image/Image";
import ImageZoom from "react-native-image-pan-zoom";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/consts";
import { $center } from "../utils/style";

export const FULL_IMAGE_HEIGHT = 700;

interface ImageModalProps extends ImageProps {
  id: string;
}

const ImageModal = (props: ImageModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const onPress = () => setModalVisible(true);
  
  const onClosePress = () => setModalVisible(false);
  
  return (
    <Pressable
      style={$container}
      onPress={onPress}>
      <Image {...props} />
      <Modal
        animationType={"fade"} visible={modalVisible}
        onRequestClose={onClosePress}>
        <Pressable onPress={onClosePress} style={$modalContainer}>
          <ImageZoom
            onLongPress={onClosePress}
            cropWidth={SCREEN_WIDTH}
            cropHeight={SCREEN_HEIGHT}
            imageWidth={SCREEN_WIDTH}
            imageHeight={FULL_IMAGE_HEIGHT}
            enableSwipeDown={true}
            style={$center}
            onSwipeDown={onClosePress}>
            <Image
              {...props}
              resizeMode={"contain"}
              style={$image} />
          </ImageZoom>
        </Pressable>
      </Modal>
    </Pressable>
  );
};

const $container: ViewStyle = {
  flex: 1
};

const $modalContainer: ViewStyle = {
  ...$center,
  backgroundColor: "#303030"
};

const $image: ImageStyle = {
  width: "100%",
  height: FULL_IMAGE_HEIGHT
};

export default memo(ImageModal, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});



