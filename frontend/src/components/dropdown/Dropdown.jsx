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
            {characters.map((character, index) => {
                return (
                    <p key={index} className={styles.character} onClick={handleSelect}>
                {character}
            </p>
                );
            })}
        </div>
    );
}

export default Dropdown;
