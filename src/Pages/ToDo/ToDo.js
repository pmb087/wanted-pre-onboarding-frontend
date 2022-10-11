import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoList from "./ToDoList/ToDoList.js";
import { API } from "../../config.js";
import * as S from "./ToDo.Style.js";

function ToDo() {
  const navigate = useNavigate();
  const [toDoList, setToDoList] = useState([]);
  const [createToDoValue, setCreateToDoValue] = useState({ toDo: "" });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getToDo();
  }, []);

  const handleInput = (event) => {
    const { value } = event.currentTarget;
    setCreateToDoValue({ ...createToDo, toDo: value });
  };

  const getToDo = () => {
    fetch(API.TODO, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setToDoList(res);
      });
  };

  const createToDo = () => {
    if (createToDoValue.toDo === "") {
      return;
    }
    fetch(API.TODO, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        todo: createToDoValue.toDo,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setToDoList([...toDoList, res]);
      });
    setCreateToDoValue({ toDo: "" });
  };

  return (
    <S.toDo>
      <S.toDoInner>
        <S.toDoHeader>To-Do List</S.toDoHeader>
        <S.toDoCreateWrap>
          <S.toDoCreateinput
            placeholder="할 일 입력"
            value={createToDoValue.toDo}
            onChange={handleInput}
          />
          <S.toDoCreateButton onClick={createToDo}>등록하기</S.toDoCreateButton>
        </S.toDoCreateWrap>
        <div>
          {toDoList.map(({ id, todo, isCompleted }, index) => {
            return (
              <ToDoList
                id={id}
                todo={todo}
                isCompleted={isCompleted}
                key={index}
                getToDo={getToDo}
              />
            );
          })}
        </div>
      </S.toDoInner>
    </S.toDo>
  );
}

export default ToDo;
