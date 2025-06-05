import styles from "./messageBox.module.css";

function MessageBox({ attemptRes }) {
    // Add correct or incorrect css class
    let correctGuess = styles.incorrect;
    if (attemptRes.correct) {
        correctGuess = styles.correct;
    }

    return (
        <div className={`${styles.messageBox} ${correctGuess}`}>
            <p>{attemptRes.message}</p>
        </div>
    );
}

export default MessageBox;