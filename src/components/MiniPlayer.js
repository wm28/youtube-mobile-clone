import React from "react";
import styles from "./MiniPlayer.module.scss";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import Video from "./Video";
import useWindowDimension from "../hooks/useWindowDimensions";

import {
    progressMap,
    projection,
    findLimit,
    findNearestNumberInArray,
} from "../utils/animations";

function MiniPlayer(props, ref) {
    const { children } = props;

    const drawerStates = { CLOSED: 0, MINIMIZED: 1, MAXIMIZED: 2 };

    const stateRef = React.useRef(drawerStates.MINIMIZED);
    const childrenRef = React.useRef(null);

    // Height definitions to control overall layout
    const [, height] = useWindowDimension();
    const minimizedHeight = 100;
    const windowHeight = height;
    // NavBar height
    const childrenHeight = 50;

    /* Array values corresponds to the top attribute of the miniplayer
       0: closed, 1: minimized, 2: maximized (Note: Index of array
       corresponds to the respective values of the drawerState) */
    const stops = [
        windowHeight,
        windowHeight - minimizedHeight - childrenHeight,
        0,
    ];

    const [{ y }, set] = useSpring(() => ({
        y: stops[stateRef.current],
        config: {
            clamp: true,
        },
    }));
    set({ y: stops[stateRef.current] });
    /* Make this component's ref accessible to parent so that parent can trigger
       the openning of the MiniPlayer (This is done for the sake of simplicity and better
       seperation of concern) */
    React.useImperativeHandle(ref, () => ({
        open() {
            if (stateRef.current === drawerStates.CLOSED) {
                minimize();
            }
        },
    }));

    const maximize = React.useCallback(() => {
        stateRef.current = drawerStates.MAXIMIZED;
        set({ y: stops[drawerStates.MAXIMIZED] });
    }, [set, drawerStates, stops]);

    const minimize = React.useCallback(() => {
        stateRef.current = drawerStates.MINIMIZED;
        set({ y: stops[drawerStates.MINIMIZED] });
    }, [set, drawerStates, stops]);

    const handleClick = () => {
        if (stateRef.current === drawerStates.MINIMIZED) {
            maximize();
        } else if (stateRef.current === drawerStates.MAXIMIZED) {
            minimize();
        }
    };

    const bind = useDrag((state) => {
        let {
            event,
            last,
            vxvy: [, vy],
            movement: [, my],
            memo,
            tap,
        } = state;
        // Prevent child elements on the miniplayer from prematurely cancelling the drag
        // gesture on the miniplayer
        event.preventDefault();

        if (last) {
            // Detect click
            if (tap) {
                handleClick();
                return;
            }
            let projectedPosition =
                stops[stateRef.current] + my + projection(vy);
            set({
                y: findNearestNumberInArray(projectedPosition, memo.limits),
            });
            stateRef.current = stops.findIndex(
                (x) =>
                    x ===
                    findNearestNumberInArray(projectedPosition, memo.limits)
            );
            return;
        }

        if (!memo) {
            // Detect which state the gesture is going to transition to and save it in the memo
            if (stateRef.current === drawerStates.MAXIMIZED) {
                memo = { limits: [stops[2], stops[1]] };
            } else if (stateRef.current === drawerStates.MINIMIZED) {
                if (my > 0) {
                    memo = { limits: [stops[1], stops[0]] };
                } else if (my < 0) {
                    memo = { limits: [stops[2], stops[1]] };
                }
            } else {
                memo = { limits: [stops[0], stops[1]] };
            }
        } else {
            let distanceFromTop = stops[stateRef.current] + my;
            set({
                y: findLimit(distanceFromTop, memo.limits[0], memo.limits[1]),
                immediate: true,
            });
        }
        return memo;
    });

    return (
        <>
            <animated.div style={{ top: y }} className={styles.MiniPlayer}>
                <animated.div
                    {...bind()}
                    className={styles.MinimizedContent}
                    style={{
                        width: y.interpolate((y) =>
                            progressMap(
                                [stops[0], stops[1], stops[1] * 0.95, stops[2]],
                                [
                                    window.innerWidth,
                                    window.innerWidth,
                                    window.innerWidth * 2,
                                    window.innerWidth * 2,
                                ],
                                y
                            )
                        ),
                        height: y.interpolate(
                            [stops[1], stops[2]],
                            [minimizedHeight, (window.innerHeight * 1) / 3]
                        ),
                    }}
                >
                    <animated.div
                        className={styles.Video}
                        style={{
                            width: y.interpolate((y) =>
                                progressMap(
                                    [
                                        stops[0],
                                        stops[1],
                                        stops[1] * 0.95,
                                        stops[2],
                                    ],
                                    [
                                        minimizedHeight * (16 / 9),
                                        minimizedHeight * (16 / 9),
                                        window.innerWidth,
                                        window.innerWidth,
                                    ],
                                    y
                                )
                            ),
                        }}
                    >
                        <img
                            alt="video_thumbnail"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        />
                    </animated.div>
                    <animated.div
                        className={styles.VideoInfo}
                        style={{
                            opacity: y.interpolate(
                                [stops[1], stops[1] * 0.9],
                                [1, 0]
                            ),
                        }}
                    >
                        <p>{"\u00A0"}</p>
                        <p>{"\u00A0"}</p>
                    </animated.div>
                    <animated.div
                        className={styles.VideoControl}
                        style={{
                            opacity: y.interpolate(
                                [stops[1], stops[1] * 0.9],
                                [1, 0]
                            ),
                        }}
                    >
                        <span class="material-icons">play_arrow</span>
                        <span class="material-icons">close</span>
                    </animated.div>
                    <div className={styles.ProgressBar}>
                        <div></div>
                    </div>
                </animated.div>
                <animated.div
                    className={styles.MaximixedContent}
                    style={{
                        opacity: y.interpolate([stops[1], stops[2]], [0, 1]),
                    }}
                >
                    <Video />
                </animated.div>
            </animated.div>
            <animated.div
                ref={childrenRef}
                className={styles.NavBar}
                style={{
                    bottom: y.interpolate((y) =>
                        progressMap(
                            [stops[0], stops[1], stops[2]],
                            [0, 0, -100],
                            y
                        )
                    ),
                }}
            >
                {children}
            </animated.div>
        </>
    );
}

export default React.forwardRef(MiniPlayer);
