import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Accueil</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/survey_builder" style={styles.navLink}> Survey builder </Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/form_example" style={styles.navLink}> Exemple </Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/show_data" style={styles.navLink}> Show data </Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#282c34",
        padding: "1rem",
    },
    navList: {
        display: "flex",
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    navItem: {
        margin: "0 1rem",
    },
    navLink: {
        color: "white",
        textDecoration: "none",
        fontSize: "1.2rem",
    },
};

export default Navbar;
