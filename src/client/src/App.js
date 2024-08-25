import { useState, useEffect } from 'react';
import './App.css';

function Button({ text, handle }) {
  return (
    <button className="Button" onClick={() => handle(text)}>{text}</button>
  );
}

function User({handle, loggedIn}) {
  return (
    <div className={"User"}>
      {loggedIn ? (
        <span>Logged In</span>
      ) : (
        <>
          <img className="login" src="login.png" onClick={() => handle("로그인")} />
          <Button text={"로그인"} handle={handle}/>
        </>
      )}
    </div>
  );
}

function NavBar({ list, handle, loggedIn }) {
  return (
    <nav className='NavBar'>
      <img className="icon" src='nonglock.png' />
      <h1 className='title'>농락</h1>
      <div className='buttonBar'>
        {Object.keys(list).map((key) => (
          <Button key={key} text={key} handle={handle} />
        ))}
      </div>
      <User handle={handle} loggedIn={loggedIn} />
      <hr />
    </nav>
  );
}

function Main({ view }) {
  return (
    <main className='Main'>
      {view}
    </main>
  );
}

function Catalog() {
  return (
    <section>
      <div className='farmList'></div>
      <div className='farmInfo'></div>
    </section>
  );
}

function Regist() {
  return (
    <section>
      <div></div>
    </section>
  );
}

function Community() {
  return (
    <section>
      2
    </section>
  );
}

function Login() {
  return (
    <section>
      3
    </section>
  );
}

function App() {
  const viewList = {
    "둘러보기": <Catalog />,
    "등록하기": <Regist />,
    "소통마당": <Community />,
  };

  const [view, setView] = useState(viewList["둘러보기"]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 백엔드에서 로그인 상태를 확인하는 API 호출
    fetch('https://api.example.com/check-login', {
      credentials: 'include'  // 쿠키 포함 옵션 (필요 시)
    })
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch(error => {
        console.error('Error fetching login status:', error);
        setLoggedIn(false);
      });
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 호출되게 함

  const handleViewChange = (key) => {
    if (key === "로그인") {
      setView(<Login />);
    } else {
      setView(viewList[key]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar list={viewList} handle={handleViewChange} loggedIn={loggedIn} />
      </header>
      <Main view={view} />
    </div>
  );
}

export default App;
