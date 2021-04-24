import { Button, ButtonGroup } from "react-bootstrap";
import React, { useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import leftArrow from "./leftArrow.svg";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setFormDataAction } from "./actions/actions";
import { SideBar } from "./Dashboard";
export function NewTask() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    taskName: null,
    description: null,
    branch: null,
  });
  function submitNewTaskData(e) {
    e.preventDefault();
    dispatch(setFormDataAction(formData));
    history.push("/dashboard");
  }
  function goBackToDashBoard() {
    history.push("/dashboard");
  }
  function setNewTaskData(value, type) {
    let temp = { ...formData };
    temp[`${type}`] = value;
    setFormData(temp);
  }
  function setBranchData(type) {
    let temp = { ...formData };
    temp.branch = type;
    setFormData(temp);
  }
  function clearFormData() {
    let temp = { ...formData };
    temp.branch = null;
    temp.taskName = null;
    temp.description = null;
    setFormData(temp);
  }
  return (
    <Row className="h-100 m-0">
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
                  <p className="createTask m-0">Create Task</p>
                </Container>
              </Col>
            </div>
            <Container>
              <Row>
                <Col lg={5} md={6}>
                  <Form onSubmit={(e) => submitNewTaskData(e)} className="mt-5">
                    <Form.Group className="mb-4">
                      <p className="m-0 text-left formLabel">Enter Task Name</p>
                      <FormControl
                        type="text"
                        className="textBoxTaskName"
                        placeholder="Task Name"
                        value={formData.taskName ?? ""}
                        onChange={(e) =>
                          setNewTaskData(e.target.value, "taskName")
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <p className="m-0 text-left formLabel">
                        Enter Description
                      </p>
                      <FormControl
                        as="textarea"
                        className="textBoxDescription"
                        placeholder="Description"
                        value={formData.description ?? ""}
                        onChange={(e) =>
                          setNewTaskData(e.target.value, "description")
                        }
                      />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column align-items-start">
                      <p className="m-0 text-left formLabel">Branch To</p>
                      <ButtonGroup className="branchToButtonGroup">
                        <Button
                          className={`py-0 branchToButtons ${
                            formData.branch === "toDo" && "selectedButton"
                          }`}
                          onClick={(e) => setBranchData("toDo")}
                        >
                          To-Do
                        </Button>
                        <Button
                          className={`py-0 branchToButtons ${
                            formData.branch === "inProgress" && "selectedButton"
                          }`}
                          onClick={(e) => setBranchData("inProgress")}
                        >
                          In-Progress
                        </Button>
                        <Button
                          className={`py-0 branchToButtons ${
                            formData.branch === "done" && "selectedButton"
                          }`}
                          onClick={(e) => setBranchData("done")}
                        >
                          Done
                        </Button>
                      </ButtonGroup>
                    </Form.Group>
                    <Form.Group className="mt-4 d-flex">
                      <Button
                        className="py-0 cancelButton mr-3"
                        onClick={clearFormData}
                      >
                        Cancel
                      </Button>
                      <Button className="py-0 createButton" type="submit">
                        Create
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
