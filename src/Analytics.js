import { Button, ButtonGroup } from "react-bootstrap";
import React, { useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import leftArrow from "./leftArrow.svg";
import { useHistory } from "react-router";
import { SideBar } from "./Dashboard";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

export function Analytics() {
  const list = useSelector((state) => state.TaskListReducer);
  // Chart.defaults.global.legend.labels.usePointStyle = true;
  const state = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "data",
        backgroundColor: ["#F2C94C", "#2FDE00", "#00A6B4"],
        hoverBackgroundColor: ["#4B5000", "#175000", "#003350"],
        data: [list.toDo.length, list.inProgress.length, list.done.length],
      },
    ],
  };
  const history = useHistory();
  function goBackToDashBoard() {
    history.push("/dashboard");
  }
  return (
    <React.Fragment>
      <Row className="h-100 mx-0 mb-5">
        <Col lg={3} xl={3} md={4} className="p-0">
          <SideBar />
        </Col>
        <Col lg={9} xl={9} md={8} className="p-0">
          <Row className="m-0 NewTask">
            <Col className="d-flex flex-column p-0">
              <div className="createTaskHeader w-100">
                <Col className="h-100">
                  <Container className=" d-flex align-items-center h-100">
                    <img
                      src={leftArrow}
                      alt="leftArrow"
                      className="leftArrow mr-3 ml-n3"
                      onClick={goBackToDashBoard}
                    />
                    <p className="createTask m-0">Analytics</p>
                  </Container>
                </Col>
              </div>
              <Row className="m-0">
                <Col md={3}></Col>
                <Col md={6}>
                  <p className="m-0 graphTitle my-5">
                    Your Task Trends in this Week
                  </p>
                  <div>
                    <Pie
                      data={state}
                      options={{
                        title: {
                          display: true,
                          text: "Your Task Trends in this Week",
                          fontSize: 12,
                        },
                        legend: {
                          display: false,
                          position: "bottom",
                          labels: {
                            usePointStyle: true,
                          },
                        },
                      }}
                    />
                  </div>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}
