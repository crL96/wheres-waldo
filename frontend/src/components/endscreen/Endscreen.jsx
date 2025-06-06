const API_URL = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";

function Endscreen({ score }) {

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
            if (res.status(200)) {
                //TODO redirect to leaderboard page once implemented
                console.log(res);
            } else {
                console.log("Response status code: " + res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <dialog open>
            <h2>Game Complete!</h2>
            <p>It took you {Math.round((score / 1000) * 100) / 100} seconds</p>
            <form onSubmit={handleScoreSubmit}>
                <legend>Post your score to the leaderboard</legend>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" />
                <button type="submit">Submit</button>
            </form>
            <p>Don't want to submit? Click <Link to="/">here</Link> to play again</p>
        </dialog>
    );
}

export default Endscreen;