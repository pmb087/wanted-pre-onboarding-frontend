# 원티드 프리온보딩 프론트엔드 코스

---

### 지원자 

이름 : 박승민.
이메일 : [pmb087@gmail.com](pmb087@gmail.com)

---

### STACKS

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=#61DAFB&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

---

### 프로젝트 실행
```
1. npm install
2. npm start
```

#### 실행 결과

<img width="763" alt="taskBluePrint" src="https://user-images.githubusercontent.com/107172997/195004686-766f0857-4af4-44a8-bd27-ff0ad404219d.png">

(왼쪽부터 회원가입, 로그인, 투두리스트 순서)

---

### 폴더 구조

```
📦 src
┣ 📂 Pages
┃ ┣ 📂 Auth
┃ ┃ ┣ 📜 Auth.js
┃ ┃ ┣ 📜 Auth.Style.js
┃ ┃ ┗ 📜 Redirect.js
┃ ┗ 📂 ToDo
┃   ┣ 📜 ToDo.js
┃   ┗ 📜 ToDo.Style.js
┃   ┗ 📂 ToDoList
┃     ┣ 📜 ToDoList.js
┃     ┗ 📜 ToDoList.Style.js
┣ 📂styles
┃ ┗ 📜 GlobalStyle.js
┣ 📜 Router.js
┣ 📜 config.js
┗ 📜 index.js
```

---

### 구현 사항

- **Redirect.js**

``` javascript
export function Redirect() {
  const navigate = useNavigate();
  useEffect(() => navigate("/login"), []);
}
```
라우터의 루트경로 `("/")` 에 라우팅 되는 파일입니다.

루트경로에 접근시 회원가입, 로그인 페이지로 연결됩니다.

<br/>

- **Auth.js**

``` javascript
/* Router.js의 Auth경로는 /:auth (path parameter입니다) */

const params = useParams();
const authMode = params.auth;

```
`useParams`를 이용하여 **Login**에 접근했는지, **SignUp**에 접근했는지 판단합니다.

<br/>

``` javascript
if (!email.includes("@") && password.length < 8) {
      return alert("이메일 형식 및 비밀번호 길이가 잘못되었습니다.");
    } else if (!email.includes("@")) {
      return alert("이메일의 형식이 잘못되었습니다.");
    } else if (password.length < 8) {
      return alert("비밀번호의 길이가 너무 짧습니다.");
    } else if (authMode === "signup" && password !== passwordValidation) {
      return alert("비밀번호가 서로 일치하지 않습니다.");
    }
```
`inputValue` **State**를 이용해서 이메일, 비밀번호입력 유효성을 검사합니다.

`authMode`가 회원가입인 경우는 비밀번호확인 입력을 추가로 유효성 검사합니다.

<br/>

``` javascript
const buttonDisabled =
    authMode === "signup"
      ? !(
          inputValue.email.includes("@") &&
          inputValue.password.length > 7 &&
          inputValue.password === inputValue.passwordValidation
        )
      : !(inputValue.email.includes("@") && inputValue.password.length > 7);
      
<S.authSubmit disabled={buttonDisabled}>
  {authMode === "login" ? "로그인" : "회원가입"}
</S.authSubmit>
```

로그인, 회원가입 버튼의 `disabled`를 `authMode`를 기준으로 분리하여 변수에 할당했습니다.

<br/>

``` javascript
fetch(authMode === "login" ? API.LOGIN : API.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message === "동일한 이메일이 이미 존재합니다.") {
          return alert(res.message);
        } else if (res.message === "해당 사용자가 존재하지 않습니다.") {
          return alert(res.message);
        }
        localStorage.setItem("token", res.access_token);
        authMode === "login"
          ? alert("로그인이 완료되었습니다.")
          : alert("회원가입이 완료되었습니다.");
        navigate("/todo");
      });
```

유효성 검증을 통과하면 실행되는 로그인, 회원가입 **Fetch**입니다.

`authMode`를 기준으로 로그인, 회원가입을 판별하여 **API**를 호출합니다.

로그인 또는 회원가입이 성공하면 **response**로 받은 `JWT`를 로컬스토리지에 저장하고,
투두리스트 페이지로 연결됩니다.

로그인 또는 회원가입 **API** 호출시 오류가 발생하면 해당 **response.message**를 `alert`으로 출력합니다.


<br/>

``` javascript
useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, []);
```

이미 인증토큰이 발행된 상태라면 로그인 페이지에 접근시 **ToDo** 페이지로 연결됩니다.

투두리스트 페이지 또한 인증토큰 없이 접근하면 로그인 페이지로 연결됩니다.

<br/>

- ToDo.js

``` javascript
const [toDoList, setToDoList] = useState([]);

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
  
useEffect(() => {
    getToDo();
  }, []);
  
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
```
투두리스트 페이지 연결시 **useEffect**로 해당 계정의 투두리스트 데이터를 받아온 뒤,

`map`함수를 사용해서 렌더링합니다.

렌더링되는 개별 리스트의 구조는 아래와 같습니다.

``` javascript
<S.toDoMapWrap>
      <S.toDoList>
        {!isUpdating ? (
          <S.toDoIsCompletedCheck isCompleted={isToDoCompleted} />
        ) : (
          <S.toDoIsCompletedCheck
            isCompleted={isToDoCompleted}
            onClick={handleCompleted}
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
            <S.updateTodo onClick={updateMode}>수정</S.updateTodo>
            <S.deleteTodo onClick={deleteTodo}>삭제</S.deleteTodo>
          </>
        ) : (
          <>
            <S.updateComplete onClick={updateTodo}>완료</S.updateComplete>
            <S.updateCancle onClick={updateCancel}>취소</S.updateCancle>
          </>
        )}
      </S.toDoFunction>
    </S.toDoMapWrap>
```

해당 코드에 사용된 `isUpdating` **State**를 이용해서 수정모드를 제어합니다.

수정모드가 아닐때는 `수정`, `삭제` 버튼이 보여지고,

수정모드가 활성화되면 `완료`, `취소` 버튼이 보여집니다.

<br/>

- **CRUD**

    - Create
    ``` javascript
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
    ```
    작성 버튼을 클릭하면 실행되는 함수입니다.
    
    할 일의 값이 비워져있다면 **List** 생성 버튼을 눌러도 동작되지 않게 구현했습니다.
    
    빈 문자열이 아니라면 API를 호출하고 수정된 서버데이터를 **Read**합니다
    
    <br/>
    
    - Read
    ``` javascript
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
    ```
    
    실행되면 **API**를 호출하여 토큰을 기준으로 해당 이메일의 투두리스트 데이터를 반환합니다.
    
    <br/>
    
    
    - Update
    ``` javascript
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
      setIsUpdating(false);
    };
    ```
    
    실행되면 실행된 컴포넌트가 부여받은 `Props.id`를 이용하여 **API**를 호출합니다.
    
    이미 존재하는 투두리스트의 내용을 수정하고, 수정된 투두리스트 데이터를 호출해서 리렌더링합니다.
    
    <br/>
    
    - Delete
    ``` javascript
    const deleteTodo = () => {
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
    ```
    
    실행되면 실행된 컴포넌트가 부여받은 `Props.id`를 이용하여 **API**를 호출합니다.
    
    실행된 컴포넌트의 `Props.id`를 기준으로 해당하는 투두리스트를 삭제합니다. 이후 투두리스트 데이터를 호출해서 리렌더링합니다.
