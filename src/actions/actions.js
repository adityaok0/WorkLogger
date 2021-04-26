export function setLoginDataAction(value, type) {
  return function (dispatch, getState) {
    return dispatch({
      type: "SET_LOGIN_DATA",
      payload: {
        value: value,
        type: type,
      },
    });
  };
}
export function setFormDataAction(form) {
  return function (dispatch, getState) {
    return dispatch({
      type: "SET_FORM_DATA",
      payload: {
        form: form,
      },
    });
  };
}
export function setPosition(data) {
  return function (dispatch, getState) {
    return dispatch({
      type: "SET_POSITION",
      payload: {
        data: data,
      },
    });
  };
}

export function setDimensions(data) {
  return function (dispatch, getState) {
    return dispatch({
      type: "SET_DIMENSIONS",
      payload: {
        data: data,
      },
    });
  };
}
export function moveToListAction(type, index, data) {
  return function (dispatch, getState) {
    const itemPosition = getState().PositionTrackerReducer.item;
    const toDoPos = getState().PositionTrackerReducer.listPos.toDo;
    const inProgressPos = getState().PositionTrackerReducer.listPos.inProgress;
    const donePos = getState().PositionTrackerReducer.listPos.done;
    if (window.innerWidth > 576) {
      switch (type) {
        case "toDo": {
          if (itemPosition.left > inProgressPos.left) {
            dispatch({
              type: "MOVE_TO_IN_PROGRESS_FROM_TO_DO",
              payload: {
                index: index,
              },
            });
          }
          break;
        }
        case "inProgress": {
          if (itemPosition.left > donePos.left) {
            dispatch({
              type: "MOVE_TO_DONE_FROM_IN_PROGRESS",
              payload: {
                index: index,
              },
            });
          } else if (itemPosition.right < toDoPos.right) {
            dispatch({
              type: "MOVE_TO_TO_DO_FROM_IN_PROGRESS",
              payload: {
                index: index,
              },
            });
          }

          break;
        }
        case "done": {
          if (itemPosition.right < inProgressPos.right) {
            dispatch({
              type: "MOVE_TO_IN_PROGRESS_FROM_DONE",
              payload: {
                index: index,
              },
            });
          }
          break;
        }
        default:
          break;
      }
    } else {
      switch (type) {
        case "toDo": {
          if (itemPosition.top > inProgressPos.top) {
            dispatch({
              type: "MOVE_TO_IN_PROGRESS_FROM_TO_DO",
              payload: {
                index: index,
              },
            });
          }
          break;
        }
        case "inProgress": {
          if (itemPosition.top > donePos.top) {
            dispatch({
              type: "MOVE_TO_DONE_FROM_IN_PROGRESS",
              payload: {
                index: index,
              },
            });
          } else if (itemPosition.bottom < toDoPos.bottom) {
            dispatch({
              type: "MOVE_TO_TO_DO_FROM_IN_PROGRESS",
              payload: {
                index: index,
              },
            });
          }

          break;
        }
        case "done": {
          if (itemPosition.bottom < inProgressPos.bottom) {
            dispatch({
              type: "MOVE_TO_IN_PROGRESS_FROM_DONE",
              payload: {
                index: index,
              },
            });
          }
          break;
        }
        default:
          break;
      }
    }

    return dispatch({
      type: "MOVE_TO_LIST",
      payload: {
        data: data,
      },
    });
  };
}
export function dragSelectedHighlight(type) {
  return function (dispatch, getState) {
    const itemPosition = getState().PositionTrackerReducer.item;
    const toDoPos = getState().PositionTrackerReducer.listPos.toDo;
    const inProgressPos = getState().PositionTrackerReducer.listPos.inProgress;
    const donePos = getState().PositionTrackerReducer.listPos.done;
    if (window.innerWidth > 576) {
      switch (type) {
        case "toDo": {
          if (itemPosition.left > inProgressPos.left) {
            dispatch({
              type: "HIGHLIGHT_IN_PROGRESS",
            });
          } else {
            dispatch({
              type: "NO_HIGHLIGHT",
            });
          }
          if (itemPosition.right > inProgressPos.left) {
            dispatch({
              type: "MAKE_IN_PROGRESS_BOTTOM",
            });
          } else {
            dispatch({
              type: "REMOVE_BOTTOM",
            });
          }
          break;
        }
        case "inProgress": {
          if (itemPosition.left > donePos.left) {
            dispatch({
              type: "HIGHLIGHT_DONE",
            });
          } else if (itemPosition.right < toDoPos.right) {
            dispatch({
              type: "HIGHLIGHT_TO_DO",
            });
          } else {
            dispatch({
              type: "NO_HIGHLIGHT",
            });
          }
          if (itemPosition.right > donePos.left) {
            dispatch({
              type: "MAKE_DONE_BOTTOM",
            });
          } else if (itemPosition.left < toDoPos.right) {
            dispatch({
              type: "MAKE_TO_DO_BOTTOM",
            });
          } else {
            dispatch({
              type: "REMOVE_BOTTOM",
            });
          }
          break;
        }
        case "done": {
          if (itemPosition.right < inProgressPos.right) {
            dispatch({
              type: "HIGHLIGHT_IN_PROGRESS",
            });
          } else {
            dispatch({
              type: "NO_HIGHLIGHT",
            });
          }
          if (itemPosition.left < inProgressPos.right) {
            dispatch({
              type: "MAKE_IN_PROGRESS_BOTTOM",
            });
          } else {
            dispatch({
              type: "REMOVE_BOTTOM",
            });
          }
          break;
        }
        default:
          break;
      }
    } else {
      switch (type) {
        case "toDo": {
          if (itemPosition.top > inProgressPos.top) {
            dispatch({
              type: "HIGHLIGHT_IN_PROGRESS",
            });
          } else {
            dispatch({
              type: "NO_HIGHLIGHT",
            });
          }
          if (itemPosition.bottom > inProgressPos.top) {
            dispatch({
              type: "MAKE_IN_PROGRESS_BOTTOM",
            });
          } else {
            dispatch({
              type: "REMOVE_BOTTOM",
            });
          }
          break;
        }
        case "inProgress": {
          if (itemPosition.top > donePos.top) {
            dispatch({
              type: "HIGHLIGHT_DONE",
            });
          } else if (itemPosition.bottom < toDoPos.bottom) {
            dispatch({
              type: "HIGHLIGHT_TO_DO",
            });
          } else {
            dispatch({
              type: "NO_HIGHLIGHT",
            });
          }
          if (itemPosition.bottom > donePos.top) {
            dispatch({
              type: "MAKE_DONE_BOTTOM",
            });
          } else if (itemPosition.top < toDoPos.bottom) {
            dispatch({
              type: "MAKE_TO_DO_BOTTOM",
            });
          } else {
            dispatch({
              type: "REMOVE_BOTTOM",
            });
          }
          break;
        }
        case "done": {
          if (itemPosition.bottom < inProgressPos.bottom) {
            dispatch({
              type: "HIGHLIGHT_IN_PROGRESS",
            });
          } else {
            dispatch({
              type: "NO_HIGHLIGHT",
            });
          }
          if (itemPosition.top < inProgressPos.bottom) {
            dispatch({
              type: "MAKE_IN_PROGRESS_BOTTOM",
            });
          } else {
            dispatch({
              type: "REMOVE_BOTTOM",
            });
          }
          break;
        }
        default:
          break;
      }
    }
  };
}
export function dragStoppedAction() {
  return function (dispatch, getState) {
    return dispatch({
      type: "DRAG_STOPPED",
    });
  };
}
export function resetSheetPosition(resetLocation) {
  return function (dispatch, getState) {
    dispatch({
      type: "RESET_SHEET_POSITION",
      payload: {
        resetLocation: resetLocation,
      },
    });
  };
}
