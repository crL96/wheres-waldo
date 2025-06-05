import { useEffect, useState } from "react";
import styles from "./messageBox.module.css";

function MessageBox({ attemptRes }) {
    const [currentMsg, setCurrentMsg] = useState(attemptRes ? attemptRes.message : null);

    useEffect(()=> {
        setCurrentMsg(attemptRes ? attemptRes.message : null);

        setTimeout(() => {
            setCurrentMsg(null);
        }, 2000)
    }, [attemptRes])

    if (currentMsg === null) return;

    // Add correct or incorrect css class
    let correctGuess = styles.incorrect;
    if (attemptRes.correct) {
        correctGuess = styles.correct;
    }

    return (
        <div className={`${styles.messageBox} ${correctGuess}`}>
            <p>{currentMsg}</p>
        </div>
    );
}

export default MessageBox;