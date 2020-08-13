import React from "react";
import styles from "./NavBar.module.scss";

function NavBar() {
    return (
        <div className={styles.NavBar}>
            <div>
                <span class="material-icons">home</span>
                <p>Home</p>
            </div>
            <div>
                <span class="material-icons">explore</span>
                <p>Explore</p>
            </div>
            <div>
                <span class="material-icons">subscriptions</span>
                <p>Subscriptions</p>
            </div>
            <div>
                <span class="material-icons">notifications</span>
                <p>Notifications</p>
            </div>
            <div>
                <span class="material-icons">video_library</span>
                <p>Libraries</p>
            </div>
        </div>
    );
}

export default NavBar;
