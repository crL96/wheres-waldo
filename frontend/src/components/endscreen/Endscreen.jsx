const API_URL = import.meta.env.VITE_API_URL;
import { Link, useNavigate } from "react-router-dom";
import styles from "./endscreen.module.css";

function Endscreen({ score }) {
    const navigate = useNavigate();

    async function handleScoreSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = Object.fromEntries(formData).name;

        try {
            const res = await fetch(`${API_URL}/game/leaderboard`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "authorization": sessionStorage.getItem("jwt-token"),
                },
                body: JSON.stringify({
                    name: name,
                })
            });
            if (res.status === 200) {
                navigate("/leaderboard");
            } else {
                console.log("Response status code: " + res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <dialog open className={styles.dialog}>
            <h2>Game Complete!</h2>
            <p>It took you {Math.round((score / 1000) * 100) / 100} seconds</p>
            <form onSubmit={handleScoreSubmit}>
                <legend>Post your score to the leaderboard</legend>
                <input type="text" name="name" id="name" placeholder="Enter your name here"/>
                <button type="submit">Submit</button>
            </form>
            <p>Don't want to submit? Click <Link to="/">here</Link> to play again</p>
        </dialog>
    );
}

export default Endscreen;