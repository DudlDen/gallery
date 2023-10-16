import { ImagesStore } from "./ImagesStore";
import { createContext, useContext } from "react";
import { AsyncTrunk } from "mobx-sync";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class RootStore {
  images: ImagesStore;
  
  constructor() {
    this.images = new ImagesStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage
});
