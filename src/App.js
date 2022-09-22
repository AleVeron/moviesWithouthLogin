import { Routes, Route } from 'react-router-dom';
import List from "./components/List"
import Header from './components/Header'
import Footer from './components/Footer'
import Detail from './components/Detail'
import Results from './components/Results'
import './App.css'
import Favs from './components/Favs';

function App() {


  return (

    <div className="App d-flex flex-column justify-content-between">

      <Header />

      <Routes>

        <Route path="/" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/results" element={<Results />} />
        <Route path="/favs" element={<Favs />} />

      </Routes>

      <Footer />

    </div>
  );
}

export default App;
