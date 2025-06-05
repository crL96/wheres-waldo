import waldoImg from "./assets/wheres-waldo.avif";
import './App.css'

function App() {

  function getNormalizedCoordinates(e) {
    const xAbs = e.pageX - e.target.offsetLeft;
    const yAbs = e.pageY - e.target.offsetTop;

    const xNorm = xAbs / e.target.width;
    const yNorm = yAbs / e.target.height;
    return { x: xNorm, y: yNorm };
  }

  function handleClick(e) {
    const coordinates =  getNormalizedCoordinates(e);
    console.log(coordinates);
  }

  return (
    <>
      <h1>Where's Waldo?</h1>
      <img src={waldoImg} alt="Where's Waldo" onClick={handleClick}/>
    </>
  )
}

export default App
