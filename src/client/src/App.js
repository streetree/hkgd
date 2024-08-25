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
          <img className="login" src="login.png" alt="loginimage" onClick={() => handle("로그인")} />
          <Button text={"로그인"} handle={handle}/>
        </>
      )}
    </div>
  );
}

function NavBar({ list, handle, loggedIn }) {
  return (
    <nav className='NavBar'>
      <img className="icon" src='nonglock.png' alt='mainlogo'/>
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
  const [previewSrc, setPreviewSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className='Regist'>
      <div className='formContainer'>
        <form className='farmForm'>
          <label htmlFor="farmName">밭 이름</label>
          <input name="farmName" placeholder='의성 마늘밭'/>
          
          <label htmlFor="farmAddress">주소</label>
          <input name="farmAddress" placeholder='경상북도 의성군 의성읍' />
          
          <label htmlFor="farmCrop">작물</label>
          <input name="farmCrop" placeholder='마늘' />
          
          <label htmlFor="farmWorker">조건</label>
          <select name='farmWorker'>
            <option>누구나</option>
            <option>농업 유경험</option>
            <option>농장을 가지고 있음</option>
          </select>
          
          <label htmlFor="farmImage">사진 업로드:</label>
          <input 
            type="file" 
            id="farmImage" 
            name="farmImage" 
            accept="image/*" 
            onChange={handleImageChange} 
          />

        </form>
        <div className='farmPreviewList'>
          <div className="image-preview">
            <img 
              className='image'
              src={previewSrc || 'placeholder_image.png'} 
              alt="사진 없음" 
              style={{ 
                width: '10vw', 
                height: '5vw', 
                objectFit: 'cover',
                overflow: 'hidden'
              }}
            />
          </div>
        </div>
      </div>
      <div className='farmPreviewInfo'>
        {/* 추가 정보 표시 영역 */}
      </div>
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
