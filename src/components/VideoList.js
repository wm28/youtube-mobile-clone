import React from "react";
import styles from "./VideoList.module.scss";

function VideoList(props) {
    let { onClick } = props;
    return (
        <div className={styles.VideoList}>
            {Array.from(Array(10)).map((video) => (
                <div className={styles.VideoListItem} onClick={onClick}>
                    <img
                        alt="video_preview_thumbnail"
                        className={styles.PreviewImage}
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    />
                    <div>
                        <img
                            alt="channel_profile_photo"
                            className={styles.ChannelImage}
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        />
                        <h1>{"\u00A0"}</h1>
                        <p>{"\u00A0"}</p>
                        <div className={styles.More}>
                            <span class="material-icons">more_vert</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default VideoList;
