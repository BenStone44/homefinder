import { combineReducers } from "redux";
import {
  DataAction,
  HeaderAction,
  MaxDataAction,
  TagAction,
  WidthAction,
  ToggleResizeAction,
  ResizeIndexAction,
  ResizeLeftAction,
} from "../actions";
import shuffleArray from "../components/helpers/shuffleArray";
import sortArray from "../components/helpers/sortArray";

const header = (state: Array<string> = [], action: HeaderAction) => {
  switch (action.type) {
    case "INIT_HEADER":
      return action.initialState;
    default:
      return state;
  }
};

const tag = (state: Array<boolean> = [], action: TagAction) => {
  switch (action.type) {
    case "INIT_TAG":
      let x: any;
      let res: Array<boolean> = [];
      // eslint-disable-next-line
      for (x in action.initialState) {
        res.push(false);
      }
      return res;
    case "TOGGLE_TAG":
      if (state[action.index] === false) state[action.index] = true;
      else state[action.index] = false;
      return state;
    default:
      return state;
  }
};

const data = (state: Array<JSON> = [], action: DataAction) => {
  switch (action.type) {
    case "INIT_DATA":
      return action.initialState;
    case "SHUFFLE_DATA":
      let newState = shuffleArray(state);
      return newState;
    case "SORT_DATA":
      let length: number = 0;
      let i: any;
      // eslint-disable-next-line
      for (i in state[0]) {
        length++;
      }
      let weight: Array<number> = new Array<number>(length - 2);
      for (let i: number = 0; i < length - 2; i++) {
        weight[i] = 0;
      }
      weight[action.index] = 1;
      let newState1 = sortArray(state, weight);
      return newState1;
    default:
      return state;
  }
};

const isResize = (state: boolean = false, action: ToggleResizeAction) => {
  switch (action.type) {
    case "TOGGLE_RESIZE":
      return action.value;
    default:
      return state;
  }
};

const ResizingIndex = (state: number = 0, action: ResizeIndexAction) => {
  switch (action.type) {
    case "RESIZE_INDEX":
      return action.index;
    default:
      return state;
  }
};

const ResizingLeft = (state: number = 0, action: ResizeLeftAction) => {
  switch (action.type) {
    case "RESIZE_LEFT":
      return action.left;
    default:
      return state;
  }
};

const widthList = (state: Array<number> = [], action: WidthAction) => {
  switch (action.type) {
    case "INIT_WIDTH":
      let x: any;
      let res: Array<number> = [];
      // eslint-disable-next-line
      for (x in action.initialState) {
        res.push(230);
      }
      return res;
    case "CHANGE_WIDTH":
      let index = action.index;
      let newList = state;
      newList[index] = action.newWidth;
      return newList;
    default:
      return state;
  }
};

const maxData = (state: Array<number> = [], action: MaxDataAction) => {
  switch (action.type) {
    case "MAX_DATA":
      let res: Array<number> = [];
      let item: any;
      for (item of action.data) {
        let x: any;
        let i: number = 0;
        for (x in item) {
          i = i + 1;
          if (i > 2) {
            let temp: number = Number(item[x]);
            let index: number = i - 3;
            if (res.length - 1 < index) {
              res.push(temp);
            } else {
              if (temp > res[index]) res[index] = temp;
            }
          }
        }
      }
      return res;
    default:
      return state;
  }
};

export default combineReducers({
  header,
  data,
  maxData,
  tag,
  isResize,
  widthList,
  ResizingIndex,
  ResizingLeft,
});
