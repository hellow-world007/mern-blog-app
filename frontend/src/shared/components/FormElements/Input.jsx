/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });

    let input = event.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <div className="relative">
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          className="input-box"
        />
        {props.id === "name" && <i className="fi fi-sr-user input-icon"></i>}
        {props.id === "email" && (
          <i className="fi fi-sr-envelope input-icon"></i>
        )}
        {props.id === "password" && <i className="fi fi-sr-key input-icon"></i>}
      </div>
    ) : (
      <textarea
        id={props.id}
        // rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className="input-box text-4xl font-medium outline-none resize-none mt-10 placeholder:opacity-40 bg-grey"
      />
    );

  return (
    <div
      className={`my-4 ${
        !inputState.isValid && inputState.isTouched && "invalid-input"
      }`}
    >
      {/* <label htmlFor={props.id}>{props.label}</label> */}
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;