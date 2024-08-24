import { useState } from 'react';
import './App.css';

function Button({ text, handle }) {
  return (
    <button className="Button" onClick={() => handle(text)}>{text}</button>
  );
}

function NavBar({ list, handle }) {
  return (
    <nav className='NavBar'>
      <h1 className='title'>농락</h1>
      <div className='buttonBar'>
        {Object.keys(list).map((key) => (
          <Button key={key} text={key} handle={handle} />
        ))}
      </div>
      <hr />
    </nav>
  );
}

function Main({ view }) {
  return (
    <main>
      {view}
    </main>
  );
}

function Catalog() {
  return (
    <section>
    </section>
  );
}

function Regist() {
  return (
    <section>
    </section>
  );
}

function Community() {
  return (
    <section>
    </section>
  );
}

function App() {
  const viewList = {
    "둘러보기": <Catalog />,
    "등록하기": <Regist />,
    "소통마당": <Community />
  };

  const [view, setView] = useState(viewList["둘러보기"]);

  const handleViewChange = (key) => {
    setView(viewList[key]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar list={viewList} handle={handleViewChange} />
      </header>
      <Main view={view} />
    </div>
  );
}

export default App;
