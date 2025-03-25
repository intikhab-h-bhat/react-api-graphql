import logo from './logo.svg';
import './App.css';
import GetBooks from './components/GetBooks';
import AddBooks from './components/AddBooks';
import React,{useState} from 'react';

function App() {

  const [book,setBook] = useState({})


  return (
    <div className="maincontainer">
         <GetBooks setBook={setBook}/>
         <AddBooks book={book} setBook={setBook}/>
    </div>
  );
}

export default App;
