let defaultState = {
  item: { left: 0 },
  listPos: {},
  highlight: "",
  bottomDiv: "",
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
    case "MAKE_IN_PROGRESS_BOTTOM": {
      let temp = { ...state };
      temp.bottomDiv = "inProgress";
      return temp;
    }
    case "MAKE_DONE_BOTTOM": {
      let temp = { ...state };
      temp.bottomDiv = "done";
      return temp;
    }
    case "MAKE_TO_DO_BOTTOM": {
      let temp = { ...state };
      temp.bottomDiv = "toDo";
      return temp;
    }
    case "REMOVE_BOTTOM": {
      let temp = { ...state };
      temp.bottomDiv = "";
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
      temp.highlight = "";
      temp.bottomDiv = "";
      return temp;
    }
    default:
      return state;
  }
};
export default PositionTrackerReducer;
