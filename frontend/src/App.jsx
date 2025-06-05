import waldoImg from "./assets/wheres-waldo.avif";
import './App.css'
import Dropdown from "./components/dropdown/Dropdown";
import { useState } from "react";

function App() {
  const [coordinates, setCoordinates] = useState();
  const [dropdownCoordinates, setDropdownCoordinates] = useState();

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

  function handleCharacterSelect(e) {
    //Post request to backend with coordinates and character selection
    console.log(e.target.textContent); // character selection
    console.log(coordinates);

    setDropdownCoordinates(null); // Remove dropdown
  }

  return (
    <>
      <h1>Where's Waldo?</h1>
      <img src={waldoImg} alt="Where's Waldo" onClick={handleClick}/>
      <Dropdown coordinates={dropdownCoordinates} handleSelect={handleCharacterSelect}/>
    </>
  )
}

export default App
