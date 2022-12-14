import styled from "styled-components";

export const toDoMapWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 10px 0;
  width: 350px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0 0 0.3rem 0.05rem #cccccc;
`;

export const toDoList = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  background-color: white;
  border-radius: 5px;
`;

export const toDoIsCompletedCheck = styled.div`
  margin-left: 15px;
  width: 20px !important;
  height: 20px;
  background-color: ${(props) => (props.isCompleted ? "#55aaaa" : "white")};
  border: 2px solid #aaaaaa;
  border-radius: 10px;
`;

export const toDoContent = styled.div`
  margin: 10px 0 10px 20px;
  width: 80%;
`;

export const toDoContentText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;

  &:hover {
    color: #aa00cc;
  }
`;

export const toDoContentInput = styled.input`
  padding: 5px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export const toDoFunction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
`;

const buttonStyle = styled.button`
  margin: 5px;
  padding: 5px;
  background-color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const updateTodo = styled(buttonStyle)`
  background-color: #4444ff;
  color: white;

  &:hover {
    background-color: #9999ff;
    color: #555555;
  }
`;

export const deleteTodo = styled(buttonStyle)`
  background-color: #ff4444;
  color: white;

  &:hover {
    background-color: #ff9999;
    color: #555555;
  }
`;

export const updateComplete = styled(updateTodo)``;

export const updateCancle = styled(deleteTodo)``;
