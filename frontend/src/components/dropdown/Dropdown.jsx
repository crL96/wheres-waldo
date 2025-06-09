import styles from "./dropdown.module.css";

function Dropdown({ coordinates, handleSelect, characters }) {
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
            {characters.map((character) => {
                return (
                    <p className={styles.character} onClick={handleSelect}>
                {character}
            </p>
                );
            })}
        </div>
    );
}

export default Dropdown;
