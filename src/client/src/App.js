import { useState, useEffect } from 'react';
import styles from './App.module.css';

const API = "여기에 백엔드 api넣으세요~"

function Button({ text, handle, className, value, type, disabled }) {
  return (
    <button 
      type={type || "button"} 
      className={className} 
      onClick={() => handle && handle(value)}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

function FormInput({ label, name, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div className={styles.formInput}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function ViewButton({ text, handle }) {
  return (
    <Button value={text} text={text} className={styles.ViewButton} handle={handle} />
  );
}

function User({ handle, loggedIn }) {
  return (
    <div className={styles.Account}>
      {loggedIn ? (
        <div className={styles.User}>
          <span>로그인 완료</span>
        </div>
      ) : (
        <div className={styles.Guest} onClick={() => handle("로그인")}>
          <img 
            className={styles.login} 
            src="login.png" 
            alt="로그인 아이콘" 
          />
          <Button text="로그인" className={styles.GuestButton} />
        </div>
      )}
    </div>
  );
}

function NavBar({ list, handle, loggedIn }) {
  return (
    <nav className={styles.NavBar}>
      <img className={styles.icon} src='nonglock.png' alt="농락 아이콘" />
      <h1 className={styles.title}>농락</h1>
      <div className={styles.buttonBar}>
        {Object.keys(list).map((key) => (
          <ViewButton key={key} text={key} handle={handle} />
        ))}
      </div>
      <User handle={handle} loggedIn={loggedIn} />
      <hr />
    </nav>
  );
}

function Main({ view }) {
  return (
    <main className={styles.Main}>
      {view}
    </main>
  );
}

function Catalog() {
  return (
    <section>
      <div className={styles.farmList}></div>
      <div className={styles.farmInfo}></div>
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
    <section className={styles.Regist}>
      <div className={styles.formContainer}>
        <form className={styles.farmForm}>
          <FormInput name="farmName" label="밭 이름" placeholder="의성 마늘밭" />
          <FormInput name="farmAddress" label="주소" placeholder="경상북도 의성군 의성읍" />
          <FormInput name="farmCrop" label="작물" placeholder="마늘" />
          
          <label htmlFor="farmWorker">조건</label>
          <select name="farmWorker">
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
        <div className={styles.farmPreviewList}>
          <div className="image-preview">
            <img 
              className={styles.image}
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
      <div className={styles.farmPreviewInfo}>
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

function Login({ handle, setLoggedIn }) {
  const [login, setLogin] = useState(true);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [work, setWork] = useState('');
  const [name, setName] = useState('');
  const [idAvailable, setIdAvailable] = useState(true);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });
      const data = await response.json();
      if (data.success) {
        setLoggedIn(true);
        handle("둘러보기");
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!idAvailable) {
      alert('사용할 수 없는 아이디입니다.');
      return;
    }
    try {
      const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password, work, name }),
      });
      const data = await response.json();
      if (data.success) {
        alert('회원가입 성공');
        setLogin(true); // 회원가입 후 로그인 페이지로 이동
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  const checkIdAvailability = async (e) => {
    const enteredId = e.target.value;
    setId(enteredId);
    if (enteredId) {
      try {
        const response = await fetch(`${API}/check-id?id=${enteredId}`);
        const data = await response.json();
        setIdAvailable(data.available);
        if (!data.available) {
          alert('이미 사용 중인 아이디입니다.');
        }
      } catch (error) {
        console.error('Error during ID availability check:', error);
      }
    }
  };

  return (
    <section>
      {login ? (
        <>
          <form onSubmit={handleLoginSubmit}>
            <FormInput label="아이디" name="id" value={id} onChange={(e) => setId(e.target.value)} />
            <FormInput label="비밀번호" name="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" text="로그인" />
          </form>
          <Button 
            text="계정이 없습니다." 
            className={styles.noAccount} 
            handle={() => setLogin(false)} 
          />
        </>
      ) : (
        <>
          <form onSubmit={handleRegisterSubmit}>
            <FormInput label="아이디" name="id" value={id} onChange={checkIdAvailability} />
            <FormInput label="비밀번호" name="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormInput label="실명" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="work">경험</label>
            <select 
              name="work" 
              value={work} 
              onChange={(e) => setWork(e.target.value)}>
              <option value="">경험 선택</option>
              <option value="0">농업 무경험</option>
              <option value="1">농업 유경험</option>
            </select>
            <Button 
              type="submit" 
              text="회원가입" 
              disabled={!idAvailable} // 아이디 중복 검사 후 사용 가능해야만 가입 가능
            />
          </form>
          <Button 
            text="계정이 있습니다." 
            className={styles.noAccount} 
            handle={() => setLogin(true)} 
          />
        </>
      )}
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
    fetch(`${API}/check-login`, {
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
      setView(<Login handle={handleViewChange} setLoggedIn={setLoggedIn} />);
    } else {
      setView(viewList[key]);
    }
  };

  return (
    <div className={styles.App}>
      <header className="App-header">
        <NavBar list={viewList} handle={handleViewChange} loggedIn={loggedIn} />
      </header>
      <Main view={view} />
    </div>
  );
}

export default App;
