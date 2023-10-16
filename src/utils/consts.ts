import { Dimensions, Platform } from "react-native";

export const API_URL = "https://api.unsplash.com/photos/random/?count=24";
export const CLIENT_ID = "VQcPsPEBXZr-_ojGi4pbDNS7JxpiVc-Myf9_fxNCP50";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const IS_IOS = Platform.OS === "ios";
