import * as React from "react";
import { useEffect, useRef } from "react";
import { Animated, Text, TextStyle, ViewStyle } from "react-native";
import { IS_IOS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/consts";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import { $absolute, $center } from "../utils/style";

const MODAL_MARGIN = 12;

const MARGIN_TOP_IOS = 62;

type NotificationProps = {};

export const Notification = observer(({}: NotificationProps) => {
  const popAnim = useRef(new Animated.Value(SCREEN_HEIGHT * -1)).current;
  
  const { images: { error } } = useStore();
  
  useEffect(() => {
    if (error) {
      popIn();
    }
  }, [error]);
  
  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(popOut);
  };
  
  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: SCREEN_HEIGHT * -1,
        duration: 300,
        useNativeDriver: true
      }).start();
    }, 2000);
  };
  
  return (
    <Animated.View
      style={[
        $toastContainer,
        {
          transform: [{ translateY: popAnim }]
        }
      ]}
    >
      <Text style={$text}>
        Ошибка получения данных, повторите позже
      </Text>
    </Animated.View>
  );
});


const $toastContainer: ViewStyle = {
  ...$center,
  ...$absolute,
  height: 60,
  width: SCREEN_WIDTH - MODAL_MARGIN * 2,
  marginLeft: MODAL_MARGIN,
  marginTop: IS_IOS ? MARGIN_TOP_IOS : MODAL_MARGIN,
  backgroundColor: "#e35858",
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  zIndex: 2
};

const $text: TextStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: 14
};
