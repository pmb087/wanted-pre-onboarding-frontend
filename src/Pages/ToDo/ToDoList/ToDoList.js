import React, { useState } from "react";
import * as S from "./ToDoList.Style.js";
import { API } from "../../../config.js";

function ToDoList({ id, todo, isCompleted, getToDo }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isToDoCompleted, setIsToDoCompleted] = useState(isCompleted);
  const [toDoValue, setToDoValue] = useState({ toDo: "" });
  const [currentCompleted, setCurrentCompleted] = useState(isCompleted);

  const handleInput = (event) => {
    const { value } = event.currentTarget;
    setToDoValue({ ...toDoValue, toDo: value });
  };

  const updateTodo = () => {
    fetch(`${API.TODO}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        todo: toDoValue.toDo,
        isCompleted: isToDoCompleted,
      }),
    });
    setTimeout(() => {
      getToDo();
    }, 200);
  };

  const deleteTodo = (id) => {
    fetch(`${API.TODO}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTimeout(() => {
      getToDo();
    }, 200);
  };

  const updateCancel = () => {
    setIsUpdating(false);
    setToDoValue({ toDo: "" });
    setIsToDoCompleted(currentCompleted);
  };
  return (
    <S.toDoMapWrap>
      <S.toDoList>
        {!isUpdating ? (
          <S.toDoIsCompletedCheck isCompleted={isToDoCompleted} />
        ) : (
          <S.toDoIsCompletedCheck
            isCompleted={isToDoCompleted}
            onClick={() => setIsToDoCompleted((prev) => !prev)}
          />
        )}
        <S.toDoContent>
          {!isUpdating ? (
            <S.toDoContentText>{todo}</S.toDoContentText>
          ) : (
            <S.toDoContentInput onChange={handleInput} value={toDoValue.toDo} />
          )}
        </S.toDoContent>
      </S.toDoList>
      <S.toDoFunction>
        {!isUpdating ? (
          <>
            <S.updateTodo
              onClick={() => {
                setIsUpdating(true);
                setToDoValue({ toDo: todo });
                setCurrentCompleted(isCompleted);
              }}
            >
              수정
            </S.updateTodo>
            <S.deleteTodo onClick={() => deleteTodo(id)}>삭제</S.deleteTodo>
          </>
        ) : (
          <>
            <S.updateComplete
              onClick={() => {
                updateTodo();
                setIsUpdating(false);
              }}
            >
              완료
            </S.updateComplete>
            <S.updateCancle onClick={updateCancel}>취소</S.updateCancle>
          </>
        )}
      </S.toDoFunction>
    </S.toDoMapWrap>
  );
}

export default ToDoList;
