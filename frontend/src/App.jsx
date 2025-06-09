import waldoImg from "./assets/wheres-waldo.avif";
import './App.css'
import Dropdown from "./components/dropdown/Dropdown";
import MessageBox from "./components/messageBox/MessageBox";
import Endscreen from "./components/endscreen/Endscreen";
import Characters from "./components/characters/Characters";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coordinates, setCoordinates] = useState();
  const [dropdownCoordinates, setDropdownCoordinates] = useState();
  const [attemptRes, setAttemptRes] = useState(null);
  const [score, setScore] = useState(null);
  const [charactersLeft, setCharactersLeft] = useState(["Waldo", "Odlaw", "Wizard"])

  function getNormalizedCoordinates(e) {
    const xAbs = e.pageX - e.target.offsetLeft;
    const yAbs = e.pageY - e.target.offsetTop;

    const xNorm = xAbs / e.target.width;
    const yNorm = yAbs / e.target.height;
    return { x: xNorm, y: yNorm };
  }

  function handleClick(e) {
    setCoordinates(getNormalizedCoordinates(e));

    if (!dropdownCoordinates) {
      setDropdownCoordinates({ x: e.pageX, y: e.pageY });
    } else {
      setDropdownCoordinates(null);
    }
  }

  async function handleCharacterSelect(e) {
    setDropdownCoordinates(null); // Remove dropdown
    
    const character = e.target.textContent;

    const res = await fetch(`${API_URL}/game/attempt`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "authorization": sessionStorage.getItem("jwt-token"),
      },
      body: JSON.stringify({
        character: character,
        x: coordinates.x,
        y: coordinates.y
      })
    });
    const resJson = await (res.json());
    // Update jwt token if a new one is returned
    if(resJson.token) {
      sessionStorage.setItem("jwt-token", resJson.token);
      //New token only sent on successful attempts, set remaining characters
      setCharactersLeft(charactersLeft.filter(item => item !== e.target.textContent));
    }
    if (resJson.gameComplete) {
      setScore(resJson.gameComplete);
    }

    setAttemptRes(resJson);
    setTimeout(() => {
      setAttemptRes(null)
    }, 2000)
  }

  return (
    <>
      <header>
        <h1>Where's Waldo?</h1>
        <Characters characters={charactersLeft}/>
      </header>
      <img className="gameboard" src={waldoImg} alt="Where's Waldo" onClick={handleClick}/>
      <Dropdown coordinates={dropdownCoordinates} handleSelect={handleCharacterSelect} characters={charactersLeft}/>
      { attemptRes ?
        <MessageBox attemptRes={attemptRes}/>
        : null }
      { score ? 
        <Endscreen score={score} />
        : null }
    </>
  )
}

export default App
