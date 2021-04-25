let defaultState = {
  item: { left: 0 },
  listPos: {},
  highlight: "",
};
const PositionTrackerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_POSITION": {
      let temp = { ...state };
      temp.item = action.payload.data;
      return temp;
    }
    case "SET_DIMENSIONS": {
      let temp = { ...state };
      temp.listPos = action.payload.data;
      return temp;
    }
    case "HIGHLIGHT_IN_PROGRESS": {
      let temp = { ...state };
      temp.highlight = "inProgress";
      return temp;
    }
    case "HIGHLIGHT_DONE": {
      let temp = { ...state };
      temp.highlight = "done";
      return temp;
    }
    case "HIGHLIGHT_TO_DO": {
      let temp = { ...state };
      temp.highlight = "toDo";
      return temp;
    }
    case "DRAG_STOPPED":
    case "NO_HIGHLIGHT": {
      let temp = { ...state };
      temp.highlight = "";
      return temp;
    }
    case "RESET_SHEET_POSITION": {
      let temp = { ...state };
      temp.item = action.payload.resetLocation;
      return temp;
    }
    default:
      return state;
  }
};
export default PositionTrackerReducer;
