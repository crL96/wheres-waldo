import waldoImg from "./assets/wheres-waldo.avif";
import './App.css'
import Dropdown from "./components/dropdown/Dropdown";
import MessageBox from "./components/messageBox/MessageBox";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coordinates, setCoordinates] = useState();
  const [dropdownCoordinates, setDropdownCoordinates] = useState();
  const [attemptRes, setAttemptRes] = useState(null);

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
    const character = e.target.textContent;

    const res = await fetch(`${API_URL}/game/attempt`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        character: character,
        x: coordinates.x,
        y: coordinates.y
      })
    });
    const resJson = await (res.json());
    setAttemptRes(resJson);
    setTimeout(() => {
      setAttemptRes(null)
    }, 2000)

    setDropdownCoordinates(null); // Remove dropdown
  }

  return (
    <>
      <h1>Where's Waldo?</h1>
      <img src={waldoImg} alt="Where's Waldo" onClick={handleClick}/>
      <Dropdown coordinates={dropdownCoordinates} handleSelect={handleCharacterSelect}/>
      { attemptRes ?
        <MessageBox attemptRes={attemptRes}/>
        : null }
    </>
  )
}

export default App
