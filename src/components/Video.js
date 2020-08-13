import React from "react";
import styles from "./Video.module.scss";

import VideoList from "./VideoList";

function Video() {
    return (
        <div className={styles.Video}>
            <h1 className={styles.Title}>{"\u00A0"}</h1>
            <p className={styles.VideoInfo}>{"\u00A0"}</p>
            <div className={styles.Actions}>
                <div>
                    <span class="material-icons">thumb_up_alt</span>
                    <p>123</p>
                </div>
                <div>
                    <span class="material-icons">thumb_down_alt</span>
                    <p>123</p>
                </div>
                <div>
                    <span class="material-icons">reply</span>
                    <p>Share</p>
                </div>
                <div>
                    <span class="material-icons">cloud_download</span>
                    <p>Download</p>
                </div>
                <div>
                    <span class="material-icons">library_add</span>
                    <p>Save</p>
                </div>
            </div>

            <div className={styles.ChannelInfo}>
                <img alt="channel_profile_pic" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
                <p className={styles.Name}>{"\u00A0"}</p>
                <p className={styles.SubscriberCount}>{"\u00A0"}</p>
                <h1 className={styles.SubscribeStatus}>SUBSCRIBED</h1>
                <div className={styles.NotificationBell}>
                    <span class="material-icons">notifications</span>
                </div>
            </div>
            <div className={styles.Comments}>
                <div className={styles.CommentTitle}>
                    <h1>Comments</h1>
                    <p>{"\u00A0"}</p>
                </div>
                <div className={styles.Comment}>
                    <img alt="user_profile_pic" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
                    <p>{"\u00A0"}</p>
                </div>
            </div>
            <VideoList />
        </div>
    );
}

export default Video;
