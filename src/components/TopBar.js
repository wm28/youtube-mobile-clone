import React from "react";
import styles from "./TopBar.module.scss";
import { ReactComponent as Brand } from "../assets/brand.svg";

function TopBar() {
    return (
        <div className={styles.TopBar}>
            <div className={styles.Brand}>
                <Brand className={styles.Logo}/>
                <span>NotYouTube</span>
            </div>
            <div className={styles.TopBarNav}>
                <div>
                    <span class="material-icons">videocam</span>
                </div>
                <div>
                    <span class="material-icons">search</span>
                </div>
                <div>
                    <span class="material-icons">person</span>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
