import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();
  const onAddUser = (event) => {
    event.preventDefault();
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
    setUsername("");
    setAge("");
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal title={error.title} message={error.message} onErrorHandler={errorHandler}></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={onAddUser}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            onChange={usernameChangeHandler}
            value={username}
          />
          <label htmlFor="age">Age</label>
          <input id="age" type="text" onChange={ageChangeHandler} value={age} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
