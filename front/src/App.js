import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Title from "./components/Title";
import Form from './components/Form';
import ToggleButton from './components/ToggleButton';
import List from "./components/List";
import "./App.css";

function App() {

  // VAR & STATES
  const [argonauts, setArgonauts] = useState([])
  const [toggle, setToggle] = useState(true)

  // GET ARGONAUTS
  useEffect(() => {
    axios.get(process.env.REACT_APP_AXIOS_URL + 'GetArgonauts.php')
      .then(response => {
        setArgonauts(response.data)
      })
      .catch(error => {
        return error.message
      })
  }, [])

  return (
    <>
      {/**  TITLE */}
      <Title />

      <div className="container">

        {/**  FORM  */}
        <Form
          argonauts={argonauts} />

        {/**  TOGGLE BUTTON */}
        <ToggleButton
          toggle={toggle}
          set={() => setToggle(!toggle)} />

        {/**  LIST  */}
        <List
          argonauts={argonauts}
          argonautsLength={argonauts.length}
          toggle={toggle} />
          
      </div>
    </>
  );
}

export default App;
