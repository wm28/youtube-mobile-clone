import React, { useRef } from "react";
import styles from "./App.module.scss";

import MiniPlayer from "./components/MiniPlayer";
import VideoList from "./components/VideoList";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";


function App() {
    const miniPlayerRef = useRef();

    const handleClick = () => {
        miniPlayerRef.current.open();
    };
    return (
        <div className={styles.MainPage}>
            <TopBar />
            <VideoList onClick={handleClick} />
            <MiniPlayer ref={miniPlayerRef}>
                <NavBar />
            </MiniPlayer>
        </div>
    );
}

export default App;
