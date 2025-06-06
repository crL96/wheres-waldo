const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function StartGame() {
    const navigate = useNavigate();

    async function handleStartGame() {
        try {
            const res = await fetch(`${API_URL}/game/start`)
            const resBody = await res.json();
            sessionStorage.setItem("jwt-token", resBody.token);
            navigate("/game");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Where's Waldo?</h1>
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
}

export default StartGame;