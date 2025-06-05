import styles from "./dropdown.module.css";

function Dropdown({ coordinates, handleSelect }) {
    if (!coordinates) return null;

    return (
        <div
            className={styles.dropdown}
            style={{
                position: "absolute",
                top: coordinates.y,
                left: coordinates.x,
            }}
        >
            <p className={styles.character} onClick={handleSelect}>
                Waldo
            </p>
            <p className={styles.character} onClick={handleSelect}>
                Odlaw
            </p>
            <p className={styles.character} onClick={handleSelect}>
                Wizard
            </p>
        </div>
    );
}

export default Dropdown;
