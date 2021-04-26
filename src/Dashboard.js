import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import smallLogo from "./smallLogo.svg";
import power from "./power.svg";
import profile from "./profile.png";
import openArrow from "./openArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import plus from "./plus.svg";
import trend from "./trend.svg";
import Draggable from "react-draggable";
import {
  setPosition,
  setDimensions,
  moveToListAction,
  dragSelectedHighlight,
  dragStoppedAction,
  resetSheetPosition,
} from "./actions/actions";
import { useEffect } from "react";
import { createRef } from "react";

export function Dashboard() {
  return (
    <React.Fragment>
      <Row className="h-100 m-0">
        <Col lg={3} xl={3} className="p-0">
          <SideBar />
        </Col>
        <Col lg={9} xl={9} className="p-0">
          <MainContentArea />
        </Col>
      </Row>
    </React.Fragment>
  );
}
export const SideBar = function SideBar() {
  const history = useHistory();
  function goToAnalytics() {
    history.push("/analytics");
  }
  return (
    <React.Fragment>
      <div className="sideBar w-100 h-100">
        <Row className="h-100 m-0">
          <Col lg={2} className="p-0">
            <SideBarGreyBar />
          </Col>
          <Col lg={10} className="d-none d-sm-flex flex-column p-0">
            <AccountSection />
            <div className="d-flex px-5 py-3 analytics-background">
              <Button
                className="analytics w-100 p-0 d-flex justify-content-center align-items-center"
                onClick={goToAnalytics}
              >
                <img
                  src={openArrow}
                  alt="openArrow"
                  className="openArrow mr-2"
                />
                <p className="m-0">Analytics</p>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
const AccountSection = function AccountSection() {
  return (
    <React.Fragment>
      <Row className="accountSection m-0">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex align-items-center">
            <img src={profile} alt="profile" className="profile mr-3" />
            <div className="h-100 d-flex flex-column justify-content-between">
              <p className="name m-0">Jonas Khanwald</p>
              <p className="nameEmail m-0">jonas@todo.com</p>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};
const MainContentArea = function MainContentArea() {
  const history = useHistory();
  function reRouteToNewTabCreation() {
    history.push("/newTab");
  }
  return (
    <React.Fragment>
      <div className="MainContentArea w-100 h-100">
        <div className="d-flex flex-column h-100">
          <div className="newTabBackground d-none d-sm-block">
            <Col className=" d-flex justify-content-end align-items-center h-100">
              <Button className="newTab py-0" onClick={reRouteToNewTabCreation}>
                New Tab
              </Button>
            </Col>
          </div>
          <TaskBoard />
        </div>
      </div>
    </React.Fragment>
  );
};
const TaskBoard = function TaskBoard() {
  const taskList = useSelector((state) => state.TaskListReducer);
  const positionTrackerHighlight = useSelector(
    (state) => state.PositionTrackerReducer.highlight
  );
  const bottomDiv = useSelector(
    (state) => state.PositionTrackerReducer.bottomDiv
  );
  const toDoRef = createRef();
  const inProgressRef = createRef();
  const doneRef = createRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      toDoRef.current !== null &&
      inProgressRef.current !== null &&
      doneRef.current !== null
    ) {
      dispatch(
        setDimensions({
          toDo: toDoRef.current.getBoundingClientRect(),
          inProgress: inProgressRef.current.getBoundingClientRect(),
          done: doneRef.current.getBoundingClientRect(),
        })
      );
      function handleResize() {}
      window.addEventListener("resize", handleResize);
    }
    return () => {};
  });
  const moveToList = (type, index, data) => {
    dispatch(moveToListAction(type, index, data));
  };
  return (
    <Row className="pt-3 m-0 taskBoard">
      <Col
        sm={4}
        className={`toDoList ${bottomDiv === "toDo" ? "makeBottom" : ""}`}
      >
        <div className="toDoHeadingName d-flex justify-content-center align-items-center">
          <p className="m-0">To Do</p>
        </div>
        <div
          className={`toDoContent d-flex flex-column pb-3 mb-3 ${
            positionTrackerHighlight === "toDo" ? "selectedTab" : ""
          }`}
          ref={toDoRef}
        >
          {taskList.toDo.map((toDo, toDoIndex) => (
            <TaskSheet
              data={toDo}
              type={"toDo"}
              index={toDoIndex}
              key={`toDo'${toDoIndex}`}
              moveToList={moveToList}
              resetLocation={toDoRef}
            />
          ))}
        </div>
      </Col>
      <Col
        sm={4}
        className={`inProgressList ${
          bottomDiv === "inProgress" ? "makeBottom" : ""
        }`}
      >
        <div className="inProgressHeadingName d-flex justify-content-center align-items-center">
          <p className="m-0">In-progress</p>
        </div>
        <div
          className={`inProgressContent d-flex flex-column pb-3 mb-3 ${
            positionTrackerHighlight === "inProgress" ? "selectedTab" : ""
          }`}
          ref={inProgressRef}
        >
          {taskList.inProgress.map((inProgress, inProgressIndex) => (
            <TaskSheet
              data={inProgress}
              type={"inProgress"}
              index={inProgressIndex}
              key={`toDo'${inProgressIndex}`}
              moveToList={moveToList}
              resetLocation={inProgressRef}
            />
          ))}
        </div>
      </Col>
      <Col
        sm={4}
        className={`doneList ${bottomDiv === "done" ? "makeBottom" : ""}`}
      >
        <div className="doneHeadingName d-flex justify-content-center align-items-center">
          <p className="m-0">Done</p>
        </div>
        <div
          className={`doneContent d-flex flex-column pb-3 mb-3 ${
            positionTrackerHighlight === "done" ? "selectedTab" : ""
          }`}
          ref={doneRef}
        >
          {taskList.done.map((done, doneIndex) => (
            <TaskSheet
              data={done}
              type={"done"}
              index={doneIndex}
              key={`toDo'${doneIndex}`}
              moveToList={moveToList}
              resetLocation={doneRef}
            />
          ))}
        </div>
      </Col>
    </Row>
  );
};
const TaskSheet = function TaskSheet({
  data,
  type,
  index,
  moveToList,
  resetLocation,
}) {
  const dispatch = useDispatch();
  const taskSheetRef = createRef();
  useEffect(() => {
    return function () {
      dispatch(resetSheetPosition(resetLocation));
    };
  }, []);
  const trackPos = (data) => {
    dispatch(setPosition(taskSheetRef.current.getBoundingClientRect()));
    dispatch(dragSelectedHighlight(type));
  };
  const dragStarted = (type) => {
    dispatch(dragSelectedHighlight(type));
  };
  const dragStopped = () => {
    dispatch(dragStoppedAction());
  };

  return (
    <Draggable
      onStart={() => dragStarted(type)}
      onDrag={(e, data) =>
        trackPos(taskSheetRef.current.getBoundingClientRect())
      }
      onStop={() => {
        moveToList(type, index, data);
        dragStopped();
      }}
      position={{ x: 0, y: 0 }}
    >
      <div className="toDoSheet mt-3 mx-3 p-3 text-left" ref={taskSheetRef}>
        <h4 className="taskName">{data.taskName}</h4>
        <p className="description">{data.description}</p>
      </div>
    </Draggable>
  );
};
const SideBarGreyBar = React.memo(function SideBarGreyBar() {
  const history = useHistory();
  function reRouteToNewTabCreation() {
    history.push("/newTab");
  }
  function goToAnalytics() {
    history.push("/analytics");
  }
  function logOut() {
    history.push("/");
  }
  return (
    <React.Fragment>
      <div className="sideNavBar w-100 h-100 d-lg-flex d-none flex-column align-items-center">
        <img src={smallLogo} alt="smallLogo" className="smallLogo mt-3" />
        <img
          src={power}
          alt="power"
          className="power mt-auto mb-3"
          onClick={logOut}
        />
      </div>
      <div className="sideNavBar w-100 d-flex d-lg-none align-items-center py-3">
        <img
          src={smallLogo}
          alt="smallLogo"
          className="smallLogo ml-3 d-none d-sm-block"
        />
        <img
          src={profile}
          alt="profile"
          className="profile ml-3 d-block d-sm-none"
        />
        <div className="d-flex ml-auto">
          <img
            src={plus}
            alt="plus"
            className="plus mr-2 d-block d-sm-none"
            onClick={reRouteToNewTabCreation}
          />
          <img
            src={trend}
            alt="trend"
            className="trend mr-2 d-block d-sm-none"
            onClick={goToAnalytics}
          />
          <img
            src={power}
            alt="power"
            className="power mr-3 d-block"
            onClick={logOut}
          />
        </div>
      </div>
    </React.Fragment>
  );
});
