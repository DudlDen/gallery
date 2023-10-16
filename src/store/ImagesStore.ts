import { makeAutoObservable, runInAction } from "mobx";
import { reqInstance } from "../utils/axios";
import { API_URL } from "../utils/consts";

export type ImageItemType = {
  id: string;
  width: number,
  height: number,
  url: string
}

export type ImageResType = {
  id: string;
  width: number,
  height: number,
  urls: {
    regular: string
  }
}

export class ImagesStore {
  items: ImageItemType[] = [];
  error: boolean = false;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  setError(value: boolean) {
    this.error = value;
  }
  
  setItems(value: ImageItemType[]) {
    this.items = value;
  }
  
  async create() {
    runInAction(() => {
      this.setError(false);
      reqInstance.get(API_URL).then(imagesRes => {
          this.setItems(imagesRes.data.map((image: ImageResType) => {
            return {
              id: image.id,
              width: image.width,
              height: image.height,
              url: image.urls.regular
            };
          }));
        })
        .catch(() => {
          this.setError(true);
        });
    });
  }
  
  async newPage() {
    runInAction(() => {
      this.setError(false);
      reqInstance.get(API_URL).then(imagesRes => {
          this.setItems([...this.items, ...imagesRes.data.map((image: ImageResType) => {
            return {
              id: image.id,
              width: image.width,
              height: image.height,
              url: image.urls.regular
            };
          })]);
        })
        .catch(() => {
          this.setError(true);
        });
    });
  }
}
