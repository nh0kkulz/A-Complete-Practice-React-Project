import React, { useState, useRef } from "react";
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
const AddUser = (props) => {
  const usernameRef = useRef();
  const ageRef = useRef();
  const [error, setError] = useState();


  const onAddUser = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const age = ageRef.current.value; 
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age",
      });
      return;
    }
    props.onAddUser(username, age);
    usernameRef.current.value='';
    ageRef.current.value='';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onErrorHandler={errorHandler}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={onAddUser}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            ref={usernameRef}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            ref={ageRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
