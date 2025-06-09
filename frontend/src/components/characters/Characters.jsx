import waldoImg from "../../assets/waldo.webp";
import odlawImg from "../../assets/odlaw.webp";
import wizardImg from "../../assets/wizard.gif";
import styles from "./characters.module.css";

function Characters({ characters }) {
    return (
        <div className={styles.container}>
            <h2>Characters to find</h2>
            {characters.includes("Waldo")? 
                <img className={styles.character} src={waldoImg} alt="Waldo" />
            : null}
            {characters.includes("Odlaw")? 
                <img className={styles.character} src={odlawImg} alt="Odlaw" />
            : null}
            {characters.includes("Wizard")? 
                <img className={styles.character} src={wizardImg} alt="Wizard" />
            : null}
        </div>
    );
}

export default Characters;