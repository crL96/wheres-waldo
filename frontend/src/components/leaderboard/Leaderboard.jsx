const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(API_URL + "/game/leaderboard");
            if (res.status === 200) {
                const data = await res.json()
                setLeaderboard(data.leaderboard);
            }
        }
        fetchPosts()
            .catch((error) => console.log(error));
    }, [navigate]) 

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
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{Math.round((item.timeToComplete / 1000) * 100) / 100} seconds</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={handleStartGame}>Play Again</button>
        </div>
    );
}

export default Leaderboard;