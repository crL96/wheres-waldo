const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import waldoImg from "../../assets/waldo.webp";
import { useState } from "react";
import styles from "./startGame.module.css";

function StartGame() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleStartGame() {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/game/start`)
            const resBody = await res.json();
            sessionStorage.setItem("jwt-token", resBody.token);
            navigate("/game");
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Where's Waldo?</h1>
            <img className={styles.waldoImg} src={waldoImg} alt="Waldo" />
            <p>Can you find Waldo and his friends?</p>
            <p>Play the game to see if you can place at the top of the leaderboard</p>
            {loading ?
                <> <p>
                    Loading...
                </p>
                <p>
                    (Due to this project being created for educational purposes it uses a free 
                    tier for publishing the backend that shuts down after inactivity, 
                    give it a little time to boot up.)
                </p></> :
                <button onClick={handleStartGame}>Start Game</button>
            }
        </div>
    );
}

export default StartGame;