  
\<\!doctype html\>  
\<html lang="en"\>  
    \<head\>  
        \<script\>  
            // Set before first paint, while the module graph is still downloading.  
            document.documentElement.classList.add('experience-booting');  
            setTimeout( () \=\> document.documentElement.classList.remove('experience-booting'), 8000);  
        \</script\>  
        \<meta charset="UTF-8"/\>  
        \<base href="/"\>  
        \<meta name="viewport" content="width=device-width, initial-scale=1"/\>  
        \<meta name="theme-color" content="\#141414"/\>  
        \<link rel="icon" href="./assets/icons/favicon.ico" sizes="16x16 32x32 48x48"/\>  
        \<link rel="icon" href="./assets/icons/icon-32.png" type="image/png" sizes="32x32"/\>  
        \<link rel="apple-touch-icon" href="./assets/icons/icon-180.png" sizes="180x180"/\>  
        \<link rel="manifest" href="./site.webmanifest"/\>  
        \<link rel="preload" as="font" href="/assets/fonts/RestartSoft-Regular.woff2" type="font/woff2" crossorigin/\>  
        \<style data-site-styles\>  
            @font-face {  
                font-family: "Restart Soft";  
                src: url("/assets/fonts/RestartSoft-Regular.woff2") format("woff2");  
                font-style: normal;  
                font-weight: 400;  
                font-display: swap;  
            }

            @font-face {  
                font-family: "ABC Diatype Mono";  
                src: url("/assets/fonts/ABCDiatypeMono-Regular.woff2") format("woff2");  
                font-style: normal;  
                font-weight: 400;  
                font-display: swap;  
            }

            @font-face {  
                font-family: "Restart Soft";  
                src: url("/assets/fonts/RestartSoft-Medium.woff2") format("woff2");  
                font-weight: 500;  
                font-display: swap;  
            }

            @font-face {  
                font-family: "Restart Soft";  
                src: url("/assets/fonts/RestartSoft-SemiBold.woff2") format("woff2");  
                font-weight: 600;  
                font-display: swap;  
            }

            @font-face {  
                font-family: "Restart Soft";  
                src: url("/assets/fonts/RestartSoft-Bold.woff2") format("woff2");  
                font-weight: 700;  
                font-display: swap;  
            }

            :root {  
                color-scheme: dark;  
                font-family: "Restart Soft", Arial, sans-serif;  
                font-synthesis: none;  
                \--paper: \#fafafa;  
                \--mono: "ABC Diatype Mono", "SFMono-Regular", Consolas, monospace;  
                \--card-width: 414px;  
                \--card-height: 103.142px;  
                \--card-gap: 12px;  
                \--opening-position: 50%;  
            }

            \* {  
                box-sizing: border-box;  
            }

            html, body {  
                width: 100%;  
                height: 100%;  
                margin: 0;  
                overflow: hidden;  
                overscroll-behavior: none;  
            }

            body {  
                background: var(--paper);  
            }

            button, a {  
                \-webkit-tap-highlight-color: transparent;  
            }

            button {  
                font: inherit;  
                color: inherit;  
                cursor: pointer;  
            }

            button:focus-visible, a:focus-visible, \[tabindex\]:focus-visible {  
                outline: 2px solid \#f3ff47;  
                outline-offset: 6px;  
            }

            button {  
                border: 0;  
            }

            .stage {  
                position: fixed;  
                inset: 4px;  
                overflow: clip;  
                border-radius: 20px;  
                background: \#080808;  
                isolation: isolate;  
            }

            .opening, .next-scene {  
                position: absolute;  
                inset: 0;  
            }

            .opening {  
                z-index: 1;  
            }

            .reel {  
                position: absolute;  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
                pointer-events: none;  
            }

            .video-reveal {  
                position: absolute;  
                inset: 0;  
                background: \#000;  
                pointer-events: none;  
            }

            .reel-shade {  
                position: absolute;  
                inset: 0;  
                background: rgba(0,0,0,.55);  
                pointer-events: none;  
            }

            .reel-dither {  
                position: absolute;  
                inset: 0;  
                pointer-events: none;  
                opacity: .065;  
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http\://www\.w3.org/2000/svg' width='4' height='4'%3E%3Cpath fill='white' d='M0 0h1v1H0zM2 2h1v1H2z'/%3E%3Cpath fill='black' d='M2 0h1v1H2zM0 2h1v1H0z'/%3E%3C/svg%3E");  
            }

            .spotlight {  
                position: absolute;  
                inset: 0;  
                z-index: 8;  
                pointer-events: none;  
                background: radial-gradient(circle 360px at var(--light-x,50%) var(--light-y,45%), transparent 0%, \#00000006 35%, \#00000028 100%);  
                opacity: 0;  
                transition: opacity 650ms ease;  
            }

            @media (hover: hover) and (pointer:fine) {  
                .stage\[data-light="true"\] .spotlight {  
                    opacity: 1;  
                }  
            }

            .entry {  
                position: absolute;  
                inset: 0;  
                z-index: 6;  
                background: \#000;  
                transition: opacity 700ms ease, visibility 700ms;  
            }

            .entry\[hidden\] {  
                display: none;  
            }

            .entry.leaving {  
                opacity: 0;  
                visibility: hidden;  
                pointer-events: none;  
            }

            .entry-image,.entry-dither {  
                position: absolute;  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
                opacity: 0;  
                transition: opacity 700ms ease;  
            }

            .entry-image {  
                object-position: var(--opening-position) center;  
            }

            .entry-dither {  
                image-rendering: pixelated;  
            }

            .entry-spotlight {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                image-rendering: pixelated;  
                pointer-events: none;  
                opacity: 0;  
                transition: opacity 450ms ease;  
                mask-image: radial-gradient(circle 240px at var(--light-x,50%) var(--light-y,45%), \#000 0%, \#000 35%, transparent 100%);  
                \-webkit-mask-image: radial-gradient(circle 240px at var(--light-x,50%) var(--light-y,45%), \#000 0%, \#000 35%, transparent 100%);  
            }

            @media (hover: hover) and (pointer:fine) {  
                .stage\[data-phase="entry"\]\[data-light="true"\] .entry-spotlight {  
                    opacity: .9;  
                }  
            }

            .entry-center {  
                position: absolute;  
                inset: 0;  
                display: flex;  
                align-items: center;  
                justify-content: center;  
                flex-direction: column;  
            }

            .entry-logo {  
                position: relative;  
                width: 200.8px;  
                height: 34px;  
                overflow: hidden;  
                animation: logo-rise 1100ms cubic-bezier(.22,1,.36,1) both;  
            }

            .entry-logo img {  
                display: block;  
                width: 100%;  
                height: 100%;  
                opacity: .18;  
            }

            .entry-logo .entry-logo-fill {  
                position: absolute;  
                inset: 0;  
                opacity: 1;  
                clip-path: inset(0 calc(100% \- var(--load-progress,0%)) 0 0);  
                transition: clip-path 500ms cubic-bezier(.22,1,.36,1);  
            }

            .entry-status {  
                position: absolute;  
                top: calc(50% \+ 51px);  
                font-family: var(--mono);  
                font-size: 10px;  
                color: \#ffffff80;  
                text-transform: uppercase;  
                letter-spacing: .04em;  
            }

            .entry-actions {  
                position: absolute;  
                top: calc(50% \+ 51px);  
                width: 137.895px;  
                transform: translateX(-3px);  
                display: flex;  
                flex-direction: column;  
                gap: 8px;  
            }

            .entry-actions\[hidden\] {  
                display: none;  
            }

            .enter-sound,.enter-silent {  
                display: flex;  
                align-items: center;  
                justify-content: center;  
                gap: 10px;  
                width: 100%;  
                min-height: 41px;  
                padding: 14px 16px;  
                border-radius: 17.19px;  
                font: 500 11px/13px "Restart Soft", Arial, sans-serif;  
                color: \#fff;  
                white-space: nowrap;  
                transition: background-color 200ms ease;  
            }

            .enter-sound,.enter-silent {  
                \-webkit-backdrop-filter: blur(28px) saturate(130%);  
                backdrop-filter: blur(28px) saturate(130%);  
                box-shadow: inset 0 1px 0 \#ffffff30,inset 0 0 0 1px \#ffffff12,0 6px 20px \#00000012;  
            }

            .enter-sound {  
                background: rgba(243,243,243,.2);  
            }

            .enter-silent {  
                background: rgba(64,64,64,.2);  
            }

            .enter-sound img {  
                display: block;  
                width: 11.895px;  
                height: 8.701px;  
                flex-shrink: 0;  
            }

            .enter-silent img {  
                display: block;  
                width: 6.211px;  
                height: 7.723px;  
                flex-shrink: 0;  
            }

            .enter-sound:hover {  
                background: rgba(243,243,243,.28);  
            }

            .enter-silent:hover {  
                background: rgba(100,100,100,.3);  
            }

            .stage:is(\[data-phase="loading"\],\[data-phase="entry"\],\[data-phase="starting"\]) .site-header, .stage:is(\[data-phase="loading"\],\[data-phase="starting"\]) .sound-button {  
                visibility: hidden;  
            }

            .no-script {  
                position: fixed;  
                z-index: 20;  
                bottom: 30px;  
                width: 100%;  
                text-align: center;  
                color: white;  
            }

            .no-script a {  
                color: inherit;  
            }

            @keyframes logo-rise {  
                from {  
                    opacity: 0;  
                    transform: translateY(20px);  
                }

                to {  
                    opacity: 1;  
                    transform: translateY(0);  
                }  
            }

            .site-header {  
                position: absolute;  
                inset: 0 0 auto;  
                z-index: 10;  
                pointer-events: none;  
            }

            .logo {  
                position: absolute;  
                left: 16px;  
                top: 16px;  
                width: 88.571px;  
                height: 44px;  
                padding-bottom: 29px;  
                box-sizing: border-box;  
                pointer-events: auto;  
            }

            .logo img {  
                display: block;  
                width: 100%;  
                height: 100%;  
            }

            .header-actions {  
                position: absolute;  
                top: 12px;  
                right: 12px;  
                display: flex;  
                align-items: center;  
                gap: 8px;  
                padding: 3.65px;  
                height: 53px;  
                border: .254px solid rgba(255,255,255,.65);  
                border-radius: 12px;  
                background: rgba(255,255,255,.2);  
                backdrop-filter: blur(6.253px);  
                \-webkit-backdrop-filter: blur(6.253px);  
                pointer-events: auto;  
            }

            .profile-button {  
                padding: 0;  
                width: 44px;  
                height: 45px;  
                border-radius: 8px;  
                background: \#f3ff47;  
            }

            .profile-button img, .contact img {  
                display: block;  
                width: 100%;  
                height: 100%;  
            }

            .contact {  
                display: block;  
                width: 45.925px;  
                height: 45.702px;  
                border-radius: 8px;  
                overflow: hidden;  
            }

            .site-menu {  
                position: fixed;  
                inset: 80px 16px auto auto;  
                margin: 0;  
                padding: 6px;  
                min-width: 175px;  
                background: rgba(34,34,34,.88);  
                border: 1px solid \#ffffff26;  
                border-radius: 12px;  
                backdrop-filter: blur(20px);  
                pointer-events: auto;  
                box-shadow: 0 12px 40px \#0005;  
            }

            .site-menu button {  
                display: block;  
                width: 100%;  
                padding: 12px;  
                text-align: left;  
                font-size: 14px;  
                background: transparent;  
                border-radius: 7px;  
            }

            .site-menu button:hover {  
                background: \#ffffff14;  
            }

            .sound-button {  
                position: absolute;  
                z-index: 10;  
                bottom: 9px;  
                right: 13px;  
                width: 32px;  
                height: 32px;  
                display: grid;  
                place-items: center;  
                background: transparent;  
                border-radius: 50%;  
                opacity: .65;  
            }

            .sound-button:hover, .sound-button\[aria-pressed="true"\] {  
                opacity: 1;  
            }

            .sound-button img {  
                width: 10.604px;  
                height: 11.722px;  
            }

            .notifications {  
                position: absolute;  
                top: calc(50% \- 11.4px);  
                left: 50%;  
                width: min(var(--card-width), calc(100vw \- 40px));  
                height: var(--card-height);  
                transform: translate(-50%, \-50%);  
                border-radius: 17.19px;  
                cursor: default;  
                outline-offset: 10px;  
                touch-action: pan-y;  
            }

            .notifications\[data-ready="true"\] {  
                cursor: pointer;  
            }

            .notifications\[data-expanded="true"\]::before {  
                content: "";  
                position: absolute;  
                inset: calc(-1 \* var(--fan-reach)) \-16px;  
            }

            .notification-list {  
                position: relative;  
                width: 100%;  
                height: 100%;  
                margin: 0;  
                padding: 0;  
                list-style: none;  
            }

            .notification {  
                position: absolute;  
                inset: 0;  
                height: var(--card-height);  
                transform-origin: center center;  
                will-change: transform;  
                border-radius: 17.19px;  
                backdrop-filter: blur(22px) saturate(135%);  
                \-webkit-backdrop-filter: blur(22px) saturate(135%);  
                background: rgba(48,48,48,.52);  
                box-shadow: inset 0 0 0 .75px \#ffffff2b, inset 0 1px 0 \#ffffff18, 0 8px 24px \#0003;  
                transition: transform 520ms cubic-bezier(.22,1,.36,1), background-color 300ms ease;  
            }

            .notification-glass {  
                position: relative;  
                width: 100%;  
                height: 100%;  
                overflow: hidden;  
                border-radius: inherit;  
                background: linear-gradient(135deg, \#ffffff08, \#ffffff00 45%, \#ffffff03);  
            }

            .notification\[data-depth\]:not(\[data-depth="0"\]) {  
                background-color: rgba(83,83,83,.82);  
            }

            .notifications\[data-expanded="true"\] .notification {  
                background-color: rgba(48,48,48,.52);  
            }

            .notification-content {  
                height: 100%;  
                transition: opacity 260ms ease;  
            }

            .notification\[data-depth\]:not(\[data-depth="0"\]) .notification-content {  
                opacity: 0;  
            }

            .notifications\[data-expanded="true"\] .notification .notification-content {  
                opacity: 1;  
            }

            .portrait {  
                \--portrait-size: 91.682px;  
                position: absolute;  
                top: calc((var(--card-height) \- var(--portrait-size)) / 2);  
                left: calc((var(--card-height) \- var(--portrait-size)) / 2);  
                width: var(--portrait-size);  
                height: var(--portrait-size);  
                border-radius: 11.46px;  
                background-image: url('/assets/portraits/notification-grid-16.webp');  
                background-size: 400% 400%;  
                background-position: var(--portrait-position);  
            }

            .notification-copy {  
                position: absolute;  
                top: 50%;  
                left: 120px;  
                right: 27.55px;  
                transform: translateY(-50%);  
                display: flex;  
                flex-direction: column;  
                gap: 11.46px;  
            }

            .notification-meta {  
                display: flex;  
                align-items: baseline;  
                justify-content: space-between;  
                gap: 5px;  
                font-family: var(--mono);  
                font-size: 10px;  
                font-weight: 400;  
                line-height: 1;  
                color: \#9c9c9c;  
                text-transform: uppercase;  
            }

            .sender {  
                min-width: 0;  
                letter-spacing: \-.25px;  
            }

            .timestamp {  
                flex-shrink: 0;  
                font-size: 10px;  
                letter-spacing: \-.4px;  
            }

            .message {  
                margin: 0;  
                color: white;  
                font-size: 18px;  
                line-height: 1.12;  
                letter-spacing: \-.72px;  
                font-weight: 400;  
                text-wrap: pretty;  
            }

            .next-scene {  
                display: grid;  
                place-items: center;  
                background: \#080808;  
            }

            .replay-next {  
                padding: 14px 20px;  
                border: 1px solid \#ffffff20;  
                border-radius: 9px;  
                font-family: var(--mono);  
                font-size: 11px;  
                background: \#ffffff08;  
                color: \#aaa;  
            }

            .replay-next:hover {  
                color: white;  
                background: \#ffffff12;  
            }

            .sr-only {  
                position: absolute;  
                width: 1px;  
                height: 1px;  
                padding: 0;  
                margin: \-1px;  
                overflow: hidden;  
                clip: rect(0,0,0,0);  
                white-space: nowrap;  
                border: 0;  
            }

            @media (max-width: 520px) {  
                :root {  
                    \--card-height: 103.142px;  
                    \--card-gap: 10px;  
                    \--opening-position: 65%;  
                }

                .stage {  
                    border-radius: 16px;  
                }

                .logo {  
                    top: 16px;  
                    left: 12px;  
                }

                .header-actions {  
                    right: 10px;  
                    transform: scale(.86);  
                    transform-origin: top right;  
                }

                .portrait {  
                    \--portrait-size: 80px;  
                }

                .notification-copy {  
                    left: 101px;  
                    right: 14px;  
                    gap: 10px;  
                }

                .notification-meta {  
                    font-size: 9px;  
                }

                .timestamp {  
                    font-size: 9px;  
                }

                .message {  
                    font-size: 17px;  
                    letter-spacing: \-.6px;  
                }  
            }

            @media (max-height: 590px) {  
                :root {  
                    \--card-height: 84px;  
                    \--card-gap: 7px;  
                }

                .portrait {  
                    \--portrait-size: 72.54px;  
                }

                .notification-copy {  
                    left: 94px;  
                    gap: 8px;  
                }

                .message {  
                    font-size: 16px;  
                }  
            }

            @media (prefers-reduced-motion: reduce) {  
                \*, \*::before, \*::after {  
                    transition-duration: 1ms \!important;  
                    animation-duration: 1ms \!important;  
                }

                .spotlight,.entry-spotlight {  
                    display: none;  
                }  
            }

            @font-face {  
                font-family: "Perfectly Nineties";  
                src: url('/assets/fonts/PerfectlyNineties-SemiboldItalic.woff2') format('woff2');  
                font-weight: 600;  
                font-style: italic;  
                font-display: swap;  
            }

            .header-actions {  
                padding: 4px;  
                border: 0;  
                backdrop-filter: blur(30px) saturate(130%);  
                \-webkit-backdrop-filter: blur(30px) saturate(130%);  
                box-shadow: inset 0 0 0 .6px \#ffffff28, 0 3px 12px \#0002;  
            }

            .profile-button:disabled,.contact:disabled {  
                cursor: default;  
                opacity: 1;  
            }

            .contact {  
                padding: 0;  
                border: 0;  
                background: transparent;  
            }

            .sound-button {  
                right: auto;  
                left: 4px;  
            }

            .audio-controls {  
                position: absolute;  
                z-index: 10;  
                right: 12px;  
                bottom: 12px;  
                display: flex;  
                align-items: center;  
                gap: 12px;  
                width: 191px;  
                height: 55px;  
                padding: 4px;  
                border-radius: 12px;  
                background: \#ffffff33;  
                backdrop-filter: blur(30px) saturate(130%);  
                \-webkit-backdrop-filter: blur(30px) saturate(130%);  
                box-shadow: inset 0 0 0 .6px \#ffffff28;  
            }

            .audio-channel {  
                display: flex;  
                align-items: center;  
                gap: 12px;  
                padding: 4px 4px 4px 12px;  
                border-radius: 8px;  
                background: \#ffffff33;  
            }

            .channel-icon {  
                width: 15px;  
                height: 11px;  
                object-fit: contain;  
            }

            .channel-icon.waveform {  
                height: 14px;  
            }

            .audio-channel button {  
                display: grid;  
                place-items: center;  
                width: 39.5px;  
                height: 39.32px;  
                padding: 0;  
                border-radius: 4px;  
                background: \#090909;  
            }

            .audio-channel button.playing {  
                background: white;  
            }

            .audio-channel button img {  
                width: 11px;  
                height: 12px;  
                object-fit: contain;  
            }

            .audio-channel button.playing img {  
                width: 6px;  
            }

            .audio-channel button:disabled {  
                cursor: default;  
            }

            .stage:is(\[data-phase="loading"\],\[data-phase="entry"\],\[data-phase="starting"\]) .audio-controls {  
                visibility: hidden;  
            }

            .next-scene {  
                display: block;  
                background: \#000;  
            }

            .next-scene:focus {  
                outline: none;  
            }

            .tornado {  
                position: absolute;  
                inset: 0;  
                perspective: 1700px;  
                visibility: hidden;  
                pointer-events: none;  
            }

            .moment-active .tornado {  
                visibility: visible;  
            }

            .tornado-cards {  
                position: absolute;  
                top: 50%;  
                left: 50%;  
                transform-style: preserve-3d;  
            }

            .tornado-card {  
                position: absolute;  
                top: 0;  
                left: 0;  
                border-radius: 8px;  
                overflow: hidden;  
                background: \#131313;  
                will-change: transform;  
                box-shadow: 0 12px 28px \#0005;  
            }

            .tornado-card img {  
                display: block;  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
            }

            .moment-title {  
                position: absolute;  
                z-index: 3;  
                top: 50%;  
                left: 50%;  
                transform: translate(-50%,-50%);  
                width: 230px;  
                margin: 0;  
                color: \#e7e7e7;  
                font: 600 24.615px/.9 "Restart Soft", sans-serif;  
                letter-spacing: \-1.4769px;  
                text-transform: uppercase;  
                text-align: center;  
                perspective: 500px;  
                text-shadow: 0 1px 12px \#0004;  
            }

            .moment-words {  
                display: block;  
                opacity: 0;  
            }

            .moment-words\>span {  
                display: block;  
            }

            .moment-words .moment-line {  
                display: flex;  
                justify-content: center;  
                align-items: baseline;  
            }

            .moment-line em {  
                font-family: "Perfectly Nineties", serif;  
                font-weight: 600;  
                font-style: italic;  
                text-transform: none;  
                display: inline-block;  
                max-width: 0;  
                opacity: 0;  
                transform: translateY(16px) rotateX(-100deg);  
                transform-origin: center bottom;  
                transition: max-width 650ms cubic-bezier(.22,1,.36,1), margin 650ms ease, opacity 650ms ease, transform 850ms cubic-bezier(.22,1,.36,1);  
            }

            .moment-line\>span {  
                white-space: nowrap;  
            }

            .headline-pixels {  
                position: absolute;  
                width: 230px;  
                height: 54px;  
                top: 0;  
                left: 0;  
                image-rendering: pixelated;  
            }

            .text-ready .moment-words {  
                opacity: 1;  
            }

            .text-ready .headline-pixels {  
                opacity: 0;  
            }

            .for-ready .moment-line em {  
                max-width: 34px;  
                margin-right: 4px;  
                opacity: 1;  
                transform: translateY(0) rotateX(0);  
            }

            @media (prefers-reduced-motion: reduce) {  
                .tornado {  
                    transition: none;  
                }

                .moment-line em {  
                    transition: none;  
                }  
            }

            .next-scene {  
                touch-action: none;  
                cursor: grab;  
                user-select: none;  
            }

            .next-scene.dragging {  
                cursor: grabbing;  
            }

            .tornado-hint {  
                position: absolute;  
                bottom: 28px;  
                left: 50%;  
                transform: translateX(-50%);  
                color: \#ffffff60;  
                font: 9px var(--mono);  
                text-transform: uppercase;  
                letter-spacing: .08em;  
                opacity: 0;  
                transition: opacity 700ms ease;  
                pointer-events: none;  
            }

            .moment-active .tornado-hint {  
                opacity: 1;  
            }

            .explored .tornado-hint {  
                opacity: 0;  
            }

            @media(max-width: 600px) {  
                .tornado-hint {  
                    bottom: 85px;  
                }  
            }

            /\* Desktop 03–05: a native scroll runway with one pinned composition. \*/  
            .story {  
                position: absolute;  
                inset: 0;  
                z-index: 0;  
                overflow-y: auto;  
                overflow-x: hidden;  
                overscroll-behavior: contain;  
                scrollbar-width: none;  
                opacity: 0;  
                visibility: hidden;  
                background: linear-gradient(145deg,\#262626 4%,\#000101 91%);  
                transition: opacity 1400ms ease,visibility 1400ms;  
            }

            .story::-webkit-scrollbar {  
                display: none;  
            }

            .story:focus {  
                outline: none;  
            }

            .story-active {  
                z-index: 2;  
                opacity: 1;  
                visibility: visible;  
            }

            .stage\[data-phase="story-transition"\] .story {  
                visibility: visible;  
                opacity: 1;  
            }

            .story-runway {  
                height: 480%;  
                min-height: 480vh;  
            }

            .story-viewport {  
                position: sticky;  
                top: 0;  
                height: calc(100dvh \- 8px);  
                overflow: hidden;  
            }

            .story-viewport::after {  
                content: "";  
                position: absolute;  
                inset: 0;  
                pointer-events: none;  
                opacity: .035;  
                background-image: var(--grain);  
                z-index: 5;  
            }

            .story-copy {  
                position: absolute;  
                top: 80px;  
                left: 5.58%;  
                width: min(676px,75%);  
                font: 500 33.91px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em;  
                color: \#9d9d9d;  
                transform-origin: top left;  
            }

            .story-copy p {  
                margin: 0 0 1em;  
            }

            .story-copy em,.story-title em {  
                font: 600 italic 1em/1 'Perfectly Nineties',serif;  
            }

            .story-copy \[data-pixel-word\] {  
                transition: color 140ms linear;  
            }

            .pixel-overlay {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                pointer-events: none;  
            }

            .story-title {  
                position: absolute;  
                left: 50%;  
                top: 49%;  
                width: 230px;  
                margin: 0;  
                transform: translate(-50%,var(--title-shift,0px));  
                font: 600 24.615px/.9 'Restart Soft',sans-serif;  
                letter-spacing: \-1.4769px;  
                text-transform: uppercase;  
                text-align: center;  
                color: \#e7e7e7;  
                opacity: 0;  
            }

            .story-title em {  
                text-transform: none;  
            }

            .logo-wall {  
                position: absolute;  
                left: 5.58%;  
                right: 5.58%;  
                top: 81%;  
                display: flex;  
                justify-content: space-between;  
                align-items: center;  
                gap: 24px;  
                height: 52px;  
                opacity: 0;  
            }

            .logo-slot {  
                position: relative;  
                height: 60px;  
                flex: 1;  
                overflow: hidden;  
            }

            .logo-slot img {  
                position: absolute;  
                inset: 0;  
                margin: auto;  
                max-width: 100%;  
                max-height: 47px;  
                width: auto;  
                height: auto;  
            }

            .testimonials {  
                position: absolute;  
                left: 0;  
                right: 0;  
                bottom: 28px;  
                overflow-x: auto;  
                scrollbar-width: none;  
                touch-action: pan-x pan-y;  
                cursor: grab;  
                opacity: 0;  
                overscroll-behavior-x: contain;  
            }

            .testimonials::-webkit-scrollbar {  
                display: none;  
            }

            .testimonials.dragging {  
                cursor: grabbing;  
                user-select: none;  
            }

            .testimonial-track {  
                display: flex;  
                gap: 5px;  
                width: max-content;  
                padding-inline:5.58vw; }

            .testimonial {  
                position: relative;  
                flex: 0 0 331px;  
                width: 331px;  
                height: 361px;  
                border-radius: 12px;  
                overflow: hidden;  
                background: \#303030cc;  
            }

            .testimonial-copy {  
                position: absolute;  
                inset: 20px 20px 86px;  
            }

            .testimonial-copy h3 {  
                width: 254px;  
                max-width: 100%;  
                margin: 0;  
                font: 600 16px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.64px;  
                text-transform: uppercase;  
            }

            .testimonial-copy blockquote {  
                position: absolute;  
                top: 137px;  
                left: 0;  
                width: 228px;  
                margin: 0;  
                color: \#d0d0d0;  
                font: 400 12px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.48px;  
            }

            .person {  
                position: absolute;  
                left: 10px;  
                bottom: 10px;  
                display: flex;  
                align-items: center;  
                gap: 8px;  
                background: \#000;  
                border-radius: 6px;  
                padding: 2px 14px 2px 2px;  
                text-align: left;  
            }

            .person\>img {  
                width: 45px;  
                height: 45px;  
                object-fit: cover;  
                border-radius: 6px;  
            }

            .person p,.person-label {  
                margin: 0;  
                color: \#fff;  
                font: 500 9.354px/1.2 'Restart Soft',sans-serif;  
            }

            .person p span,.person-label\>span {  
                display: block;  
                color: \#8d8d8d;  
            }

            .testimonial-tags {  
                position: absolute;  
                right: 10px;  
                bottom: 10px;  
                margin: 0;  
                font: 10px/1 'ABC Diatype Mono',monospace;  
                text-transform: uppercase;  
                text-align: right;  
                color: \#d0d0d0;  
            }

            .video-testimonial video {  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
                transform: scale(1.15);  
                pointer-events: none;  
            }

            .joy-label {  
                position: absolute;  
                z-index: 10;  
                left: 35px;  
                bottom: 17px;  
                margin: 0;  
                font: 8px/1 monospace;  
                text-transform: uppercase;  
                color: \#d0d0d0;  
                opacity: 0;  
                pointer-events: none;  
            }

            .stage\[data-phase="story"\] .joy-label {  
                opacity: 1;  
            }

            .moment-continue {  
                position: absolute;  
                bottom: 75px;  
                left: 50%;  
                transform: translateX(-50%);  
                z-index: 4;  
                width: 36px;  
                height: 36px;  
                border-radius: 50%;  
                background: \#ffffff12;  
                color: \#bbb;  
            }

            .moment-leaving {  
                background: transparent;  
            }

            .moment-leaving .moment-title,.moment-leaving .tornado-hint,.moment-leaving .moment-continue {  
                opacity: 0;  
                transition: opacity 400ms;  
            }

            .video-dialog {  
                position: fixed;  
                inset: 0;  
                width: 100vw;  
                max-width: none;  
                height: 100dvh;  
                max-height: none;  
                padding: 60px 4vw;  
                margin: 0;  
                border: 0;  
                background: \#080808;  
                color: \#fff;  
            }

            .video-dialog::backdrop {  
                background: \#000;  
            }

            .video-dialog .testimonial-player {  
                width: 100%;  
                height: 100%;  
                border: 0;  
                object-fit: contain;  
            }

            @media(max-width: 1000px) {  
                .logo-slot:nth-child(n+8) {  
                    display:none;  
                }

                .story-copy {  
                    font-size: 28px;  
                    width: min(676px,86%);  
                }  
            }

            @media(max-width: 699px) {  
                .story-copy {  
                    top:90px;  
                    left: 24px;  
                    width: calc(100% \- 48px);  
                    font-size: 22px;  
                }

                .logo-wall {  
                    left: 24px;  
                    right: 24px;  
                    gap: 20px;  
                }

                .logo-slot:nth-child(n+5) {  
                    display: none;  
                }

                .story-title {  
                    top: 53%;  
                }

                .testimonials {  
                    left: 0;  
                    bottom: 84px;  
                }

                .testimonial-track {  
                    padding-inline:24px; }

                .testimonial {  
                    width: 285px;  
                    flex-basis: 285px;  
                    height: 330px;  
                }

                .testimonial-copy blockquote {  
                    top: 120px;  
                }

                .testimonial-tags {  
                    font-size: 8px;  
                }

                .joy-label {  
                    bottom: 20px;  
                }  
            }

            @media(prefers-reduced-motion:reduce) {  
                .story {  
                    transition: none;  
                }

                .story-copy \[data-pixel-word\] {  
                    transition: none;  
                }  
            }

            .stage\[data-phase="story-transition"\] .next-scene {  
                z-index: 1;  
            }

            .stage\[data-phase="story-transition"\] .story-copy,.stage\[data-phase="story-transition"\] .story-title {  
                visibility: hidden;  
            }

            @media(max-width: 699px) {  
                .logo-wall {  
                    top:75%;  
                    height: 35px;  
                }

                .logo-slot {  
                    height: 35px;  
                }

                .logo-slot img {  
                    max-height: 30px;  
                }  
            }

            /\* Glass cards retain the Figma dimensions, typography and person pills. \*/  
            .text-testimonial {  
                background: \#ffffff14;  
                backdrop-filter: blur(30px) saturate(135%);  
                \-webkit-backdrop-filter: blur(30px) saturate(135%);  
                box-shadow: inset 0 0 0 .7px \#ffffff25,inset 0 1px 0 \#ffffff16,0 12px 30px \#00000014;  
            }

            .story-title\>span {  
                display: block;  
            }

            .story-title .story-middle {  
                display: flex;  
                justify-content: center;  
                align-items: baseline;  
                perspective: 500px;  
            }

            .story-want {  
                margin-left: 5px;  
            }

            .story-title .story-insert {  
                display: inline-block;  
                max-width: 0;  
                margin-left: 0;  
                opacity: 0;  
                white-space: nowrap;  
                transform: translateY(23px) rotateX(-95deg) scale(1.18);  
                transform-origin: center bottom;  
                transition: max-width 800ms cubic-bezier(.22,1,.36,1),margin-left 800ms cubic-bezier(.22,1,.36,1),opacity 400ms ease,transform 1000ms cubic-bezier(.16,1,.3,1);  
            }

            .story-title.space-ready .story-insert {  
                max-width: 60px;  
                margin-left: 5px;  
            }

            .story-title.dont-ready .story-insert {  
                opacity: 1;  
                transform: translateY(0) rotateX(0) scale(1);  
            }

            .play-square {  
                position: relative;  
                display: block;  
                flex: 0 0 45px;  
                width: 45px;  
                height: 45px;  
                border-radius: 6px;  
                overflow: hidden;  
            }

            .play-square\>img,.play-pixels {  
                position: absolute;  
                inset: 0;  
                width: 45px;  
                height: 45px;  
            }

            .play-pixels {  
                opacity: 0;  
                pointer-events: none;  
            }

            .pixel-hover .play-pixels {  
                opacity: 1;  
            }

            .pixel-hover .play-square\>img {  
                opacity: 0;  
            }

            @media(prefers-reduced-motion:reduce) {  
                .story-title .story-insert {  
                    transition: none;  
                }  
            }

            .logo-pixels {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                pointer-events: none;  
                image-rendering: pixelated;  
            }

            .moment-continue:disabled {  
                opacity: .25;  
                cursor: default;  
            }

            /\* Desktop 06\. Curved, wrapping cards retain the exact Figma image/caption layout. \*/  
            .projects {  
                position: absolute;  
                inset: 0;  
                z-index: 3;  
                overflow: clip;  
                visibility: hidden;  
                opacity: 0;  
                background: linear-gradient(145deg,\#262626 4%,\#000101 91%);  
                transition: opacity 500ms ease,visibility 500ms;  
            }

            .projects-active {  
                visibility: visible;  
                opacity: 1;  
            }

            .projects:focus {  
                outline: none;  
            }

            .dome-surface {  
                position: absolute;  
                inset: 0;  
                touch-action: none;  
                cursor: grab;  
                user-select: none;  
            }

            .dome-dragging .dome-surface {  
                cursor: grabbing;  
            }

            .dome-tile {  
                position: absolute;  
                left: 50%;  
                top: 50%;  
                transform-origin: 0 0;  
                width: var(--project-width);  
                height: var(--project-height);  
                border-radius: calc(16.554px \* var(--project-scale));  
                overflow: hidden;  
                backface-visibility: hidden;  
                background: \#232323;  
                will-change: transform;  
            }

            .dome-tile\>img {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
                pointer-events: none;  
            }

            .dome-tile::after {  
                content: "";  
                position: absolute;  
                inset: 0;  
                pointer-events: none;  
                background: linear-gradient(to bottom,rgba(128,78,13,0),rgba(26,16,3,.6));  
            }

            .project-caption {  
                position: absolute;  
                z-index: 1;  
                left: calc(20px \* var(--project-scale));  
                right: calc(20px \* var(--project-scale));  
                bottom: calc(20px \* var(--project-scale));  
                display: flex;  
                align-items: flex-end;  
                justify-content: space-between;  
                gap: 12px;  
                pointer-events: none;  
            }

            .project-caption h3 {  
                margin: 0;  
                font: 500 calc(24px \* var(--project-scale))/1.1 "Restart Soft",sans-serif;  
                color: \#fff;  
                letter-spacing: \-.04em;  
            }

            .project-services {  
                margin: 0;  
                flex-shrink: 0;  
                color: \#d0d0d0;  
                font: 400 calc(10px \* var(--project-scale))/1 var(--mono);  
                text-align: right;  
                text-transform: uppercase;  
            }

            .project-controls {  
                position: absolute;  
                z-index: 5;  
                display: flex;  
                gap: 8px;  
                right: 24px;  
                bottom: 52px;  
            }

            .project-controls button {  
                display: flex;  
                align-items: center;  
                justify-content: center;  
                gap: 10px;  
                min-height: 41px;  
                padding: 14px 16px;  
                border-radius: 17.19px;  
                font: 500 11px/13px "Restart Soft",sans-serif;  
                color: \#fff;  
                backdrop-filter: blur(18px) saturate(130%);  
                \-webkit-backdrop-filter: blur(18px) saturate(130%);  
                box-shadow: inset 0 0 0 .5px \#ffffff18;  
                transition: background 200ms ease;  
            }

            .projects-back {  
                background: rgba(64,64,64,.2);  
            }

            .projects-next {  
                background: rgba(232,232,232,.2);  
            }

            .project-controls img {  
                width: 10.254px;  
                height: 10.254px;  
                object-fit: contain;  
            }

            .projects-back img {  
                transform: scaleX(-1);  
            }

            .projects-back:hover {  
                background: rgba(100,100,100,.4);  
            }

            .projects-next:disabled {  
                cursor: default;  
            }

            .stage:is(\[data-phase="projects"\],\[data-phase="projects-transition"\]) .audio-controls {  
                bottom: 12px;  
                transform: scale(.78);  
                transform-origin: bottom right;  
            }

            .stage\[data-phase="projects-transition"\] .story {  
                z-index: 4;  
                pointer-events: none;  
            }

            @media(max-width: 700px) {  
                .project-controls {  
                    right:12px;  
                    bottom: 82px;  
                }  
            }

            /\* September revision: Figma 1030:1711 and 968:526. \*/  
            .entry-logo {  
                position: absolute;  
                left: 2.51%;  
                right: 1.4%;  
                bottom: 1%;  
                width: auto;  
                height: auto;  
                aspect-ratio: 1375/233;  
                overflow: visible;  
                animation: none;  
            }

            .entry-logo\>svg {  
                width: 100%;  
                height: 100%;  
                display: block;  
            }

            .entry-logo\>img {  
                opacity: 0;  
            }

            .entry-actions {  
                top: 46.3%;  
                left: 50%;  
                width: auto;  
                align-items: center;  
                gap: 14px;  
                transform: translateX(-50%);  
                animation: entry-actions-in 900ms backwards;  
            }

            .entry-actions .enter-sound {  
                width: 247px;  
                min-height: 73px;  
                padding: 25px 28px;  
                gap: 18px;  
                font-size: 19.7px;  
                border-radius: 31px;  
            }

            .entry-actions .enter-sound img {  
                width: 21px;  
                height: 16px;  
            }

            .entry-actions .enter-silent {  
                width: 138px;  
                min-height: 41px;  
                font-size: 11px;  
                border-radius: 17px;  
            }

            .entry-intro {  
                position: absolute;  
                z-index: 2;  
                top: 36px;  
                left: 36px;  
                width: 339px;  
                margin: 0;  
                font: 500 14px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.56px;  
                opacity: 0;  
            }

            .entry-since {  
                position: absolute;  
                z-index: 2;  
                top: 32px;  
                right: 30px;  
                display: flex;  
                gap: 9px;  
                align-items: center;  
                font: 8px/1 var(--mono);  
                text-transform: uppercase;  
                color: \#d0d0d0;  
                opacity: 0;  
            }

            .entry-since img {  
                width: 11px;  
                height: 12px;  
            }

            .entry-ready .entry-intro,.entry-ready .entry-since {  
                animation: entry-copy-in 900ms both;  
            }

            /\* Keep opacity off the button group so its glass can sample the scene behind it. \*/  
            @keyframes entry-actions-in {  
                from {  
                    transform: translate(-50%,8px);  
                }

                to {  
                    transform: translate(-50%,0);  
                }  
            }

            @keyframes entry-copy-in {  
                from {  
                    opacity: 0;  
                    translate: 0 8px  
                }

                to {  
                    opacity: 1;  
                    translate: 0 0  
                }  
            }

            .stage:not(\[data-phase="loading"\]):not(\[data-phase="entry"\]) .joy-label {  
                opacity: 1;  
            }

            .story-runway {  
                height: 550%;  
                min-height: 550vh;  
            }

            .card-pixels {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                z-index: 4;  
                pointer-events: none;  
                image-rendering: pixelated;  
            }

            .card-resolving\>:not(.card-pixels) {  
                visibility: hidden;  
            }

            .video-dialog {  
                padding: 0;  
                overflow: hidden;  
                animation: player-dim 400ms both;  
            }

            .video-dialog .testimonial-player {  
                display: block;  
                width: 100vw;  
                height: 100dvh;  
                object-fit: contain;  
                background: \#000;  
            }

            .final-back {  
                z-index: 5;  
                display: flex;  
                align-items: center;  
                gap: 10px;  
                border: 0;  
                padding: 14px 16px;  
                border-radius: 17.19px;  
                background: \#40404066;  
                backdrop-filter: blur(20px);  
                box-shadow: inset 0 0 0 1px \#ffffff22;  
                font: 500 11px/1 'Restart Soft',sans-serif;  
                color: \#fff;  
            }

            @keyframes player-dim {  
                from {  
                    opacity: 0;  
                    filter: blur(8px)  
                }

                to {  
                    opacity: 1;  
                    filter: blur(0)  
                }  
            }

            .stage\[data-phase="projects"\] .spotlight {  
                background: radial-gradient(circle 360px at var(--light-x,50%) var(--light-y,50%),transparent 0%,\#00000012 30%,\#000000a6 100%);  
            }

            .final-scene {  
                position: absolute;  
                inset: 0;  
                z-index: 3;  
                visibility: hidden;  
                opacity: 0;  
                overflow: hidden;  
                background: linear-gradient(145deg,\#262626 4%,\#000101 91%);  
            }

            .final-active {  
                visibility: visible;  
                opacity: 1;  
            }

            .final-copy {  
                position: absolute;  
                top: 8.2%;  
                left: 5.58%;  
                width: 400px;  
                max-width: 70%;  
                color: \#9d9d9d;  
                font: 500 19.362px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.7745px;  
            }

            .final-copy p {  
                margin: 0 0 1em;  
            }

            .final-copy p:last-child {  
                color: \#fff;  
            }

            .final-title {  
                position: absolute;  
                left: 50%;  
                top: 33.5%;  
                transform: translateX(-50%);  
                width: 250px;  
                margin: 0;  
                font: 600 24.615px/.9 'Restart Soft',sans-serif;  
                letter-spacing: \-1.4769px;  
                text-align: center;  
                text-transform: uppercase;  
                opacity: 0;  
            }

            .final-title em {  
                font: 600 italic 1em/0 'Perfectly Nineties',serif;  
                text-transform: none;  
            }

            .final-title-ready .final-title {  
                opacity: 1;  
            }

            .final-joy {  
                position: absolute;  
                top: 50%;  
                left: 50%;  
                width: 39.4%;  
                height: auto;  
                opacity: 0;  
                translate: \-50% 0;  
                scale: 0;  
                transition: scale 1400ms cubic-bezier(.16,1,.3,1),opacity 600ms;  
                animation: joy-turn 45s linear infinite;  
                animation-play-state: paused;  
            }

            .final-joy-ready .final-joy {  
                opacity: 1;  
                scale: 1;  
                animation-play-state: running;  
            }

            .motion-paused .final-joy {  
                animation-play-state: paused;  
            }

            @keyframes joy-turn {  
                to {  
                    rotate: 360deg  
                }  
            }

            .final-address {  
                position: absolute;  
                top: 51.5%;  
                left: 5.58%;  
                color: \#9d9d9d;  
                font: 500 12px/1 'Restart Soft',sans-serif;  
            }

            .final-address strong {  
                font-weight: 500;  
                color: \#fff;  
            }

            .final-copyright {  
                position: absolute;  
                right: 5.58%;  
                top: 54%;  
                color: \#9d9d9d;  
                font: 500 12px/1 'Restart Soft',sans-serif;  
            }

            .team-strip {  
                position: absolute;  
                top: 59.7%;  
                left: 0;  
                right: 0;  
                overflow-x: auto;  
                scrollbar-width: none;  
                cursor: grab;  
                touch-action: pan-x pan-y;  
            }

            .team-track {  
                display: flex;  
                gap: 4px;  
                width: max-content;  
                padding-inline:5.58vw; }

            .team-card {  
                flex: 0 0 282px;  
                width: 282px;  
                height: 361px;  
                position: relative;  
                border-radius: 12px;  
                overflow: hidden;  
                opacity: 0;  
            }

            .team-card\>img {  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
                pointer-events: none;  
            }

            .team-label {  
                position: absolute;  
                left: 10px;  
                bottom: 10px;  
                margin: 0;  
                padding: 8px 12px;  
                border-radius: 6px;  
                background: \#000;  
                font: 500 9.354px/1.1 'Restart Soft',sans-serif;  
            }

            .team-label span,.team-label a {  
                display: block;  
                color: \#9d9d9d;  
                text-decoration: none;  
            }

            .final-back {  
                position: absolute;  
                bottom: 15px;  
                left: 50%;  
                transform: translateX(-50%);  
            }

            button {  
                isolation: isolate;  
            }

            .button-pixels {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                border-radius: inherit;  
                pointer-events: none;  
                opacity: 0;  
                z-index: 20;  
            }

            .button-pixelating .button-pixels {  
                opacity: 1;  
            }

            .button-yellow {  
                background: \#ffff40\!important;  
                color: \#111\!important;  
            }

            .button-yellow img {  
                filter: brightness(0);  
            }

            @media(max-width: 699px) {  
                .entry-intro {  
                    top:26px;  
                    left: 20px;  
                    width: 250px;  
                    font-size: 13px;  
                }

                .entry-since {  
                    top: 110px;  
                    left: 20px;  
                    right: auto;  
                    font-size: 7px;  
                }

                .entry-logo {  
                    left: 20px;  
                    right: 20px;  
                    bottom: 35px;  
                }

                .entry-actions {  
                    top: 43%;  
                }

                .logo-wall {  
                    display: grid;  
                    grid-template-columns: repeat(4,minmax(0,1fr));  
                    grid-template-rows: repeat(2,32px);  
                    gap: 14px 18px;  
                    top: 72%;  
                    height: 78px;  
                }

                .logo-wall .logo-slot {  
                    display: block;  
                    height: 32px;  
                }

                .logo-wall .logo-slot:nth-child(n+9) {  
                    display: none;  
                }

                .logo-slot img {  
                    max-height: 27px;  
                }

                .story-title {  
                    top: 50%;  
                }

                .testimonials {  
                    bottom: 70px;  
                }

                .testimonial {  
                    height: min(330px,42dvh);  
                }

                .testimonial-copy blockquote {  
                    top: 43%;  
                }

                .final-copy {  
                    top: 80px;  
                    left: 24px;  
                    width: calc(100% \- 48px);  
                    max-width: none;  
                    font-size: 16px;  
                }

                .final-title {  
                    top: 39%;  
                    font-size: 24px;  
                }

                .final-address {  
                    top: 52%;  
                    left: 24px;  
                    font-size: 10px;  
                }

                .final-copyright {  
                    top: 56%;  
                    right: 24px;  
                    font-size: 10px;  
                }

                .final-joy {  
                    width: 90%;  
                    top: 51%;  
                }

                .team-strip {  
                    top: 62%;  
                }

                .team-track {  
                    padding-inline:24px; }

                .team-card {  
                    width: 220px;  
                    flex-basis: 220px;  
                    height: 28dvh;  
                }

                .final-back {  
                    bottom: 55px;  
                }  
            }

            @media(prefers-reduced-motion:reduce) {  
                .final-joy {  
                    animation: none;  
                    transition: none;  
                }

                .entry-ready .entry-intro,.entry-ready .entry-since,.entry-actions,.video-dialog {  
                    animation: none;  
                }

                .entry-ready .entry-intro,.entry-ready .entry-since {  
                    opacity: 1;  
                }  
            }

            .final-scene::after {  
                content: '';  
                position: absolute;  
                inset: 0;  
                pointer-events: none;  
                opacity: .035;  
                background-image: var(--grain);  
                z-index: 4;  
            }

            /\* Ordered stages: logos settle before the card entrance, with no empty scroll tail. \*/  
            .story-runway {  
                height: 433.5%;  
                min-height: 0;  
            }

            .story-departure {  
                position: absolute;  
                inset: 0;  
                z-index: 6;  
                pointer-events: none;  
                overflow: visible;  
            }

            .ambient-dither {  
                transition: opacity 120ms linear;  
            }

            .project-controls {  
                right: 12px;  
                bottom: 90px;  
            }

            .stage:is(\[data-phase="projects"\],\[data-phase="projects-transition"\]) .audio-controls {  
                bottom: 12px;  
                transform: none;  
            }

            .joy-label {  
                bottom: 19px;  
                line-height: 12px;  
                height: 12px;  
            }

            @media(max-width: 699px) {  
                .joy-label {  
                    bottom:19px;  
                }

                .project-controls {  
                    right: 12px;  
                    bottom: 90px;  
                }  
            }

            /\* Contain the tornado's controls when a later section is opened directly. \*/  
            .next-scene {  
                z-index: 0;  
            }

            .entry-logo-pixels {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                pointer-events: none;  
                image-rendering: pixelated;  
            }

            .section-continue {  
                position: absolute;  
                bottom: 75px;  
                left: 50%;  
                transform: translateX(-50%);  
                z-index: 8;  
                width: 36px;  
                height: 36px;  
                border: 0;  
                border-radius: 50%;  
                background: \#ffffff18;  
                color: \#bbb;  
                cursor: pointer;  
            }

            .section-continue:disabled {  
                opacity: .25;  
                cursor: default;  
            }

            .story-continue {  
                bottom: 18px;  
                opacity: 0;  
                visibility: hidden;  
            }

            .story-continue.available {  
                opacity: 1;  
                visibility: visible;  
            }

            /\* Project case studies: three blocks fill the first viewport, then edge-to-edge rows. \*/  
            .case-studies {  
                position: absolute;  
                inset: 0;  
                z-index: 6;  
                background: \#fafafa;  
                color: \#9d9d9d;  
                overflow-x: hidden;  
                overflow-y: auto;  
                overscroll-behavior: contain;  
                scrollbar-width: none;  
            }

            .case-studies\[hidden\],.case-page\[hidden\] {  
                display: none;  
            }

            .case-hero {  
                display: grid;  
                grid-template-columns: 761fr 667fr;  
                grid-template-rows: 472fr 540fr;  
                gap: 4px;  
                height: calc(100dvh \- 8px);  
            }

            .case-cover {  
                grid-row: 1/3;  
                position: relative;  
                margin: 0;  
                overflow: hidden;  
                border-radius: 12px;  
            }

            .case-cover :is(img,video) {  
                position: absolute;  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
            }

            .case-description {  
                position: relative;  
                min-width: 0;  
                padding: 16px;  
                background: \#0d0d0d;  
                border-radius: 12px;  
                display: flex;  
                flex-direction: column;  
                justify-content: space-between;  
            }

            .case-intro {  
                font: 500 14px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em;  
                max-width: 289px;  
                margin: 0;  
            }

            .case-meta {  
                display: grid;  
                grid-template-columns: 60px 1fr;  
                column-gap: 52px;  
                row-gap: 0;  
                margin: 0;  
                color: \#999;  
                font: 10px/1.2 'ABC Diatype Mono',monospace;  
                text-transform: uppercase;  
            }

            .case-meta dt,.case-meta dd {  
                margin: 0;  
            }

            .case-description h1 {  
                margin: 0;  
                font: 500 32px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em;  
                color: white;  
            }

            .case-description h1 span {  
                display: block;  
                margin-top: 4px;  
                color: \#9d9d9d;  
            }

            .case-logo {  
                background: \#272727;  
                border-radius: 12px;  
                display: grid;  
                place-items: center;  
                overflow: hidden;  
            }

            .case-logo img {  
                display: block;  
                max-width: 85%;  
                height: auto;  
            }

            .case-logo-magu img {  
                width: 456px;  
            }

            .case-logo-otk img {  
                width: 124px;  
            }

            .case-logo p {  
                font: 500 36px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em;  
            }

            .case-back,.case-return,.video-close {  
                position: relative;  
                display: flex;  
                align-items: center;  
                gap: 12px;  
                padding: 16px 18px;  
                border: 0;  
                border-radius: 20px;  
                color: \#fff;  
                background: \#40404099;  
                backdrop-filter: blur(20px);  
                font: 500 13px/1 'Restart Soft',sans-serif;  
                cursor: pointer;  
            }

            .video-close {  
                position: absolute;  
                top: 24px;  
                right: 24px;  
                z-index: 5;  
            }

            .case-back {  
                position: fixed;  
                left: 20px;  
                top: 58px;  
                z-index: 10;  
            }

            .case-row {  
                display: grid;  
                grid-template-columns: 1fr 1fr;  
                gap: 4px;  
                margin-top: 4px;  
            }

            .case-row.text-left {  
                grid-template-columns: 614fr 810fr;  
            }

            .case-row.text-right {  
                grid-template-columns: 810fr 614fr;  
            }

            .case-block {  
                position: relative;  
                overflow: hidden;  
                visibility: hidden;  
                margin: 4px 0 0;  
                border-radius: 12px;  
            }

            .case-block.case-revealed {  
                visibility: visible;  
            }

            .case-row .case-block {  
                margin: 0;  
            }

            .case-wide {  
                aspect-ratio: 1432/809;  
            }

            .case-block\>img,.case-block\>video {  
                display: block;  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
            }

            .case-row:not(.portraits) .case-wide {  
                aspect-ratio: auto;  
                min-height: 0;  
            }

            .case-row:not(.portraits) {  
                aspect-ratio: 1432/606;  
            }

            .case-row.compact {  
                aspect-ratio: 1432/458;  
            }

            .case-row.portraits .case-block {  
                aspect-ratio: 713.604/955.837;  
            }

            .case-otk-sign img {  
                object-position: 82% center;  
            }

            .case-panel {  
                background: \#1c1c1c;  
                padding: 30px;  
                display: flex;  
                flex-direction: column;  
                justify-content: space-between;  
                border-radius: 20px;  
            }

            .case-panel p {  
                align-self: flex-end;  
                max-width: 289px;  
                margin: 0;  
                font: 500 14px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em;  
            }

            .case-panel h2 {  
                max-width: 353px;  
                margin: 0;  
                color: \#fff;  
                font: 600 24px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.06em;  
                text-transform: uppercase;  
            }

            .case-paragraph {  
                color: \#626262;  
                padding: 112px 58px;  
                min-height: 514px;  
                box-sizing: border-box;  
            }

            .case-paragraph p,.case-footer-copy\>p {  
                max-width: 639px;  
                margin: 0;  
                font: 500 32px/1 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em;  
            }

            .case-footer {  
                color: \#626262;  
                display: grid;  
                grid-template-columns: 1fr 1fr;  
                gap: 8%;  
                padding: 112px 58px 100px;  
            }

            .case-return {  
                margin-top: 70px;  
                font-size: 17px;  
                padding: 21px 24px;  
                border-radius: 26px;  
            }

            .stage:is(\[data-phase="case"\],\[data-phase="case-transition"\]) .joy-label,.stage:is(\[data-phase="case"\],\[data-phase="case-transition"\]) .audio-controls,.stage:is(\[data-phase="case"\],\[data-phase="case-transition"\])\>.spotlight,.stage:is(\[data-phase="case"\],\[data-phase="case-transition"\]) .motion-toggle {  
                visibility: hidden;  
            }

            .stage\[data-phase="case-transition"\] .projects {  
                z-index: 8;  
            }

            .dome-tile\[role="link"\] {  
                cursor: pointer;  
            }

            .dome-tile:focus-visible {  
                outline: 3px solid \#ffff40;  
                outline-offset: \-4px;  
            }

            @media(max-width: 700px) {  
                .case-hero {  
                    grid-template-columns:43fr 57fr;  
                    grid-template-rows: 64fr 36fr;  
                }

                .case-description {  
                    padding: 90px 12px 18px;  
                }

                .case-intro {  
                    font-size: 12px;  
                }

                .case-description h1 {  
                    font-size: 23px;  
                }

                .case-meta {  
                    font-size: 8px;  
                    grid-template-columns: 44px 1fr;  
                    gap: 3px;  
                }

                .case-logo-magu img {  
                    width: 85%;  
                }

                .case-logo-otk img {  
                    width: 100px;  
                }

                .case-row {  
                    gap: 4px;  
                }

                .case-row:not(.portraits) {  
                    aspect-ratio: auto;  
                    grid-template-columns: 1fr;  
                }

                .case-row:not(.portraits) .case-wide {  
                    aspect-ratio: 1432/809;  
                }

                .case-row:is(.text-left,.text-right) .case-wide {  
                    aspect-ratio: 3/4;  
                }

                .case-panel {  
                    min-height: 330px;  
                    padding: 24px;  
                }

                .case-panel p {  
                    max-width: 65%;  
                    font-size: 13px;  
                }

                .case-panel h2 {  
                    max-width: 75%;  
                    font-size: 22px;  
                }

                .case-paragraph {  
                    color: \#626262;  
                    padding: 65px 24px;  
                    min-height: 0;  
                }

                .case-paragraph p,.case-footer-copy\>p {  
                    font-size: 25px;  
                }

                .case-footer {  
                    grid-template-columns: 1fr;  
                    padding: 65px 24px;  
                    gap: 40px;  
                }

                .case-return {  
                    margin-top: 40px;  
                }  
            }

            /\* Keep the explicit next control clear of both the carousel and the mobile audio dock. \*/  
            .testimonials {  
                bottom: 76px;  
            }

            @media(max-width: 700px) {  
                .testimonials {  
                    bottom:130px;  
                }

                .story-continue {  
                    bottom: 84px;  
                }  
            }

            /\* Ready controls call attention once, then gently float. \*/  
            @keyframes next-ready {  
                0% {  
                    translate: 0 0  
                }

                35% {  
                    translate: 0 \-8px  
                }

                65% {  
                    translate: 0 3px  
                }

                100% {  
                    translate: 0 0  
                }  
            }

            @keyframes next-float {  
                0%,100% {  
                    translate: 0 0  
                }

                50% {  
                    translate: 0 \-2px  
                }  
            }

            .section-continue:not(:disabled):not(.story-continue),.story-continue.available,.moment-continue:not(:disabled) {  
                animation: next-ready 650ms cubic-bezier(.2,.8,.3,1),next-float 2400ms 650ms ease-in-out infinite;  
            }

            .team-strip,.testimonials {  
                scroll-behavior: auto;  
                overscroll-behavior-x: contain;  
            }

            @media(max-width: 700px) {  
                .logo-wall {  
                    grid-template-rows:32px;  
                    height: 32px;  
                    top: 68%;  
                }

                .logo-wall .logo-slot:nth-child(n+5) {  
                    display: none;  
                }

                .case-hero {  
                    grid-template-columns: 1fr;  
                    grid-template-rows: auto;  
                    height: auto;  
                }

                .case-cover {  
                    grid-row: auto;  
                    height: 65dvh;  
                }

                .case-description {  
                    min-height: 360px;  
                    padding: 24px;  
                    gap: 40px;  
                }

                .case-logo {  
                    position: relative;  
                    min-height: 260px;  
                }

                .case-row,.case-row.portraits {  
                    grid-template-columns: 1fr;  
                }  
            }

            @media(prefers-reduced-motion:reduce) {  
                .section-continue,.moment-continue {  
                    animation: none\!important;  
                }  
            }

            .stage\[data-motion-paused="true"\] .section-continue,.stage\[data-motion-paused="true"\] .moment-continue {  
                animation: none;  
            }

            .case-hero\>.case-logo {  
                position: relative;  
            }

            .case-hero\>\* {  
                visibility: hidden;  
            }

            .case-hero\>.case-revealed {  
                visibility: visible;  
            }

            /\* Keep playback controls above the video and its temporary pixel reveal. \*/  
            .video-testimonial\>.video-play {  
                z-index: 5;  
                visibility: visible;  
            }

            /\* Crawlable navigation complements the cinematic introduction. \*/  
            .dome-tile,.case-back,.case-return {  
                color: inherit;  
                text-decoration: none  
            }

            .plain-overview {  
                display: none;  
                max-width: 1100px;  
                margin: 0 auto;  
                padding: 40px;  
                color: \#eee;  
                font: 18px/1.5 'Restart Soft',sans-serif  
            }

            .plain-overview .grid {  
                display: grid;  
                grid-template-columns: repeat(auto-fit,minmax(220px,1fr));  
                gap: 20px  
            }

            .plain-overview img {  
                width: 100%;  
                height: auto  
            }

            .plain-overview a {  
                color: inherit  
            }

            .plain-overview h1 {  
                font-size: 48px;  
                letter-spacing: \-.04em  
            }

            .plain-overview .tile {  
                text-decoration: none  
            }

            html:not(.experience-ready):not(.experience-booting):not(\[data-project\]) body {  
                height: auto;  
                overflow: auto  
            }

            html:not(.experience-ready):not(.experience-booting):not(\[data-project\]) .stage {  
                display: none  
            }

            html:not(.experience-ready):not(.experience-booting):not(\[data-project\]) .plain-overview {  
                display: block  
            }

            html\[data-project\]:not(.experience-ready):not(.experience-booting) .entry,html\[data-project\]:not(.experience-ready):not(.experience-booting) .opening,html\[data-project\]:not(.experience-ready):not(.experience-booting) .site-header {  
                display: none  
            }

            html\[data-project\]:not(.experience-ready):not(.experience-booting) .case-hero\>\*,html\[data-project\]:not(.experience-ready):not(.experience-booting) .case-block {  
                visibility: visible  
            }

            .case-editorial {  
                padding: 40px;  
                max-width: 900px;  
                font: 20px/1.4 'Restart Soft',sans-serif  
            }

            .case-editorial h2 {  
                color: white  
            }

            .case-editorial p {  
                white-space: pre-line  
            }

            @media(max-width: 700px) {  
                .case-editorial {  
                    padding:24px  
                }  
            }

            /\* A continuation control exists visually only once its scene is ready. \*/  
            .section-continue:disabled,.moment-continue:disabled {  
                opacity: 0;  
                visibility: hidden;  
                pointer-events: none;  
            }

            @keyframes next-ready {  
                0% {  
                    opacity: 0;  
                    scale: .12;  
                    translate: 0 20px  
                }

                35% {  
                    opacity: 1;  
                    scale: 1.4;  
                    translate: 0 \-22px  
                }

                60% {  
                    scale: .88;  
                    translate: 0 7px  
                }

                80% {  
                    scale: 1.08;  
                    translate: 0 \-4px  
                }

                100% {  
                    scale: 1;  
                    translate: 0 0  
                }  
            }

            .section-continue:not(:disabled):not(.story-continue),.story-continue.available,.moment-continue:not(:disabled) {  
                animation: next-ready 950ms cubic-bezier(.2,.8,.3,1),next-float 2400ms 950ms ease-in-out infinite;  
            }

            .arrow-materializing {  
                color: transparent\!important;  
            }

            .arrow-materialize {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                pointer-events: none;  
            }

            .case-meta {  
                align-self: start;  
                align-content: start;  
                grid-auto-rows: min-content;  
                row-gap: 0;  
                line-height: normal;  
            }

            .case-return {  
                width: fit-content;  
                gap: 15.369px;  
                padding: 21.517px 24.591px;  
                border-radius: 26.42px;  
                font: 500 16.906px/normal 'Restart Soft',sans-serif;  
                color: white;  
                background: rgba(64,64,64,.6);  
            }

            .case-return img {  
                width: 15.76px;  
                height: 15.76px;  
                transform: scaleX(-1);  
                flex: none;  
            }

            /\* Keep the next background in place while the portfolio finishes its exit. \*/  
            .stage\[data-phase="portfolio-exit"\] .story {  
                visibility: visible;  
                opacity: 1;  
            }

            .stage\[data-phase="portfolio-exit"\] .story-viewport {  
                visibility: hidden;  
            }

            /\* Center navigation on the same baseline as the scene continuation arrows. \*/  
            .project-controls {  
                left: 50%;  
                right: auto;  
                bottom: 75px;  
                transform: translateX(-50%);  
                width: max-content;  
                gap: 10px;  
            }

            .project-controls button {  
                background: rgba(175,175,175,.42);  
                box-shadow: inset 0 0 0 1px \#ffffff38,0 4px 20px \#00000026;  
                color: \#fff;  
            }

            .project-controls .projects-next {  
                background: rgba(210,210,210,.48);  
            }

            .project-controls button:hover {  
                background: rgba(220,220,220,.55);  
            }

            .stage\[data-phase="projects"\]\>.spotlight {  
                mask-image: radial-gradient(ellipse 240px 140px at 50% calc(100% \- 96px),transparent 0%,\#00000018 25%,\#00000070 55%,\#000000d9 82%,\#000 100%);  
                \-webkit-mask-image: radial-gradient(ellipse 240px 140px at 50% calc(100% \- 96px),transparent 0%,\#00000018 25%,\#00000070 55%,\#000000d9 82%,\#000 100%);  
            }

            html.experience-booting:not(.experience-ready):not(\[data-project\]) .stage {  
                visibility: hidden;  
            }

            /\* Static case heroes paint immediately; navigation still uses the pixel reveal. \*/  
            html\[data-project\].experience-booting:not(.experience-ready) .case-hero\>\* {  
                visibility: visible;  
            }

            /\* Editorial line breaks from the project editor. \*/  
            .case-intro,.case-panel p,.case-paragraph p,.case-footer-copy\>p {  
                white-space: pre-line;  
            }

            /\* Supplied quotes: emphasis stays uppercase; body retains regular weight. \*/  
            /\* Fixed editorial zones match the supplied card design. \*/  
            .supplied-testimonial .testimonial-copy {  
                display: block;  
                inset: 20px 20px 80px  
            }

            .supplied-testimonial .testimonial-copy h3 {  
                width: auto;  
                max-width: 254px;  
                font-weight: 600;  
                text-transform: uppercase  
            }

            .supplied-testimonial .testimonial-copy blockquote {  
                position: absolute;  
                top: 137px;  
                left: 0;  
                width: 228px;  
                max-width: 100%;  
                font: 400 12px/1.1 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em  
            }

            .supplied-testimonial .person {  
                max-width: 185px;  
                bottom: 10px  
            }

            .supplied-testimonial .person p {  
                min-width: 0;  
                font-size: 9px  
            }

            .supplied-testimonial .person p span {  
                max-width: 125px;  
                white-space: normal  
            }

            .supplied-testimonial .testimonial-tags {  
                font-size: 8px;  
                line-height: 1.15;  
                bottom: 10px;  
                right: 10px;  
                left: auto;  
                display: block;  
                text-align: right;  
                max-width: 115px  
            }

            @media(max-width: 699px) {  
                .supplied-testimonial .testimonial-copy {  
                    inset:16px 16px 82px  
                }

                .supplied-testimonial .testimonial-copy h3 {  
                    font-size: 14px  
                }

                .supplied-testimonial .testimonial-copy blockquote {  
                    top: 130px;  
                    font-size: 11px  
                }

                .supplied-testimonial .person {  
                    max-width: 160px  
                }

                .supplied-testimonial .person p {  
                    font-size: 8px  
                }

                .supplied-testimonial .testimonial-tags {  
                    font-size: 7px;  
                    max-width: 95px  
                }  
            }

            @media(max-width: 700px) {  
                .case-panel {  
                    min-height:380px;  
                    height: auto;  
                    gap: 48px;  
                    padding: 24px;  
                }

                .case-panel p {  
                    line-height: 1.15;  
                    flex-shrink: 0;  
                }

                .case-panel h2 {  
                    flex-shrink: 0;  
                }

                .case-cover {  
                    height: auto;  
                    min-height: 0;  
                    aspect-ratio: auto;  
                }

                .case-cover :is(img,video) {  
                    position: relative;  
                    display: block;  
                    width: 100%;  
                    height: auto;  
                    object-fit: contain;  
                }

                .case-page figure.case-block:has(\>img,\>video),.case-page .case-row figure.case-block:has(\>img,\>video) {  
                    height: auto;  
                    min-height: 0;  
                    aspect-ratio: auto;  
                }

                .case-page figure.case-block\>:is(img,video) {  
                    width: 100%;  
                    height: auto;  
                    object-fit: contain;  
                }  
            }

            .case-back {  
                width: max-content;  
                max-width: calc(100vw \- 40px);  
                height: auto;  
                right: auto;  
                bottom: auto;  
                flex: none;  
                align-self: start  
            }

            @media(max-width: 700px) {  
                .case-studies {  
                    padding-top:0  
                }

                .case-hero {  
                    margin-top: 0  
                }

                .case-back {  
                    top: 58px  
                }  
            }

            /\* Keep mobile inline-video compositing below the persistent play/name panel. \*/  
            @media(max-width: 700px) {  
                .video-testimonial {  
                    isolation:isolate;  
                }

                .video-testimonial\>video {  
                    position: absolute;  
                    inset: 0;  
                    z-index: 0;  
                    transform: none;  
                }

                .video-testimonial\>.reel-dither {  
                    z-index: 1;  
                }

                .video-testimonial\>.video-play {  
                    position: absolute;  
                    z-index: 6;  
                    display: flex;  
                    visibility: visible;  
                    opacity: 1;  
                    transform: translateZ(0);  
                    \-webkit-appearance: none;  
                    appearance: none;  
                }

                .video-testimonial\>.video-play .play-square,.video-testimonial\>.video-play .person-label {  
                    visibility: visible;  
                }  
            }

            /\* Shared Figma header: logo, platform search shortcut, contact. \*/  
            .search-shortcut {  
                display: grid;  
                place-items: center;  
                padding: 0;  
                width: 45.925px;  
                height: 45.702px;  
                border-radius: 8px;  
                background: \#000;  
                color: \#b8b8b8;  
            }

            .shortcut-label {  
                display: flex;  
                align-items: center;  
                gap: 2px;  
                padding: 3px;  
                border-radius: 4.5px;  
                font-size: 14px;  
                font-weight: 400;  
                letter-spacing: \-.04em;  
                line-height: 1;  
            }

            .shortcut-command {  
                display: block;  
                width: 11.068px;  
                height: 11.045px;  
            }

            .shortcut-command\[hidden\],.shortcut-control\[hidden\] {  
                display: none;  
            }

            .shortcut-control {  
                font-size: 14px;  
                letter-spacing: \-.04em;  
            }

            .search-shortcut:disabled {  
                cursor: default;  
                opacity: 1;  
            }

            .case-footer .case-meta {  
                color: \#626262;  
            }

            .case-credits {  
                margin-top: 40px;  
                font: 10px/normal 'ABC Diatype Mono',monospace;  
                text-transform: uppercase;  
                color: \#626262;  
            }

            .case-credits h2 {  
                margin: 0 0 16px;  
                font: inherit;  
                color: \#333;  
            }

            .case-credits dl {  
                display: grid;  
                grid-template-columns: minmax(100px,auto) 1fr;  
                gap: 0 24px;  
                margin: 0;  
            }

            .case-credits dt,.case-credits dd {  
                margin: 0;  
            }

            @media(max-width: 700px) {  
                .case-credits {  
                    font-size:10px;  
                }

                .case-credits dl {  
                    grid-template-columns: 110px 1fr;  
                    column-gap: 16px;  
                }  
            }

            .case-panel-light {  
                color: \#626262;  
                background: transparent;  
                justify-content: center;  
            }

            @media (hover: hover) and (pointer:fine) {  
                .stage\[data-phase="projects"\]\>.spotlight {  
                    opacity:1;  
                }  
            }

            /\* Figma 1138:1423. Native backdrop frost; refractive edge approximated in CSS.  
   Main glass: frost 53.7367, splay 1, refraction .63, depth 44.7806.  
   Secondary glass: frost 30, splay 1, refraction .63, depth 25\. \*/  
            .entry-intro {  
                width: 280px;  
                font-size: 16px;  
                line-height: 1;  
                letter-spacing: \-.64px;  
            }

            .entry-actions {  
                top: calc(50% \- 49px);  
                width: auto;  
                max-width: calc(100% \- 32px);  
                gap: 12px;  
            }

            .entry-actions .enter-sound {  
                width: 300.66px;  
                max-width: 100%;  
                min-height: 74.154px;  
                padding: 25.077px 28.66px;  
                gap: 17.912px;  
                border-radius: 30.792px;  
                font-size: 19.703px;  
                line-height: 24px;  
                background: rgba(243,243,243,.2);  
                \-webkit-backdrop-filter: blur(53.737px);  
                backdrop-filter: blur(53.737px);  
                box-shadow: inset 0 1px 0 \#ffffff12,inset 0 \-1px 0 \#0000000a;  
            }

            .entry-choice-note {  
                display: flex;  
                flex-direction: column;  
                flex-shrink: 0;  
                color: \#d0d0d0;  
                font: 8px/1 var(--mono);  
                text-align: left;  
                text-transform: uppercase;  
            }

            .entry-actions .enter-sound .entry-sound-art {  
                width: auto;  
                height: auto;  
                flex-shrink: 0;  
            }

            .entry-actions .enter-silent {  
                width: 140px;  
                min-height: 41px;  
                padding: 14px 16px;  
                border-radius: 17.19px;  
                font-size: 11px;  
                line-height: 13px;  
                background: rgba(64,64,64,.2);  
                \-webkit-backdrop-filter: blur(30px);  
                backdrop-filter: blur(30px);  
                box-shadow: inset 0 1px 0 \#ffffff0d,inset 0 \-1px 0 \#0000000a;  
            }

            .entry-actions .button-yellow .entry-choice-note {  
                color: \#111;  
            }

            @media(max-width: 700px) {  
                .entry-intro {  
                    top:24px;  
                    left: 24px;  
                    width: min(280px,calc(100% \- 48px));  
                }  
            }

            /\* Decoded portraits paint with their message, rather than lazy CSS backgrounds. \*/  
            .portrait {  
                background-image: none;  
                overflow: hidden;  
            }

            .portrait\>img {  
                width: 100%;  
                height: 100%;  
                object-fit: cover;  
                display: block;  
            }

            .studio-menu {  
                position: fixed;  
                inset: 4px;  
                width: calc(100% \- 8px);  
                height: calc(100% \- 8px);  
                max-width: none;  
                max-height: none;  
                margin: 0;  
                padding: 0;  
                border: 0;  
                border-radius: 20px;  
                color: \#dadada;  
                background: linear-gradient(145deg,\#262626 0%,\#101111 57%,\#000101 100%);  
                overflow: hidden;  
                font-family: 'Restart Soft',sans-serif;  
                isolation: isolate  
            }

            .studio-menu::backdrop {  
                background: transparent  
            }

            .studio-menu\[open\] {  
                display: block  
            }

            .studio-menu button,.studio-menu a {  
                \-webkit-tap-highlight-color: transparent  
            }

            .studio-menu button {  
                font-family: inherit;  
                color: inherit;  
                border: 0;  
                cursor: pointer  
            }

            .studio-menu button:focus-visible,.studio-menu a:focus-visible {  
                outline: 2px solid \#f3ff47;  
                outline-offset: 5px  
            }

            .studio-menu::before {  
                content: '';  
                position: absolute;  
                inset: 0;  
                pointer-events: none;  
                opacity: .045;  
                background-image: url('/assets/menu/noise.svg');  
                z-index: \-1  
            }

            .menu-close {  
                position: absolute;  
                right: 16px;  
                top: 16px;  
                background: none;  
                padding: 0;  
                width: 65.086px;  
                height: 45.328px;  
                z-index: 10  
            }

            .menu-close img {  
                width: 100%;  
                height: 100%  
            }

            .menu-composition {  
                position: absolute;  
                left: 50%;  
                top: 29.2%;  
                width: 382px;  
                transform: translateX(-50%)  
            }

            .menu-panel {  
                position: relative;  
                z-index: 3;  
                background: rgba(48,48,48,.8);  
                border-radius: 12px;  
                padding: 0 11px 12px;  
                backdrop-filter: blur(24px);  
                transition: transform .65s cubic-bezier(.7,0,.2,1),opacity .4s;  
                box-shadow: 0 10px 50px \#0000000a  
            }

            .menu-search-row {  
                display: flex;  
                align-items: center;  
                gap: 23px;  
                height: 58px;  
                padding: 0 10px  
            }

            .menu-search-row\>img {  
                width: 24px;  
                height: 23px;  
                flex-shrink: 0  
            }

            .menu-search-row input {  
                min-width: 0;  
                width: 100%;  
                border: 0;  
                background: transparent;  
                outline: none;  
                color: \#dadada;  
                font: 400 16px 'Restart Soft',sans-serif;  
                letter-spacing: \-.04em  
            }

            .menu-search-row input::placeholder {  
                color: \#878787  
            }

            .menu-filters {  
                display: flex;  
                gap: 3px;  
                padding: 10px 10px 8px  
            }

            .menu-filters button {  
                background: \#000;  
                border-radius: 6px;  
                padding: 4px 12px;  
                color: \#8d8d8d;  
                font-size: 10px;  
                font-weight: 500;  
                transition: background .2s,color .2s  
            }

            .menu-filters button\[aria-pressed=true\],.menu-filters button:hover {  
                background: \#f3ff47;  
                color: \#111  
            }

            .menu-results {  
                position: relative;  
                max-height: min(42vh,380px);  
                overflow: auto;  
                scrollbar-width: thin;  
                scrollbar-color: \#666 transparent;  
                overscroll-behavior: contain  
            }

            .menu-result {  
                position: relative;  
                display: flex;  
                align-items: center;  
                justify-content: space-between;  
                min-height: 38px;  
                padding: 7px 10px;  
                color: \#dadada;  
                text-decoration: none;  
                gap: 10px;  
                z-index: 1  
            }

            .menu-result-title {  
                font-size: 19.362px;  
                letter-spacing: \-.04em;  
                font-weight: 500;  
                display: flex;  
                align-items: center;  
                gap: 9px;  
                min-width: 0  
            }

            .menu-result-title\>img {  
                width: 12px;  
                height: 12px;  
                flex-shrink: 0  
            }

            .menu-result-type {  
                font: 10px 'ABC Diatype Mono',monospace;  
                text-transform: uppercase;  
                color: \#919191;  
                display: flex;  
                align-items: center;  
                gap: 9px;  
                flex-shrink: 0  
            }

            .menu-enter {  
                font-size: 7px;  
                text-transform: none;  
                background: \#ffffffb3;  
                border-radius: 4.5px;  
                padding: 3px;  
                color: \#181818;  
                display: none  
            }

            .menu-result\[aria-selected=true\] .menu-enter {  
                display: inline  
            }

            .menu-result\[aria-selected=true\] .menu-result-type {  
                color: \#d0d0d0  
            }

            .menu-selection {  
                position: absolute;  
                top: 0;  
                left: 0;  
                right: 0;  
                border-radius: 12px;  
                background: radial-gradient(ellipse at 35% 50%,\#64646466,\#45454599);  
                transition: transform .24s cubic-bezier(.2,.7,.1,1),height .2s;  
                pointer-events: none  
            }

            .menu-status {  
                font-size: 13px;  
                color: \#aaa;  
                margin: 8px 10px  
            }

            .menu-status:empty {  
                display: none  
            }

            .menu-floppy {  
                position: absolute;  
                top: 252px;  
                left: 65px;  
                width: 252px;  
                height: 263px;  
                z-index: 1;  
                transition: transform .75s cubic-bezier(.22,1,.36,1),opacity .5s,filter .5s;  
                filter: drop-shadow(0 35px 30px \#efff4730)  
            }

            .menu-floppy\>img,.studio-disk\>img {  
                display: block;  
                width: 100%;  
                height: 100%;  
                object-fit: fill;  
                clip-path: polygon(0 0,95% 0,100% 5%,100% 100%,0 100%)  
            }

            .menu-floppy::after {  
                content: '';  
                position: absolute;  
                inset: 70% \-10% \-20%;  
                background: \#efff4730;  
                filter: blur(35px);  
                pointer-events: none;  
                z-index: \-1  
            }

            .menu-eject {  
                position: absolute;  
                top: 307px;  
                left: 50%;  
                transform: translateX(-50%);  
                display: flex;  
                align-items: center;  
                gap: 8px;  
                background: \#e8e8e833;  
                box-shadow: inset 0 1px 0 \#ffffff24;  
                border-radius: 17px;  
                padding: 14px 16px;  
                font-size: 11px;  
                backdrop-filter: blur(12px)  
            }

            .menu-eject img {  
                width: 8px;  
                height: 8px  
            }

            .menu-eject:hover,.menu-return:hover,.menu-contact-back:hover {  
                background: \#f3ff47;  
                color: \#111  
            }

            .is-typing .menu-floppy {  
                opacity: 0;  
                transform: translateY(28px) scale(.95);  
                filter: blur(8px);  
                pointer-events: none  
            }

            .is-opening .menu-panel {  
                animation: search-form .65s cubic-bezier(.16,1,.3,1) both  
            }

            .is-opening .menu-results {  
                animation: menu-expand .7s .15s both  
            }

            .is-opening .menu-floppy {  
                animation: disk-arrival .9s cubic-bezier(.16,1,.3,1) both  
            }

            .is-ejected .menu-panel {  
                transform: translateY(-110vh);  
                opacity: 0;  
                pointer-events: none  
            }

            .is-ejected .menu-floppy {  
                transform: translateY(110vh) rotate(-10deg);  
                opacity: 0;  
                pointer-events: none  
            }

            .menu-disks {  
                position: absolute;  
                inset: 0;  
                perspective: 1100px  
            }

            .menu-disks\[hidden\],.menu-contact\[hidden\] {  
                display: none  
            }

            .disk-orbit {  
                position: absolute;  
                top: 47%;  
                left: 50%;  
                width: 330px;  
                height: 300px;  
                transform: translate(-50%,-50%);  
                transform-style: preserve-3d;  
                animation: orbit-enter .85s cubic-bezier(.16,1,.3,1) both  
            }

            .studio-disk {  
                position: absolute;  
                display: block;  
                width: 252px;  
                height: 263px;  
                background: none\!important;  
                padding: 0;  
                transform-style: preserve-3d;  
                transition: transform .75s cubic-bezier(.22,1,.36,1),filter .65s;  
                filter: drop-shadow(-5px 8px 0 \#202020) drop-shadow(0 25px 25px \#d9ff4725);  
                cursor: pointer  
            }

            .disk-garcy {  
                left: \-45px;  
                top: 45px;  
                z-index: 2;  
                transform: rotateX(26deg) rotateY(-24deg) rotateZ(-18deg)  
            }

            .disk-tesseral {  
                left: 95px;  
                top: \-55px;  
                z-index: 1;  
                transform: translateZ(-90px) rotateX(26deg) rotateY(-24deg) rotateZ(-18deg);  
                filter: drop-shadow(-5px 8px 0 \#202020) drop-shadow(0 25px 25px \#49ff6225)  
            }

            .studio-disk.is-front {  
                z-index: 3;  
                transform: translate3d(0,-30px,130px) rotateX(15deg) rotateY(-17deg) rotateZ(-8deg);  
                filter: drop-shadow(-7px 10px 0 \#252525) drop-shadow(0 30px 40px \#c9ff4745)  
            }

            .disk-tesseral.is-front {  
                filter: drop-shadow(-7px 10px 0 \#252525) drop-shadow(0 30px 40px \#49ff6245)  
            }

            .menu-return {  
                position: absolute;  
                bottom: 16%;  
                left: 50%;  
                transform: translateX(-50%);  
                background: \#e8e8e833;  
                border-radius: 17px;  
                padding: 14px 20px;  
                font-size: 11px  
            }

            .menu-disks\>p {  
                position: absolute;  
                bottom: 10%;  
                width: 100%;  
                text-align: center;  
                font: 10px 'ABC Diatype Mono',monospace;  
                color: \#888;  
                letter-spacing: .06em  
            }

            .menu-tv {  
                position: absolute;  
                inset: 0;  
                pointer-events: none;  
                z-index: 9;  
                opacity: 0;  
                background: repeating-linear-gradient(0deg,transparent 0 3px,\#fff2 4px,\#0008 6px);  
                mix-blend-mode: screen  
            }

            .is-opening .menu-tv {  
                animation: tv-interference .75s steps(6) both  
            }

            .studio-menu.is-opening {  
                animation: menu-background .6s both  
            }

            .menu-disruption {  
                animation: screen-disruption .6s steps(6) both  
            }

            .menu-contact {  
                position: absolute;  
                left: 50%;  
                top: 40%;  
                transform: translate(-50%,-50%);  
                width: min(380px,85vw);  
                text-align: center  
            }

            .menu-contact h2 {  
                font-size: 32px;  
                letter-spacing: \-.04em;  
                font-weight: 400  
            }

            .menu-contact\>a {  
                color: \#f3ff47;  
                font-size: 20px  
            }

            .menu-contact-back {  
                display: block;  
                margin: 28px auto;  
                background: \#ffffff25;  
                border-radius: 17px;  
                padding: 14px 20px  
            }

            .is-contact .menu-composition {  
                visibility: hidden  
            }

            @keyframes search-form {  
                from {  
                    opacity: 0;  
                    transform: translateY(25px) scale(.96)  
                }

                to {  
                    opacity: 1;  
                    transform: none  
                }  
            }

            @keyframes menu-expand {  
                from {  
                    clip-path: inset(0 0 100%)  
                }

                to {  
                    clip-path: inset(0)  
                }  
            }

            @keyframes disk-arrival {  
                from {  
                    transform: translateY(180px);  
                    opacity: 0  
                }

                to {  
                    transform: none;  
                    opacity: 1  
                }  
            }

            @keyframes orbit-enter {  
                from {  
                    opacity: 0;  
                    transform: translate(-50%,40%) rotateX(25deg)  
                }

                to {  
                    opacity: 1;  
                    transform: translate(-50%,-50%)  
                }  
            }

            @keyframes tv-interference {  
                0% {  
                    opacity: 0  
                }

                15% {  
                    opacity: .8;  
                    transform: translateX(-6px)  
                }

                35% {  
                    opacity: .2;  
                    transform: translateX(8px)  
                }

                55% {  
                    opacity: .6;  
                    transform: translateY(12px)  
                }

                100% {  
                    opacity: 0;  
                    transform: none  
                }  
            }

            @keyframes screen-disruption {  
                20% {  
                    filter: blur(3px) contrast(2);  
                    transform: translateX(-6px)  
                }

                45% {  
                    filter: blur(1px) contrast(1.5);  
                    transform: translateX(8px)  
                }

                100% {  
                    filter: none;  
                    transform: none  
                }  
            }

            @keyframes menu-background {  
                from {  
                    background-color: transparent;  
                    opacity: .15  
                }

                to {  
                    opacity: 1  
                }  
            }

            @media(max-width: 600px) {  
                .menu-composition {  
                    width:min(382px,calc(100vw \- 40px));  
                    top: 22%  
                }

                .menu-floppy {  
                    left: calc(50% \- 126px)  
                }

                .menu-results {  
                    max-height: 36vh  
                }

                .menu-result-title {  
                    font-size: 18px  
                }

                .menu-close {  
                    right: 12px;  
                    top: 12px  
                }

                .disk-orbit {  
                    transform: translate(-50%,-50%) scale(.78)  
                }

                .studio-disk {  
                    width: 220px;  
                    height: 230px  
                }

                .disk-garcy {  
                    left: 0  
                }

                .disk-tesseral {  
                    left: 95px;  
                    top: \-45px  
                }

                .menu-eject {  
                    top: 280px  
                }

                .menu-return {  
                    bottom: 18%  
                }

                .menu-disks\>p {  
                    bottom: 11%  
                }  
            }

            @media(max-height: 750px) {  
                .menu-composition {  
                    top:17%  
                }

                .menu-floppy {  
                    top: 220px;  
                    width: 202px;  
                    height: 211px;  
                    left: calc(50% \- 101px)  
                }

                .menu-eject {  
                    top: 225px  
                }

                .menu-results {  
                    max-height: 34vh  
                }  
            }

            @media(prefers-reduced-motion:reduce) {  
                .studio-menu \*,.studio-menu,.menu-disruption {  
                    animation: none\!important;  
                    transition: none\!important  
                }  
            }

            .menu-raster {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                z-index: 0;  
                pointer-events: none;  
                image-rendering: pixelated  
            }

            .menu-brand {  
                position: absolute;  
                top: 16px;  
                left: 16px;  
                z-index: 10;  
                width: 88.57px  
            }

            .menu-brand img {  
                width: 100%;  
                height: auto  
            }

            .floppy-pixels {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                pointer-events: none;  
                opacity: 0;  
                image-rendering: pixelated  
            }

            .is-typing .menu-floppy {  
                filter: drop-shadow(0 25px 25px \#efff4710)  
            }

            .disk-tesseral\>img {  
                filter: hue-rotate(30deg)  
            }

            /\* Search is a pair of glass surfaces above the current scene. \*/  
            .studio-menu {  
                background: rgba(7,9,9,.58)  
            }

            .studio-menu::before {  
                opacity: .035;  
                z-index: 0  
            }

            .menu-underlay {  
                filter: blur(1.1px) saturate(.68);  
                transition: filter .35s  
            }

            .menu-tv {  
                opacity: .065;  
                mix-blend-mode: soft-light;  
                background: repeating-linear-gradient(0deg,transparent 0 3px,\#fff4 4px,\#0007 5px)  
            }

            .menu-composition {  
                width: min(460px,calc(100vw \- 40px));  
                top: 25%  
            }

            .menu-window {  
                position: relative;  
                z-index: 3;  
                transition: transform .65s cubic-bezier(.7,0,.2,1),opacity .4s  
            }

            .menu-panel,.menu-search-row {  
                background: \#ffffff14;  
                backdrop-filter: blur(30px) saturate(135%);  
                \-webkit-backdrop-filter: blur(30px) saturate(135%);  
                box-shadow: inset 0 0 0 .7px \#ffffff25,inset 0 1px 0 \#ffffff16,0 12px 30px \#00000014  
            }

            .menu-panel {  
                margin-top: 6px;  
                padding: 0 11px 12px;  
                border-radius: 12px;  
                transition: none  
            }

            .menu-search-row {  
                height: 58px;  
                padding: 0 21px;  
                border-radius: 12px;  
                position: relative;  
                z-index: 4  
            }

            .menu-search-row input {  
                font-weight: 400;  
                color: \#eee  
            }

            .menu-search-row input::placeholder {  
                color: \#aaa  
            }

            .menu-result-title {  
                font-family: 'Restart Soft',sans-serif;  
                font-weight: 500  
            }

            .menu-selection {  
                background: radial-gradient(ellipse at 35% 50%,\#ffffff20,\#ffffff0c)  
            }

            .is-opening .menu-panel {  
                animation: menu-expand .65s .12s both  
            }

            .is-opening .menu-search-row {  
                animation: search-form .45s both  
            }

            .is-ejected .menu-panel {  
                transform: none;  
                opacity: 1  
            }

            .is-ejected .menu-window {  
                transform: translateY(-110vh);  
                opacity: 0;  
                pointer-events: none  
            }

            .menu-close {  
                right: 12px;  
                top: 12px;  
                width: 53.925px;  
                height: 53.702px;  
                padding: 4px;  
                background: \#ffffff33;  
                border-radius: 12px;  
                backdrop-filter: blur(30px)  
            }

            .esc-key {  
                position: relative;  
                display: block;  
                width: 45.925px;  
                height: 45.702px;  
                border-radius: 8px;  
                background: \#000;  
                color: \#8b8b8b;  
                text-align: left;  
                padding: 23px 0 0 7px;  
                font: 500 14.031px/18px 'Restart Soft',sans-serif;  
                transition: background .2s,color .2s  
            }

            .menu-close:hover .esc-key,.menu-close:focus-visible .esc-key {  
                background: \#fff;  
                color: \#111  
            }

            .profile-button.button-yellow {  
                background: \#fff\!important  
            }

            .profile-button.button-yellow img {  
                filter: none  
            }

            .profile-button.button-yellow .button-pixels {  
                opacity: 1  
            }

            .menu-floppy {  
                top: 260px;  
                left: calc(50% \- 140px);  
                width: 280px;  
                height: 292px;  
                filter: none\!important;  
                perspective: 900px  
            }

            .menu-floppy\>.floppy-model {  
                transform: rotateX(-7deg) rotateY(-10deg);  
                transition: transform .8s  
            }

            .menu-floppy::after {  
                inset: 85% 0 \-9%;  
                background: \#efff4738;  
                filter: blur(28px)  
            }

            .menu-eject {  
                top: 323px  
            }

            .is-typing .menu-floppy {  
                transform: translateY(28px);  
                opacity: 0  
            }

            .is-ejected .menu-floppy {  
                transform: translateY(110vh) rotate(-10deg);  
                opacity: 0  
            }

            .disk-orbit {  
                width: 440px;  
                height: 380px;  
                perspective: 1200px;  
                transform-style: preserve-3d  
            }

            .studio-disk {  
                width: 280px;  
                height: 292px;  
                filter: none\!important;  
                border-radius: 8px;  
                transform-style: preserve-3d;  
                transition: transform .85s cubic-bezier(.22,1,.36,1);  
                outline-offset: 12px\!important  
            }

            .disk-garcy {  
                left: 5px;  
                top: 85px;  
                transform: rotateX(48deg) rotateY(-8deg) rotateZ(-32deg);  
                z-index: 2  
            }

            .disk-tesseral {  
                left: 160px;  
                top: \-25px;  
                transform: translateZ(-70px) rotateX(48deg) rotateY(-8deg) rotateZ(-32deg);  
                z-index: 1  
            }

            .studio-disk.is-front {  
                transform: translate3d(-10px,-35px,95px) rotateX(38deg) rotateY(-6deg) rotateZ(-23deg);  
                z-index: 3  
            }

            .menu-disks::before {  
                content: '';  
                position: absolute;  
                left: 30%;  
                right: 25%;  
                top: 40%;  
                bottom: 25%;  
                background: radial-gradient(ellipse,\#f3ff4710,transparent 65%);  
                pointer-events: none  
            }

            @media(max-width: 600px) {  
                .menu-composition {  
                    top:19%;  
                    width: calc(100vw \- 40px)  
                }

                .menu-floppy {  
                    top: 260px;  
                    left: calc(50% \- 140px)  
                }

                .disk-orbit {  
                    width: 340px;  
                    height: 340px;  
                    perspective: 1000px  
                }

                .studio-disk {  
                    transform-origin: 50% 50%;  
                    scale: .8  
                }

                .disk-garcy {  
                    left: \-22px;  
                    top: 95px  
                }

                .disk-tesseral {  
                    left: 85px;  
                    top: \-10px  
                }

                .menu-close {  
                    right: 12px;  
                    top: 12px  
                }

                .menu-results {  
                    max-height: 35vh  
                }  
            }

            @media(max-height: 750px) {  
                .menu-composition {  
                    top:17%  
                }

                .menu-floppy {  
                    top: 230px;  
                    scale: .78;  
                    transform-origin: 50% 0  
                }

                .menu-eject {  
                    top: 320px  
                }

                .menu-results {  
                    max-height: 34vh  
                }  
            }

            @media(prefers-reduced-motion:reduce) {  
                .menu-underlay {  
                    filter: none;  
                    transition: none  
                }  
            }

            .studio-disk {  
                isolation: auto  
            }

            .studio-menu {  
                background: rgba(7,9,9,.68)  
            }

            .menu-underlay .site-header {  
                visibility: hidden  
            }

            /\* Joined glass: the upper layer is laid over the results surface. \*/  
            .menu-window {  
                border-radius: 12px;  
                background: \#ffffff08;  
                backdrop-filter: blur(30px) saturate(135%);  
                \-webkit-backdrop-filter: blur(30px) saturate(135%);  
                box-shadow: inset 0 0 0 .7px \#ffffff25,0 12px 30px \#00000014  
            }

            .menu-search-row {  
                border-radius: 12px 12px 0 0;  
                background: \#ffffff12;  
                box-shadow: inset 0 1px 0 \#ffffff25,inset 0 \-1px 0 \#ffffff09;  
                backdrop-filter: none;  
                \-webkit-backdrop-filter: none  
            }

            .menu-panel {  
                margin-top: 0;  
                border-radius: 0 0 12px 12px;  
                background: \#ffffff08;  
                box-shadow: none;  
                backdrop-filter: none;  
                \-webkit-backdrop-filter: none  
            }

            .menu-floppy {  
                position: absolute;  
                left: calc(50% \- 140px);  
                top: calc(25% \+ 260px);  
                z-index: 2;  
                scale: 1;  
                transform: none;  
                perspective: 1000px;  
                transition: top 1s cubic-bezier(.22,1,.36,1),left 1s cubic-bezier(.22,1,.36,1),transform 1s cubic-bezier(.22,1,.36,1),opacity .48s  
            }

            .floppy-grip {  
                display: block;  
                position: relative;  
                width: 280px;  
                height: 292px;  
                padding: 0;  
                background: transparent\!important;  
                isolation: auto;  
                transform-style: preserve-3d;  
                touch-action: none;  
                cursor: grab\!important;  
                transform: translateY(var(--pull-y,0px));  
                transition: transform .45s cubic-bezier(.22,1,.36,1)  
            }

            .floppy-grip\>.floppy-model {  
                transform: rotateX(-7deg) rotateY(-10deg);  
                transition: transform .8s cubic-bezier(.22,1,.36,1)  
            }

            .menu-floppy:not(.is-dragging) .floppy-grip:hover {  
                transform: translateY(-8px)  
            }

            .menu-floppy.is-dragging .floppy-grip {  
                transition: none;  
                cursor: grabbing\!important  
            }

            .is-ejected .menu-floppy {  
                left: calc(50% \- 200px);  
                top: calc(50% \- 130px);  
                transform: rotateX(8deg) rotateY(-32deg);  
                opacity: 1;  
                pointer-events: auto;  
                scale: 1;  
                z-index: 4  
            }

            .is-ejected .floppy-grip\>.floppy-model {  
                transform: none  
            }

            .is-ejected .menu-floppy .floppy-grip:hover {  
                transform: translateY(-18px)  
            }

            .is-ejected .menu-eject {  
                opacity: 0;  
                pointer-events: none;  
                visibility: hidden  
            }

            .menu-eject {  
                transition: opacity .2s  
            }

            .disk-orbit {  
                width: 440px;  
                height: 292px;  
                top: 50%;  
                animation: none;  
                perspective: 1000px  
            }

            .disk-tesseral {  
                left: 180px;  
                top: \-60px;  
                transform: translateZ(-85px) rotateX(8deg) rotateY(-32deg);  
                opacity: 0;  
                transition: transform .9s cubic-bezier(.22,1,.36,1),opacity .65s .2s;  
                scale: 1  
            }

            .is-ejected .disk-tesseral {  
                opacity: 1;  
                animation: book-appear 1.1s cubic-bezier(.22,1,.36,1) both  
            }

            .is-ejected.tesseral-front .disk-tesseral {  
                transform: translate3d(-30px,-22px,85px) rotateX(8deg) rotateY(-32deg);  
                z-index: 5;  
                animation: none  
            }

            .is-ejected.tesseral-front .menu-floppy {  
                transform: translate(-24px,20px) rotateX(8deg) rotateY(-32deg);  
                z-index: 2  
            }

            .menu-disks {  
                pointer-events: none;  
                z-index: 3  
            }

            .menu-disks a,.menu-disks button {  
                pointer-events: auto  
            }

            .menu-floppy::after {  
                inset: 94% 10% \-4%;  
                background: \#f3ff471c;  
                filter: blur(17px);  
                transition: opacity .6s  
            }

            .is-ejected .menu-floppy::after {  
                opacity: 0  
            }

            .is-contact .menu-floppy {  
                visibility: hidden  
            }

            @keyframes book-appear {  
                from {  
                    opacity: 0;  
                    transform: translate3d(-65px,85px,-130px) rotateX(8deg) rotateY(-32deg)  
                }

                to {  
                    opacity: 1;  
                    transform: translateZ(-85px) rotateX(8deg) rotateY(-32deg)  
                }  
            }

            @media(max-width: 600px) {  
                .menu-floppy {  
                    top:calc(19% \+ 260px)  
                }

                .is-ejected .menu-floppy {  
                    left: calc(50% \- 155px);  
                    top: calc(50% \- 70px);  
                    scale: .78  
                }

                .disk-orbit {  
                    width: 340px  
                }

                .disk-tesseral {  
                    left: 115px;  
                    top: \-35px;  
                    scale: .78  
                }  
            }

            @media(max-height: 750px) {  
                .menu-floppy {  
                    top:calc(17% \+ 230px);  
                    scale: .78;  
                    transform-origin: 50% 0  
                }

                .is-ejected .menu-floppy {  
                    top: calc(50% \- 110px);  
                    scale: .9  
                }  
            }

            .studio-menu::before {  
                background-image: url('/assets/menu/dither.svg');  
                opacity: .7;  
                z-index: 0;  
                mix-blend-mode: overlay;  
                image-rendering: pixelated  
            }

            .menu-composition {  
                z-index: 5;  
                pointer-events: none  
            }

            .menu-window {  
                pointer-events: auto  
            }

            .is-ejected .menu-window {  
                pointer-events: none  
            }

            .studio-menu::before {  
                opacity: .45  
            }

            /\* Both solid disks live in one 3D coordinate system; depth never switches via z-index. \*/  
            .menu-disks {  
                perspective: 1100px;  
                overflow: visible  
            }

            .disk-orbit {  
                position: absolute;  
                left: 50%;  
                top: 46%;  
                width: 280px;  
                height: 292px;  
                perspective: none;  
                transform: translate(-50%,-50%) rotateX(var(--stack-x,-16deg)) rotateY(var(--stack-y,-45deg));  
                transform-style: preserve-3d;  
                touch-action: none;  
                pointer-events: auto;  
                transition: transform .12s linear;  
                cursor: grab  
            }

            .stack-dragging .disk-orbit {  
                transition: none;  
                cursor: grabbing  
            }

            .stack-dragging .floppy-grip {  
                cursor: grabbing\!important  
            }

            .is-ejected .menu-floppy.in-stack,.is-ejected.tesseral-front .menu-floppy.in-stack {  
                position: absolute;  
                inset: 0;  
                left: 0;  
                top: 0;  
                width: 280px;  
                height: 292px;  
                scale: 1;  
                perspective: none;  
                transform: translate3d(0,0,65px);  
                transform-origin: center;  
                transform-style: preserve-3d;  
                z-index: auto;  
                opacity: 1;  
                transition: transform .75s cubic-bezier(.22,1,.36,1)  
            }

            .is-ejected .disk-tesseral {  
                position: absolute;  
                left: 0;  
                top: 0;  
                scale: 1;  
                transform: translate3d(0,0,-85px);  
                z-index: auto;  
                animation: none;  
                opacity: 1;  
                transition: transform .75s cubic-bezier(.22,1,.36,1)  
            }

            .is-ejected.tesseral-front .disk-tesseral {  
                transform: translate3d(75px,-35px,125px);  
                z-index: auto;  
                animation: none  
            }

            .is-ejected.tesseral-front .menu-floppy.in-stack {  
                transform: translate3d(-40px,15px,-45px)  
            }

            .is-ejected .menu-floppy .floppy-grip,.is-ejected .menu-floppy .floppy-grip:hover {  
                transform: none;  
                cursor: grab\!important  
            }

            .in-stack .floppy-model {  
                transform: none\!important  
            }

            .is-navigating .menu-window {  
                pointer-events: none;  
                transform-origin: 50% 50%  
            }

            .is-navigating .menu-floppy {  
                opacity: 0;  
                pointer-events: none  
            }

            @media(max-width: 600px) {  
                .disk-orbit {  
                    scale:.78;  
                    transform-origin: 0 0;  
                    left: 50%;  
                    top: 44%  
                }  
            }

            /\* A fixed drawer stack: selection lifts a disk without changing its depth. \*/  
            .is-ejected .menu-floppy.in-stack,.is-ejected.tesseral-front .menu-floppy.in-stack {  
                transform: translate3d(-22px,24px,85px)  
            }

            .is-ejected .disk-tesseral,.is-ejected.tesseral-front .disk-tesseral {  
                transform: translate3d(22px,-12px,-115px)  
            }

            .is-ejected .menu-floppy.in-stack.is-lifted {  
                transform: translate3d(-22px,-66px,85px)  
            }

            .is-ejected .disk-tesseral.is-lifted {  
                transform: translate3d(22px,-102px,-115px)  
            }

            .disk-orbit,.disk-orbit \* {  
                \-webkit-user-drag: none;  
                user-select: none  
            }

            @media(prefers-reduced-motion:reduce) {  
                .is-ejected .menu-floppy.in-stack,.is-ejected .disk-tesseral {  
                    transition: none  
                }  
            }

            /\* One continuous frosted pane; the connected search surface is slightly lighter. \*/  
            .menu-window {  
                background: rgba(47,49,49,.64);  
                backdrop-filter: blur(64px) saturate(120%);  
                \-webkit-backdrop-filter: blur(64px) saturate(120%);  
                box-shadow: inset 0 0 0 .7px \#ffffff30,inset 0 1px 0 \#ffffff20,0 16px 50px \#0004  
            }

            .menu-search-row {  
                background: rgba(255,255,255,.12)  
            }

            .menu-panel {  
                background: rgba(255,255,255,.035)  
            }

            .studio-menu {  
                backdrop-filter: blur(8px);  
                \-webkit-backdrop-filter: blur(8px)  
            }

            @media(max-width: 700px) {  
                .menu-composition {  
                    top:calc(var(--menu-viewport-top,0px) \+ 76px);  
                    width: calc(100vw \- 32px);  
                }

                .menu-results {  
                    max-height: min(380px,calc(var(--menu-viewport-height,100dvh) \- 194px));  
                }

                .studio-menu.keyboard-open .menu-composition {  
                    top: calc(var(--menu-viewport-top,0px) \+ 80px);  
                }

                .studio-menu.keyboard-open .menu-results {  
                    max-height: max(76px,calc(var(--menu-viewport-height,100dvh) \- 188px));  
                }

                .studio-menu.keyboard-open .menu-result {  
                    min-height: 34px;  
                    padding-block:6px;}

                .studio-menu.keyboard-open .menu-search-row {  
                    height: 50px;  
                }  
            }

            .studio-menu.is-leaving-page {  
                background: \#181919\!important  
            }

            .is-leaving-page .menu-close {  
                visibility: hidden  
            }

            .menu-eject {  
                white-space: nowrap;  
                text-align: center;  
                display: block;  
                background: transparent;  
                box-shadow: none;  
                pointer-events: none  
            }

            .menu-eject span {  
                display: block;  
                font-size: 9px;  
                color: \#999;  
                margin-top: 8px  
            }

            .floppy-grip {  
                touch-action: none;  
                cursor: grab\!important  
            }

            .is-dragging .floppy-grip {  
                cursor: grabbing\!important;  
                transition: none\!important  
            }

            /\* Floppy hints are quiet copy, not button surfaces. \*/  
            .studio-menu .menu-eject,.studio-menu .menu-eject span {  
                background: none;  
                background-image: none;  
                backdrop-filter: none;  
                \-webkit-backdrop-filter: none;  
                border: 0;  
                border-radius: 0;  
                box-shadow: none;  
                font-family: var(--mono);  
                font-weight: 400;  
                text-transform: uppercase;  
            }

            /\* The whole glass window grows from its trigger; avoid competing panel scales. \*/  
            .is-opening .menu-panel,.is-opening .menu-search-row {  
                animation: none;  
            }

            @media(hover: hover) and (prefers-reduced-motion:no-preference) {  
                .floppy-grip:hover .floppy-label {  
                    animation:floppy-analog .85s steps(1) infinite;  
                }

                .floppy-grip:hover .floppy-grain {  
                    opacity: .36;  
                    background-size: 83px 79px;  
                    animation: floppy-static .16s steps(2) infinite;  
                }

                .floppy-grip:hover .floppy-shutter {  
                    animation: floppy-signal 1.3s steps(1) infinite;  
                }  
            }

            @keyframes floppy-analog {  
                0%,24%,35%,70%,100% {  
                    translate: 0;  
                    filter: none;  
                }

                25% {  
                    translate: 3px 0;  
                    filter: contrast(1.3) drop-shadow(-2px 0 \#82ffff80);  
                }

                30% {  
                    translate: \-2px 0;  
                    filter: brightness(1.2) drop-shadow(2px 0 \#ff85bb80);  
                }

                72% {  
                    translate: 1px 0;  
                    filter: contrast(1.2);  
                }

                76% {  
                    translate: \-1px 0;  
                    filter: none;  
                }  
            }

            @keyframes floppy-static {  
                to {  
                    background-position: 17px \-23px;  
                }  
            }

            @keyframes floppy-signal {  
                0%,20%,27%,100% {  
                    filter: none;  
                }

                22% {  
                    filter: brightness(1.5) contrast(1.2);  
                }  
            }

            /\* Outer overlay and frosted surface inherit the studio search's exact glass. \*/  
            .contact-window {  
                position: absolute;  
                z-index: 5;  
                left: 50%;  
                top: max(100px,calc(var(--contact-height,100dvh)\*.25));  
                transform: translateX(-50%);  
                width: 439px;  
                max-width: calc(100% \- 32px);  
                box-sizing: border-box;  
                padding: 32px 25px 28px;  
                border: 0;  
                border-radius: 12px;  
                max-height: calc(var(--contact-height,100dvh) \- 110px);  
                overflow: auto;  
                color: \#dadada  
            }

            .contact-window\[data-step="1"\] {  
                padding: 63px 25px 25px 23px  
            }

            .contact-intro {  
                max-width: 348px;  
                margin: 0 0 34px;  
                color: \#9d9d9d;  
                font: 500 19.362px/1 'Restart Soft';  
                letter-spacing: \-.04em  
            }

            .contact-intro strong {  
                color: \#fff;  
                font-weight: 500  
            }

            .contact-label,.contact-window h2 {  
                font: 8px/1.4 'ABC Diatype Mono',monospace;  
                text-transform: uppercase;  
                margin: 0 0 14px;  
                letter-spacing: \-.01em  
            }

            .contact-label {  
                display: flex;  
                justify-content: space-between  
            }

            .contact-label span {  
                color: \#757575  
            }

            .contact-fields {  
                overflow: hidden;  
                border-radius: 12px;  
                box-shadow: inset 0 0 0 .6px \#ffffff25  
            }

            .contact-field {  
                display: flex;  
                align-items: center;  
                gap: 14px;  
                background: rgba(69,69,69,.6);  
                height: 58px;  
                padding: 0 16px;  
                box-sizing: border-box;  
                backdrop-filter: blur(24px);  
                \-webkit-backdrop-filter: blur(24px)  
            }

            .contact-field+.contact-field {  
                border-top: 1px solid \#ffffff16  
            }

            .contact-field input {  
                background: none;  
                border: 0;  
                outline: none;  
                min-width: 0;  
                width: 100%;  
                color: \#dadada;  
                font: 400 16px/1 'Restart Soft';  
                letter-spacing: \-.04em  
            }

            .contact-field input::placeholder {  
                color: \#878787;  
                opacity: 1  
            }

            .contact-field:focus-within {  
                background: rgba(82,82,82,.6)  
            }

            .contact-field\>img {  
                flex: none;  
                width: auto;  
                height: auto  
            }

            .contact-actions {  
                display: flex;  
                justify-content: space-between;  
                align-items: center;  
                margin-top: 22px;  
                gap: 15px  
            }

            .contact-actions a,.contact-next,.contact-back {  
                font: 500 11px/1 'Restart Soft';  
                color: \#fff;  
                text-decoration: none;  
                background: \#40404033;  
                border: 0;  
                border-radius: 17.19px;  
                padding: 14px 16px;  
                display: flex;  
                align-items: center;  
                gap: 10px;  
                cursor: pointer;  
                backdrop-filter: blur(24px);  
                \-webkit-backdrop-filter: blur(24px)  
            }

            .contact-next {  
                background: \#e8e8e833  
            }

            .contact-next img,.contact-actions a img,.contact-back img {  
                width: auto;  
                height: auto;  
                flex: none  
            }

            .contact-next:disabled {  
                opacity: .35;  
                cursor: default  
            }

            .contact-enter {  
                font: 500 7.015px/1 'Restart Soft';  
                background: \#ffffffb3;  
                color: \#111;  
                border-radius: 4.5px;  
                padding: 3px;  
                letter-spacing: 0  
            }

            .contact-back {  
                width: max-content;  
                margin-bottom: 26px  
            }

            .contact-services {  
                position: relative  
            }

            .contact-services button {  
                width: 100%;  
                background: transparent;  
                border: 0;  
                text-align: left  
            }

            .contact-modal .contact-services button:focus-visible {  
                outline: none  
            }

            .contact-services .menu-result-title {  
                font-size: 19px  
            }

            .contact-services .menu-result-type {  
                font-size: 8px  
            }

            .contact-window\[data-step="3"\] {  
                min-height: 227px;  
                padding: 32px 24px 36px 26px  
            }

            .contact-window\[data-step="3"\] h2 {  
                margin-bottom: 20px  
            }

            .budget-control {  
                height: 46px;  
                position: relative;  
                background: rgba(30,30,30,.6);  
                border-radius: 12px;  
                backdrop-filter: blur(24px);  
                \-webkit-backdrop-filter: blur(24px);  
                box-shadow: inset 0 0 0 .6px \#ffffff20  
            }

            .contact-window .budget-selection {  
                position: absolute;  
                z-index: 3;  
                left: calc(var(--budget)\*(100% \- 136px)/2);  
                top: 0;  
                width: 136px;  
                height: 46px;  
                display: flex;  
                justify-content: center;  
                align-items: center;  
                gap: 7px;  
                background: rgba(69,69,69,.6);  
                border: 0;  
                border-radius: 12px;  
                box-shadow: inset 0 0 0 .6px \#ffffff35,inset 0 1px 0 \#ffffff18,0 3px 12px \#0001;  
                backdrop-filter: blur(24px);  
                \-webkit-backdrop-filter: blur(24px);  
                transition: left .35s cubic-bezier(.2,.8,.2,1);  
                padding: 0;  
                pointer-events: auto;  
                touch-action: none;  
                cursor: pointer;  
                color: \#dadada  
            }

            .budget-price {  
                font: 500 16px/1 'Restart Soft';  
                letter-spacing: \-.04em  
            }

            .budget-selection .contact-enter {  
                pointer-events: auto;  
                cursor: pointer  
            }

            .budget-control input {  
                position: absolute;  
                z-index: 2;  
                inset: 0;  
                width: 100%;  
                height: 100%;  
                margin: 0;  
                opacity: .001;  
                cursor: ew-resize  
            }

            .budget-control:has(input:focus-visible) {  
                outline: 1px solid \#ffffff66;  
                outline-offset: 3px  
            }

            .budget-labels {  
                display: flex;  
                justify-content: space-between;  
                margin-top: 9px;  
                font: 8px/1 'ABC Diatype Mono',monospace;  
                letter-spacing: \-.01em;  
                color: \#d0d0d0  
            }

            .contact-window textarea {  
                box-sizing: border-box;  
                width: 100%;  
                min-height: 124px;  
                padding: 20px 16px;  
                background: rgba(69,69,69,.6);  
                border: 0;  
                border-radius: 12px;  
                resize: vertical;  
                color: \#dadada;  
                font: 400 16px 'Restart Soft';  
                letter-spacing: \-.04em;  
                box-shadow: inset 0 0 0 .6px \#ffffff25;  
                backdrop-filter: blur(24px);  
                \-webkit-backdrop-filter: blur(24px)  
            }

            .contact-trap {  
                position: absolute;  
                left: \-9999px  
            }

            .contact-error {  
                color: \#ffff40;  
                font-size: 13px  
            }

            .contact-window\[data-step="5"\] {  
                height: 239px;  
                padding: 63px 26px 28px  
            }

            .contact-success {  
                position: relative;  
                text-align: left;  
                color: \#9d9d9d;  
                font: 500 19.362px/1 'Restart Soft';  
                letter-spacing: \-.04em;  
                max-width: 314px  
            }

            .contact-success p {  
                margin: 0  
            }

            .contact-success .success-closing {  
                color: \#fff;  
                margin-top: 19.362px  
            }

            .success-mark {  
                position: absolute;  
                left: 0;  
                top: \-43px;  
                display: block;  
                width: 28px;  
                height: 28px  
            }

            .success-mark svg,.success-mark canvas {  
                position: absolute;  
                inset: 0;  
                width: 100%;  
                height: 100%  
            }

            .success-mark svg {  
                opacity: 0  
            }

            .success-mark canvas {  
                image-rendering: pixelated  
            }

            .success-mark.is-resolved svg {  
                opacity: 1  
            }

            .success-mark.is-resolved canvas {  
                display: none  
            }

            .contact.button-yellow\>img {  
                opacity: 0  
            }

            .contact.button-yellow .button-pixels {  
                opacity: 1  
            }

            .contact-modal.is-opening .contact-window {  
                animation: contact-form-in .65s cubic-bezier(.16,1,.3,1) both  
            }

            @keyframes contact-form-in {  
                from {  
                    opacity: 0;  
                    translate: 0 25px;  
                    scale: .96  
                }

                to {  
                    opacity: 1;  
                    translate: 0 0;  
                    scale: 1  
                }  
            }

            @media(max-width: 700px) {  
                .contact-window {  
                    top:calc(var(--contact-top,0px) \+ 82px);  
                    max-height: calc(var(--contact-height,100dvh) \- 94px);  
                    padding: 26px 20px  
                }

                .contact-window\[data-step="1"\] {  
                    padding: 38px 20px 24px  
                }

                .contact-intro {  
                    font-size: 18px;  
                    margin: 0 0 28px  
                }

                .contact-services .menu-result-title {  
                    font-size: 17px  
                }

                .contact-services .menu-result-type {  
                    display: none  
                }

                .contact-window\[data-step="3"\] {  
                    padding: 26px 20px 32px  
                }

                .contact-window .budget-selection {  
                    width: 118px;  
                    left: calc(var(--budget)\*(100% \- 118px)/2)  
                }

                .budget-price {  
                    font-size: 14px  
                }

                .contact-window\[data-step="5"\] {  
                    padding-inline:24px;height: 250px  
                }

                .contact-success {  
                    font-size: 19.362px  
                }  
            }

            @media(prefers-reduced-motion:reduce) {  
                .contact-modal \* {  
                    animation: none\!important;  
                    transition: none\!important  
                }  
            }

            .floppy-model {  
                \--u: 1px;  
                \--disk: \#25272a;  
                \--disk-edge: \#121416;  
                \--light: \#f3ff47;  
                position: relative;  
                display: block;  
                width: calc(280\*var(--u));  
                height: calc(292\*var(--u));  
                transform-style: preserve-3d;  
                pointer-events: none  
            }

            .floppy-green {  
                \--disk: \#dfdfd7;  
                \--disk-edge: \#8e938b;  
                \--light: \#7dff8b  
            }

            .floppy-face {  
                position: absolute;  
                inset: 0;  
                display: block;  
                border-radius: calc(8\*var(--u));  
                backface-visibility: hidden  
            }

            .floppy-front {  
                background: linear-gradient(135deg,\#ffffff16,transparent 34%),var(--disk);  
                border: 1px solid \#ffffff30;  
                transform: translateZ(calc(8\*var(--u)));  
                box-shadow: inset 0 0 0 calc(3\*var(--u)) \#ffffff07,inset 0 \-2px 0 \#0006  
            }

            .floppy-back {  
                background: var(--disk);  
                transform: rotateY(180deg) translateZ(calc(8\*var(--u)));  
                box-shadow: inset 0 0 0 calc(4\*var(--u)) \#0003  
            }

            .floppy-edge {  
                position: absolute;  
                display: block;  
                background: linear-gradient(90deg,\#ffffff20,\#0002 35%,\#0007 48%,\#ffffff18 52%,\#0002),var(--disk-edge);  
                backface-visibility: hidden  
            }

            .floppy-edge-left,.floppy-edge-right {  
                width: calc(16\*var(--u));  
                height: calc(280\*var(--u));  
                top: calc(6\*var(--u));  
                left: calc(132\*var(--u))  
            }

            .floppy-edge-left {  
                transform: translateX(calc(-140\*var(--u))) rotateY(-90deg)  
            }

            .floppy-edge-right {  
                transform: translateX(calc(140\*var(--u))) rotateY(90deg)  
            }

            .floppy-edge-top,.floppy-edge-bottom {  
                width: calc(268\*var(--u));  
                height: calc(16\*var(--u));  
                left: calc(6\*var(--u));  
                top: calc(138\*var(--u))  
            }

            .floppy-edge-top {  
                transform: translateY(calc(-146\*var(--u))) rotateX(90deg)  
            }

            .floppy-edge-bottom {  
                transform: translateY(calc(146\*var(--u))) rotateX(-90deg);  
                background: linear-gradient(0deg,\#0009,transparent),var(--light);  
                box-shadow: 0 0 calc(9\*var(--u)) color-mix(in srgb,var(--light) 45%,transparent)  
            }

            .floppy-grain {  
                position: absolute;  
                inset: 0;  
                background: url('/assets/menu/noise.svg');  
                opacity: .075;  
                border-radius: inherit  
            }

            .floppy-track {  
                position: absolute;  
                left: 9%;  
                top: 0;  
                width: 68%;  
                height: 34%;  
                border-radius: 0 0 calc(6\*var(--u)) calc(6\*var(--u));  
                background: \#0004;  
                box-shadow: inset 1px 0 2px \#0008,1px 1px 0 \#fff2  
            }

            .floppy-shutter {  
                position: absolute;  
                top: \-1px;  
                left: 23%;  
                width: 54%;  
                height: 33%;  
                border-radius: 0 0 calc(6\*var(--u)) calc(6\*var(--u));  
                background: repeating-linear-gradient(0deg,\#ffffff09 0 1px,\#00000009 1px 2px),linear-gradient(105deg,\#72777b,\#d6d9d9 35%,\#94999a 53%,\#e1e3df 80%,\#909697);  
                border: 1px solid \#dde1dd99;  
                box-shadow: calc(2\*var(--u)) calc(3\*var(--u)) calc(3\*var(--u)) \#0006,inset 1px 1px 0 \#fff9  
            }

            .floppy-shutter-slot {  
                position: absolute;  
                right: 15%;  
                top: 12%;  
                width: 24%;  
                height: 74%;  
                border-radius: 1px;  
                background: linear-gradient(90deg,\#0b0e10,\#33393b);  
                box-shadow: inset 2px 1px 2px \#000,1px 1px 0 \#fff8  
            }

            .floppy-metal-etch {  
                position: absolute;  
                left: 8%;  
                bottom: 10%;  
                color: \#414648;  
                font: 500 calc(6\*var(--u))/1 'ABC Diatype Mono',monospace;  
                writing-mode: vertical-rl;  
                letter-spacing: .05em  
            }

            .floppy-arrow {  
                position: absolute;  
                left: 3%;  
                top: 5%;  
                font: calc(19\*var(--u))/1 sans-serif;  
                color: \#0007;  
                text-shadow: 0 1px \#fff2  
            }

            .floppy-emboss {  
                position: absolute;  
                right: 7%;  
                top: 9%;  
                font: 600 calc(19\*var(--u))/1 'Restart Soft';  
                color: \#0005;  
                text-shadow: 0 1px \#fff2;  
                letter-spacing: \-.1em  
            }

            .floppy-label {  
                position: absolute;  
                left: 10%;  
                right: 10%;  
                top: 42%;  
                bottom: 8%;  
                display: block;  
                border-radius: calc(5\*var(--u));  
                background: linear-gradient(145deg,\#ffffff0d,\#0000000a),color-mix(in srgb,var(--light) 80%,\#9d9e80);  
                border: 1px solid color-mix(in srgb,var(--light) 50%,\#fff);  
                box-shadow: 0 0 0 calc(4\*var(--u)) \#0002,inset 0 1px 0 \#fff5;  
                color: \#25271c  
            }

            .floppy-logo-wrap {  
                position: absolute;  
                top: 14%;  
                left: 9%;  
                transform-origin: top left;  
                transform: scale(1.5)  
            }

            .floppy-logo-wrap img {  
                display: block;  
                filter: brightness(0);  
                max-width: none  
            }

            .floppy-green .floppy-logo-wrap {  
                transform: scale(.9)  
            }

            .floppy-label-rule {  
                position: absolute;  
                top: 40%;  
                left: 9%;  
                right: 9%;  
                height: 1px;  
                background: \#25271c40  
            }

            .floppy-edition {  
                position: absolute;  
                left: 9%;  
                top: 48%;  
                font: calc(6.7\*var(--u))/1.5 'ABC Diatype Mono',monospace;  
                letter-spacing: .015em  
            }

            .floppy-barcode {  
                position: absolute;  
                left: 9%;  
                bottom: 10%;  
                width: 43%;  
                height: 15%;  
                background: repeating-linear-gradient(90deg,\#292c1c 0 2px,transparent 2px 4px,\#292c1c 4px 5px,transparent 5px 8px,\#292c1c 8px 12px,transparent 12px 15px)  
            }

            .floppy-serial {  
                position: absolute;  
                right: 9%;  
                bottom: 12%;  
                font: calc(6\*var(--u))/1 'ABC Diatype Mono',monospace  
            }

            .floppy-notch {  
                position: absolute;  
                bottom: 4%;  
                width: 4.5%;  
                height: 4%;  
                background: \#090b08;  
                border-radius: 1px;  
                box-shadow: inset 1px 1px 1px \#000,0 1px 0 \#fff4  
            }

            .notch-left {  
                left: 3%  
            }

            .notch-right {  
                right: 3%  
            }

            .floppy-seam {  
                position: absolute;  
                bottom: 1.3%;  
                left: 6%;  
                right: 6%;  
                height: 1px;  
                background: \#fff2;  
                box-shadow: 0 1px 0 \#0006  
            }

            .floppy-hub {  
                position: absolute;  
                width: 35%;  
                aspect-ratio: 1;  
                top: 34%;  
                left: 32.5%;  
                border-radius: 50%;  
                background: radial-gradient(circle,\#222 12%,\#9fa5a5 13% 40%,\#555 41% 44%,\#c4c8c8 45% 60%,\#101212 61%);  
                box-shadow: 0 0 0 10px \#0003  
            }

            .floppy-back-groove {  
                position: absolute;  
                inset: 15% 8%;  
                border: 2px solid \#0003;  
                border-radius: 5px  
            }

            .floppy-front {  
                transform-style: preserve-3d  
            }

            .floppy-shutter {  
                transform: translateZ(calc(3\*var(--u)))  
            }

            .floppy-label {  
                transform: translateZ(calc(1\*var(--u)))  
            }

            .floppy-green .floppy-logo-wrap {  
                transform: scale(2.45)  
            }

            .floppy-grain {  
                opacity: .17;  
                z-index: 5;  
                pointer-events: none  
            }

            .floppy-label::after,.floppy-shutter::after {  
                content: '';  
                position: absolute;  
                inset: 0;  
                border-radius: inherit;  
                background: url('/assets/menu/noise.svg');  
                opacity: .13;  
                pointer-events: none  
            }

            .floppy-edge-bottom {  
                background: linear-gradient(0deg,\#0009,transparent),var(--disk-edge);  
                box-shadow: 0 1px 2px color-mix(in srgb,var(--light) 30%,transparent)  
            }

            .floppy-label {  
                box-shadow: 0 0 0 calc(4\*var(--u)) \#0002,inset 0 1px 0 \#fff5,0 9px 24px color-mix(in srgb,var(--light) 12%,transparent)  
            }  
        \</style\>  
        \<link rel="preload" as="image" href="./assets/loader/opening.webp" fetchpriority="high"/\>  
        \<link rel="preload" as="image" href="./assets/portraits/notification-grid-16.webp" fetchpriority="high"/\>  
        \<script type="module" src="./app.js"\>\</script\>  
        \<script id="project-metadata" type="application/json"\>  
            {  
                "projects": {  
                    "society-for-all": {  
                        "title": "SOFA Society for All Rebrand & Website \| garcy.studio",  
                        "description": "Naming, brand identity, illustration and website design for SOFA Society for All, turning a serious education mission into a confident, human and accessible brand.",  
                        "image": "assets/projects/society-for-all.webp",  
                        "indexable": true  
                    },  
                    "koscom-30": {  
                        "title": "Koscom Magazine Art Direction \| garcy.studio",  
                        "description": "Editorial art direction for Koscom’s anniversary magazine, giving around 25 articles their own visual character while keeping the publication coherent.",  
                        "image": "assets/projects/koscom-30.webp",  
                        "indexable": true  
                    },  
                    "unit-architects": {  
                        "title": "UNIT Architekti Branding & Website \| garcy.studio",  
                        "description": "A long-term visual identity, brand manual and website for UNIT architekti, built around the UNIT square, Moderat typography and a precise system made to last.",  
                        "image": "assets/projects/unit-architects.webp",  
                        "indexable": true  
                    },  
                    "otk": {  
                        "title": "Oslo Tennisklubb Branding & Website \| garcy.studio",  
                        "description": "A full rebrand and website for Oslo Tennisklubb, combining 125 years of heritage with a flexible identity, expressive typography and a modern digital system.",  
                        "image": "assets/project-content/otk-cover-1.webp",  
                        "indexable": true  
                    },  
                    "goodveri": {  
                        "title": "Goodveri Rebrand, Naming & Website \| garcy.studio",  
                        "description": "A full transformation from Sokordia Tech to Goodveri, including naming, positioning, brand identity and website design for a complex verification and compliance platform.",  
                        "image": "assets/goodveri/thumb.webp",  
                        "indexable": true  
                    },  
                    "magu": {  
                        "title": "Magu Branding & Packaging Design \| garcy.studio",  
                        "description": "Brand identity and minimalist beverage packaging for Magu, designed to stand out on crowded shelves by letting the natural product colour do the work.",  
                        "image": "assets/projects/magu.webp",  
                        "indexable": true  
                    },  
                    "aomu": {  
                        "title": "AOMU Branding & Packaging Design \| garcy.studio",  
                        "description": "A complete brand identity for AOMU, created from scratch across logo, logotype, colour, packaging and a flexible visual system for a growing product brand.",  
                        "image": "assets/projects/aomu.webp",  
                        "indexable": true  
                    },  
                    "arkady": {  
                        "title": "Arkády Rebrand & Branding \| garcy.studio",  
                        "description": "A bold new visual identity for Arkády, using vivid colour, distinctive typography and a flexible retail brand system built for visibility.",  
                        "image": "assets/projects/oslo-02.webp",  
                        "indexable": true  
                    },  
                    "luxury-travel-digest": {  
                        "title": "Luxury Travel Digest Magazine Design \| garcy.studio",  
                        "description": "Editorial identity, art direction and magazine design for Luxury Travel Digest, combining bold typography, strong photography and a flexible grid.",  
                        "image": "assets/projects/luxury-travel-digest.webp",  
                        "indexable": true  
                    },  
                    "sunnysoft": {  
                        "title": "Sunnysoft Rebrand & E-commerce Design \| garcy.studio",  
                        "description": "A bold rebrand and e-commerce redesign for Sunnysoft, creating a clearer, more distinctive tech brand and a scalable shopping experience built around trust and usability.",  
                        "image": "assets/projects/sunnysoft-cover.webp",  
                        "indexable": true  
                    },  
                    "liberalni-institut": {  
                        "title": "Liberální institut Rebrand & Branding \| garcy.studio",  
                        "description": "A new visual identity for Liberální institut, combining a structured institutional system with the handwritten 89 as a distinctive reference to its history.",  
                        "image": "assets/project-content/libinst2.webp",  
                        "indexable": true  
                    },  
                    "nachonacho": {  
                        "title": "NachoNacho Rebrand & Website Design \| garcy.studio",  
                        "description": "A bold rebrand, product experience and website redesign for NachoNacho that made a complex SaaS and fintech platform clearer, more memorable and higher converting.",  
                        "image": "assets/project-content/nachonacho1.webp",  
                        "indexable": true  
                    },  
                    "walletii": {  
                        "title": "Walletii by Ooredoo Product Design & UX \| garcy.studio",  
                        "description": "Product design, UX, UI and a brand digital system for Walletii by Ooredoo: a scalable digital wallet experience across multiple markets.",  
                        "image": "assets/case-studies/walletii/cover.webp",  
                        "indexable": true  
                    }  
                },  
                "indexable": true,  
                "socialOrigin": "https\://www\.garcy.studio"  
            }\</script\>  
        \<meta name="ga-measurement-id" content="G-3DXVNT1G04"\>  
        \<meta name="description" content="A brand people ask about. A website that makes things click. We design brands, websites and digital products that make your business unmistakable."\>  
        \<title\>Design that makes you unmistakable — garcy.studio\</title\>  
        \<link rel="canonical" href="https\://www\.garcy.studio/"\>  
        \<meta name="robots" content="index, follow, max-image-preview:large"\>  
        \<meta property="og:type" content="website"\>  
        \<meta property="og:site\_name" content="garcy.studio"\>  
        \<meta property="og:title" content="Design that makes you unmistakable — garcy.studio"\>  
        \<meta property="og:description" content="A brand people ask about. A website that makes things click. We design brands, websites and digital products that make your business unmistakable."\>  
        \<meta property="og:url" content="https\://www\.garcy.studio/"\>  
        \<meta property="og:image" content="https\://www\.garcy.studio/assets/social/studio-desktop.jpg"\>  
        \<meta property="og:image:alt" content="Design that makes you unmistakable — garcy.studio"\>  
        \<meta name="twitter:card" content="summary\_large\_image"\>  
        \<meta name="twitter:title" content="Design that makes you unmistakable — garcy.studio"\>  
        \<meta name="twitter:description" content="A brand people ask about. A website that makes things click. We design brands, websites and digital products that make your business unmistakable."\>  
        \<meta name="twitter:image" content="https\://www\.garcy.studio/assets/social/studio-desktop.jpg"\>  
        \<script type="application/ld+json"\>  
            {  
                "@context": "https\://schema.org",  
                "@graph": \[  
                    {  
                        "@type": "Organization",  
                        "@id": "https\://www\.garcy.studio/\#organization",  
                        "name": "garcy.studio",  
                        "url": "https\://www\.garcy.studio",  
                        "logo": "https\://www\.garcy.studio/assets/icons/icon-512.png",  
                        "email": "hello@garcy.studio",  
                        "address": {  
                            "@type": "PostalAddress",  
                            "streetAddress": "Na Usedlosti 1837/10",  
                            "addressLocality": "Prague",  
                            "postalCode": "147 00",  
                            "addressCountry": "CZ"  
                        },  
                        "sameAs": \[  
                            "https\://www\.behance.net/thisisgarcy",  
                            "https\://www\.instagram.com/garcy.studio/",  
                            "https\://www\.linkedin.com/company/garcy-studio/",  
                            "https\://www\.youtube.com/@garcystudio"  
                        \]  
                    },  
                    {  
                        "@type": "WebSite",  
                        "@id": "https\://www\.garcy.studio/\#website",  
                        "url": "https\://www\.garcy.studio",  
                        "name": "garcy.studio",  
                        "publisher": {  
                            "@id": "https\://www\.garcy.studio/\#organization"  
                        }  
                    }  
                \]  
            }\</script\>  
    \</head\>  
    \<body\>  
        \<main class="stage" data-phase="loading"\>  
            \<section class="entry" aria-label="Welcome to garcy.studio"\>  
                \<img class="entry-image" src="./assets/loader/opening.webp" alt="" fetchpriority="high" width="1920" height="1362"/\>  
                \<p class="entry-intro"\>  
                    A brand that feels like you.\<br\>  
                    Something that stops people mid-scroll, mid-street, mid-conversation.\<br\>That’s what you’re after.  
                \</p\>  
                \<p class="entry-since"\>  
                    \<img src="./assets/asterisk.svg" alt=""\>Joy through design since 2008  
                \</p\>  
                \<canvas class="entry-dither" aria-hidden="true"\>\</canvas\>  
                \<canvas class="entry-spotlight" aria-hidden="true"\>\</canvas\>  
                \<div class="entry-center"\>  
                    \<div class="entry-logo" role="img" aria-label="garcy.studio"\>  
                        \<img src="./assets/loader/logo.svg" alt=""/\>  
                    \</div\>  
                    \<p class="entry-status" role="status"\>Getting things ready\</p\>  
                    \<div class="entry-actions" hidden\>  
                        \<button class="enter-sound" type="button" aria-label="Enter studio with analytics cookies and sound"\>  
                            \<span\>Enter studio\</span\>  
                            \<span class="entry-choice-note"\>  
                                \<span\>cookies on\</span\>  
                                \<span\>sound on\</span\>  
                            \</span\>  
                            \<img class="entry-sound-art" src="./assets/loader/entry-sound-equalizer.svg" alt=""/\>  
                        \</button\>  
                        \<button class="enter-silent" type="button"\>Enter without cookies\</button\>  
                    \</div\>  
                \</div\>  
            \</section\>  
            \<section class="next-scene" aria-label="We design for that moment" aria-describedby="tornado-help" aria-hidden="true" tabindex="0" inert\>  
                \<p id="tornado-help" class="sr-only"\>Drag to rotate and move the gallery. Use arrow keys to explore and Home to reset the view.\</p\>  
                \<p class="tornado-hint" aria-hidden="true"\>Drag to explore · Scroll to continue\</p\>  
                \<button class="moment-continue" type="button" aria-label="Continue to portfolio" disabled\>↓\</button\>  
                \<div class="tornado" aria-hidden="true"\>  
                    \<div class="tornado-cards"\>\</div\>  
                \</div\>  
                \<h2 class="moment-title" aria-label="We design for that moment."\>  
                    \<span class="moment-words" aria-hidden="true"\>  
                        \<span\>We design\</span\>  
                        \<span class="moment-line"\>  
                            \<em\>for\</em\>  
                            \<span\>that moment.\</span\>  
                        \</span\>  
                    \</span\>  
                    \<canvas class="headline-pixels" aria-hidden="true"\>\</canvas\>  
                \</h2\>  
            \</section\>  
            \<section class="case-studies" aria-label="Project details" tabindex="-1" hidden inert\>  
                \<a class="case-back" href="/projects/"\>  
                    ← \<span\>Back\</span\>  
                \</a\>  
                \<template data-project-template="society-for-all"\>  
                    \<article class="case-page" data-case="society-for-all" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-society-for-all-480.avif 480w, /assets/responsive/hero-society-for-all-800.avif 800w, /assets/responsive/hero-society-for-all-1200.avif 1200w, /assets/responsive/hero-society-for-all-1433.avif 1433w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/sofa-1.webp" alt="SOFA, Society for All — Serious change does not have to look serious" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-1-480.webp 480w, /assets/responsive/project-content--sofa-1-800.webp 800w, /assets/responsive/project-content--sofa-1-1200.webp 1200w, /assets/project-content/sofa-1.webp 1433w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>SOFA works on some of the most complex issues in Czech education: inclusion, mental wellbeing and systemic change.

After more than a decade of work as ČOSIV, the organisation had grown beyond its original identity. It needed a brand that could better reflect its role, speak to a wider audience and make its expertise easier to approach.

The transformation started with a new name: SOFA, Society for All.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>SOFA, Society for All\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Education / Nonprofit\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Naming, Brand identity, Illustration, Website design, Digital product design\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    SOFA, Society for All\<span\>Serious change does not have to look serious\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#272727"\>  
                                \<img data-defer-src="/assets/project-logos/sofa.svg" alt="SOFA, Society for All logo" style="width:267px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>SOFA needed to feel credible enough for institutions and experts, but human enough for teachers, parents and everyone affected by the education system.

The new name gave us the starting point.

A sofa is familiar, welcoming and open. A place where people come together, talk and feel safe. That idea became the foundation for an identity that feels confident without becoming institutional.\</p\>  
                                \<h2\>A SERIOUS MISSION  
CAN STILL FEEL HUMAN.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-4.webp" alt="SOFA, Society for All — Illustration and visual language" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-4-480.webp 480w, /assets/responsive/project-content--sofa-4-800.webp 800w, /assets/responsive/project-content--sofa-4-1200.webp 1200w, /assets/project-content/sofa-4.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/sofa-7.webp" alt="SOFA, Society for All — The design system" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--sofa-7-480.webp 480w, /assets/responsive/project-content--sofa-7-800.webp 800w, /assets/responsive/project-content--sofa-7-1200.webp 1200w, /assets/project-content/sofa-7.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The SOFA brand identity combines strong typography, bold colours and playful details to make complex topics easier to enter.

Instead of creating another restrained nonprofit identity, we built a visual world with energy and optimism. The system can be loud when it needs attention, quieter when dealing with sensitive topics, and structured when communicating research or expert content.

It gives SOFA enough flexibility to speak to very different audiences without losing its character.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/sofa-5.webp" alt="SOFA, Society for All — Result" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--sofa-5-480.webp 480w, /assets/responsive/project-content--sofa-5-800.webp 800w, /assets/responsive/project-content--sofa-5-1200.webp 1200w, /assets/project-content/sofa-5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Illustration became an important part of making the organisation feel approachable.

Together with illustrator Barbora Idesová, we created a visual language full of personality, small imperfections and human moments. It brings warmth into subjects that could otherwise feel technical, institutional or difficult.

Combined with typography and colour, the illustrations make SOFA immediately recognisable while keeping the communication open and accessible.\</p\>  
                                \<h2\>JOY THROUGH DESIGN.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-10.webp" alt="SOFA, Society for All — Result" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-10-480.webp 480w, /assets/responsive/project-content--sofa-10-800.webp 800w, /assets/responsive/project-content--sofa-10-1200.webp 1200w, /assets/project-content/sofa-10.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The brand was designed to work beyond communication.

It expanded into the SOFA website and a growing digital ecosystem of educational content, services and tools. The same visual principles help keep very different types of information connected while making complex content easier to navigate.

The identity gives SOFA a consistent foundation as the organisation and its services continue to grow.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-11.webp" alt="SOFA, Society for All — Name and identity" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-11-480.webp 480w, /assets/responsive/project-content--sofa-11-800.webp 800w, /assets/responsive/project-content--sofa-11-1200.webp 1200w, /assets/project-content/sofa-11.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-8.webp" alt="SOFA, Society for All — Website and digital ecosystem" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-8-480.webp 480w, /assets/responsive/project-content--sofa-8-800.webp 800w, /assets/responsive/project-content--sofa-8-1200.webp 1200w, /assets/project-content/sofa-8.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-6.webp" alt="SOFA, Society for All — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-6-480.webp 480w, /assets/responsive/project-content--sofa-6-800.webp 800w, /assets/responsive/project-content--sofa-6-1200.webp 1200w, /assets/project-content/sofa-6.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-9.webp" alt="SOFA, Society for All — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-9-480.webp 480w, /assets/responsive/project-content--sofa-9-800.webp 800w, /assets/responsive/project-content--sofa-9-1200.webp 1200w, /assets/project-content/sofa-9.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-2.webp" alt="SOFA, Society for All — Result" width="1920" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-2-480.webp 480w, /assets/responsive/project-content--sofa-2-800.webp 800w, /assets/responsive/project-content--sofa-2-1200.webp 1200w, /assets/project-content/sofa-2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sofa-3.webp" alt="SOFA, Society for All — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sofa-3-480.webp 480w, /assets/responsive/project-content--sofa-3-800.webp 800w, /assets/responsive/project-content--sofa-3-1200.webp 1200w, /assets/project-content/sofa-3.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>The new identity gave SOFA more than a different look.

It helped the organisation present itself with the confidence of the role it had already grown into: a recognised voice working on systemic change in Czech education.

A stronger identity for an organisation working toward a stronger education system.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>SOFA, Society for All\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Education / Nonprofit\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Naming, Brand identity, Illustration, Website design, Digital product design\</dd\>  
                                \</dl\>  
                                \<section class="case-credits" aria-label="Project credits"\>  
                                    \<h2\>Credits\</h2\>  
                                    \<dl\>  
                                        \<dt\>Design Lead\</dt\>  
                                        \<dd\>Tom Garcy\</dd\>  
                                        \<dt\>Illustrations\</dt\>  
                                        \<dd\>Barbora Idesová\</dd\>  
                                    \</dl\>  
                                \</section\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="koscom-30"\>  
                    \<article class="case-page" data-case="koscom-30" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-koscom-30-480.avif 480w, /assets/responsive/hero-koscom-30-800.avif 800w, /assets/responsive/hero-koscom-30-1200.avif 1200w, /assets/responsive/hero-koscom-30-1433.avif 1433w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/koscom1.webp" alt="Koscom — One magazine. Twenty-five different stories." width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom1-480.webp 480w, /assets/responsive/project-content--koscom1-800.webp 800w, /assets/responsive/project-content--koscom1-1200.webp 1200w, /assets/project-content/koscom1.webp 1433w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>For Koscom’s anniversary magazine, our role was focused entirely on editorial art direction.

Over roughly five months, we worked across around 25 articles, each with its own subject, tone and visual material.

The challenge was to make every story feel unique while keeping the whole publication connected.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Koscom, Luxury Guide\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Editorial design\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Art direction, Editorial design\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Koscom\<span\>One magazine. Twenty-five different stories.\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#272727"\>  
                                \<p\>Koscom\</p\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Instead of forcing every article into the same template, we treated each one almost like its own small visual world.

Typography, scale, image placement and composition could change depending on the story.

Some pages could be quiet and restrained. Others could be bold, graphic or almost poster-like.

The consistency came from the overall attitude, not from repeating the same layout.\</p\>  
                                \<h2\>CONSISTENCY DOES NOT HAVE TO MEAN REPETITION.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/koscom3.webp" alt="Koscom — Typography and composition" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom3-480.webp 480w, /assets/responsive/project-content--koscom3-800.webp 800w, /assets/responsive/project-content--koscom3-1200.webp 1200w, /assets/project-content/koscom3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/koscom5.webp" alt="Koscom — Editorial direction" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--koscom5-480.webp 480w, /assets/responsive/project-content--koscom5-800.webp 800w, /assets/responsive/project-content--koscom5-1200.webp 1200w, /assets/project-content/koscom5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Typography carried a large part of the magazine art direction.

We used scale, contrast and hierarchy to give each article its own rhythm and to make long-form content feel more engaging.

The layouts were designed to let photography, products and text breathe, rather than filling every available space.

The goal was to make the publication feel considered from page to page, but never predictable.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/koscom6.webp" alt="Koscom — Result" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--koscom6-480.webp 480w, /assets/responsive/project-content--koscom6-800.webp 800w, /assets/responsive/project-content--koscom6-1200.webp 1200w, /assets/project-content/koscom6.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/koscom10.webp" alt="Koscom — Result" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--koscom10-480.webp 480w, /assets/responsive/project-content--koscom10-800.webp 800w, /assets/responsive/project-content--koscom10-1200.webp 1200w, /assets/project-content/koscom10.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/koscom2.webp" alt="Koscom — Result" width="1920" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom2-480.webp 480w, /assets/responsive/project-content--koscom2-800.webp 800w, /assets/responsive/project-content--koscom2-1200.webp 1200w, /assets/project-content/koscom2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/koscom4.webp" alt="Koscom — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom4-480.webp 480w, /assets/responsive/project-content--koscom4-800.webp 800w, /assets/responsive/project-content--koscom4-1200.webp 1200w, /assets/project-content/koscom4.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/koscom7.webp" alt="Koscom — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom7-480.webp 480w, /assets/responsive/project-content--koscom7-800.webp 800w, /assets/responsive/project-content--koscom7-1200.webp 1200w, /assets/project-content/koscom7.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/koscom8.webp" alt="Koscom — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom8-480.webp 480w, /assets/responsive/project-content--koscom8-800.webp 800w, /assets/responsive/project-content--koscom8-1200.webp 1200w, /assets/project-content/koscom8.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/koscom9.webp" alt="Koscom magazine watch editorial in the showroom" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom9-480.webp 480w, /assets/responsive/project-content--koscom9-800.webp 800w, /assets/responsive/project-content--koscom9-1200.webp 1200w, /assets/project-content/koscom9.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/koscom11.webp" alt="Koscom magazine atelier editorial spread" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--koscom11-480.webp 480w, /assets/responsive/project-content--koscom11-800.webp 800w, /assets/responsive/project-content--koscom11-1200.webp 1200w, /assets/project-content/koscom11.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>The result is an anniversary magazine that feels more like a curated collection than a conventional corporate publication.

Each article has its own personality, but together they form one coherent object.

Not one template repeated 25 times.

One editorial language, interpreted 25 different ways.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Koscom, Luxury Guide\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Editorial design\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Art direction, Editorial design\</dd\>  
                                \</dl\>  
                                \<section class="case-credits" aria-label="Project credits"\>  
                                    \<h2\>Credits\</h2\>  
                                    \<dl\>  
                                        \<dt\>Design Lead\</dt\>  
                                        \<dd\>Tom Garcy\</dd\>  
                                        \<dt\>Designer\</dt\>  
                                        \<dd\>Helena Jiskrová\</dd\>  
                                        \<dt\>Project Lead\</dt\>  
                                        \<dd\>Loren Goodknight\</dd\>  
                                    \</dl\>  
                                \</section\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="unit-architects"\>  
                    \<article class="case-page" data-case="unit-architects" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-unit-architects-480.avif 480w, /assets/responsive/hero-unit-architects-800.avif 800w, /assets/responsive/hero-unit-architects-1086.avif 1086w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/unit-1.webp" alt="UNIT architekti — Simple enough to last" width="1086" height="1448" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-1-480.webp 480w, /assets/responsive/project-content--unit-1-800.webp 800w, /assets/project-content/unit-1.webp 1086w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>UNIT is one of the most recognised architecture and urbanism studios in the region. Like many studios busy shaping other people’s projects, their own identity had been waiting for attention.

The goal was evolution, not revolution.

We spent almost two years building a visual identity system that could work across an unusually wide range of documents, project stages, presentations and digital applications. The result is deliberately quiet: clear typography, simple elements and a system designed to stay relevant for decades.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>UNIT architekti\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Architecture / Urbanism\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Visual system, Brand guidelines, Website design\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    UNIT architekti\<span\>Simple enough to last\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#3da5ad"\>  
                                \<img data-defer-src="/assets/project-logos/unit.svg" alt="UNIT architekti logo" style="width:288px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The original UNIT logo was built around a square, and that was something worth keeping.

Instead of treating it as a conventional logo mark, we turned the square into the main structural element of the new architecture brand identity. It became a content and headline label used across covers, documents and layouts, with clear rules for different levels of information.

Alongside it sits a simple standalone UNIT logotype.

The identity changed, but the element people already associated with UNIT stayed at its core.\</p\>  
                                \<h2\>EVOLUTION, NOT REVOLUTION.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-4-landscape.webp" alt="UNIT identity manual and stationery" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-4-landscape-480.webp 480w, /assets/responsive/project-content--unit-4-landscape-800.webp 800w, /assets/responsive/project-content--unit-4-landscape-1200.webp 1200w, /assets/project-content/unit-4-landscape.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/unit-2.webp" alt="UNIT architekti — The visual system" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--unit-2-480.webp 480w, /assets/responsive/project-content--unit-2-800.webp 800w, /assets/responsive/project-content--unit-2-1200.webp 1200w, /assets/project-content/unit-2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Most of the identity is carried by typography, so it needed to be strong enough to work almost on its own.

We chose Moderat by Tightype for both the logotype and the main typographic system. Its straightforward grotesque character gives UNIT a clear, contemporary voice without competing with architecture, plans or photography.

The colour palette follows the original brand as well. UNIT’s recognisable blue-green tone remained the foundation, with a subtle adjustment and a controlled set of supporting combinations.

Nothing is there simply to decorate.

Everything creates hierarchy.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/unit-5.webp" alt="UNIT architekti — Result" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--unit-5-480.webp 480w, /assets/responsive/project-content--unit-5-800.webp 800w, /assets/responsive/project-content--unit-5-1200.webp 1200w, /assets/project-content/unit-5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>UNIT is a multidisciplinary architecture and urbanism studio, which means the amount and variety of material it produces is enormous.

Different stages of a project need different covers. Generic documents need their own variations. Plans, studies, reports and presentations all need to be distinguishable while still clearly belonging to one brand.

We built a system of covers using outlined maps, multiple colour combinations and the UNIT square as a constant anchor.

The content can change completely.

The system does not.\</p\>  
                                \<h2\>ONE SYSTEM.  
HUNDREDS OF APPLICATIONS.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-10.webp" alt="UNIT architekti — Website" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-10-480.webp 480w, /assets/responsive/project-content--unit-10-800.webp 800w, /assets/responsive/project-content--unit-10-1200.webp 1200w, /assets/project-content/unit-10.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-11.webp" alt="UNIT architekti — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-11-480.webp 480w, /assets/responsive/project-content--unit-11-800.webp 800w, /assets/responsive/project-content--unit-11-1200.webp 1200w, /assets/project-content/unit-11.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The final brand manual looks simple.

That is the point.

Behind every margin, label, hierarchy, cover and layout is a precise set of rules, calculations and relationships. A lot of mathematics sits underneath something that should feel effortless to use.

The guidelines took almost two years to complete because the aim was not just to design beautiful examples. It was to build rules clear enough that anyone at UNIT could create new material without slowly breaking the identity.\</p\>  
                                \<h2\>A LOT OF MATH.  
VERY LITTLE NOISE.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The architecture studio website brings the same thinking into a digital environment.

UNIT works across architecture, urbanism, public space, research and projects at very different scales. The challenge was to make that breadth easy to navigate without introducing another visual layer competing with the work.

Strong typography, precise hierarchy, restrained colour and a simple project structure give plans, drawings and photography the space they need.

The brand becomes a framework rather than decoration.\</p\>  
                        \</section\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-6.webp" alt="UNIT architekti — Typography and colour" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-6-480.webp 480w, /assets/responsive/project-content--unit-6-800.webp 800w, /assets/responsive/project-content--unit-6-1200.webp 1200w, /assets/project-content/unit-6.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>UNIT did not need a louder identity.

It needed one that could support the scale and quality of its work while remaining consistent across years of projects, teams and applications.

The result is a system that feels almost obvious when you use it: one logotype, one square, one typographic language and a carefully defined set of rules.

Simple on the surface.

Extremely precise underneath.\</p\>  
                                \<h2\>DESIGNED NOT FOR A SEASON.  
DESIGNED FOR DECADES.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-3.webp" alt="UNIT architekti — Brand manual" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-3-480.webp 480w, /assets/responsive/project-content--unit-3-800.webp 800w, /assets/responsive/project-content--unit-3-1200.webp 1200w, /assets/project-content/unit-3.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-7.webp" alt="UNIT architekti — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-7-480.webp 480w, /assets/responsive/project-content--unit-7-800.webp 800w, /assets/responsive/project-content--unit-7-1200.webp 1200w, /assets/project-content/unit-7.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-8.webp" alt="UNIT architekti — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-8-480.webp 480w, /assets/responsive/project-content--unit-8-800.webp 800w, /assets/responsive/project-content--unit-8-1200.webp 1200w, /assets/project-content/unit-8.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/unit-9.webp" alt="UNIT architekti — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--unit-9-480.webp 480w, /assets/responsive/project-content--unit-9-800.webp 800w, /assets/responsive/project-content--unit-9-1200.webp 1200w, /assets/project-content/unit-9.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>UNIT architekti\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Architecture / Urbanism\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Visual system, Brand guidelines, Website design\</dd\>  
                                \</dl\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="otk"\>  
                    \<article class="case-page" data-case="otk" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-otk-480.avif 480w, /assets/responsive/hero-otk-800.avif 800w, /assets/responsive/hero-otk-1200.avif 1200w, /assets/responsive/hero-otk-1433.avif 1433w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/otk-cover-2.webp" alt="Oslo Tennisklubb One club tote bag" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--otk-cover-2-480.webp 480w, /assets/responsive/project-content--otk-cover-2-800.webp 800w, /assets/responsive/project-content--otk-cover-2-1200.webp 1200w, /assets/project-content/otk-cover-2.webp 1433w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Oslo Tennisklubb has been part of the city since 1900\. The challenge was not to reinvent it, but to give its history a stronger and more flexible expression for today.

We refined what already made the tennis club recognisable and built a brand system around it that could feel premium and established, while still being open, energetic and welcoming.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Oslo Tennisklubb\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Sports\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Branding, strategy, website\</dd\>  
                                    \<dt\>Year\</dt\>  
                                    \<dd\>2025–2026\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Oslo Tennisklubb\<span\>A 125-year-old club, built for what comes next\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#132d22"\>  
                                \<img data-defer-src="/assets/project-logos/otk.svg" alt="Oslo Tennisklubb logo" style="width:188.806px"\>  
                            \</div\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-1.mp4" data-defer-poster="/assets/case-studies/otk-video-1.webp" aria-label="Oslo Tennisklubb — 1" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The original emblem carried too much history to replace.

Instead, we refined it. The crossed rackets, tennis ball and founding year stayed at the centre, but the proportions, details and construction were simplified to make the symbol stronger and easier to use everywhere.

The result feels familiar without feeling old.\</p\>  
                                \<h2\>EVOLUTION, NOT REVOLUTION.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/otk-2.webp" alt="The Rules of the Court booklet with Oslo Tennisklubb’s green and orange identity" width="1920" height="1086" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--otk-2-480.webp 480w, /assets/responsive/case-studies--otk-2-800.webp 800w, /assets/responsive/case-studies--otk-2-1200.webp 1200w, /assets/case-studies/otk-2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-2.mp4" data-defer-poster="/assets/case-studies/otk-video-2.webp" aria-label="Oslo Tennisklubb — 2" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The symbol is only one part of the identity. The logotype gives it a different voice.

We combined a strong, expressive “Oslo” with a much lighter “Tennisklubb”, creating a contrast that feels both established and contemporary. Used together with the emblem, the identity can shift from formal and heritage-driven to bold and expressive without losing recognition.

This flexibility became important across signage, merchandise, communication and the club website.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-3.mp4" data-defer-poster="/assets/case-studies/otk-video-3.webp" aria-label="Oslo Tennisklubb — 3" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/otk-3.webp" alt="Oslo Tennisklubb entrance signage and club wordmark" width="1920" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--otk-3-480.webp 480w, /assets/responsive/case-studies--otk-3-800.webp 800w, /assets/responsive/case-studies--otk-3-1200.webp 1200w, /assets/case-studies/otk-3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>We deliberately built the identity around several typefaces rather than forcing one font to do every job.

Each has a clear role. Helvetica Extended brings structure and confidence. Tartuffo adds heritage and character. Restart gives the system a more expressive voice, while Exposure Italic adds movement and a human touch.

The contrast is intentional. Together, they let Oslo Tennisklubb move between formal, playful, premium and energetic without becoming inconsistent.\</p\>  
                                \<h2\>DIFFERENT VOICES.  
THE SAME CLUB.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/otk-4.webp" alt="Directional signage for the changing rooms, courts and gym" width="1920" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--otk-4-480.webp 480w, /assets/responsive/case-studies--otk-4-800.webp 800w, /assets/responsive/case-studies--otk-4-1200.webp 1200w, /assets/case-studies/otk-4.webp 1920w" decoding="async" loading="lazy" style="object-position:82% center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/otk-5.webp" alt="Oslo Tennisklubb tennis campaign on a large outdoor poster" width="1920" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--otk-5-480.webp 480w, /assets/responsive/case-studies--otk-5-800.webp 800w, /assets/responsive/case-studies--otk-5-1200.webp 1200w, /assets/case-studies/otk-5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Once the identity had more than one voice, it needed rules that would hold everything together.

Dark green remained the foundation, connected to the club’s history, while clay orange and sandy beige gave the brand warmth and a more contemporary character. Typography, colour, photography, stickers, illustrations and layout all work as parts of the same system rather than isolated elements.

The brand can change tone depending on the context: quiet and prestigious when needed, expressive and energetic when the club comes alive.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-4.mp4" data-defer-poster="/assets/case-studies/otk-video-4.webp" aria-label="Oslo Tennisklubb — 4" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-5.mp4" data-defer-poster="/assets/case-studies/otk-video-5.webp" aria-label="Oslo Tennisklubb — 5" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row text-right compact"\>  
                            \<figure class="case-block case-wide"\>  
                                \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-6.mp4" data-defer-poster="/assets/case-studies/otk-video-6.webp" aria-label="Oslo Tennisklubb — 6" style="object-position:center"\>\</video\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>A flexible identity only works when everyone knows how to use it.

The brand manual turns the visual language into a practical system. Symbol versions, typography, colour, layouts, imagery, illustration, signage, stickers and tone of voice all have clear roles and rules.

The goal was not to make every application look identical. It was to let different people and partners create new things while keeping everything recognisably Oslo Tennisklubb.\</p\>  
                                \<h2\>A BRAND SYSTEM SHOULD CREATE FREEDOM,  
NOT JUST RULES.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-7.mp4" data-defer-poster="/assets/case-studies/otk-video-7.webp" aria-label="Oslo Tennisklubb — 7" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The website is where the identity gets to move.

Instead of creating one fixed visual template, we treated each page as a canvas. Colours change. Typefaces take different roles. Photography, hand-drawn illustrations, stickers and layouts can become louder or quieter depending on the content.

That flexibility makes the tennis club website feel alive, while the underlying system keeps every page unmistakably OTK.

At the same time, the experience had to work for very different audiences: long-time members, families, new players and people discovering the club for the first time. The structure makes it easier to understand what the club offers and find a way in.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/case-studies/otk-video-8.mp4" data-defer-poster="/assets/case-studies/otk-video-8.webp" aria-label="Oslo Tennisklubb — 8" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>Oslo Tennisklubb did not need a new history. It needed a system that could carry its history forward.

The result is a sports brand identity that can feel traditional and modern, premium and welcoming, quiet and expressive, depending on what the moment needs.

Built for a club that has already lasted 125 years, and designed to feel relevant for many more.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Oslo Tennisklubb\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Sports\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Branding, strategy, website\</dd\>  
                                    \<dt\>Year\</dt\>  
                                    \<dd\>2025–2026\</dd\>  
                                \</dl\>  
                                \<section class="case-credits" aria-label="Project credits"\>  
                                    \<h2\>Credits\</h2\>  
                                    \<dl\>  
                                        \<dt\>Design lead\</dt\>  
                                        \<dd\>Tom Garcy\</dd\>  
                                        \<dt\>Production\</dt\>  
                                        \<dd\>Loren Goodknight\</dd\>  
                                        \<dt\>Project Lead\</dt\>  
                                        \<dd\>Jakub Čvanda\</dd\>  
                                        \<dt\>Motion Design\</dt\>  
                                        \<dd\>Dominik Budimir\</dd\>  
                                        \<dt\>Designer\</dt\>  
                                        \<dd\>Helena Jiskrova\</dd\>  
                                        \<dt\>Website Design\</dt\>  
                                        \<dd\>Tom Garcy, Venca Šrámek\</dd\>  
                                        \<dt\>Designer\</dt\>  
                                        \<dd\>Jaydip Sakhiya\</dd\>  
                                    \</dl\>  
                                \</section\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="goodveri"\>  
                    \<article class="case-page" data-case="goodveri" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<video width="1440" height="1442" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-logo-smoke.mp4" data-defer-poster="/assets/goodveri/goodveri-logo-smoke.webp" aria-label="Goodveri symbol emerging through emerald smoke" style="object-position:center"\>\</video\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Sokordia Tech had strong technology, multiple products and deep expertise in digital verification, onboarding and compliance. But from the outside, that strength was harder to understand than it needed to be. The company needed more than a visual refresh. It needed a clearer name, stronger positioning, a recognisable identity and a website that could explain a complex product without making people work for it. Sokordia Tech became Goodveri.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Sokordia Tech\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Fintech / Verification / Compliance\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Naming, Brand strategy, Brand identity, Positioning, Website design, Information architecture\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Goodveri\<span\>Turning complexity into confidence\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#272727"\>  
                                \<img data-defer-src="/assets/project-logos/goodveri.svg" alt="Goodveri logo" style="width:433px"\>  
                            \</div\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-showcase\_sub\_01.mp4" data-defer-poster="/assets/goodveri/goodveri-showcase\_sub\_01.webp" aria-label="Goodveri brand showcase — 01" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The transformation started before we designed anything. The old name felt technical and internal, while the product itself was growing into something much broader. We needed a name that would be easier to remember, easier to pronounce and strong enough to carry multiple products and future services.

Goodveri gave us that foundation. It stayed connected to the idea of verification, but felt much more human, direct and ownable as a brand.\</p\>  
                                \<h2\>COMPLEX TECHNOLOGY.  
CLEAR VALUE.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/goodveri/goodveri-1.webp" alt="Goodveri verification platform on a tablet" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-1-480.webp 480w, /assets/responsive/goodveri--goodveri-1-800.webp 800w, /assets/responsive/goodveri--goodveri-1-1200.webp 1200w, /assets/goodveri/goodveri-1.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-showcase\_sub\_02.mp4" data-defer-poster="/assets/goodveri/goodveri-showcase\_sub\_02.webp" aria-label="Goodveri brand showcase — 02" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-showcase\_sub\_02x.mp4" data-defer-poster="/assets/goodveri/goodveri-showcase\_sub\_02x.webp" aria-label="Goodveri brand showcase — 02x" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The old communication was organised around internal product names and technical capabilities. That made sense from inside the company, but not from the outside.

We rebuilt the story around what customers actually need: verification, onboarding, compliance, security and simpler integration. The product stayed complex underneath, but the way people entered and understood it became much clearer.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-showcase\_sub\_03.mp4" data-defer-poster="/assets/goodveri/goodveri-showcase\_sub\_03.webp" aria-label="Goodveri brand showcase — 03" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The visual identity had to make the same shift. Goodveri needed to feel trustworthy enough for financial institutions and compliance-heavy environments, but not like another conservative enterprise fintech.

We built a clean, digital-first system around strong typography, precise hierarchy and a recognisable emerald green supported by black, white and neutral tones. The system was designed to extend across product interfaces, dashboards, documentation, sales materials, presentations and future applications without losing recognition.\</p\>  
                                \<h2\>ONE BRAND.  
MANY PRODUCTS.  
ONE CLEAR SYSTEM.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/goodveri/goodveri-3.webp" alt="Goodveri verification tools and product navigation" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-3-480.webp 480w, /assets/responsive/goodveri--goodveri-3-800.webp 800w, /assets/responsive/goodveri--goodveri-3-1200.webp 1200w, /assets/goodveri/goodveri-3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-showcase\_sub\_06.mp4" data-defer-poster="/assets/goodveri/goodveri-showcase\_sub\_06.webp" aria-label="Goodveri brand showcase — 06" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Goodveri is not one product, so the identity could not behave like one fixed layout.

The system had to support different services, product layers and technical content while still feeling like the same company everywhere. That meant defining a strong hierarchy, flexible layouts and enough consistency to make future expansion feel natural rather than fragmented.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="804" muted loop playsinline preload="none" data-src="/assets/goodveri/process-animation.mp4" data-defer-poster="/assets/goodveri/process-animation.webp" aria-label="Goodveri verification process animation" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-showcase\_sub\_09.mp4" data-defer-poster="/assets/goodveri/goodveri-showcase\_sub\_09.webp" aria-label="Goodveri brand showcase — 09" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/goodveri/goodveri-2.webp" alt="Goodveri brand identity on a laptop" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-2-480.webp 480w, /assets/responsive/goodveri--goodveri-2-800.webp 800w, /assets/responsive/goodveri--goodveri-2-1200.webp 1200w, /assets/goodveri/goodveri-2.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/goodveri/goodveri-6.webp" alt="Goodveri emerald green mobile brand application" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-6-480.webp 480w, /assets/responsive/goodveri--goodveri-6-800.webp 800w, /assets/responsive/goodveri--goodveri-6-1200.webp 1200w, /assets/goodveri/goodveri-6.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The website brought the transformation together. Instead of presenting everything at once, we structured the information in layers: start with the problem, explain the value, show the solution, then reveal the technical depth for people who need it.

For a company working with sensitive financial and identity data, trust could not come from simply saying “trust us”. It had to come from clear language, clear hierarchy, clear product logic and clear proof.\</p\>  
                                \<h2\>LESS EXPLAINING.  
MORE UNDERSTANDING.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/goodveri/goodveri-8.webp" alt="Goodveri onboarding website on a laptop" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-8-480.webp 480w, /assets/responsive/goodveri--goodveri-8-800.webp 800w, /assets/responsive/goodveri--goodveri-8-1200.webp 1200w, /assets/goodveri/goodveri-8.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="788" muted loop playsinline preload="none" data-src="/assets/goodveri/hero-video-hp.mp4" data-defer-poster="/assets/goodveri/hero-video-hp.webp" aria-label="Goodveri website hero motion" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/goodveri/goodveri-4.webp" alt="Goodveri website and digital brand applications" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-4-480.webp 480w, /assets/responsive/goodveri--goodveri-4-800.webp 800w, /assets/responsive/goodveri--goodveri-4-1200.webp 1200w, /assets/goodveri/goodveri-4.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/goodveri/goodveri-7.webp" alt="Goodveri risk and compliance communication" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-7-480.webp 480w, /assets/responsive/goodveri--goodveri-7-800.webp 800w, /assets/responsive/goodveri--goodveri-7-1200.webp 1200w, /assets/goodveri/goodveri-7.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="900" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-solutions.mp4" data-defer-poster="/assets/goodveri/goodveri-solutions.webp" aria-label="Goodveri solutions animation" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="1440" height="810" muted loop playsinline preload="none" data-src="/assets/goodveri/goodveri-showcase\_sub\_08.mp4" data-defer-poster="/assets/goodveri/goodveri-showcase\_sub\_08.webp" aria-label="Goodveri brand showcase — 08" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/goodveri/goodveri-5.webp" alt="Goodveri website introducing the verification platform" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/goodveri--goodveri-5-480.webp 480w, /assets/responsive/goodveri--goodveri-5-800.webp 800w, /assets/responsive/goodveri--goodveri-5-1200.webp 1200w, /assets/goodveri/goodveri-5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>Goodveri became a much clearer expression of the company behind it. The new name is easier to remember, the brand is more ownable, and the website explains the business around customer value instead of internal complexity.

The result is not just a cleaner identity. It is a stronger foundation for a company that needs to explain difficult technology, earn trust quickly and keep expanding without losing clarity.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Sokordia Tech\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Fintech / Verification / Compliance\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Naming, Brand strategy, Brand identity, Positioning, Website design, Information architecture\</dd\>  
                                \</dl\>  
                                \<section class="case-credits" aria-label="Project credits"\>  
                                    \<h2\>Credits\</h2\>  
                                    \<dl\>  
                                        \<dt\>Design Lead\</dt\>  
                                        \<dd\>Tom Garcy\</dd\>  
                                        \<dt\>Project Lead\</dt\>  
                                        \<dd\>Lucie Nedvědová\</dd\>  
                                        \<dt\>Production\</dt\>  
                                        \<dd\>Loren Goodknight\</dd\>  
                                        \<dt\>Brand Designer\</dt\>  
                                        \<dd\>Venca Šrámek\</dd\>  
                                        \<dt\>Designer\</dt\>  
                                        \<dd\>Jaydip Sakhiya\</dd\>  
                                        \<dt\>Web Designer\</dt\>  
                                        \<dd\>Venca Šrámek\</dd\>  
                                        \<dt\>Web Development\</dt\>  
                                        \<dd\>Tomáš Váhala\</dd\>  
                                    \</dl\>  
                                \</section\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="magu"\>  
                    \<article class="case-page" data-case="magu" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-magu-480.avif 480w, /assets/responsive/hero-magu-800.avif 800w, /assets/responsive/hero-magu-1122.avif 1122w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/case-studies/magu-0.webp" alt="Magu brand in use" width="1122" height="1402" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--magu-0-480.webp 480w, /assets/responsive/case-studies--magu-0-800.webp 800w, /assets/case-studies/magu-0.webp 1122w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Magu needed to stand out in a category where almost every beverage was trying to do the same thing: use more colour, more ingredients, more claims and more visual noise.

For the Magu brand identity and packaging design, we chose the opposite direction. Strip everything back and let the product itself do the work.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Magu\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Food and Beverage\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Branding, Packaging design, Website design\</dd\>  
                                    \<dt\>Year\</dt\>  
                                    \<dd\>2018–2023\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Magu\<span\>Quietly disrupting the shelves\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#272727"\>  
                                \<img data-defer-src="/assets/case-studies/magu-logo.svg" alt="Magu logo" style="width:456px"\>  
                            \</div\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/case-studies/magu-1.webp" alt="Magu bottle collection" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/case-studies--magu-1-480.webp 480w, /assets/responsive/case-studies--magu-1-800.webp 800w, /assets/responsive/case-studies--magu-1-1200.webp 1200w, /assets/case-studies/magu-1.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Every Magu already has its own distinctive natural colour. Blue, yellow, green, red. Nothing needed to be invented.

We left the bottle transparent and used the drink itself as the main visual element. The only strong gesture is the hand-drawn M, placed over the liquid almost like a signature.\</p\>  
                                \<h2\>THE PRODUCT ALREADY HAD THE COLOUR.  
WE JUST GAVE IT SPACE.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/magu-4.webp" alt="Magu beverage packaging and label design" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--magu-4-480.webp 480w, /assets/responsive/case-studies--magu-4-800.webp 800w, /assets/responsive/case-studies--magu-4-1200.webp 1200w, /assets/case-studies/magu-4.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/case-studies/magu-2.webp" alt="Magu beverage packaging and label design" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/case-studies--magu-2-480.webp 480w, /assets/responsive/case-studies--magu-2-800.webp 800w, /assets/responsive/case-studies--magu-2-1200.webp 1200w, /assets/case-studies/magu-2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The identity is built around removing rather than adding. A simple bottle, one recognisable gesture and typography that never competes with the product.

Even the product name can stay surprisingly small. With almost nothing else on the front, it is still immediately visible.

What looks simple is carefully controlled. Every element has a job, and anything that does not need to be there stays out.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/magu-5.webp" alt="Magu beverage packaging and label design" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--magu-5-480.webp 480w, /assets/responsive/case-studies--magu-5-800.webp 800w, /assets/responsive/case-studies--magu-5-1200.webp 1200w, /assets/case-studies/magu-5.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/magu-6.webp" alt="Magu beverage packaging and label design" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--magu-6-480.webp 480w, /assets/responsive/case-studies--magu-6-800.webp 800w, /assets/responsive/case-studies--magu-6-1200.webp 1200w, /assets/case-studies/magu-6.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/magu-3.webp" alt="Magu beverage packaging and label design" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--magu-3-480.webp 480w, /assets/responsive/case-studies--magu-3-800.webp 800w, /assets/responsive/case-studies--magu-3-1200.webp 1200w, /assets/case-studies/magu-3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The front could only stay this clean because the complexity was moved somewhere else.

Ingredients, nutritional information and everything legally required were carefully organised on the back. Typography stays functional and compact, giving the front of every bottle as much room as possible to breathe.\</p\>  
                                \<h2\>SOMETIMES YOU NEED TO BE VERY QUIET  
TO BE THE LOUDEST ONE.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>Magu was designed to stand apart from a shelf full of products fighting for attention.

Years later, the principle still works. The bottles are immediately recognisable from a distance, every flavour feels different without breaking the system, and Magu remains one of the most visible products on the shelf.

Not because it shouts louder.

Because it does not have to.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Magu\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Food and Beverage\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Branding, Packaging design, Website design\</dd\>  
                                    \<dt\>Year\</dt\>  
                                    \<dd\>2018–2023\</dd\>  
                                \</dl\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="aomu"\>  
                    \<article class="case-page" data-case="aomu" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-aomu-480.avif 480w, /assets/responsive/hero-aomu-800.avif 800w, /assets/responsive/hero-aomu-1200.avif 1200w, /assets/responsive/hero-aomu-1920.avif 1920w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/aomu-1.webp" alt="AOMU — Building a brand from the first mark" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--aomu-1-480.webp 480w, /assets/responsive/project-content--aomu-1-800.webp 800w, /assets/responsive/project-content--aomu-1-1200.webp 1200w, /assets/project-content/aomu-1.webp 1920w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>AOMU started without an established visual language.

We created the brand from the ground up: logo, logotype, colours, typography, packaging and the wider visual system around the products.

The goal was to build a wellness brand identity distinctive enough to be remembered, but simple enough to grow with the company for years.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>AOMU\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Wellness\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Logo design, Packaging design, Visual system\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    AOMU\<span\>Building a brand from the first mark\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#074021"\>  
                                \<img data-defer-src="/assets/project-logos/aomu.svg" alt="AOMU logo" style="width:334.811px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The identity began with the logo and wordmark.

We wanted AOMU to feel contemporary, calm and premium without becoming cold or overly clinical. The mark needed to work just as well on a small product label as it did across packaging, digital communication and larger brand applications.

The result is deliberately simple, giving the rest of the identity space to evolve around it.\</p\>  
                                \<h2\>START SIMPLE.  
BUILD SOMETHING RECOGNISABLE.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/aomu-5.webp" alt="AOMU — Colour and visual language" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--aomu-5-480.webp 480w, /assets/responsive/project-content--aomu-5-800.webp 800w, /assets/responsive/project-content--aomu-5-1200.webp 1200w, /assets/project-content/aomu-5.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/aomu-2.webp" alt="AOMU — Logo and logotype" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--aomu-2-480.webp 480w, /assets/responsive/project-content--aomu-2-800.webp 800w, /assets/responsive/project-content--aomu-2-1200.webp 1200w, /assets/project-content/aomu-2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Colour became one of the key tools for creating recognition.

We developed a palette that gives AOMU its own atmosphere while staying flexible enough to work across different products, formats and campaigns.

Combined with clean typography and a restrained layout system, the identity feels calm and controlled, but never anonymous.

Every element has enough character to be recognisable without competing with the product.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/aomu-3.webp" alt="AOMU — Packaging design" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--aomu-3-480.webp 480w, /assets/responsive/project-content--aomu-3-800.webp 800w, /assets/responsive/project-content--aomu-3-1200.webp 1200w, /assets/project-content/aomu-3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Packaging is where the AOMU brand becomes physical.

We built a product packaging system that brings the logo, colour, typography and product information together in a clear and consistent way.

The challenge was to keep the packaging simple while still giving each product enough individuality.

The result feels like one family, not a collection of unrelated products.\</p\>  
                                \<h2\>DIFFERENT PRODUCTS.  
ONE CLEAR BRAND.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/aomu-6.webp" alt="AOMU — Result" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--aomu-6-480.webp 480w, /assets/responsive/project-content--aomu-6-800.webp 800w, /assets/responsive/project-content--aomu-6-1200.webp 1200w, /assets/project-content/aomu-6.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The identity was designed to work far beyond the packaging.

We created a wider set of assets and rules for digital communication, social content, print, photography and everyday brand applications.

Rather than designing each touchpoint separately, we built a system that could generate new material while staying unmistakably AOMU.

That gave the brand consistency from day one.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/aomu-4.webp" alt="AOMU — Brand assets and system" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--aomu-4-480.webp 480w, /assets/responsive/project-content--aomu-4-800.webp 800w, /assets/responsive/project-content--aomu-4-1200.webp 1200w, /assets/project-content/aomu-4.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/aomu-8.webp" alt="AOMU — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--aomu-8-480.webp 480w, /assets/responsive/project-content--aomu-8-800.webp 800w, /assets/responsive/project-content--aomu-8-1200.webp 1200w, /assets/project-content/aomu-8.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>AOMU did not just get a new logo or packaging style.

It got a complete visual foundation.

A recognisable mark, a clear colour system, distinctive packaging and a flexible set of assets that could grow together with the product range.

One brand language, built from scratch.

And built to keep working as AOMU grows.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>AOMU\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Wellness\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Logo design, Packaging design, Visual system\</dd\>  
                                \</dl\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="arkady"\>  
                    \<article class="case-page" data-case="arkady" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-arkady-480.avif 480w, /assets/responsive/hero-arkady-800.avif 800w, /assets/responsive/hero-arkady-1200.avif 1200w, /assets/responsive/hero-arkady-1433.avif 1433w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/arkady-2.webp" alt="Arkády — A shopping centre with personality" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--arkady-2-480.webp 480w, /assets/responsive/project-content--arkady-2-800.webp 800w, /assets/responsive/project-content--arkady-2-1200.webp 1200w, /assets/project-content/arkady-2.webp 1433w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Shopping centres often end up looking surprisingly similar.

The same visual language, the same polished neutrality, the same effort to appeal to everyone.

For the Arkády rebrand, the goal was different.

We wanted to create a retail brand identity with enough personality to be recognised immediately and enough flexibility to work across a constantly changing shopping environment.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>CBRE, Trigea\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Retail\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Typography, Visual system, Retail communication\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Arkády\<span\>A shopping centre with personality\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#ff3d00"\>  
                                \<img data-defer-src="/assets/project-logos/arkady.svg" alt="Arkády logo" style="width:450px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The vivid orange became one of the strongest parts of the new identity.

It gives Arkády instant visibility across large outdoor formats, digital communication and the shopping centre itself.

Instead of relying on decoration, the system uses colour as a clear signal.

Simple, direct and difficult to miss.\</p\>  
                                \<h2\>VISIBILITY DOES NOT NEED MORE ELEMENTS.  
IT NEEDS STRONGER ONES.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/arkady-6.webp" alt="Arkády — Result" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--arkady-6-480.webp 480w, /assets/responsive/project-content--arkady-6-800.webp 800w, /assets/responsive/project-content--arkady-6-1200.webp 1200w, /assets/project-content/arkady-6.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/arkady-1.webp" alt="Arkády — Colour and visibility" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--arkady-1-480.webp 480w, /assets/responsive/project-content--arkady-1-800.webp 800w, /assets/responsive/project-content--arkady-1-1200.webp 1200w, /assets/project-content/arkady-1.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Typography carries much of the personality of the brand.

We combined the bold character of Hrot by Superior Type with the elegance of Schnyder, creating a contrast that can feel energetic, expressive and refined at the same time.

Large type gives communication confidence, while the serif adds a different rhythm and prevents the system from becoming too rigid.

The combination gives Arkády a voice that feels distinctive without becoming complicated.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/arkady-3.webp" alt="Arkády — Result" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--arkady-3-480.webp 480w, /assets/responsive/project-content--arkady-3-800.webp 800w, /assets/responsive/project-content--arkady-3-1200.webp 1200w, /assets/project-content/arkady-3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The shopping centre branding is intentionally built from only a few strong ingredients.

Colour, typography, scale and composition do most of the work.

That simplicity makes the system highly flexible. It can adapt from a large billboard to a small digital format, from seasonal campaigns to permanent signage, without losing recognition.

The layouts can change.

The personality stays.\</p\>  
                                \<h2\>WHEN EVERY SHOPPING CENTRE LOOKS THE SAME,  
PERSONALITY BECOMES THE DIFFERENCE.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/arkady-5.webp" alt="Arkády — The visual system" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--arkady-5-480.webp 480w, /assets/responsive/project-content--arkady-5-800.webp 800w, /assets/responsive/project-content--arkady-5-1200.webp 1200w, /assets/project-content/arkady-5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>A retail brand lives in many places at once.

The identity needed to work across billboards, signage, shopping bags, digital campaigns, social communication and the physical environment of the centre itself.

Rather than designing each output as a separate campaign, we created a shared visual language that makes all of these touchpoints feel connected.

This gives Arkády consistency without forcing every communication to look identical.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/arkady-8.webp" alt="Arkády outdoor campaign billboard" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--arkady-8-480.webp 480w, /assets/responsive/project-content--arkady-8-800.webp 800w, /assets/responsive/project-content--arkady-8-1200.webp 1200w, /assets/project-content/arkady-8.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/arkady-10.webp" alt="Arkády campaign installation inside the shopping centre" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--arkady-10-480.webp 480w, /assets/responsive/project-content--arkady-10-800.webp 800w, /assets/responsive/project-content--arkady-10-1200.webp 1200w, /assets/project-content/arkady-10.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/arkady-11.webp" alt="Arkády hanging event banners in the shopping centre" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--arkady-11-480.webp 480w, /assets/responsive/project-content--arkady-11-800.webp 800w, /assets/responsive/project-content--arkady-11-1200.webp 1200w, /assets/project-content/arkady-11.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/arkady-4.webp" alt="Arkády campaign typography in use" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--arkady-4-480.webp 480w, /assets/responsive/project-content--arkady-4-800.webp 800w, /assets/responsive/project-content--arkady-4-1200.webp 1200w, /assets/project-content/arkady-4.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>The new identity gave Arkády a clearer and more recognisable presence.

Instead of behaving like a neutral container for the stores inside it, the centre gained its own character.

A brand that can attract attention when needed, stay flexible across constantly changing communication, and make the place itself easier to remember.

Not just a place to shop.

A place with a personality.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>CBRE, Trigea\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Retail\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Typography, Visual system, Retail communication\</dd\>  
                                \</dl\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="luxury-travel-digest"\>  
                    \<article class="case-page" data-case="luxury-travel-digest" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-luxury-travel-digest-480.avif 480w, /assets/responsive/hero-luxury-travel-digest-800.avif 800w, /assets/responsive/hero-luxury-travel-digest-1200.avif 1200w, /assets/responsive/hero-luxury-travel-digest-1493.avif 1493w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-3.webp" alt="Luxury Travel Digest travel story with oversized orange typography" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-3-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-3-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-3-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-3.webp 1493w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Luxury Travel Digest needed more than a beautiful first issue.

It needed an editorial identity strong enough to define the publication from the beginning and flexible enough to keep working issue after issue.

We created the brand, art direction, typography system and magazine layouts for issue \#1, establishing the visual rules that would become the foundation of the publication.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Luxury Travel Digest\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Travel / Publishing\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Editorial identity, Art direction, Magazine design, Typography system, Layout system\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Luxury Travel Digest\<span\>Designing the visual world of luxury travel\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#272727"\>  
                                \<img data-defer-src="/assets/project-logos/luxury-travel-digest.svg" alt="Luxury Travel Digest logo" style="width:425px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Luxury publishing can easily become overloaded with decoration.

We went the other way.

The visual language is built around confident typography, generous space, strong photography and precise composition.

The design feels premium because it gives the content room to breathe, not because it adds more.\</p\>  
                                \<h2\>BIG HEADLINES. CLEAN GRIDS. PHOTOGRAPHY THAT BREATHES.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-1.webp" alt="Bold circular typography on a Luxury Travel Digest editorial spread" width="2000" height="1493" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-1-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-1-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-1-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-1.webp 2000w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-5.webp" alt="Wallis travel feature with a vertical title and mountain photography" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-5-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-5-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-5-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-5.webp 1493w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-9.webp" alt="Dolce Sicilia headline over a Luxury Travel Digest destination story" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-9-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-9-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-9-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-9.webp 1493w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Typography carries much of the personality of the magazine.

High-contrast typefaces, oversized headlines and carefully controlled hierarchy create an editorial rhythm that can shift from quiet and elegant to bold and expressive.

Vertical titles, precise text wraps and modular grids give each story enough freedom to feel individual while keeping the publication recognisable as one whole.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-10.webp" alt="Luxury Travel Digest typography and editorial column layout" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-10-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-10-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-10-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-10.webp 1493w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-7.webp" alt="Luxury Travel Digest culture and destination editorial layouts" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-7-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-7-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-7-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-7.webp 1493w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-8.webp" alt="Luxury Travel Digest Rosa feature across a full magazine spread" width="2000" height="1131" sizes="100vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-8-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-8-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-8-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-8.webp 2000w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Luxury travel is ultimately about desire, atmosphere and place.

So photography needed to stay at the centre.

Large-format imagery is given enough space to create impact, while the layouts are designed around it rather than forcing photographs into rigid templates.

The editorial system supports the images instead of competing with them.\</p\>  
                                \<h2\>LUXURY IS OFTEN ABOUT WHAT YOU LEAVE OUT.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-2.webp" alt="Luxury Travel Digest magazine cover featuring Swiss Bliss" width="2000" height="1493" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-2-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-2-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-2-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-2.webp 2000w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-6.webp" alt="Luxury Travel Digest food and travel photography layout" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-6-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-6-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-6-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-6.webp 1493w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-4.webp" alt="Luxury Travel Digest photography-led editorial spread" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-4-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-4-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-4-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-4.webp 1493w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Issue \#1 established more than a look.

It created a repeatable set of typography rules, grid logic and layout principles that could be used across future editions.

That meant the magazine could continue evolving without having to reinvent its visual language every time.

The system stays consistent.

The stories remain different.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-11.webp" alt="Luxury Travel Digest magazine layouts and editorial identity system" width="2000" height="1500" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-11-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-11-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-11-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-11.webp 2000w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-12.webp" alt="Luxury Travel Digest photography and grid system across multiple spreads" width="2000" height="1500" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-12-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-12-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-12-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-12.webp 2000w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-13.webp" alt="Luxury Travel Digest art direction and magazine layout collection" width="2000" height="1500" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-13-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-13-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-13-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-13.webp 2000w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/luxury-travel-digest/luxurytravel-3.webp" alt="Luxury Travel Digest travel story with oversized orange typography" width="1493" height="2000" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--luxury-travel-digest--luxurytravel-3-480.webp 480w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-3-800.webp 800w, /assets/responsive/case-studies--luxury-travel-digest--luxurytravel-3-1200.webp 1200w, /assets/case-studies/luxury-travel-digest/luxurytravel-3.webp 1493w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>The first issue became the blueprint for Luxury Travel Digest.

The layouts, typography and editorial principles we created continued to shape the magazine after the initial launch.

A visual identity designed not just to make one issue memorable, but to give the publication a lasting point of view.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Luxury Travel Digest\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Travel / Publishing\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Editorial identity, Art direction, Magazine design, Typography system, Layout system\</dd\>  
                                \</dl\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="sunnysoft"\>  
                    \<article class="case-page" data-case="sunnysoft" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-sunnysoft-480.avif 480w, /assets/responsive/hero-sunnysoft-800.avif 800w, /assets/responsive/hero-sunnysoft-941.avif 941w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/sunnysoft-1.webp" alt="Sunnysoft campaign displayed on a phone" width="941" height="1672" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sunnysoft-1-480.webp 480w, /assets/responsive/project-content--sunnysoft-1-800.webp 800w, /assets/project-content/sunnysoft-1.webp 941w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Sunnysoft has been selling technology since 1999, with a product range built around tools that help people solve things themselves: endoscopes, replacement batteries, holders, car diagnostics, measuring technology and other practical electronics.

The brand had grown, but its visual identity no longer reflected the confidence or clarity of the business.

We created a bold new identity and then brought the same thinking into the e-shop: clearer, more distinctive and easier to use.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Sunnysoft\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Technology / E-commerce\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand strategy, Brand identity, E-commerce UX, Website design, UI system\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Sunnysoft\<span\>A fresh face for a tech e-shop\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#0c1e40"\>  
                                \<img data-defer-src="/assets/project-logos/sunnysoft.svg" alt="Sunnysoft logo" style="width:410.495px"\>  
                            \</div\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="960" height="540" muted loop playsinline preload="none" data-src="/assets/project-content/sunnysoft-main.mp4" data-defer-poster="/assets/project-content/sunnysoft-main-poster.webp" aria-label="Sunnysoft brand identity film" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Sunnysoft speaks to technically minded customers who would rather understand a problem and solve it than immediately hand it to someone else.

That idea shaped the new brand.

The communication became more direct, practical and confident. The visual identity moved away from generic technology retail and towards something with a stronger personality, while still keeping the products and information easy to understand.\</p\>  
                                \<h2\>KNOW WHAT YOU NEED.  
GET IT DONE.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sunnysoft-3.webp" alt="Sunnysoft — A brand for people who want control" width="1308" height="1202" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sunnysoft-3-480.webp 480w, /assets/responsive/project-content--sunnysoft-3-800.webp 800w, /assets/responsive/project-content--sunnysoft-3-1200.webp 1200w, /assets/project-content/sunnysoft-3.webp 1308w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="960" height="626" muted loop playsinline preload="none" data-src="/assets/project-content/sunnysoft-2.mp4" data-defer-poster="/assets/project-content/sunnysoft-2-poster.webp" aria-label="Sunnysoft visual identity motion study" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The new identity gave Sunnysoft a much stronger presence.

Rather than adding visual complexity, we used a clear hierarchy, confident typography and a bold visual language to make the brand easier to recognise across campaigns, packaging, print and digital communication.

The goal was to feel distinctive without becoming decorative.

For a technical brand, clarity is part of the identity.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<video width="960" height="540" muted loop playsinline preload="none" data-src="/assets/project-content/sunnysoft-3.mp4" data-defer-poster="/assets/project-content/sunnysoft-3-poster.webp" aria-label="Sunnysoft visual identity motion study" style="object-position:center"\>\</video\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The new brand exposed another problem.

The existing e-shop no longer matched the quality or confidence of the identity around it. Product discovery, hierarchy and the buying experience needed the same level of attention.

So the project expanded into a broader e-commerce redesign focused on usability, performance, scalability, clarity and trust.\</p\>  
                                \<h2\>A STRONG BRAND GETS ATTENTION.  
A STRONG EXPERIENCE TURNS IT INTO ACTION.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sunnysoft-2.webp" alt="Sunnysoft — From rebrand to e-commerce" width="1034" height="1521" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sunnysoft-2-480.webp 480w, /assets/responsive/project-content--sunnysoft-2-800.webp 800w, /assets/project-content/sunnysoft-2.webp 1034w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Sunnysoft carries a wide range of technical products, which means the interface has to handle large amounts of information without becoming difficult to use.

We designed the new experience around clear product hierarchy, stronger category and product pages, better spacing and typography, and reusable components that can scale across the store.

The homepage and product detail became blueprints for a wider UI system rather than isolated pages.

This makes the e-shop easier to extend while keeping the experience consistent.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sunnysoft-4.webp" alt="Sunnysoft — Bold, but built around clarity" width="1309" height="1202" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sunnysoft-4-480.webp 480w, /assets/responsive/project-content--sunnysoft-4-800.webp 800w, /assets/responsive/project-content--sunnysoft-4-1200.webp 1200w, /assets/project-content/sunnysoft-4.webp 1309w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/sunnysoft-5.webp" alt="Sunnysoft — A scalable shopping system" width="1308" height="1202" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--sunnysoft-5-480.webp 480w, /assets/responsive/project-content--sunnysoft-5-800.webp 800w, /assets/responsive/project-content--sunnysoft-5-1200.webp 1200w, /assets/project-content/sunnysoft-5.webp 1308w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>Sunnysoft gained a brand that feels more confident and recognisable, followed by an e-commerce system designed to support how the business actually works.

The identity helps the company stand out.

The interface helps customers understand products, trust what they are buying and move through the store with less friction.

One brand, one system, from first impression to purchase.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Sunnysoft\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Technology / E-commerce\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand strategy, Brand identity, E-commerce UX, Website design, UI system\</dd\>  
                                \</dl\>  
                                \<section class="case-credits" aria-label="Project credits"\>  
                                    \<h2\>Credits\</h2\>  
                                    \<dl\>  
                                        \<dt\>Design Lead\</dt\>  
                                        \<dd\>Tom Garcy\</dd\>  
                                        \<dt\>Project Lead\</dt\>  
                                        \<dd\>Loren Goodknight\</dd\>  
                                        \<dt\>Brand Designer\</dt\>  
                                        \<dd\>Venca Šrámek\</dd\>  
                                    \</dl\>  
                                \</section\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="liberalni-institut"\>  
                    \<article class="case-page" data-case="liberalni-institut" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-liberalni-institut-480.avif 480w, /assets/responsive/hero-liberalni-institut-800.avif 800w, /assets/responsive/hero-liberalni-institut-1200.avif 1200w, /assets/responsive/hero-liberalni-institut-1433.avif 1433w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/libinst1.webp" alt="Liberální institut — A structured identity with one deliberate disruption" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--libinst1-480.webp 480w, /assets/responsive/project-content--libinst1-800.webp 800w, /assets/responsive/project-content--libinst1-1200.webp 1200w, /assets/project-content/libinst1.webp 1433w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Liberální institut is an independent Czech nonprofit organisation whose stated mission centres on individual freedom, private property, free markets and the rule of law. Its origins go back to the Liberal Society of F. A. Hayek, formed in the autumn of 1989, before the institute was formally registered in 1990\.

The new visual identity needed to respect that history without turning it into something static or ceremonial.

So instead of choosing between institutional credibility and a more expressive voice, we built the brand around both.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Liberální institut\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Nonprofit / Research\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Logo design, Typography, Visual system, Publication design\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Liberální institut\<span\>A structured identity with one deliberate disruption\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#007aff"\>  
                                \<img data-defer-src="/assets/project-logos/libinst.webp" alt="Liberální institut logo" style="width:593px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The foundation of the identity is intentionally clean and structured.

Then we broke it.

A handwritten 89 cuts across the system like something drawn quickly on a wall or poster. It refers to the period in which the organisation originated and gives the identity a distinctive human gesture.

The contrast became the core of the visual system: order underneath, expression on top.\</p\>  
                                \<h2\>SOME IDEAS ARE TOO IMPORTANT  
TO STAY INSIDE THE LINES.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/libinst3.webp" alt="Liberální institut — Applications" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--libinst3-480.webp 480w, /assets/responsive/project-content--libinst3-800.webp 800w, /assets/responsive/project-content--libinst3-1200.webp 1200w, /assets/project-content/libinst3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/libinst2.webp" alt="Liberální institut — Visual language" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--libinst2-480.webp 480w, /assets/responsive/project-content--libinst2-800.webp 800w, /assets/responsive/project-content--libinst2-1200.webp 1200w, /assets/project-content/libinst2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The handwritten 89 became more than a logo detail.

It can appear across book covers, posters, headlines and communication as a recurring gesture, sometimes controlled and sometimes deliberately intrusive.

That tension gives the system its personality.

The institutional layer creates structure. The handwritten layer adds energy and makes the identity immediately recognisable.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/libinst5.webp" alt="Liberální institut — Result" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--libinst5-480.webp 480w, /assets/responsive/project-content--libinst5-800.webp 800w, /assets/responsive/project-content--libinst5-1200.webp 1200w, /assets/project-content/libinst5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The rest of the identity stays deliberately disciplined.

Clear typography, strong hierarchy and simple layouts create a stable framework for publications, research, events, charts, social communication and educational material.

That makes the expressive elements stronger because they are not competing with visual noise.\</p\>  
                                \<h2\>STRUCTURE FOR THE INFORMATION.  
FREEDOM FOR THE IDEAS.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/libinst4.webp" alt="Liberální institut — Typography and system" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--libinst4-480.webp 480w, /assets/responsive/project-content--libinst4-800.webp 800w, /assets/responsive/project-content--libinst4-1200.webp 1200w, /assets/project-content/libinst4.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Liberální institut works across publications, research, events and educational projects, so the identity needed to perform across very different formats.

We created a flexible system for covers, documents, social templates, charts and supporting communication, giving each format enough freedom while keeping the overall brand recognisable.

The visual language stays connected even when the content changes completely.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/libinst7.webp" alt="Liberální institut — Logo and the 89" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--libinst7-480.webp 480w, /assets/responsive/project-content--libinst7-800.webp 800w, /assets/responsive/project-content--libinst7-1200.webp 1200w, /assets/project-content/libinst7.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/libinst6.webp" alt="Liberální institut — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--libinst6-480.webp 480w, /assets/responsive/project-content--libinst6-800.webp 800w, /assets/responsive/project-content--libinst6-1200.webp 1200w, /assets/project-content/libinst6.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/libinst8.webp" alt="Liberální institut — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--libinst8-480.webp 480w, /assets/responsive/project-content--libinst8-800.webp 800w, /assets/responsive/project-content--libinst8-1200.webp 1200w, /assets/project-content/libinst8.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/libinst9.webp" alt="Liberální institut — Result" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--libinst9-480.webp 480w, /assets/responsive/project-content--libinst9-800.webp 800w, /assets/responsive/project-content--libinst9-1200.webp 1200w, /assets/project-content/libinst9.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>The rebrand brings the history of Liberální institut into a contemporary visual system without removing the contrast that makes it distinctive.

A serious institutional framework with an expressive layer.

A structured system with one deliberate disruption.

A brand designed to make complex information clear while remaining immediately recognisable.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Liberální institut\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Nonprofit / Research\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand identity, Logo design, Typography, Visual system, Publication design\</dd\>  
                                \</dl\>  
                                \<section class="case-credits" aria-label="Project credits"\>  
                                    \<h2\>Credits\</h2\>  
                                    \<dl\>  
                                        \<dt\>Design Lead\</dt\>  
                                        \<dd\>Tom Garcy\</dd\>  
                                        \<dt\>Brand Designer\</dt\>  
                                        \<dd\>Helena Jiskrová\</dd\>  
                                    \</dl\>  
                                \</section\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="nachonacho"\>  
                    \<article class="case-page" data-case="nachonacho" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-nachonacho-480.avif 480w, /assets/responsive/hero-nachonacho-800.avif 800w, /assets/responsive/hero-nachonacho-1200.avif 1200w, /assets/responsive/hero-nachonacho-1433.avif 1433w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/project-content/nachonacho1.webp" alt="NachoNacho — Different on purpose" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--nachonacho1-480.webp 480w, /assets/responsive/project-content--nachonacho1-800.webp 800w, /assets/responsive/project-content--nachonacho1-1200.webp 1200w, /assets/project-content/nachonacho1.webp 1433w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>NachoNacho is a San Francisco platform for discovering, buying and managing SaaS and services, combining marketplace, spend management and fintech tools in one product.

The original brief was to refresh the brand and improve the visual design of the website and platform.

But there were two bigger opportunities.

First, the product needed to become much easier to understand. Second, NachoNacho needed the confidence to stop looking like another fintech startup.

So we worked on both.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>NachoNacho\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>SaaS / Fintech\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand strategy, Brand identity, Product design, Website design, User research and testing\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    NachoNacho\<span\>Different on purpose\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#2475ff"\>  
                                \<img data-defer-src="/assets/project-logos/nachonacho.svg" alt="NachoNacho logo" style="width:430px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Before redesigning anything, we tested the existing website, analysed its structure and looked at how the product was being explained.

There was too much complexity between the product and its value.

We simplified the story, reorganised the information and rebuilt the journey around what people actually needed to understand and do.

Only then did we start shaping how the new NachoNacho should look.\</p\>  
                                \<h2\>MAKE THE VALUE CLEAR.  
THEN MAKE IT UNFORGETTABLE.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/nachonacho4.webp" alt="NachoNacho — Symbol and illustration language" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--nachonacho4-480.webp 480w, /assets/responsive/project-content--nachonacho4-800.webp 800w, /assets/responsive/project-content--nachonacho4-1200.webp 1200w, /assets/project-content/nachonacho4.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/nachonacho5.webp" alt="NachoNacho — Clarity first" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--nachonacho5-480.webp 480w, /assets/responsive/project-content--nachonacho5-800.webp 800w, /assets/responsive/project-content--nachonacho5-1200.webp 1200w, /assets/project-content/nachonacho5.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/nachonacho7.webp" alt="NachoNacho — Website" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--nachonacho7-480.webp 480w, /assets/responsive/project-content--nachonacho7-800.webp 800w, /assets/responsive/project-content--nachonacho7-1200.webp 1200w, /assets/project-content/nachonacho7.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Fintech and SaaS brands often converge around the same visual language: safe colours, restrained typography and polished but interchangeable interfaces.

We deliberately went the other way.

NachoNacho became vivid, bold and immediately recognisable, with a distinctive logotype, memorable symbol, bright blue, playful illustrations, stickers and merchandise that gave the company an identity far beyond the product interface.

The design language had enough personality to feel unexpected for the category.

That was the point.\</p\>  
                                \<h2\>IF EVERYONE LOOKS THE SAME,  
BEING DIFFERENT BECOMES AN ADVANTAGE.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/nachonacho8.webp" alt="NachoNacho — A fintech brand that refuses to blend in" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--nachonacho8-480.webp 480w, /assets/responsive/project-content--nachonacho8-800.webp 800w, /assets/responsive/project-content--nachonacho8-1200.webp 1200w, /assets/project-content/nachonacho8.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The identity needed elements people could remember without seeing the whole brand.

So we created a strong symbol and built a wider visual world around it.

Illustrations, graphic icons, stickers and playful brand objects made it possible for NachoNacho to communicate with personality across product, website, events, social media and merchandise.

The result feels unmistakably NachoNacho even before you read the name.\</p\>  
                        \</section\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/project-content/nachonacho2.webp" alt="NachoNacho — Product experience" width="1920" height="1086" sizes="100vw" data-defer-srcset="/assets/responsive/project-content--nachonacho2-480.webp 480w, /assets/responsive/project-content--nachonacho2-800.webp 800w, /assets/responsive/project-content--nachonacho2-1200.webp 1200w, /assets/project-content/nachonacho2.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/nacho-cards.webp" alt="NachoNacho card creation interface" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--nacho-cards-480.webp 480w, /assets/responsive/project-content--nacho-cards-800.webp 800w, /assets/responsive/project-content--nacho-cards-1200.webp 1200w, /assets/project-content/nacho-cards.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The same confidence had to work inside a complex SaaS and fintech platform.

NachoNacho combines software discovery, discounts, subscription management, virtual cards and spend-management tools. Our job was to make that complexity feel manageable.

We simplified hierarchy, clarified key actions and created a product system that could carry the bold brand without compromising usability.\</p\>  
                                \<h2\>BOLD BRAND.  
CLEAR PRODUCT.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The website became the place where positioning, product thinking and identity came together.

Instead of behaving like a conventional fintech landing page, it used the brand’s visual confidence to pull people in while the structure did the harder job of explaining a complex proposition.

Strong colour, typography, illustration and interaction made NachoNacho feel different immediately.

Clearer storytelling made people understand why that difference mattered.\</p\>  
                        \</section\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/project-content/nacho-subscription.webp" alt="NachoNacho subscription management interface" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/project-content--nacho-subscription-480.webp 480w, /assets/responsive/project-content--nacho-subscription-800.webp 800w, /assets/responsive/project-content--nacho-subscription-1200.webp 1200w, /assets/project-content/nacho-subscription.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>The redesign changed both perception and performance.

NachoNacho became easier to understand, more credible and much harder to confuse with the rest of the category.

Visits increased, people stayed longer, inquiries grew and the new experience dramatically improved conversion. In the period we tracked, conversion increased by more than 800%.

Standing out was not a risk to control.

It was part of the strategy.\</p\>  
                                \<h2\>BETTER DESIGN WAS THE OUTPUT.  
BETTER BUSINESS WAS THE RESULT.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>NachoNacho\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>SaaS / Fintech\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Brand strategy, Brand identity, Product design, Website design, User research and testing\</dd\>  
                                \</dl\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
                \<template data-project-template="walletii"\>  
                    \<article class="case-page" data-case="walletii" hidden\>  
                        \<div class="case-hero"\>  
                            \<figure class="case-cover"\>  
                                \<picture\>  
                                    \<source type="image/avif" srcset="/assets/responsive/hero-walletii-480.avif 480w, /assets/responsive/hero-walletii-800.avif 800w, /assets/responsive/hero-walletii-1200.avif 1200w, /assets/responsive/hero-walletii-1433.avif 1433w" sizes="(max-width: 700px) 100vw, 50vw"\>  
                                    \<img data-defer-src="/assets/case-studies/walletii/hero.webp" alt="Walletii — Digital wallet product design" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--hero-480.webp 480w, /assets/responsive/case-studies--walletii--hero-800.webp 800w, /assets/responsive/case-studies--walletii--hero-1200.webp 1200w, /assets/case-studies/walletii/hero.webp 1433w" fetchpriority="high" decoding="async" loading="eager" style="object-position:center"\>  
                                \</picture\>  
                            \</figure\>  
                            \<section class="case-description"\>  
                                \<p class="case-intro"\>Walletii started with a sketch of a home screen.

Three years later, it had grown into a complete digital wallet ecosystem designed for multiple markets across the MENA region.

What began as a product design assignment gradually expanded into UX, UI, brand applications, service design, complex financial journeys, hundreds of screens and a system built to work across different countries, languages and user behaviours.

We did not just design an app.

We helped shape how the product works.\</p\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Creative Dock, Ooredoo\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Fintech / Digital Wallet\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Product design, UX design, UI design, Design system, Brand digital system, Service design\</dd\>  
                                \</dl\>  
                                \<h1\>  
                                    Walletii\<span\>From one screen to an entire financial ecosystem\</span\>  
                                \</h1\>  
                            \</section\>  
                            \<div class="case-logo" style="background:\#051926"\>  
                                \<img data-defer-src="/assets/project-logos/walletii.svg" alt="Walletii logo" style="width:311px"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Financial products become complicated very quickly.

Sending money, receiving it, managing cards, transferring funds internationally, topping up an account or understanding transaction history all come with their own rules, risks and edge cases.

Our job was to turn that complexity into something people could understand immediately.

We designed flows around clear actions, familiar patterns and simple language, reducing the amount users had to think about while keeping the system powerful underneath.\</p\>  
                                \<h2\>COMPLEX MONEY FLOWS.  
SIMPLE HUMAN ACTIONS.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-3.webp" alt="Walletii — Secure onboarding and access" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-3-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-3-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-3-1200.webp 1200w, /assets/case-studies/walletii/walletii-3.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>A wallet can look beautiful and still fail if people do not trust it.

Trust had to be built into every part of Walletii: onboarding, balances, confirmations, transaction states, security, errors and the way financial information is presented.

We worked carefully with hierarchy, interaction and feedback so users always understand what is happening to their money and what happens next.

For a financial product, clarity is not decoration.

It is part of the product.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-5.webp" alt="Walletii — Clear financial actions" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-5-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-5-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-5-1200.webp 1200w, /assets/case-studies/walletii/walletii-5.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-7.webp" alt="Walletii — Card activation" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-7-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-7-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-7-1200.webp 1200w, /assets/case-studies/walletii/walletii-7.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row text-right"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-4.webp" alt="Walletii — Secure onboarding and access" width="1920" height="1433" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-4-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-4-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-4-1200.webp 1200w, /assets/case-studies/walletii/walletii-4.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Over three years, Walletii grew far beyond a few key journeys.

The product expanded into hundreds of screens and extensive UI-kit libraries, covering everyday payments, international transfers, cards, transaction management, account services and new features as the ecosystem evolved.

That scale required a strong design system.

Components, interaction patterns, labels, states and layouts had to stay consistent even as the product grew across markets and teams.\</p\>  
                                \<h2\>THE PRODUCT KEPT GROWING.  
THE SYSTEM HAD TO GROW WITH IT.\</h2\>  
                            \</div\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>Some parts of Walletii required much deeper product thinking than a conventional banking interface.

We explored new ways of handling payments, including chat-like interactions, remittance journeys and marketplace-style experiences designed to make difficult financial tasks feel more intuitive.

The work often went beyond designing screens.

It meant questioning the journey itself, simplifying the underlying logic and finding a better way for people to complete the task.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-2.webp" alt="Walletii — Payments and transfers" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-2-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-2-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-2-1200.webp 1200w, /assets/case-studies/walletii/walletii-2.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-10.webp" alt="Walletii — Payments and transfers" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-10-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-10-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-10-1200.webp 1200w, /assets/case-studies/walletii/walletii-10.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel case-panel-light"\>  
                                \<p\>Walletii was never designed for just one audience.

The product had to work across different countries, languages, cultures, regulations and financial behaviours.

That meant constantly balancing consistency with local requirements.

Layouts had to survive translation. Journeys had to adapt to different market needs. New feedback could affect hundreds of existing screens.

The design system gave the product a common foundation while still allowing each market to work the way it needed to.\</p\>  
                                \<h2\>\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-13.webp" alt="Walletii — Digital wallet communication" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-13-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-13-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-13-1200.webp 1200w, /assets/case-studies/walletii/walletii-13.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<section class="case-block case-paragraph"\>  
                            \<p\>The work expanded beyond the digital product as well.

We applied Walletii’s existing visual identity and developed a brand digital system, advising on how the brand should live across digital communication, cards, packaging, leaflets, in-store materials and other physical touchpoints.

Colour, messaging and visual rules had to feel consistent whether someone encountered Walletii inside the app, on a card or in a retail environment.

The goal was one recognisable product experience, not separate digital and physical brands.\</p\>  
                        \</section\>  
                        \<div class="case-row portraits"\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-8.webp" alt="Walletii — Brand applications" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-8-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-8-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-8-1200.webp 1200w, /assets/case-studies/walletii/walletii-8.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-6.webp" alt="Walletii — Brand applications" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-6-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-6-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-6-1200.webp 1200w, /assets/case-studies/walletii/walletii-6.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<div class="case-row text-left"\>  
                            \<div class="case-block case-panel"\>  
                                \<p\>Long-term product work is very different from delivering a one-off design.

Walletii evolved constantly.

New markets launched. New requirements appeared. Regulations changed. Journeys expanded. Features that looked simple at first became entire systems.

Our role was to keep the product coherent while continuing to challenge how it could work better.

Three years meant thousands of small decisions, feedback rounds, edge cases and iterations that gradually became one product.\</p\>  
                                \<h2\>FROM A SKETCH  
TO A SYSTEM USED ACROSS MARKETS.\</h2\>  
                            \</div\>  
                            \<figure class="case-block case-wide"\>  
                                \<img data-defer-src="/assets/case-studies/walletii/walletii-9.webp" alt="Walletii — Digital product ecosystem" width="1433" height="1920" sizes="(max-width: 700px) 100vw, 50vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-9-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-9-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-9-1200.webp 1200w, /assets/case-studies/walletii/walletii-9.webp 1433w" decoding="async" loading="lazy" style="object-position:center"\>  
                            \</figure\>  
                        \</div\>  
                        \<figure class="case-block case-wide"\>  
                            \<img data-defer-src="/assets/case-studies/walletii/walletii-12.webp" alt="Walletii — Walletii website" width="1920" height="1080" sizes="100vw" data-defer-srcset="/assets/responsive/case-studies--walletii--walletii-12-480.webp 480w, /assets/responsive/case-studies--walletii--walletii-12-800.webp 800w, /assets/responsive/case-studies--walletii--walletii-12-1200.webp 1200w, /assets/case-studies/walletii/walletii-12.webp 1920w" decoding="async" loading="lazy" style="object-position:center"\>  
                        \</figure\>  
                        \<footer class="case-footer"\>  
                            \<div class="case-footer-copy"\>  
                                \<p\>Walletii grew from an early product concept into a live digital financial service across multiple markets.

The result is not one screen, one feature or one visual identity.

It is the system behind all of them.

A product designed to make complex financial services feel simpler, more trustworthy and more consistent, wherever Walletii goes next.\</p\>  
                                \<a class="case-return" href="/projects/"\>  
                                    \<img src="/assets/case-studies/back-projects.svg" alt="" width="15.76" height="15.76"\>  
                                    \<span\>Back to projects\</span\>  
                                \</a\>  
                            \</div\>  
                            \<div class="case-footer-details"\>  
                                \<dl class="case-meta"\>  
                                    \<dt\>Client\</dt\>  
                                    \<dd\>Creative Dock, Ooredoo\</dd\>  
                                    \<dt\>Field\</dt\>  
                                    \<dd\>Fintech / Digital Wallet\</dd\>  
                                    \<dt\>Services\</dt\>  
                                    \<dd\>Product design, UX design, UI design, Design system, Brand digital system, Service design\</dd\>  
                                \</dl\>  
                            \</div\>  
                        \</footer\>  
                    \</article\>  
                \</template\>  
            \</section\>  
            \<section class="story" aria-label="Our approach and client stories" tabindex="0" aria-hidden="true" inert\>  
                \<div class="story-runway"\>  
                    \<div class="story-viewport"\>  
                        \<div class="story-copy"\>  
                            \<p\>  
                                You already know the \<em\>difference.\</em\>  
                                \<br\>Between a brand that fits and one that defines.  
                            \</p\>  
                            \<p\>AI now introduces your brand before you've said a word. Someone asks who to trust, who to hire, who's worth it. You want to be on that list. But the click is only the beginning. If the brand doesn't deliver, you're out.\</p\>  
                            \<p\>The brands that win get cited, clicked, chosen – because when someone lands, they find exactly what was promised. And then some.\</p\>  
                            \<p\>That's what you're after. Something that stops people mid-scroll, mid-street, mid-conversation. A brand that feels like you – on your best day, no apologies. Something that gets that text.\</p\>  
                            \<p\>  
                                You can't play it safe now.\<br\>The average is already covered.  
                            \</p\>  
                        \</div\>  
                        \<h2 class="story-title" aria-label="For those who don’t want to play it safe."\>  
                            \<span aria-hidden="true"\>For those\</span\>  
                            \<span class="story-middle" aria-hidden="true"\>  
                                \<span\>who\</span\>  
                                \<em class="story-insert"\>don’t\</em\>  
                                \<span class="story-want"\>want\</span\>  
                            \</span\>  
                            \<span aria-hidden="true"\>to play it safe.\</span\>  
                        \</h2\>  
                        \<div class="logo-wall" role="group" aria-label="Selected clients"\>\</div\>  
                        \<button class="story-continue section-continue" type="button" aria-label="Continue to final screen"\>↓\</button\>  
                        \<div class="testimonials" tabindex="0" role="region" aria-label="Client testimonials. Drag or use left and right arrows."\>  
                            \<div class="testimonial-track"\>  
                                \<article class="testimonial text-testimonial supplied-testimonial" data-quote="andy-night-day"\>  
                                    \<div class="testimonial-copy"\>  
                                        \<h3\>From where we started to where we are now, the difference is night and day.\</h3\>  
                                        \<blockquote\>garcy.studio is next level in terms of taking a mock up or an idea and turning into something better than you even conceptualized.\</blockquote\>  
                                    \</div\>  
                                    \<div class="person"\>  
                                        \<img src="/assets/testimonials/andy.webp" alt="" width="45" height="45" loading="lazy"\>  
                                        \<p\>  
                                            Andy Karuza\<span\>Head of Marketing\</span\>  
                                            \<span\>NachoNacho\</span\>  
                                        \</p\>  
                                    \</div\>  
                                    \<p class="testimonial-tags"\>  
                                        Branding\<br\>  
                                        Website Design\<br\>Strategy  
                                    \</p\>  
                                \</article\>  
                                \<article class="testimonial video-testimonial"\>  
                                    \<video data-person="lukas" muted loop playsinline preload="none" poster="/assets/testimonials/lukas-poster.webp" aria-hidden="true"\>  
                                        \<source src="/assets/testimonials/lukas-loop.mp4" type="video/mp4"\>  
                                    \</video\>  
                                    \<div class="reel-dither" aria-hidden="true"\>\</div\>  
                                    \<button class="person video-play" type="button" data-testimonial="lukas" data-person="Lukáš Kovařík" aria-label="Play Lukáš Kovařík's testimonial"\>  
                                        \<span class="play-square"\>  
                                            \<img src="/assets/testimonials/play.svg" alt="" width="45" height="45"\>  
                                            \<canvas class="play-pixels" width="90" height="90" aria-hidden="true"\>\</canvas\>  
                                        \</span\>  
                                        \<span class="person-label"\>  
                                            Lukáš Kovařík\<span\>CEO\</span\>  
                                            \<span\>Bohemian Research\</span\>  
                                        \</span\>  
                                    \</button\>  
                                \</article\>  
                                \<article class="testimonial text-testimonial supplied-testimonial" data-quote="magdalena-brand"\>  
                                    \<div class="testimonial-copy"\>  
                                        \<h3\>Our new brand has elevated us to a whole new level.\</h3\>  
                                        \<blockquote\>It has helped us confirm our credibility and relevance as the number one in driving systemic changes in education in Czechia. Moreover, it has also given us the opportunity to build sustainable funding for our long-term activities with international impact.\</blockquote\>  
                                    \</div\>  
                                    \<div class="person"\>  
                                        \<img src="/assets/testimonials/magdalena.webp" alt="" width="45" height="45" loading="lazy"\>  
                                        \<p\>  
                                            Magdalena Olšanová\<span\>Project Lead\</span\>  
                                            \<span\>SOFA\</span\>  
                                        \</p\>  
                                    \</div\>  
                                    \<p class="testimonial-tags"\>  
                                        Branding\<br\>Website Design  
                                    \</p\>  
                                \</article\>  
                                \<article class="testimonial video-testimonial"\>  
                                    \<video data-person="andy" muted loop playsinline preload="none" poster="/assets/testimonials/andy-poster.webp" aria-hidden="true"\>  
                                        \<source src="/assets/testimonials/andy-loop.mp4" type="video/mp4"\>  
                                    \</video\>  
                                    \<div class="reel-dither" aria-hidden="true"\>\</div\>  
                                    \<button class="person video-play" type="button" data-testimonial="andy" data-person="Andy Karuza" aria-label="Play Andy Karuza's testimonial"\>  
                                        \<span class="play-square"\>  
                                            \<img src="/assets/testimonials/play.svg" alt="" width="45" height="45"\>  
                                            \<canvas class="play-pixels" width="90" height="90" aria-hidden="true"\>\</canvas\>  
                                        \</span\>  
                                        \<span class="person-label"\>  
                                            Andy Karuza\<span\>Head of Marketing\</span\>  
                                            \<span\>NachoNacho\</span\>  
                                        \</span\>  
                                    \</button\>  
                                \</article\>  
                                \<article class="testimonial text-testimonial supplied-testimonial" data-quote="martin-extra"\>  
                                    \<div class="testimonial-copy"\>  
                                        \<h3\>We &\#39;re always impressed by garcy.studio &\#39;s ability to consistently deliver something extra.\</h3\>  
                                        \<blockquote\>The collaboration is smooth and the work is always completed efficiently and professionally.\</blockquote\>  
                                    \</div\>  
                                    \<div class="person"\>  
                                        \<img src="/assets/testimonials/martin.webp" alt="" width="45" height="45" loading="lazy"\>  
                                        \<p\>  
                                            Martin Šetek\<span\>CEO\</span\>  
                                            \<span\>Resimo\</span\>  
                                        \</p\>  
                                    \</div\>  
                                    \<p class="testimonial-tags"\>  
                                        Website Design\<br\>User Experience  
                                    \</p\>  
                                \</article\>  
                                \<article class="testimonial text-testimonial supplied-testimonial" data-quote="michal-package"\>  
                                    \<div class="testimonial-copy"\>  
                                        \<h3\>garcy.studio offers a full package of services and that’s a really big benefit.\</h3\>  
                                        \<blockquote\>It’s not only that we get some Figma file with ready screens. But we can really get into complex discussions about user needs and branding.\</blockquote\>  
                                    \</div\>  
                                    \<div class="person"\>  
                                        \<img src="/assets/testimonials/michal.webp" alt="" width="45" height="45" loading="lazy"\>  
                                        \<p\>  
                                            Michal Beran\<span\>Product Owner\</span\>  
                                            \<span\>Creative Dock\</span\>  
                                        \</p\>  
                                    \</div\>  
                                    \<p class="testimonial-tags"\>  
                                        User Experience\<br\>App Design  
                                    \</p\>  
                                \</article\>  
                                \<article class="testimonial text-testimonial supplied-testimonial" data-quote="pavel-rebrand"\>  
                                    \<div class="testimonial-copy"\>  
                                        \<h3\>My first collaboration with garcy.studio was one of the best rebrandings that I’ve seen.\</h3\>  
                                        \<blockquote\>Plus we always had pleasant, smooth discussions where we could challenge one another and the project.\</blockquote\>  
                                    \</div\>  
                                    \<div class="person"\>  
                                        \<img src="/assets/testimonials/pavel.webp" alt="" width="45" height="45" loading="lazy"\>  
                                        \<p\>  
                                            Pavel Urban\<span\>Head Of Shopping Centers Marketing CZ/SK\</span\>  
                                            \<span\>CPI\</span\>  
                                        \</p\>  
                                    \</div\>  
                                    \<p class="testimonial-tags"\>  
                                        Branding\<br\>Strategy  
                                    \</p\>  
                                \</article\>  
                                \<article class="testimonial text-testimonial supplied-testimonial" data-quote="lukas-growth"\>  
                                    \<div class="testimonial-copy"\>  
                                        \<h3\>Garcy.studio revitalized our website, skyrocketing our growth and customer engagement beyond expectations.\</h3\>  
                                        \<blockquote\>We need very quick back and forth, very quick feedback, and it has definitely moved us to the upper tier.\</blockquote\>  
                                    \</div\>  
                                    \<div class="person"\>  
                                        \<img src="/assets/testimonials/lukas.webp" alt="" width="45" height="45" loading="lazy"\>  
                                        \<p\>  
                                            Lukáš Kovařík\<span\>CEO\</span\>  
                                            \<span\>Bohemian Research\</span\>  
                                        \</p\>  
                                    \</div\>  
                                    \<p class="testimonial-tags"\>  
                                        Branding\<br\>  
                                        Website Design\<br\>User Experience  
                                    \</p\>  
                                \</article\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</section\>  
            \<section class="projects" aria-label="Selected projects" aria-describedby="dome-help" tabindex="0" aria-hidden="true" inert\>  
                \<h2 class="sr-only"\>Selected projects\</h2\>  
                \<p id="dome-help" class="sr-only"\>Drag or scroll in any direction to explore the infinite project gallery. Arrow keys move the gallery. Home resets the view. Use Back to return to the tornado.\</p\>  
                \<div class="project-source sr-only" aria-hidden="true"\>  
                    \<a class="project-card" data-project="society-for-all" href="/projects/society-for-all/"\>  
                        \<img data-defer-src="/assets/projects/society-for-all.webp" alt="SOFA, Society for All" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>SOFA, Society for All\</h3\>  
                            \<p class="project-services"\>  
                                Naming\<br\>  
                                Brand identity\<br\>Illustration  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="koscom-30" href="/projects/koscom-30/"\>  
                        \<img data-defer-src="/assets/projects/koscom-30.webp" alt="Koscom" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Koscom\</h3\>  
                            \<p class="project-services"\>  
                                Art direction\<br\>Editorial design  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="unit-architects" href="/projects/unit-architects/"\>  
                        \<img data-defer-src="/assets/projects/unit-architects.webp" alt="UNIT architekti" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>UNIT architekti\</h3\>  
                            \<p class="project-services"\>  
                                Brand identity\<br\>  
                                Visual system\<br\>Brand guidelines  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="oslo" href="/projects/otk/"\>  
                        \<img data-defer-src="/assets/project-content/otk-cover-1.webp" alt="Oslo Tennisklubb" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Oslo Tennisklubb\</h3\>  
                            \<p class="project-services"\>  
                                Branding\<br\>  
                                Website design\<br\>Strategy  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="goodveri" href="/projects/goodveri/"\>  
                        \<img data-defer-src="/assets/goodveri/thumb.webp" alt="Goodveri" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Goodveri\</h3\>  
                            \<p class="project-services"\>  
                                Branding\<br\>Website design  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="magu" href="/projects/magu/"\>  
                        \<img data-defer-src="/assets/projects/magu.webp" alt="Magu" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Magu\</h3\>  
                            \<p class="project-services"\>  
                                Branding\<br\>  
                                Packaging\<br\>Strategy  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="aomu" href="/projects/aomu/"\>  
                        \<img data-defer-src="/assets/projects/aomu.webp" alt="AOMU" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>AOMU\</h3\>  
                            \<p class="project-services"\>  
                                Brand identity\<br\>  
                                Logo design\<br\>Packaging design  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="oslo-02" href="/projects/arkady/"\>  
                        \<img data-defer-src="/assets/projects/oslo-02.webp" alt="Arkády" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Arkády\</h3\>  
                            \<p class="project-services"\>  
                                Brand identity\<br\>  
                                Typography\<br\>Visual system  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="magu-02" href="/projects/luxury-travel-digest/"\>  
                        \<img data-defer-src="/assets/projects/luxury-travel-digest.webp" alt="Luxury Travel Digest" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Luxury Travel Digest\</h3\>  
                            \<p class="project-services"\>  
                                Editorial identity\<br\>  
                                Art direction\<br\>Magazine design  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="aomu-02" href="/projects/sunnysoft/"\>  
                        \<img data-defer-src="/assets/projects/sunnysoft-cover.webp" alt="Sunnysoft" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Sunnysoft\</h3\>  
                            \<p class="project-services"\>  
                                Brand identity\<br\>  
                                E-commerce UX\<br\>Website design  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="liberalni-institut" href="/projects/liberalni-institut/"\>  
                        \<img data-defer-src="/assets/project-content/libinst2.webp" alt="Liberální institut" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Liberální institut\</h3\>  
                            \<p class="project-services"\>  
                                Brand identity\<br\>  
                                Logo design\<br\>Typography  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="nachonacho" href="/projects/nachonacho/"\>  
                        \<img data-defer-src="/assets/project-content/nachonacho1.webp" alt="NachoNacho" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>NachoNacho\</h3\>  
                            \<p class="project-services"\>  
                                Brand strategy\<br\>  
                                Brand identity\<br\>Product design  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                    \<a class="project-card" data-project="walletii" href="/projects/walletii/"\>  
                        \<img data-defer-src="/assets/case-studies/walletii/cover.webp" alt="Walletii" loading="lazy" decoding="async" width="458" height="498"\>  
                        \<div class="project-caption"\>  
                            \<h3\>Walletii\</h3\>  
                            \<p class="project-services"\>  
                                Product design\<br\>  
                                User experience\<br\>Brand digital system  
                            \</p\>  
                        \</div\>  
                    \</a\>  
                \</div\>  
                \<div class="dome-surface"\>\</div\>  
                \<nav class="project-controls" aria-label="Project gallery navigation"\>  
                    \<button class="projects-back" type="button"\>  
                        \<img src="./assets/projects/arrow-back.svg" alt="" width="10" height="10"\>Back  
                    \</button\>  
                    \<button class="projects-next" type="button"\>  
                        Continue\<img src="./assets/projects/arrow-forward.svg" alt="" width="10" height="10"\>  
                    \</button\>  
                \</nav\>  
            \</section\>  
            \<section class="final-scene" aria-label="Let’s make it" tabindex="0" aria-hidden="true" inert\>  
                \<div class="final-copy"\>  
                    \<p\>You’ve seen what bold looks like. You know the difference between a brand that fits and one that defines. We build for people who refuse to be forgettable — who want something they’re proud of before it even launches, something that rises above the AI average and stays there.\</p\>  
                    \<p\>If that’s you, let’s make it.\</p\>  
                \</div\>  
                \<h2 class="final-title"\>  
                    The safest thing\<br\>  
                    you can do now\<br\>  
                    is be \<em\>unmistakable.\</em\>  
                \</h2\>  
                \<img class="final-joy" data-defer-src="./assets/final/joy.svg" alt="Joy through design"\>  
                \<address class="final-address"\>  
                    \<strong\>garcy.studio\</strong\>  
                    \<br\>  
                    Na Usedlosti 1837/10\<br\>  
                    147 00, Prague 4\<br\>VAT: CZ07826800  
                \</address\>  
                \<p class="final-copyright"\>© 2026 garcy.studio\</p\>  
                \<div class="team-strip" tabindex="0" aria-label="Meet the studio. Swipe or use arrow keys."\>  
                    \<div class="team-track"\>  
                        \<article class="team-card"\>  
                            \<img data-defer-src="./assets/final/loren.webp" alt="Loren Goodknight" loading="lazy" width="282" height="361"\>  
                            \<p class="team-label"\>  
                                Studio Manager\<span\>Loren Goodknight\</span\>  
                                \<a href="mailto:hello@garcy.studio"\>hello@garcy.studio\</a\>  
                            \</p\>  
                        \</article\>  
                        \<article class="team-card"\>  
                            \<img data-defer-src="./assets/final/interior.webp" alt="Inside garcy.studio" loading="lazy" width="282" height="361"\>  
                        \</article\>  
                        \<article class="team-card"\>  
                            \<img data-defer-src="./assets/final/tom.webp" alt="Tom Garcy" loading="lazy" width="282" height="361"\>  
                            \<p class="team-label"\>  
                                Managing Director\<span\>Tom Garcy\</span\>  
                                \<a href="mailto:hello@garcy.studio"\>hello@garcy.studio\</a\>  
                            \</p\>  
                        \</article\>  
                        \<article class="team-card"\>  
                            \<img data-defer-src="./assets/final/venca.webp" alt="Venca Šrámek" loading="lazy" width="282" height="361"\>  
                            \<p class="team-label"\>  
                                Lead Designer\<span\>Venca Šrámek\</span\>  
                                \<a href="mailto:hello@garcy.studio"\>hello@garcy.studio\</a\>  
                            \</p\>  
                        \</article\>  
                        \<article class="team-card"\>  
                            \<img data-defer-src="./assets/final/terrace.webp" alt="Inside garcy.studio" loading="lazy" width="282" height="361"\>  
                        \</article\>  
                    \</div\>  
                \</div\>  
            \</section\>  
            \<p class="joy-label"\>Joy through design since 2008\</p\>  
            \<section class="opening" aria-label="Brands that get that text" tabindex="-1" inert\>  
                \<h1 class="sr-only"\>Brands that get that text.\</h1\>  
                \<button class="opening-continue section-continue" type="button" aria-label="Continue to our work" disabled\>↓\</button\>  
                \<video class="reel" muted loop playsinline preload="none" poster="./assets/loader/opening.webp" aria-hidden="true"\>  
                    \<source src="./reel-02.mp4" type="video/mp4"/\>  
                \</video\>  
                \<div class="reel-shade" aria-hidden="true"\>\</div\>  
                \<div class="reel-dither" aria-hidden="true"\>\</div\>  
                \<div class="video-reveal" aria-hidden="true"\>\</div\>  
                \<div class="notifications" role="button" tabindex="0" aria-label="Notifications arriving" aria-expanded="false" aria-controls="notification-list" aria-disabled="true"\>  
                    \<ol id="notification-list" class="notification-list" aria-label="Messages"\>\</ol\>  
                \</div\>  
                \<p class="sr-only announcements" role="status" aria-live="polite" aria-atomic="true"\>\</p\>  
            \</section\>  
            \<div class="spotlight" aria-hidden="true"\>\</div\>  
            \<header class="site-header" inert\>  
                \<a class="logo" href="./" aria-label="garcy.studio — replay intro"\>  
                    \<img src="./assets/logo.svg" alt="garcy.studio" width="89" height="15"/\>  
                \</a\>  
                \<div class="header-actions"\>  
                    \<button class="profile-button" type="button" disabled aria-label="Studio navigation — coming later"\>  
                        \<img src="./assets/controls/profile-square.svg" alt="" width="44" height="45"/\>  
                    \</button\>  
                    \<button class="search-shortcut" type="button" disabled aria-label="Open studio search"\>  
                        \<span class="shortcut-label"\>  
                            \<img class="shortcut-command" src="./assets/controls/command.svg" alt="" width="11" height="11"\>  
                            \<span class="shortcut-control" hidden\>ctrl\</span\>  
                            \<span\>K\</span\>  
                        \</span\>  
                    \</button\>  
                    \<button class="contact" type="button" disabled aria-label="Contact form — coming later"\>  
                        \<img src="./assets/controls/contact.svg" alt="" width="46" height="46"/\>  
                    \</button\>  
                \</div\>  
            \</header\>  
            \<div class="audio-controls" role="group" aria-label="Audio controls"\>  
                \<div class="audio-channel"\>  
                    \<img class="channel-icon" src="./assets/controls/speaker.svg" alt="" width="15" height="11"/\>  
                    \<button class="music-toggle" type="button" aria-label="Play Starfall by Ryan Taubert" aria-pressed="false"\>  
                        \<img src="./assets/controls/play.svg" alt="" width="11" height="12"/\>  
                    \</button\>  
                \</div\>  
                \<div class="audio-channel"\>  
                    \<img class="channel-icon waveform" src="./assets/controls/waveform.svg" alt="" width="12" height="14"/\>  
                    \<button class="podcast-toggle" type="button" aria-pressed="false" aria-label="Play garcy.studio podcast" title="AI Makes Safe Branding Your Riskiest Move"\>  
                        \<img src="./assets/controls/play.svg" alt="" width="11" height="12"/\>  
                    \</button\>  
                \</div\>  
            \</div\>  
            \<audio class="podcast-track" src="./assets/audio/garcy-podcast.mp3" preload="none"\>\</audio\>  
            \<audio class="music-track" src="./assets/audio/starfall-master.mp3" preload="none" loop\>\</audio\>  
            \<button class="sound-button motion-toggle" type="button" aria-label="Pause motion" aria-pressed="false" title="Pause motion"\>  
                \<img src="./assets/asterisk.svg" alt="" width="11" height="12"/\>  
            \</button\>  
        \</main\>  
        \<dialog class="video-dialog" aria-label="Client testimonial video"\>  
            \<button class="video-close" type="button" aria-label="Close video"\>  
                \<span aria-hidden="true"\>×\</span\>  
                \<span\>Close\</span\>  
            \</button\>  
            \<video class="testimonial-player" controls playsinline preload="none" aria-label="Client testimonial"\>\</video\>  
        \</dialog\>  
        \<section class="plain-overview" aria-label="Studio overview"\>  
            \<h1\>Branding, websites and digital product design.\</h1\>  
            \<p\>A brand people ask about. A website that makes things click. We design brands, websites and digital products that make your business unmistakable.\</p\>  
            \<h2\>Selected work\</h2\>  
            \<ul\>  
                \<li\>  
                    \<a href="/projects/society-for-all/"\>SOFA, Society for All\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/koscom-30/"\>Koscom\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/unit-architects/"\>UNIT architekti\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/otk/"\>Oslo Tennisklubb\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/goodveri/"\>Goodveri\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/magu/"\>Magu\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/aomu/"\>AOMU\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/arkady/"\>Arkády\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/luxury-travel-digest/"\>Luxury Travel Digest\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/sunnysoft/"\>Sunnysoft\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/liberalni-institut/"\>Liberální institut\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/nachonacho/"\>NachoNacho\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/projects/walletii/"\>Walletii\</a\>  
                \</li\>  
            \</ul\>  
            \<h2\>Services\</h2\>  
            \<ul\>  
                \<li\>  
                    \<a href="/best-branding"\>Brand identity \&amp; packaging design\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/websites"\>Website design\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/mobile-apps-saas-design"\>App \&amp; SaaS product design\</a\>  
                \</li\>  
                \<li\>  
                    \<a href="/full-product-design"\>Brand \&amp; digital product design\</a\>  
                \</li\>  
            \</ul\>  
            \<p\>  
                \<a href="/studio/"\>Meet the studio\</a\>  
                · \<a href="/approach/"\>The difference\</a\>  
                · \<a href="mailto:hello@garcy.studio"\>Discuss a project\</a\>  
            \</p\>  
        \</section\>  
    \</body\>  
\</html\>

app.js  
import {setupStudioMenu} from './studio-menu.js';  
import {SITE,routeMeta} from './site-content.js';  
import {track} from './measurement.js';  
import {createProjectPages,PROJECT\_SLUGS} from './project-pages.js';  
import {readRoute} from './routes.js';  
import {createFinal} from './final.js';  
import {setupButtonPixels,setupArrowReveals} from './button-effects.js';  
import { createDome } from './dome.js';  
import { prepareEntry, setupSpotlight } from './atmosphere.js';  
import { createStory } from './story.js';  
import { createMomentScene, createMusicPlayer } from './moment.js';  
// Opening-scene timing and content are intentionally editable in one place.  
const MESSAGES \= \[  
  { sender: 'Familiar Stranger', text: 'Hey, who made your brand?' },  
  { sender: 'The one who left you on read', text: 'Your site is incredible. What studio is that?' },  
  { sender: 'Your old boss', text: 'GPT recommended your site, how did you do that?' },  
  { sender: 'The one who said no', text: 'Someone just sent me your brand.' },  
\];  
const TIMING \= { firstMessage: 1000, betweenMessages: 1900, settle: 600, arrival: 560, videoFade: 1400, dropStagger: 100, dropDuration: 1000 };  
const PORTRAITS \= Array.from({length:16},(\_,i)=\>({position:\`\${(i%4)\*100/3}% \${Math.floor(i/4)\*100/3}%\`}));  
// Keep decoded image elements alive from boot and insert those same elements.  
const portraitImages \= PORTRAITS.map((face, i) \=\> {  
  const image \= new Image();  
  image.alt \= ''; image.width \= 192; image.height \= 192;  
  image.fetchPriority \= 'high'; image.loading \= 'eager';  
  image.src \= \`/assets/portraits/message-\${i+1}.webp\`;  
  face.image \= image;  
  return image;  
});  
const portraitsReady \= Promise.allSettled(portraitImages.map(image \=\> image.decode()));  
let scenePortraits \= \[\];  
function choosePortraits() {  
  // Each supplied row is a complete, balanced set. Shuffle within that row only.  
  const row \= Math.floor(Math.random()\*4);  
  const faces \= PORTRAITS.slice(row\*4,row\*4+4);  
  for (let i=faces.length-1;i\>0;i--) {  
    const j=Math.floor(Math.random()\*(i+1));  
    \[faces\[i\],faces\[j\]\]=\[faces\[j\],faces\[i\]\];  
  }  
  return faces.slice(0,MESSAGES.length);  
}  
document.documentElement.classList.add('experience-ready');  
document.documentElement.classList.remove('experience-booting');  
const pageMetadata=JSON.parse(document.querySelector('\#project-metadata')?.textContent\|\|'{}');  
const stage \= document.querySelector('.stage');  
const opening \= document.querySelector('.opening');  
const nextScene \= document.querySelector('.next-scene');  
const stack \= document.querySelector('.notifications');  
const list \= document.querySelector('.notification-list');  
const video \= document.querySelector('.reel');  
const videoReveal \= document.querySelector('.video-reveal');  
const live \= document.querySelector('.announcements');  
const motionButton \= document.querySelector('.motion-toggle');  
const reducedMotion \= matchMedia('(prefers-reduced-motion: reduce)');  
const moment \= createMomentScene(nextScene, reducedMotion);  
const music \= createMusicPlayer();  
const story \= createStory(reducedMotion,route=\>{if(phase==='story')updateRoute(route);});  
const dome \= createDome(reducedMotion,openProject);  
const casePages=createProjectPages(reducedMotion,closeProject);  
const finale=createFinal(reducedMotion);  
let menuOpen=false;  
const studioMenu=setupStudioMenu({onNavigate:menuNavigate,onToggle(open){menuOpen=open;syncMotion();}});  
setupButtonPixels(reducedMotion);  
setupArrowReveals(reducedMotion);  
let cards \= \[\];  
let phase \= 'loading';  
let expanded \= false;  
let pinnedOpen \= false;  
let soundEnabled \= true;  
let audioContext;  
let soundBuffer;  
let soundDecode;  
let soundBytes;  
const loadSound \= () \=\> soundBytes ??= fetch('./assets/audio/new-notification-051.mp3')  
  .then(response \=\> { if (\!response.ok) throw new Error('Notification sound could not load'); return response.arrayBuffer(); })  
  .catch(error \=\> { console.warn(error.message); return null; });  
async function prepareSound() {  
  if (\!audioContext) return;  
  soundDecode ??= loadSound().then(bytes \=\> bytes ? audioContext.decodeAudioData(bytes.slice(0)) : null).catch(() \=\> null);  
  soundBuffer \= await soundDecode;  
}  
let paused \= reducedMotion.matches;  
let generation \= 0;  
let animations \= \[\];  
let lastWheelAt \= 0;  
let wheelDistance \= 0;  
let storyWheelDistance \= 0, storyWheelAt \= 0, storyWheelArmed \= false;  
const storyRoot \= document.querySelector(".story");  
let backWheelAt=0, backWheelDistance=0;  
let projectsWheelAt=0,projectsWheelDistance=0,projectsWheelArmed=false;  
let storyTouchAtEnd=false;  
let wheelArmed \= false;  
let touchStartY \= null;  
let tickAt \= 0;  
let elapsed \= 0;  
let deliveryFrame;

const setPhase \= value \=\> { phase \= value; stage.dataset.phase \= value; const route={arriving:'opening',next:'moment',story:'approach',projects:'projects',final:'studio'}\[value\];if(route)updateRoute(route); };  
function updateRoute(route,push=false){  
 const meta=routeMeta(route,pageMetadata.projects),url=meta.path\!=='/'?meta.path:\`/\#/$route`;if(location.pathname+location.hash!==url)history[push?'pushState':'replaceState'](null,'',url);document.title=meta.title;document.querySelector('meta[name="description"]')?.setAttribute('content',meta.description);document.querySelector('link[rel="canonical"]')?.setAttribute('href',SITE.origin+meta.path);for(const[key,value]of[['og:title',meta.title],['og:description',meta.description],['og:url',SITE.origin+meta.path]])document.querySelector(`meta[property="${key}"\]\`)?.setAttribute('content',value);  
 for(const \[key,value\] of \[\['og:image',(pageMetadata.socialOrigin\|\|location.origin)+'/'+(meta.image\|\|'assets/social/studio-desktop.jpg')\],\['twitter:title',meta.title\],\['twitter:description',meta.description\],\['twitter:image',(pageMetadata.socialOrigin\|\|location.origin)+'/'+(meta.image\|\|'assets/social/studio-desktop.jpg')\]\])document.querySelector(\`meta\[property="$key"],meta[name="${key}"\]\`)?.setAttribute('content',value);  
 document.querySelector('meta\[name="robots"\]')?.setAttribute('content',(route.startsWith('project/')?meta.indexable:pageMetadata.indexable)?'index, follow, max-image-preview:large':'noindex, follow');  
 track('page\_view',{page:meta.path,section:route});  
}

async function unlockAudio() {  
  if (\!soundEnabled) return;  
  try {  
    audioContext ??= new (window.AudioContext \|\| window.webkitAudioContext)();  
    await audioContext.resume();  
    await prepareSound();  
  } catch { /\* Silent visual playback remains available when audio is blocked. \*/ }  
}

// Preloaded Pixabay sample: start on the same frame as the card's zoom.  
function ping() {  
  if (\!soundEnabled \|\| \!soundBuffer \|\| audioContext?.state \!== 'running' \|\| document.hidden) return;  
  const source \= audioContext.createBufferSource();  
  const gain \= audioContext.createGain();  
  source.buffer \= soundBuffer;  
  gain.gain.value \= .7;  
  source.connect(gain).connect(audioContext.destination);  
  // Skip the original sample's 80 ms leading silence to align the audible attack.  
  source.start(0, .08);  
  source.onended \= () \=\> { source.disconnect(); gain.disconnect(); };  
}

function geometry() {  
  const style \= getComputedStyle(stack);  
  return { height: stack.offsetHeight, gap: parseFloat(style.getPropertyValue('--card-gap')) };  
}

function layout() {  
  const { height, gap } \= geometry();  
  stack.style.setProperty('--fan-reach', \`\${(cards.length \- 1\) \* (height \+ gap) / 2}px\`);  
  cards.forEach((card, index) \=\> {  
    const depth \= cards.length \- 1 \- index;  
    const y \= expanded ? (depth \- (cards.length \- 1\) / 2\) \* (height \+ gap) : depth \* 13.5;  
    const scale \= expanded ? 1 : 1 \- Math.min(depth, 3\) \* .055;  
    card.dataset.depth \= depth;  
    card.style.zIndex \= String(10 \- depth);  
    card.style.transform \= \`translate3d(0, $ypx,0)scale(${scale})\`;  
    // Keep ancestors fully opaque: opacity would isolate the glass backdrop.  
  });  
}

function setExpanded(value) {  
  if (phase \!== 'ready') return;  
  expanded \= value;  
  stack.dataset.expanded \= String(value);  
  stack.setAttribute('aria-expanded', String(value));  
  stack.setAttribute('aria-label', 'Continue to next section. Hover or focus to expand notifications.');  
  layout();  
}

function deliver() {  
  const message \= MESSAGES\[cards.length\];  
  const card \= document.createElement('li');  
  card.className \= 'notification';  
  const glass \= document.createElement('div');  
  glass.className \= 'notification-glass';  
  const content \= document.createElement('div');  
  content.className \= 'notification-content';  
  const portrait \= document.createElement('div');  
  portrait.className \= 'portrait';  
  const face \= scenePortraits\[cards.length\];  
  portrait.append(face.image);  
  portrait.setAttribute('aria-hidden', 'true');  
  const copy \= document.createElement('div');  
  copy.className \= 'notification-copy';  
  const meta \= document.createElement('div');  
  meta.className \= 'notification-meta';  
  const sender \= document.createElement('span');  
  sender.className \= 'sender';  
  sender.textContent \= message.sender;  
  const timestamp \= document.createElement('span');  
  timestamp.className \= 'timestamp';  
  timestamp.textContent \= 'now';  
  const body \= document.createElement('p');  
  body.className \= 'message';  
  body.textContent \= message.text;  
  meta.append(sender, timestamp);  
  copy.append(meta, body);  
  content.append(portrait, copy);  
  glass.append(content);  
  card.append(glass);  
  list.append(card);  
  cards.push(card);  
  layout();  
  if (\!reducedMotion.matches) {  
    const arrival \= card.animate(\[  
      // Fast launch, then a damped bounce with zero velocity at each turn.  
      { transform: 'translate3d(0,0,0) scale(.015)', offset: 0, easing: 'cubic-bezier(.16,1,.3,1)' },  
      { transform: 'translate3d(0,0,0) scale(1.10)', offset: .30, easing: 'cubic-bezier(.45,0,.55,1)' },  
      { transform: 'translate3d(0,0,0) scale(.97)', offset: .61, easing: 'cubic-bezier(.45,0,.55,1)' },  
      { transform: 'translate3d(0,0,0) scale(1.012)', offset: .83, easing: 'cubic-bezier(.45,0,.55,1)' },  
      { transform: 'translate3d(0,0,0) scale(1)', offset: 1 },  
    \], { duration: TIMING.arrival });  
    animations.push(arrival);  
  }  
  live.textContent \= \`\${message.sender}: \${message.text}\`;  
  ping();  
}

function deliveryTick(now) {  
  if (\!document.hidden && \!menuOpen) elapsed \+= Math.min(now \- tickAt, 100);  
  tickAt \= now;  
  if (phase \!== 'arriving') return;  
  if (cards.length \< MESSAGES.length && elapsed \>= TIMING.firstMessage \+ cards.length \* TIMING.betweenMessages) deliver();  
  const readyAt \= TIMING.firstMessage \+ (MESSAGES.length \- 1\) \* TIMING.betweenMessages \+ TIMING.settle;  
  if (cards.length \=== MESSAGES.length && elapsed \>= readyAt) {  
    setPhase('ready');  
    document.querySelector('.opening-continue').disabled=false;  
    stack.dataset.ready \= 'true';  
    stack.setAttribute('aria-disabled', 'false');  
    stack.setAttribute('aria-label', 'Continue to next section. Hover or focus to expand notifications.');  
    // Do not consume momentum from a scroll that began before the last arrival.  
    lastWheelAt \= performance.now();  
    wheelDistance \= 0;  
    wheelArmed \= false;  
    if (document.activeElement \=== stack) setExpanded(true);  
    return;  
  }  
  deliveryFrame \= requestAnimationFrame(deliveryTick);  
}

async function exitIntro() {  
  if (phase \!== 'ready') return;  
  const run \= generation;  
  setPhase('exiting');  
  stack.setAttribute('aria-disabled', 'true');  
  stack.tabIndex \= \-1;  
  const distance \= innerHeight \+ 250;  
  const drops \= cards.slice().reverse().map((card, index) \=\> {  
    const start \= getComputedStyle(card).transform;  
    const rotation \= \[-13, 9, \-7, 15\]\[index\];  
    card.style.transition \= 'none';  
    const animation \= card.animate(reducedMotion.matches ? \[  
      { opacity: 1 }, { opacity: 0 },  
    \] : \[  
      { transform: start, offset: 0 },  
      { transform: \`\${start} translate3d($rotation*.2px,-22px,0)rotate(${rotation \* \-.12}deg)\`, offset: .17 },  
      { transform: \`$starttranslate3d(${rotation \* 7}px,$distancepx,0)rotate(${rotation}deg)\`, offset: 1 },  
    \], { duration: reducedMotion.matches ? 180 : TIMING.dropDuration, delay: reducedMotion.matches ? 0 : index \* TIMING.dropStagger, easing: 'cubic-bezier(.55,0,.9,.45)', fill: 'forwards' });  
    animations.push(animation);  
    return animation.finished.catch(() \=\> {});  
  });  
  const screenDrop \= opening.animate(reducedMotion.matches ? \[{ opacity: 1 }, { opacity: 0 }\] : \[  
    { transform: 'translate3d(0,0,0)' },  
    { transform: 'translate3d(0,105%,0)' },  
  \], {  
    duration: reducedMotion.matches ? 180 : 1100,  
    delay: reducedMotion.matches ? 0 : 850,  
    easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards',  
  });  
  animations.push(screenDrop);  
  await Promise.all(\[...drops, screenDrop.finished.catch(() \=\> {})\]);  
  if (generation \!== run) return;  
  setPhase('next');  
  opening.style.visibility \= 'hidden';  
  opening.inert \= true;  
  opening.setAttribute('aria-hidden', 'true');  
  nextScene.inert \= false;  
  nextScene.setAttribute('aria-hidden', 'false');  
  video.pause();  
  nextScene.focus({ preventScroll: true });  
  moment.start();  
  stage.dispatchEvent(new CustomEvent('intro:complete', { bubbles: true }));  
}

function replay(fromEntry \= false) {  
  generation++;  
  document.querySelector('.opening-continue').disabled=true;  
  moment.reset();  
  story.reset();  
  dome.reset();  
  finale.reset();  
  casePages.reset();  
  scenePortraits \= choosePortraits();  
  cancelAnimationFrame(deliveryFrame);  
  animations.forEach(animation \=\> animation.cancel());  
  animations \= \[\];  
  cards \= \[\];  
  list.replaceChildren();  
  live.textContent \= '';  
  expanded \= false;  
  pinnedOpen \= false;  
  stack.dataset.ready \= 'false';  
  stack.dataset.expanded \= 'false';  
  stack.setAttribute('aria-expanded', 'false');  
  stack.setAttribute('aria-disabled', 'true');  
  stack.setAttribute('aria-label', 'Notifications arriving');  
  stack.tabIndex \= 0;  
  opening.inert \= false;  
  opening.style.visibility \= '';  
  videoReveal.style.opacity \= '1';  
  videoReveal.style.background \= fromEntry ? 'url("./assets/loader/opening.webp") var(--opening-position) center / cover' : '\#000';  
  opening.removeAttribute('aria-hidden');  
  nextScene.inert \= true;  
  nextScene.setAttribute('aria-hidden', 'true');  
  if (nextScene.contains(document.activeElement)) document.querySelector('.logo').focus({ preventScroll: true });  
  setPhase('arriving');  
  video.currentTime \= 0;  
  const run \= generation;  
  let revealed \= false;  
  const reveal \= () \=\> {  
    if (run \!== generation \|\| revealed) return;  
    revealed \= true;  
    const fade \= videoReveal.animate(\[{ opacity: 1 }, { opacity: 0 }\], {  
      duration: reducedMotion.matches ? 180 : TIMING.videoFade,  
      easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards',  
    });  
    animations.push(fade);  
    fade.finished.then(() \=\> { if (run \=== generation) videoReveal.style.background \= '\#000'; }).catch(() \=\> {});  
  };  
  if (paused) reveal();  
  else if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(reveal);  
  else if (video.readyState \>= 2\) reveal();  
  else video.addEventListener('loadeddata', reveal, { once: true });  
  // Retain a useful poster if the video stalls, is unsupported, or fails to load.  
  setTimeout(reveal, 3000);  
  if (\!paused && \!document.hidden) video.play().catch(() \=\> {});  
  elapsed \= 0;  
  tickAt \= performance.now();  
  portraitsReady.then(() \=\> {  
    if (run \!== generation \|\| phase \!== 'arriving') return;  
    tickAt \= performance.now();  
    deliveryFrame \= requestAnimationFrame(deliveryTick);  
  });  
}

stack.addEventListener('pointerenter', event \=\> { if (event.pointerType \=== 'mouse') setExpanded(true); });  
stack.addEventListener('pointerleave', () \=\> { if (\!pinnedOpen && document.activeElement \!== stack) setExpanded(false); });  
stack.addEventListener('focus', () \=\> { if (stack.matches(':focus-visible')) setExpanded(true); });  
stack.addEventListener('blur', () \=\> { pinnedOpen \= false; setExpanded(false); });  
let stackTouch \= false;  
stack.addEventListener('pointerdown', event \=\> { stackTouch \= event.pointerType \=== 'touch'; });  
stack.addEventListener('click', event \=\> {  
  if (phase \!== 'ready' \|\| \!event.target.closest('.notification')) return;  
  const touch \= stackTouch \|\| event.pointerType \=== 'touch' \|\| matchMedia('(hover: none), (max-width: 520px)').matches;  
  if (touch && \!pinnedOpen) {  
    pinnedOpen \= true;  
    setExpanded(true);  
    stack.setAttribute('aria-label', 'Messages expanded. Tap a message to continue to the next section.');  
    return;  
  }  
  exitIntro();  
});  
stack.addEventListener('keydown', event \=\> {  
  if (event.key \=== 'Enter' \|\| event.key \=== ' ') { event.preventDefault(); exitIntro(); }  
  if (event.key \=== 'Escape') { pinnedOpen \= false; setExpanded(false); }  
});

// Deliberate scroll, touch swipe, and keyboard navigation share one exit path.  
window.addEventListener('wheel', event \=\> {  
  if (event.ctrlKey \|\| document.querySelector('.video-dialog').open) return;  
  if (phase \=== 'projects' \|\| phase \=== 'case') return;  
  if (phase \=== 'final'){if(event.deltaY \< \-25 && Math.abs(event.deltaY)\>Math.abs(event.deltaX)){event.preventDefault();returnToTestimonials();}return;}  
  if (phase \=== 'story') {  
    const now=performance.now();  
    if(event.deltaY\>0 && Math.abs(event.deltaY)\>Math.abs(event.deltaX)){  
      if(\!story.atEnd()){projectsWheelAt=now;projectsWheelDistance=0;projectsWheelArmed=false;return;}  
      event.preventDefault();  
      if(now-projectsWheelAt\>180){projectsWheelArmed=true;projectsWheelDistance=0;}  
      projectsWheelAt=now;  
      if(projectsWheelArmed)projectsWheelDistance+=event.deltaY\*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);  
      if(projectsWheelDistance\>45)continueFinal();  
      return;  
    }  
    if(storyRoot.scrollTop\>1 \|\| event.deltaY\>=0 \|\| Math.abs(event.deltaX)\>=Math.abs(event.deltaY)){backWheelDistance=0;backWheelAt=now;return;}  
    event.preventDefault();  
    if(now-backWheelAt\>180)backWheelDistance=0;  
    backWheelAt=now;  
    backWheelDistance+=-event.deltaY\*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);  
    if(backWheelDistance\>45)returnToPortfolioFromStory();  
    return;  
  }  
  if (phase \=== 'next' && Math.abs(event.deltaY) \> Math.abs(event.deltaX)) {  
    event.preventDefault();  
    const now=performance.now();  
    if(\!moment.canContinue()){storyWheelAt=now;storyWheelDistance=0;storyWheelArmed=false;return;}  
    if(now-storyWheelAt\>180){storyWheelDistance=0;storyWheelArmed=true;}  
    storyWheelAt=now;storyWheelDistance=Math.max(0,storyWheelDistance+event.deltaY\*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1));  
    if(storyWheelArmed && storyWheelDistance\>45)continuePortfolio();return;  
  }  
  if (Math.abs(event.deltaY) \<= Math.abs(event.deltaX)) return;  
  event.preventDefault();  
  if (phase \!== 'ready') { lastWheelAt \= performance.now(); return; }  
  const now \= performance.now();  
  if (now \- lastWheelAt \> 180\) { wheelDistance \= 0; wheelArmed \= true; }  
  lastWheelAt \= now;  
  if (\!wheelArmed) return;  
  wheelDistance \= Math.max(0, wheelDistance \+ event.deltaY \* (event.deltaMode \=== 1 ? 16 : event.deltaMode \=== 2 ? innerHeight : 1));  
  if (wheelDistance \> 45\) exitIntro();  
}, { passive: false });  
window.addEventListener('touchstart', event \=\> { if(event.target.closest('.testimonials,.team-strip')){touchStartY=null;return;}storyTouchAtEnd=phase==='story' && story.atEnd();touchStartY \= (phase \=== 'ready' \|\| phase \=== 'final' \|\| (phase \=== 'story' && (storyRoot.scrollTop\<=1 \|\| storyTouchAtEnd))) ? event.touches\[0\].clientY : null; }, { passive: true });  
window.addEventListener('touchend', event \=\> {  
  if (touchStartY \!== null) {  
    const dy=touchStartY-event.changedTouches\[0\].clientY;  
    if(phase==='final' && dy \< \-45)returnToTestimonials();  
    else if(phase==='story' && storyTouchAtEnd && dy\>45)continueFinal();  
    else if(phase==='story' && dy \< \-45 && storyRoot.scrollTop\<=1)returnToPortfolioFromStory();  
    else if(phase==='ready' && dy\>45)exitIntro();  
  }  
  touchStartY \= null;  
}, { passive: true });  
window.addEventListener('keydown', event \=\> {  
  if (document.querySelector('.video-dialog').open \|\| phase==='projects' \|\| phase==='case') return;  
  if(phase==='final' && \['ArrowUp','PageUp'\].includes(event.key)){event.preventDefault();returnToTestimonials();return;}  
  if (phase \=== 'story') {  
    if(story.atEnd() && \['ArrowDown','PageDown',' '\].includes(event.key) && \!event.repeat && \!event.target.closest('button,a,input,textarea')){event.preventDefault();continueFinal();return;}  
    if(storyRoot.scrollTop\<=1 && \['ArrowUp','PageUp'\].includes(event.key) && \!event.target.closest('button,a,input,textarea')){event.preventDefault();returnToPortfolioFromStory();}  
    return;  
  }  
  if (phase \=== 'next' && \['PageDown','End',' '\].includes(event.key) && \!event.target.closest('button,a')) { event.preventDefault(); continuePortfolio(); return; }  
  const controlSpace \= event.key \=== ' ' && event.target.closest('button, a, \[role="button"\]');  
  if (\!event.defaultPrevented && \!controlSpace && \['ArrowDown', 'PageDown', 'End', ' '\].includes(event.key)) {  
    event.preventDefault(); exitIntro();  
  }  
  if (\!\['loading', 'entry', 'starting'\].includes(stage.dataset.phase)) unlockAudio();  
});  
window.addEventListener('pointerdown', event \=\> {  
  if (\!\['loading', 'entry', 'starting'\].includes(stage.dataset.phase) && \!event.target.closest('.sound-button, .sound-setting')) unlockAudio();  
});  
function syncMotion() {  
  const motionPaused=paused\|\|menuOpen;  
  stage.dataset.motionPaused=String(motionPaused);  
  stage.dispatchEvent(new Event('motionchange'));  
  motionButton.setAttribute('aria-label', paused ? 'Resume motion' : 'Pause motion');  
  motionButton.title \= paused ? 'Resume motion' : 'Pause motion';  
  motionButton.setAttribute('aria-pressed', String(paused));  
  moment.setPaused(motionPaused);  
  story.setPaused(motionPaused);  
  dome.setPaused(motionPaused);  
  finale.setPaused(motionPaused);  
  casePages.setPaused(motionPaused);  
  if (motionPaused \|\| document.hidden \|\| \['loading', 'entry', 'starting', 'next', 'story', 'story-transition', 'projects', 'projects-transition', 'final', 'final-transition','case','case-transition'\].includes(stage.dataset.phase)) video.pause();  
  else video.play().catch(() \=\> {});  
}  
motionButton.addEventListener('click', () \=\> { paused \= \!paused; syncMotion(); });  
reducedMotion.addEventListener('change', () \=\> { paused \= reducedMotion.matches; syncMotion(); });  
document.addEventListener('visibilitychange', () \=\> { tickAt \= performance.now(); syncMotion(); });  
window.addEventListener('resize', () \=\> { if (phase \!== 'exiting' && phase \!== 'next') layout(); });  
document.querySelectorAll('.logo').forEach(button \=\> button.addEventListener('click', event \=\> { event.preventDefault(); replay(); }));  
syncMotion();  
setupSpotlight(stage);  
const requestedWindow=new URLSearchParams(location.search).get('open');  
const linkedWindow=\['contact','search'\].includes(requestedWindow)?requestedWindow:null;  
const initialRoute=linkedWindow?'studio':readRoute(location.hash,location.pathname);  
if(initialRoute==='loader')prepareEntry({ stage, soundBytes:loadSound(), onEnter: async sound \=\> {  
  soundEnabled \= sound;  
  if (sound) music.play();  
  else music.pause();  
  moment.prepare();  
  if (sound) {  
    await Promise.race(\[unlockAudio(), new Promise(resolve \=\> setTimeout(resolve, 1500))\]);  
  }  
  replay(true);  
} });  
else openSection(initialRoute);  
if(linkedWindow){  
 history.replaceState(null,'',\`/studio/?open=\${linkedWindow}\`);  
 if(linkedWindow==='contact')studioMenu.openContact();else studioMenu.open();  
 const linkedDialog=document.querySelector('dialog\[open\]');  
 linkedDialog?.addEventListener('close',()=\>{  
  const url=new URL(location.href);url.searchParams.delete('open');  
  history.replaceState(null,'',url.pathname+url.search+url.hash);  
 },{once:true});  
}  
window.addEventListener('hashchange',()=\>location.reload());  
window.addEventListener('popstate',()=\>location.reload());

async function continuePortfolio() {  
  if(phase \!== 'next' \|\| \!moment.canContinue())return;  
  const run=generation;setPhase('tornado-exit');  
  nextScene.classList.add('moment-leaving');  
  await moment.leave();  
  if(run\!==generation)return;  
  nextScene.inert=true;nextScene.setAttribute('aria-hidden','true');  
  setPhase('projects');dome.start();  
}  
document.querySelector('.moment-continue').addEventListener('click',continuePortfolio);

function returnToMoment() {  
  if(phase\!=='story' && phase\!=='projects')return;  
  story.reset();dome.stop();  
  moment.resume();  
  nextScene.inert=false;nextScene.setAttribute('aria-hidden','false');  
  setPhase('next');  
  storyWheelAt=performance.now();storyWheelDistance=0;storyWheelArmed=false;  
  backWheelDistance=0;  
  nextScene.focus({preventScroll:true});  
}

async function continueFinal(force=false){  
  if(phase\!=='story' \|\| (\!force && \!story.atEnd()))return;  
  const run=generation;setPhase('projects-transition');  
  await story.leave();  
  if(run\!==generation)return;  
  setPhase('final');finale.start();  
}  
document.querySelector('.projects-back').addEventListener('click',()=\>{if(phase==='projects')returnToMoment();});  
document.querySelector('.projects-next').addEventListener('click',async()=\>{  
 if(phase\!=='projects')return;const run=generation;setPhase('portfolio-exit');await dome.leave();if(run\!==generation)return;setPhase('story');story.start();  
});  
function returnToPortfolioFromStory(){if(phase\!=='story')return;story.reset();setPhase('projects');dome.start();}  
function returnToTestimonials(){if(phase\!=='final')return;finale.reset();setPhase('story');story.resumeTestimonials();projectsWheelAt=performance.now();projectsWheelDistance=0;projectsWheelArmed=false;}  
function openSection(route){  
 soundEnabled=false;document.querySelector('.entry').hidden=true;document.querySelector('.entry').inert=true;document.querySelector('.site-header').inert=false;  
 if(route==='opening'){replay();return;}  
 opening.inert=true;opening.style.visibility='hidden';opening.setAttribute('aria-hidden','true');video.pause();  
 if(route==='moment'){setPhase('next');nextScene.inert=false;nextScene.setAttribute('aria-hidden','false');moment.start();}  
 else if(\['approach','clients','testimonials'\].includes(route)){setPhase('story');story.start({approach:0,clients:2.28,testimonials:3.335}\[route\]);dome.prepare();}  
 else if(route==='projects'){setPhase('projects');dome.start();}  
 else if(route.startsWith('project/')){setPhase('case');updateRoute(route);casePages.start(route.slice(8));}  
 else if(route==='studio'){setPhase('final');finale.start();}  
}

document.querySelector('.opening-continue').addEventListener('click',exitIntro);  
document.querySelector('.story-continue').addEventListener('click',()=\>continueFinal(true));

async function openProject(id,card){  
 if(phase\!=='projects')return;  
 const slug=PROJECT\_SLUGS\[id\];if(\!slug)return;  
 const run=generation;setPhase('case-transition');  
 await dome.openProject(card);if(run\!==generation)return;  
 setPhase('case');updateRoute(\`project/\${slug}\`,true);casePages.start(slug);  
}  
function closeProject(){if(phase\!=='case')return;casePages.reset();setPhase('projects');dome.start();}

function menuNavigate(href){  
 const url=new URL(href,location.origin);const route=readRoute(url.hash,url.pathname);  
 if(url.origin\!==location.origin\|\|route==='loader')return false;  
 generation++;cancelAnimationFrame(deliveryFrame);moment.reset();story.reset();dome.reset();finale.reset();casePages.reset();  
 opening.getAnimations({subtree:true}).forEach(a=\>a.cancel());  
 nextScene.inert=true;nextScene.setAttribute('aria-hidden','true');  
 const previousSound=soundEnabled;openSection(route);soundEnabled=previousSound;return true;  
}  
atmosphere.js  
import {chooseAnalytics} from './measurement.js';  
import {animateEntryBackground} from './entry-background.js';  
// Bounded loading reveal followed by a still-image dither treatment.  
export async function prepareEntry({ stage, soundBytes, onEnter }) {  
  const entry \= document.querySelector('.entry');  
  const image \= document.querySelector('.entry-image');  
  const canvas \= document.querySelector('.entry-dither');  
  const spotlight \= document.querySelector('.entry-spotlight');  
  const context \= canvas.getContext('2d', { willReadFrequently: true });  
  const reduced \= matchMedia('(prefers-reduced-motion: reduce)');  
  const loadImage \= (src, priority \= 'auto') \=\> {  
    const asset \= new Image();  
    asset.fetchPriority \= priority;  
    asset.src \= src;  
    return asset.decode();  
  };  
  const assets \= \[  
    image.decode(),  
    loadImage('./assets/portraits/notification-grid-16.webp', 'high'),  
    loadImage('./assets/logo.svg'),  
    loadImage('./assets/loader/logo.svg'),  
    loadImage('./assets/loader/sound-on.svg'),  
    loadImage('./assets/loader/sound-off.svg'),  
    document.fonts.load('18px "Restart Soft"'),  
    document.fonts.load('500 11px "Restart Soft"'),  
    document.fonts.load('10px "ABC Diatype Mono"'),  
    soundBytes,  
  \];  
  let completed \= 0;  
  let resourcesReady \= false;  
  let lastStep \= \-1;  
  const bayer \= \[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5\];  
  function drawDither(step, target \= canvas) {  
    const isSpotlight \= target \=== spotlight;  
    const ctx \= isSpotlight ? target.getContext('2d', { willReadFrequently: true }) : context;  
    if (\!ctx \|\| \!image.naturalWidth) return;  
    const pixel \= isSpotlight ? 3 : \[4,3,2\]\[step\];  
    const width \= Math.min(stage.clientWidth, 1600);  
    target.width \= Math.max(1, Math.ceil(width / pixel));  
    target.height \= Math.max(1, Math.ceil(width \* stage.clientHeight / stage.clientWidth / pixel));  
    const cover \= Math.max(target.width / image.naturalWidth, target.height / image.naturalHeight);  
    const w \= image.naturalWidth \* cover, h \= image.naturalHeight \* cover;  
    const focalPoint \= parseFloat(getComputedStyle(stage).getPropertyValue('--opening-position')) / 100;  
    ctx.drawImage(image, (target.width-w)\*focalPoint, (target.height-h)/2, w, h);  
    const frame \= ctx.getImageData(0,0,target.width,target.height);  
    const data \= frame.data;  
    for (let y \= 0; y \< target.height; y++) {  
      for (let x \= 0; x \< target.width; x++) {  
        const i \= (y \* target.width \+ x) \* 4;  
        const threshold \= (bayer\[(y%4)\*4+x%4\] \+ .5) / 16 \- .5;  
        const gray \= data\[i\]\*.2126 \+ data\[i+1\]\*.7152 \+ data\[i+2\]\*.0722;  
        const levels \= isSpotlight ? 5 : \[6,12,24\]\[step\];  
        for (let channel \= 0; channel \< 3; channel++) {  
          const value \= isSpotlight ? data\[i+channel\] \* 1.14 : data\[i+channel\];  
          data\[i+channel\] \= Math.max(0, Math.min(255, Math.round(value/255\*levels \+ threshold) / levels \* 255));  
        }  
      }  
    }  
    ctx.putImageData(frame,0,0);  
  }  
  // A slow or failed asset never traps the visitor behind the loader.  
  let timeout;  
  Promise.race(\[  
    Promise.allSettled(assets.map(promise \=\> promise.finally(() \=\> { completed++; }))),  
    new Promise(resolve \=\> { timeout \= setTimeout(resolve, 4500); }),  
  \]).then(() \=\> { clearTimeout(timeout); resourcesReady \= true; });  
  const start \= performance.now();  
  await new Promise(resolve \=\> {  
    function frame(now) {  
      const elapsed \= now-start;  
      const visual \= Math.min(1, elapsed / (reduced.matches ? 100 : 1600));  
      const progress \= Math.min(visual, resourcesReady ? 1 : completed/assets.length\*.95);  
      entry.style.setProperty('--load-progress', \`\${progress\*100}%\`);  
      const step \= Math.min(2, Math.floor(progress\*3));  
      if (\!reduced.matches && image.complete && image.naturalWidth && step \!== lastStep) {  
        drawDither(step);  
        lastStep \= step;  
        canvas.style.opacity \= '1';  
      }  
      if (resourcesReady && visual \=== 1\) { resolve(); return; }  
      requestAnimationFrame(frame);  
    }  
    requestAnimationFrame(frame);  
  });  
  image.style.opacity \= '1';  
  const {animateEntryLogo}=await import('./logo-animation.js');  
  const disposeLogo=await animateEntryLogo(document.querySelector('.entry-logo'),reduced.matches).catch(()=\>{document.querySelector('.entry-logo').innerHTML='\<img src="./assets/loader/logo.svg" alt="garcy.studio" style="opacity:1"\>';});  
  entry.classList.add('entry-ready');  
  canvas.style.opacity \= '0';  
  // Bake the image once; pointer movement only changes the soft CSS mask.  
  const renderSpotlight \= () \=\> {  
    if (\!entry.inert && \!reduced.matches && matchMedia('(hover:hover) and (pointer:fine)').matches) drawDither(2, spotlight);  
  };  
  const observer \= new ResizeObserver(renderSpotlight);  
  observer.observe(stage);  
  image.addEventListener('load', renderSpotlight);  
  renderSpotlight();  
  stage.dataset.phase \= 'entry';  
  document.querySelector('.entry-status').hidden \= true;  
  document.querySelector('.entry-actions').hidden \= false;  
  let entered=false;  
  const stopBackground=animateEntryBackground(image,canvas,stage,reduced);  
  const enter \= async sound \=\> {  
    if (entered) return;  
    entered \= true;stopBackground();  
    observer.disconnect();  
    image.removeEventListener('load', renderSpotlight);  
    stage.dataset.phase \= 'starting';  
    // onEnter resumes AudioContext directly inside this trusted click callback.  
    await onEnter(sound);  
    entry.classList.add('leaving');  
    entry.inert \= true;  
    document.querySelector('.site-header').inert \= false;  
    document.querySelector('.opening').focus({ preventScroll: true });  
    setTimeout(() \=\> { entry.hidden \= true;disposeLogo?.(); canvas.width \= canvas.height \= spotlight.width \= spotlight.height \= 1; }, 750);  
  };  
  const confirmEntry \= consent \=\> {  
    chooseAnalytics(consent?'yes':'no');  
    document.querySelector('\[data-analytics-preference\]')?.remove();  
    enter(true);  
  };  
  document.querySelector('.enter-sound').addEventListener('click', () \=\> confirmEntry(true));  
  document.querySelector('.enter-silent').addEventListener('click', () \=\> confirmEntry(false));  
}

export function setupSpotlight(stage) {  
  const fine \= matchMedia('(hover:hover) and (pointer:fine)');  
  const reduced \= matchMedia('(prefers-reduced-motion: reduce)');  
  const lights=\[...stage.querySelectorAll('.spotlight,.entry-spotlight')\];  
  let left=stage.offsetLeft,top=stage.offsetTop;  
  window.addEventListener('resize',()=\>{left=stage.offsetLeft;top=stage.offsetTop;});  
  let scheduled \= false;  
  let x \= 0, y \= 0;  
  stage.addEventListener('pointermove', event \=\> {  
    if (\!fine.matches \|\| reduced.matches \|\| event.pointerType \!== 'mouse') return;  
    x \= event.clientX-left;  
    y \= event.clientY-top;  
    if (scheduled) return;  
    scheduled \= true;  
    requestAnimationFrame(() \=\> {  
      lights.forEach(light=\>{light.style.setProperty('--light-x', \`\${x}px\`);light.style.setProperty('--light-y', \`\${y}px\`);});  
      if(stage.dataset.light\!=='true')stage.dataset.light \= 'true';  
      scheduled \= false;  
    });  
  }, { passive: true });  
  stage.addEventListener('pointerleave', () \=\> { stage.dataset.light \= 'false'; });  
}  
button-effects.js  
// Shared white-to-yellow pixel pulse, using each control's own laid-out label and icon.  
export function setupButtonPixels(reduced) {  
    document.querySelectorAll('button:not(.video-play):not(.notifications):not(.studio-disk):not(.menu-close):not(.floppy-grip):not(.budget-selection):not(.menu-result),a.case-back,a.case-return').forEach(button \=\> {  
        if (button.dataset.pixelHoverReady)  
            return;  
        button.dataset.pixelHoverReady \= 'true';  
        if (getComputedStyle(button).position \=== 'static')  
            button.style.position \= 'relative';  
        const canvas \= document.createElement('canvas')  
          , source \= document.createElement('canvas')  
          , small \= document.createElement('canvas');  
        canvas.className \= 'button-pixels';  
        canvas.setAttribute('aria-hidden', 'true');  
        button.append(canvas);  
        const ctx \= canvas.getContext('2d')  
          , paint \= source.getContext('2d')  
          , sample \= small.getContext('2d');  
        let frame, hover \= false, focus \= false;  
        async function update() {  
            cancelAnimationFrame(frame);  
            const active \= hover \|\| focus;  
            if (button.disabled)  
                return;  
            if (\!active) {  
                button.classList.remove('button-yellow', 'button-pixelating');  
                return;  
            }  
            const r \= button.getBoundingClientRect();  
            if (\!r.width)  
                return;  
            source.width \= canvas.width \= Math.ceil(r.width \* 2);  
            source.height \= canvas.height \= Math.ceil(r.height \* 2);  
            const profile \= button.classList.contains('profile-button')  
              , contact \= button.classList.contains('contact');  
            paint.fillStyle \= profile ? '\#fff' : '\#ffff40';  
            paint.fillRect(0, 0, source.width, source.height);  
            const walker \= document.createTreeWalker(button, NodeFilter.SHOW\_TEXT)  
              , nodes \= \[\];  
            while (walker.nextNode())  
                if (walker.currentNode.textContent.trim())  
                    nodes.push(walker.currentNode);  
            for (const n of nodes) {  
                const s \= getComputedStyle(n.parentElement)  
                  , range \= document.createRange();  
                range.selectNodeContents(n);  
                const box \= range.getBoundingClientRect();  
                // A zero-height inline marker measures the browser's actual alphabetic baseline.  
                // Wrap direct flex text so the marker cannot become a separate flex item.  
                const wrap \= document.createElement('span')  
                  , marker \= document.createElement('span');  
                wrap.style.cssText \= 'padding:0;margin:0;border:0';  
                marker.style.cssText \= 'display:inline-block;width:0;height:0;padding:0;margin:0;border:0;vertical-align:baseline';  
                n.before(wrap);  
                wrap.append(n, marker);  
                const baseline \= marker.getBoundingClientRect().top;  
                wrap.replaceWith(n);  
                paint.font \= \`\${s.fontStyle} \${s.fontWeight} \${parseFloat(s.fontSize) \* 2}px $s.fontFamily`;paint.letterSpacing=s.letterSpacing==='normal'?'0px':`${parseFloat(s.letterSpacing) \* 2}px\`;  
                paint.fillStyle \= '\#111';  
                paint.textBaseline \= 'alphabetic';  
                const text \= s.textTransform \=== 'uppercase' ? n.textContent.trim().toUpperCase() : s.textTransform \=== 'lowercase' ? n.textContent.trim().toLowerCase() : n.textContent.trim();  
                paint.fillText(text, (box.left \- r.left) \* 2, (baseline \- r.top) \* 2);  
            }  
            for (const img of button.querySelectorAll('img')) {  
                try {  
                    await img.decode();  
                    const box \= img.getBoundingClientRect();  
                    paint.save();  
                    paint.filter \= button.classList.contains('profile-button') \|\| button.classList.contains('menu-close') \|\| contact ? 'none' : 'brightness(0)';  
                    paint.drawImage(img, (box.left \- r.left) \* 2, (box.top \- r.top) \* 2, box.width \* 2, box.height \* 2);  
                    paint.restore();  
                } catch {}  
            }  
            if (contact) {  
                const pixels \= paint.getImageData(0, 0, source.width, source.height);  
                for (let i \= 0; i \< pixels.data.length; i \+= 4\) {  
                    const light \= (pixels.data\[i\] \+ pixels.data\[i \+ 1\] \+ pixels.data\[i \+ 2\]) / 765;  
                    pixels.data\[i\] \= pixels.data\[i \+ 1\] \= Math.round(255 \* (1 \- light));  
                    pixels.data\[i \+ 2\] \= Math.round(64 \* (1 \- light));  
                }  
                paint.putImageData(pixels, 0, 0);  
            }  
            if (profile) {  
                const pixels \= paint.getImageData(0, 0, source.width, source.height);  
                for (let i \= 0; i \< pixels.data.length; i \+= 4\) {  
                    if (pixels.data\[i\] \> 140 && pixels.data\[i \+ 1\] \> 140 && pixels.data\[i \+ 2\] \< 150\) {  
                        pixels.data\[i\] \= pixels.data\[i \+ 1\] \= pixels.data\[i \+ 2\] \= 255;  
                    }  
                }  
                paint.putImageData(pixels, 0, 0);  
            }  
            if (\!hover && \!focus)  
                return;  
            button.classList.add('button-pixelating');  
            const start \= performance.now();  
            function tick(now) {  
                const p \= reduced.matches ? 1 : Math.min(1, (now \- start) / 650\)  
                  , block \= Math.max(1, Math.round(Math.sin(p \* Math.PI) \* 12));  
                small.width \= Math.ceil(source.width / block);  
                small.height \= Math.ceil(source.height / block);  
                sample.drawImage(source, 0, 0, small.width, small.height);  
                ctx.imageSmoothingEnabled \= false;  
                ctx.globalAlpha \= 1;  
                ctx.clearRect(0, 0, canvas.width, canvas.height);  
                ctx.globalAlpha \= Math.min(1, p \* 4);  
                ctx.drawImage(small, 0, 0, canvas.width, canvas.height);  
                if (p \< 1\)  
                    frame \= requestAnimationFrame(tick);  
                else {  
                    button.classList.add('button-yellow');  
                    button.classList.remove('button-pixelating');  
                }  
            }  
            frame \= requestAnimationFrame(tick);  
        }  
        button.addEventListener('pointerenter', () \=\> {  
            hover \= true;  
            update();  
        }  
        );  
        button.addEventListener('pointerleave', () \=\> {  
            hover \= false;  
            update();  
        }  
        );  
        button.addEventListener('focus', () \=\> {  
            focus \= button.matches(':focus-visible');  
            update();  
        }  
        );  
        button.addEventListener('blur', () \=\> {  
            focus \= false;  
            update();  
        }  
        );  
    }  
    );  
}

// Rasterize the arrow through coarse-to-fine cells when continuation unlocks.  
export function setupArrowReveals(reduced) {  
    document.querySelectorAll('.section-continue,.moment-continue').forEach(button \=\> {  
        const canvas \= document.createElement('canvas');  
        canvas.className \= 'arrow-materialize';  
        canvas.width \= canvas.height \= 72;  
        canvas.setAttribute('aria-hidden', 'true');  
        button.append(canvas);  
        const source \= document.createElement('canvas');  
        source.width \= source.height \= 72;  
        const ink \= source.getContext('2d');  
        ink.strokeStyle \= '\#ddd';  
        ink.lineWidth \= 3;  
        ink.lineCap \= 'round';  
        ink.beginPath();  
        ink.moveTo(36, 21);  
        ink.lineTo(36, 50);  
        ink.moveTo(24, 39);  
        ink.lineTo(36, 51);  
        ink.lineTo(48, 39);  
        ink.stroke();  
        const small \= document.createElement('canvas')  
          , ctx \= canvas.getContext('2d');  
        let ready \= false, frame;  
        function sync() {  
            const next \= \!button.disabled && (\!button.classList.contains('story-continue') \|\| button.classList.contains('available'));  
            if (next \=== ready)  
                return;  
            ready \= next;  
            cancelAnimationFrame(frame);  
            ctx.clearRect(0, 0, 72, 72);  
            button.classList.remove('arrow-materializing');  
            if (\!ready \|\| reduced.matches)  
                return;  
            button.classList.add('arrow-materializing');  
            const start \= performance.now();  
            function tick(now) {  
                const p \= Math.min(1, (now \- start) / 850\)  
                  , cells \= Math.round(5 \+ 31 \* p \* p);  
                small.width \= small.height \= cells;  
                small.getContext('2d').drawImage(source, 0, 0, cells, cells);  
                ctx.clearRect(0, 0, 72, 72);  
                ctx.imageSmoothingEnabled \= false;  
                ctx.drawImage(small, 0, 0, 72, 72);  
                if (p \< 1\)  
                    frame \= requestAnimationFrame(tick);  
                else {  
                    ctx.clearRect(0, 0, 72, 72);  
                    button.classList.remove('arrow-materializing');  
                }  
            }  
            frame \= requestAnimationFrame(tick);  
        }  
        new MutationObserver(sync).observe(button, {  
            attributes: true,  
            attributeFilter: \['disabled', 'class'\]  
        });  
        sync();  
    }  
    );  
}

canvas-images.js  
export const CANVAS\_IMAGES \= {  
    "assets/projects/society-for-all.webp": \[\["assets/canvas/society-for-all-480.webp", 480\], \["assets/canvas/society-for-all-800.webp", 800\], \["assets/canvas/society-for-all-821.webp", 821\]\],  
    "assets/projects/koscom-30.webp": \[\["assets/canvas/koscom-30-480.webp", 480\], \["assets/canvas/koscom-30-800.webp", 800\], \["assets/canvas/koscom-30-1100.webp", 1100\]\],  
    "assets/projects/unit-architects.webp": \[\["assets/canvas/unit-architects-480.webp", 480\], \["assets/canvas/unit-architects-800.webp", 800\], \["assets/canvas/unit-architects-821.webp", 821\]\],  
    "assets/project-content/otk-cover-1.webp": \[\["assets/canvas/otk-480.webp", 480\], \["assets/canvas/otk-717.webp", 717\], \["assets/canvas/otk-717.webp", 717\]\],  
    "assets/goodveri/thumb.webp": \[\["assets/canvas/goodveri-480.webp", 480\], \["assets/canvas/goodveri-800.webp", 800\], \["assets/canvas/goodveri-1200.webp", 1200\]\],  
    "assets/projects/magu.webp": \[\["assets/canvas/magu-480.webp", 480\], \["assets/canvas/magu-800.webp", 800\], \["assets/canvas/magu-821.webp", 821\]\],  
    "assets/projects/aomu.webp": \[\["assets/canvas/aomu-480.webp", 480\], \["assets/canvas/aomu-800.webp", 800\], \["assets/canvas/aomu-821.webp", 821\]\],  
    "assets/projects/oslo-02.webp": \[\["assets/canvas/arkady-480.webp", 480\], \["assets/canvas/arkady-800.webp", 800\], \["assets/canvas/arkady-821.webp", 821\]\],  
    "assets/projects/luxury-travel-digest.webp": \[\["assets/canvas/luxury-travel-digest-480.webp", 480\], \["assets/canvas/luxury-travel-digest-747.webp", 747\], \["assets/canvas/luxury-travel-digest-747.webp", 747\]\],  
    "assets/projects/sunnysoft-cover.webp": \[\["assets/canvas/sunnysoft-480.webp", 480\], \["assets/canvas/sunnysoft-800.webp", 800\], \["assets/canvas/sunnysoft-896.webp", 896\]\],  
    "assets/project-content/libinst2.webp": \[\["assets/canvas/liberalni-institut-480.webp", 480\], \["assets/canvas/liberalni-institut-800.webp", 800\], \["assets/canvas/liberalni-institut-1200.webp", 1200\]\],  
    "assets/project-content/nachonacho1.webp": \[\["assets/canvas/nachonacho-480.webp", 480\], \["assets/canvas/nachonacho-800.webp", 800\], \["assets/canvas/nachonacho-1200.webp", 1200\]\],  
    "assets/case-studies/walletii/cover.webp": \[\["assets/canvas/walletii-480.webp", 480\], \["assets/canvas/walletii-776.webp", 776\], \["assets/canvas/walletii-776.webp", 776\]\]  
};

card-effects.js  
// Cached card artwork; scrolling only redraws a small mosaic, never reads video frames.  
export function pixelCard(element) {  
    const canvas \= document.createElement('canvas')  
      , source \= document.createElement('canvas')  
      , small \= document.createElement('canvas');  
    canvas.className \= 'card-pixels';  
    canvas.setAttribute('aria-hidden', 'true');  
    element.append(canvas);  
    const ctx \= canvas.getContext('2d')  
      , paint \= source.getContext('2d')  
      , sample \= small.getContext('2d');  
    let last \= \-1  
      , ready \= false;  
    async function prepare() {  
        if (element.textContent.trim())  
            await document.fonts.ready;  
        const media \= \[...element.querySelectorAll('img,video')\].map(async el \=\> {  
            try {  
                // Decode the actual responsive image before taking its snapshot or revealing it.  
                // Decoding a separate Image alone does not prepare the live \<picture\> for paint.  
                if (el.tagName \=== 'IMG') {  
                    await el.decode();  
                    return {  
                        el,  
                        image: el  
                    };  
                }  
                const image \= new Image();  
                image.src \= el.tagName \=== 'VIDEO' ? el.poster : (el.currentSrc \|\| el.src);  
                await image.decode();  
                return {  
                    el,  
                    image  
                };  
            } catch {  
                return null;  
            }  
        }  
        );  
        const loaded \= await Promise.all(media)  
          , w \= element.offsetWidth  
          , h \= element.offsetHeight;  
        if (\!w \|\| \!h)  
            return;  
        source.width \= canvas.width \= w;  
        source.height \= canvas.height \= h;  
        paint.fillStyle \= getComputedStyle(element).backgroundColor;  
        paint.fillRect(0, 0, w, h);  
        const rect \= element.getBoundingClientRect()  
          , sx \= w / rect.width  
          , sy \= h / rect.height;  
        loaded.filter(Boolean).forEach( ({el, image}) \=\> {  
            const r \= el.getBoundingClientRect()  
              , x \= (r.left \- rect.left) \* sx  
              , y \= (r.top \- rect.top) \* sy  
              , rw \= r.width \* sx  
              , rh \= r.height \* sy;  
            // Live IMG.width/height describe its CSS box, not the source pixels.  
            // Use natural dimensions and the same fit/position as the live media.  
            const iw \= image.naturalWidth  
              , ih \= image.naturalHeight;  
            if (\!iw \|\| \!ih)  
                return;  
            const style \= getComputedStyle(el)  
              , contain \= style.objectFit \=== 'contain';  
            const k \= contain ? Math.min(rw / iw, rh / ih) : Math.max(rw / iw, rh / ih);  
            const \[px='50%',py='50%'\] \= style.objectPosition.split(' ');  
            const offset \= (value, space) \=\> value.endsWith('%') ? space \* parseFloat(value) / 100 : parseFloat(value) \|\| 0;  
            paint.save();  
            paint.beginPath();  
            paint.rect(x, y, rw, rh);  
            paint.clip();  
            paint.drawImage(image, x \+ offset(px, rw \- iw \* k), y \+ offset(py, rh \- ih \* k), iw \* k, ih \* k);  
            paint.restore();  
        }  
        );  
        const walker \= document.createTreeWalker(element, NodeFilter.SHOW\_TEXT)  
          , nodes \= \[\];  
        while (walker.nextNode())  
            nodes.push(walker.currentNode);  
        for (const node of nodes) {  
            const style \= getComputedStyle(node.parentElement);  
            if (\!node.textContent.trim())  
                continue;  
            paint.font \= \`\${style.fontStyle} \${style.fontWeight} \${style.fontSize} \${style.fontFamily}\`;  
            paint.letterSpacing \= style.letterSpacing \=== 'normal' ? '0px' : style.letterSpacing;  
            paint.fillStyle \= style.color;  
            paint.textBaseline \= 'alphabetic';  
            // Measure the actual inline baseline, as the headline reveal does. Range.top  
            // is the font box, not the baseline, and canvas "top" uses different metrics.  
            for (const match of \[...node.textContent.matchAll(/\\S+/g)\].reverse()) {  
                const range \= document.createRange();  
                range.setStart(node, match.index);  
                range.setEnd(node, match.index \+ match\[0\].length);  
                const r \= range.getBoundingClientRect();  
                const marker \= document.createElement('span');  
                marker.style.cssText \= 'display:inline-block;width:0;height:0;padding:0;margin:0;vertical-align:baseline';  
                range.collapse(false);  
                range.insertNode(marker);  
                const baseline \= marker.getBoundingClientRect().top;  
                const tail \= marker.nextSibling;  
                marker.remove();  
                // Restore the original text node without replacing application-owned nodes.  
                if (tail?.nodeType \=== Node.TEXT\_NODE) {  
                    node.appendData(tail.data);  
                    tail.remove();  
                }  
                const text \= style.textTransform \=== 'uppercase' ? match\[0\].toUpperCase() : style.textTransform \=== 'lowercase' ? match\[0\].toLowerCase() : match\[0\];  
                paint.fillText(text, (r.left \- rect.left) \* sx, (baseline \- rect.top) \* sy);  
            }  
        }  
        ready \= true;  
        last \= \-1;  
    }  
    function set(progress) {  
        if (ready && (element.offsetWidth \!== source.width \|\| element.offsetHeight \!== source.height)) {  
            canvas.style.opacity \= '0';  
            element.classList.toggle('card-resolving', false);  
            return;  
        }  
        const p \= progress \>= .995 ? 1 : Math.max(0, progress);  
        canvas.style.opacity \= String(Math.min(1, (1 \- p) / .12));  
        element.classList.toggle('card-resolving', p \< .88);  
        if (p \=== 1 \|\| \!ready)  
            return;  
        const block \= Math.max(1, Math.round(28 \* (1 \- p) \*\* 2));  
        if (block \=== last)  
            return;  
        last \= block;  
        small.width \= Math.max(1, Math.ceil(source.width / block));  
        small.height \= Math.max(1, Math.ceil(source.height / block));  
        sample.drawImage(source, 0, 0, small.width, small.height);  
        ctx.imageSmoothingEnabled \= false;  
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
        ctx.drawImage(small, 0, 0, canvas.width, canvas.height);  
    }  
    return {  
        prepare,  
        set  
    };  
}  
export function draggableStrip(strip) {  
    let pointer \= null  
      , start \= 0  
      , left \= 0  
      , moved \= 0;  
    strip.addEventListener('pointerdown', e \=\> {  
        if (e.pointerType \=== 'touch') {  
            moved \= 0;  
            return;  
        }  
        if (e.button \!== 0\)  
            return;  
        pointer \= e.pointerId;  
        start \= e.clientX;  
        left \= strip.scrollLeft;  
        moved \= 0;  
    }  
    );  
    strip.addEventListener('pointermove', e \=\> {  
        if (e.pointerId \!== pointer)  
            return;  
        moved \= Math.abs(e.clientX \- start);  
        if (moved \> 6\) {  
            strip.setPointerCapture(pointer);  
            strip.scrollLeft \= left \+ start \- e.clientX;  
        }  
    }  
    );  
    const release \= () \=\> {  
        pointer \= null;  
    }  
    ;  
    strip.addEventListener('pointerup', release);  
    strip.addEventListener('pointercancel', release);  
    strip.addEventListener('lostpointercapture', release);  
    strip.addEventListener('click', e \=\> {  
        if (moved \> 6\) {  
            e.preventDefault();  
            e.stopPropagation();  
        }  
    }  
    , {  
        capture: true  
    });  
    strip.addEventListener('keydown', e \=\> {  
        if (\!\['ArrowLeft', 'ArrowRight'\].includes(e.key))  
            return;  
        e.preventDefault();  
        strip.scrollBy({  
            left: e.key \=== 'ArrowLeft' ? \-290 : 290,  
            behavior: 'smooth'  
        });  
    }  
    );  
}

contact.js  
import {track} from './measurement.js';  
import {setupButtonPixels} from './button-effects.js';  
import {SERVICES} from './content/services.js';  
import {menuDisruption} from './menu-effects.js';  
export function setupContact({onToggle= () \=\> {}  
}={}) {  
    const dialog \= document.createElement('dialog');  
    dialog.className \= 'contact-modal studio-menu';  
    dialog.setAttribute('aria-label', 'Start a project');  
    dialog.innerHTML \= '\<div class="menu-tv" aria-hidden="true"\>\</div\>\<button class="menu-close" aria-label="Close contact form"\>\<span class="esc-key"\>esc\</span\>\</button\>\<form class="contact-window menu-window" novalidate\>\</form\>';  
    document.body.append(dialog);  
    const sheet \= dialog.querySelector('form')  
      , reduced \= matchMedia('(prefers-reduced-motion: reduce)');  
    const disruption \= menuDisruption(document.querySelector('.stage'), dialog, reduced);  
    let openingTimer, transitioning \= false;  
    let step \= 1, serviceIndex \= 0, budget \= 1, busy \= false, previous, values \= {  
        name: '',  
        email: '',  
        note: ''  
    }, submissionId, animation \= 0;  
    const budgets \= \['$9k–$14k', '$14k–$22k', '$22k–$50k'\];  
    const escape \= s \=\> s.replace(/\[&\<\>"'\]/g, c \=\> ({  
        '&': '\&amp;',  
        '\<': '\&lt;',  
        '\>': '\&gt;',  
        '"': '\&quot;',  
        "'": '&\#39;'  
    }\[c\]));  
    const intro \= '\<p class="contact-intro"\>You’ve got something that matters. We’re here to take it further — with care, clarity, and the kind of outcome that makes you smile in disbelief. Tell us what’s on your mind, and we’ll get back within 24 hours.\<br\>\<br\>\<strong\>Let’s make it happen.\</strong\>\</p\>';  
    const action \= label \=\> \`\<button class="contact-next" type="submit"\>\${label}\<img src="/assets/contact/arrow.svg" alt=""\>\<span class="contact-enter"\>Enter\</span\>\</button\>\`;  
    async function render() {  
        if (transitioning)  
            return;  
        const morph \= sheet.childElementCount \> 0 && dialog.open && \!reduced.matches;  
        const oldHeight \= sheet.getBoundingClientRect().height;  
        if (morph) {  
            transitioning \= true;  
            sheet.inert \= true;  
            await sheet.animate(\[{  
                opacity: 1  
            }, {  
                opacity: 0,  
                translate: '0 \-8px'  
            }\], {  
                duration: 140,  
                easing: 'ease-in',  
                fill: 'forwards'  
            }).finished;  
        }  
        sheet.getAnimations().forEach(a \=\> a.cancel());  
        cancelAnimationFrame(animation);  
        sheet.querySelector('.card-pixels')?.remove();  
        sheet.classList.remove('card-resolving');  
        sheet.innerHTML \= (step \> 1 && step \< 5 ? '\<button class="contact-back" type="button"\>\<img src="/assets/contact/back.svg" alt=""\>Back\</button\>' : '') \+ (step \=== 1 ? \`\${intro}\<div class="contact-label"\>Start with your details \<span\>\* Mandatory, thanks\</span\>\</div\>\<div class="contact-fields"\>\<label class="contact-field"\>\<img src="/assets/contact/person.svg" alt=""\>\<input placeholder="Your name\*" name="name" aria-label="Name" autocomplete="given-name" required maxlength="100" value="$escape(values.name)"></label><labelclass="contact-field"><imgsrc="/assets/contact/email.svg"alt=""><inputplaceholder="Youremail*"name="email"aria-label="Email"type="email"autocomplete="email"requiredmaxlength="254"value="${escape(values.email)}"\>\</label\>\</div\>\<div class="contact-actions"\>\<a href="https\://garcy.studio/calendar" target="\_blank" rel="noopener"\>Book a call\<img src="/assets/contact/calendar.svg" alt=""\>\</a\>$action('Continue')</div>`:step===2?`<h2>${escape(values.name)}, what are you interested in?\</h2\>\<div class="contact-services" role="group" aria-label="Select a service"\>\<div class="menu-selection" aria-hidden="true"\>\</div\>\${SERVICES.map( (s, i) \=\> \`\<button type="button" class="menu-result" data-service="\${i}" aria-pressed="$i===serviceIndex"aria-selected="${i \=== serviceIndex}"\>\<span class="menu-result-title"\>\${escape(s.title)}\<img src="/assets/contact/arrow.svg" alt=""\>\</span\>\<span class="menu-result-type"\>Service\<span class="menu-enter"\>Enter\</span\>\</span\>\</button\>\`).join('')}\</div\>\` : step \=== 3 ? \`\<h2\>\${escape(values.name)}, what’s your budget for $escape(SERVICES[serviceIndex].title)?</h2><divclass="budget-control"style="--budget:${budget}"\>\<button class="budget-selection" type="submit" aria-label="Continue with $budgets[budget]"><spanclass="budget-price">${budgets\[budget\]}\</span\>\<span class="contact-enter"\>Enter\</span\>\</button\>\<input name="budget" aria-label="Project budget" type="range" min="0" max="2" step="1" value="$budget"aria-valuetext="${budgets\[budget\]}"\>\</div\>\<div class="budget-labels" aria-hidden="true"\>\<span\>$9,000</span><span>$14,000\</span\>\<span\>$22,000</span><span>$50,000\</span\>\</div\>\` : step \=== 4 ? \`$intro<labelclass="contact-label"for="project-note">Describeyourproject<span>Optional</span></label><textareaid="project-note"name="note"aria-label="Describeyourproject"maxlength="10000"placeholder="Whatdoyouhaveinmind?">${escape(values.note)}\</textarea\>\<input class="contact-trap" name="contact\_website\_check" tabindex="-1" autocomplete="off" data-1p-ignore data-lpignore="true" aria-hidden="true"\>\<p class="contact-error" role="alert"\>\</p\>\<div class="contact-actions"\>\<span\>\</span\>$action('SendandSmile')</div>`:`<divclass="contact-success"role="status"><spanclass="success-mark"aria-hidden="true"><svgviewBox="006464"fill="none"><pathd="M133326455118"stroke="#dadada"stroke-width="3"stroke-linecap="round"stroke-linejoin="round"/></svg><canvaswidth="64"height="64"></canvas></span><p>Thankyou!Yourjourneystartsnow.<br>Checkyourinboxinthenext24hours.We’reexcitedtohelpbringyourvisiontolife!</p><pclass="success-closing">Let’smakeithappen.</p></div>`);sheet.dataset.step=step;sheet.querySelector('.contact-back')?.addEventListener('click',()=>save();step--;render(););sheet.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>serviceIndex=Number(b.dataset.service);step=3;render(););b.addEventListener('pointerenter',()=>selectService(Number(b.dataset.service)));b.addEventListener('focus',()=>selectService(Number(b.dataset.service))););if(step===2)selectService(serviceIndex);sheet.querySelector('[name=budget]')?.addEventListener('input',e=>budget=Number(e.target.value);sheet.querySelector('.budget-control').style.setProperty('--budget',budget);sheet.querySelector('.budget-price').textContent=budgets[budget];sheet.querySelector('.budget-selection').setAttribute('aria-label','Continuewith'+budgets[budget]);e.target.setAttribute('aria-valuetext',budgets[budget]););constpill=sheet.querySelector('.budget-selection'),range=sheet.querySelector('[name=budget]');if(pill)letstartX=0,dragged=false,down=false;pill.addEventListener('pointerdown',e=>startX=e.clientX;dragged=false;down=true;pill.setPointerCapture(e.pointerId););pill.addEventListener('pointermove',e=>if(!down)return;if(Math.abs(e.clientX-startX)>6)dragged=true;if(!dragged)return;constbox=pill.parentElement.getBoundingClientRect(),width=pill.offsetWidth;range.value=Math.max(0,Math.min(2,Math.round((e.clientX-box.left-width/2)/(box.width-width)*2)));range.dispatchEvent(newEvent('input',bubbles:true)););pill.addEventListener('pointerup',()=>down=false;);pill.addEventListener('pointercancel',()=>down=false;dragged=true;);pill.addEventListener('click',e=>if(dragged)e.preventDefault();dragged=false;);sheet.querySelectorAll('input').forEach(i=>i.addEventListener('input',validate));validate();setupButtonPixels(reduced);consttarget=sheet.querySelector(step===2?`[data-service="${serviceIndex}"\]\` : 'input:not(.contact-trap),textarea');  
        target?.focus({  
            preventScroll: true  
        });  
        if (morph) {  
            const newHeight \= sheet.getBoundingClientRect().height;  
            await sheet.animate(\[{  
                height: oldHeight \+ 'px',  
                opacity: 0,  
                translate: '0 8px'  
            }, {  
                height: newHeight \+ 'px',  
                opacity: 1,  
                translate: '0 0'  
            }\], {  
                duration: 360,  
                easing: 'cubic-bezier(.22,1,.36,1)'  
            }).finished;  
        }  
        sheet.inert \= false;  
        transitioning \= false;  
        target?.focus({  
            preventScroll: true  
        });  
        if (step \=== 5\)  
            animateCheck();  
    }  
    function selectService(index) {  
        serviceIndex \= index;  
        const rows \= \[...sheet.querySelectorAll('\[data-service\]')\]  
          , selection \= sheet.querySelector('.contact-services .menu-selection');  
        rows.forEach( (row, i) \=\> {  
            row.setAttribute('aria-selected', String(i \=== index));  
            row.setAttribute('aria-pressed', String(i \=== index));  
        }  
        );  
        const row \= rows\[index\];  
        if (row && selection) {  
            selection.style.transform \= \`translateY(\${row.offsetTop}px)\`;  
            selection.style.height \= row.offsetHeight \+ 'px';  
        }  
    }  
    function animateCheck() {  
        const mark \= sheet.querySelector('.success-mark')  
          , canvas \= mark.querySelector('canvas')  
          , source \= document.createElement('canvas')  
          , small \= document.createElement('canvas');  
        source.width \= source.height \= 64;  
        const ink \= source.getContext('2d')  
          , paint \= canvas.getContext('2d');  
        ink.strokeStyle \= '\#dadada';  
        ink.lineWidth \= 3;  
        ink.lineCap \= 'round';  
        ink.lineJoin \= 'round';  
        ink.beginPath();  
        ink.moveTo(13, 33);  
        ink.lineTo(26, 45);  
        ink.lineTo(51, 18);  
        ink.stroke();  
        const start \= performance.now();  
        function tick(now) {  
            const p \= reduced.matches ? 1 : Math.min(1, (now \- start) / 850\)  
              , cells \= Math.round(5 \+ 59 \* p \* p);  
            small.width \= small.height \= cells;  
            small.getContext('2d').drawImage(source, 0, 0, cells, cells);  
            paint.clearRect(0, 0, 64, 64);  
            paint.imageSmoothingEnabled \= false;  
            paint.globalAlpha \= Math.min(1, p \* 4);  
            paint.drawImage(small, 0, 0, 64, 64);  
            if (p \< 1\)  
                animation \= requestAnimationFrame(tick);  
            else  
                mark.classList.add('is-resolved');  
        }  
        animation \= requestAnimationFrame(tick);  
    }  
    function save() {  
        for (const key of \['name', 'email', 'note'\]) {  
            const el \= sheet.elements.namedItem(key);  
            if (el)  
                values\[key\] \= el.value.trim();  
        }  
    }  
    function validate() {  
        if (step \=== 1\) {  
            const email \= sheet.elements.email;  
            email.setCustomValidity(\!email.value \|\| /^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]+\$/.test(email.value.trim()) ? '' : 'Enter a complete email address, such as name@company.com.');  
            sheet.querySelector('\[type=submit\]').disabled \= \!sheet.elements.name.value.trim() \|\| \!sheet.elements.email.validity.valid \|\| \!sheet.elements.email.value;  
        }  
    }  
    async function advance() {  
        if (busy \|\| transitioning)  
            return;  
        save();  
        if (step \=== 1\) {  
            validate();  
            if (sheet.querySelector('\[type=submit\]').disabled)  
                return;  
            step \= 2;  
            render();  
        } else if (step \=== 2\) {  
            step \= 3;  
            render();  
        } else if (step \=== 3\) {  
            step \= 4;  
            render();  
        } else if (step \=== 4\) {  
            busy \= true;  
            const button \= sheet.querySelector('\[type=submit\]');  
            button.disabled \= true;  
            sheet.setAttribute('aria-busy', 'true');  
            try {  
                const response \= await fetch('/api/contact/', {  
                    method: 'POST',  
                    headers: {  
                        'Content-Type': 'application/json'  
                    },  
                    body: JSON.stringify({  
                        ...values,  
                        service: SERVICES\[serviceIndex\].path,  
                        budget: budgets\[budget\],  
                        website: sheet.elements.contact\_website\_check.value,  
                        id: submissionId  
                    }),  
                    signal: AbortSignal.timeout(20000)  
                });  
                if (\!response.ok) {  
                    const failure \= await response.json().catch( () \=\> ({}));  
                    const error \= new Error(response.status \=== 429 ? 'Too many attempts. Please wait 10 minutes, or email hello@garcy.studio.' : failure.error \|\| 'Your message could not be sent. Please try again, or email hello@garcy.studio.');  
                    error.field \= failure.field;  
                    throw error;  
                }  
                track('generate\_lead', {  
                    service: SERVICES\[serviceIndex\].path  
                });  
                step \= 5;  
                await render();  
            } catch (error) {  
                const message \= sheet.querySelector('.contact-error');  
                message.textContent \= error.message;  
                button.disabled \= false;  
                const correctionStep \= {  
                    name: 1,  
                    email: 1,  
                    service: 2,  
                    budget: 3  
                }\[error.field\];  
                if (correctionStep) {  
                    const edit \= document.createElement('button');  
                    edit.type \= 'button';  
                    edit.className \= 'contact-back';  
                    edit.textContent \= 'Edit ' \+ error.field;  
                    edit.addEventListener('click', () \=\> {  
                        save();  
                        step \= correctionStep;  
                        render();  
                    }  
                    );  
                    message.append(document.createElement('br'), edit);  
                }  
            } finally {  
                busy \= false;  
                sheet.removeAttribute('aria-busy');  
            }  
        }  
    }  
    sheet.addEventListener('submit', e \=\> {  
        e.preventDefault();  
        advance();  
    }  
    );  
    dialog.addEventListener('keydown', e \=\> {  
        e.stopPropagation();  
        if (step \=== 2 && \['ArrowDown', 'ArrowUp'\].includes(e.key)) {  
            e.preventDefault();  
            serviceIndex \= (serviceIndex \+ (e.key \=== 'ArrowDown' ? 1 : \-1) \+ SERVICES.length) % SERVICES.length;  
            selectService(serviceIndex);  
            sheet.querySelector(\`\[data-service="\${serviceIndex}"\]\`).focus();  
        } else if (e.key \=== 'Enter' && e.target.tagName \!== 'TEXTAREA' && e.target.tagName \!== 'BUTTON' && e.target.tagName \!== 'A') {  
            e.preventDefault();  
            advance();  
        }  
    }  
    );  
    function fit() {  
        const v \= visualViewport;  
        dialog.style.setProperty('--contact-top', \`\${v?.offsetTop \|\| 0}px\`);  
        dialog.style.setProperty('--contact-height', \`\${v?.height \|\| innerHeight}px\`);  
    }  
    visualViewport?.addEventListener('resize', fit);  
    visualViewport?.addEventListener('scroll', fit);  
    function open() {  
        if (dialog.open)  
            return;  
        track('contact\_click');  
        previous \= document.activeElement;  
        if (step \=== 5\) {  
            step \= 1;  
            values \= {  
                name: '',  
                email: '',  
                note: ''  
            };  
        }  
        submissionId \= crypto.randomUUID();  
        dialog.showModal();  
        onToggle(true);  
        document.querySelector('.stage')?.classList.add('menu-underlay');  
        fit();  
        render();  
        disruption.play();  
        dialog.classList.add('is-opening');  
        document.querySelector('.stage')?.classList.add('menu-disruption');  
        clearTimeout(openingTimer);  
        openingTimer \= setTimeout( () \=\> {  
            dialog.classList.remove('is-opening');  
            document.querySelector('.stage')?.classList.remove('menu-disruption');  
        }  
        , reduced.matches ? 0 : 850);  
    }  
    function close() {  
        if (busy)  
            return;  
        save();  
        clearTimeout(openingTimer);  
        cancelAnimationFrame(animation);  
        disruption.stop();  
        dialog.classList.remove('is-opening');  
        document.querySelector('.stage')?.classList.remove('menu-disruption');  
        dialog.close();  
        onToggle(false);  
        document.querySelector('.stage')?.classList.remove('menu-underlay');  
        previous?.focus({  
            preventScroll: true  
        });  
    }  
    let outside \= false;  
    dialog.addEventListener('pointerdown', e \=\> {  
        outside \= e.target \=== dialog;  
    }  
    );  
    dialog.addEventListener('click', e \=\> {  
        if (outside && e.target \=== dialog)  
            close();  
        outside \= false;  
    }  
    );  
    dialog.querySelector('.menu-close').addEventListener('click', close);  
    dialog.addEventListener('cancel', e \=\> {  
        e.preventDefault();  
        close();  
    }  
    );  
    document.querySelectorAll('.contact,\[data-contact\]').forEach(b \=\> {  
        b.disabled \= false;  
        if (b.classList.contains('contact'))  
            b.setAttribute('aria-label', 'Contact garcy.studio');  
        b.addEventListener('click', e \=\> {  
            e.preventDefault();  
            open();  
        }  
        );  
    }  
    );  
    return {  
        open,  
        close  
    };  
}

dome.js  
import {CANVAS\_IMAGES} from './canvas-images.js';  
import {pixelCard} from './card-effects.js';  
// Desktop 06\. Dome/lens projection adapted from Jesper Landberg’s Infinite Dome Grid,  
// accessed through the user’s Osmo membership. See source-media/projects/SOURCE.md.  
const mod=(value,size)=\>((value%size)+size)%size;  
const clamp=(v,a,b)=\>Math.min(b,Math.max(a,v));  
export function wrapPosition(value,period){return mod(value+period/2,period)-period/2;}  
// Complete rows contain every project; stagger adjacent rows by three cards.  
// Never wrap a partly filled row: that placed the first project beside itself.  
export function gridPeriods(count){return {columns:count,rows:Math.max(1,Math.floor(count/3))};}  
export function gridCell(column,row,count=9){return mod(column+1+mod(row+1,gridPeriods(count).rows)\*3,count);}

export function createDome(reducedMotion,onProject=()=\>{}){  
  const root=document.querySelector('.projects');  
  const surface=root.querySelector('.dome-surface');  
  const originals=\[...root.querySelectorAll('.project-card')\];  
  const templates=originals.map(card=\>card.cloneNode(true));  
  let pool=\[\],columns=0,rows=0,left=0,top=0;  
  function buildPool(){  
    // Whole staggered periods keep seams duplicate-free without swapping live images.  
    const periods=gridPeriods(templates.length);  
    const cols=Math.ceil((Math.ceil(width/stepX)+2)/periods.columns)\*periods.columns;  
    const period=periods.rows;  
    const nextRows=Math.ceil((Math.ceil(height/stepY)+2)/period)\*period;  
    if(cols===columns && nextRows===rows)return;  
    columns=cols;rows=nextRows;  
    const fragment=document.createDocumentFragment();pool=\[\];  
    for(let row=0;row\<rows;row++)for(let col=0;col\<columns;col++){  
      const column=col-Math.floor(columns/2),line=row-Math.floor(rows/2);  
      const card=templates\[gridCell(column,line,templates.length)\].cloneNode(true);  
      card.setAttribute('role','link');card.setAttribute('aria-label',\`View \${card.querySelector('h3').textContent}\`);card.tabIndex=-1;card.classList.add('dome-tile');  
      const image=card.querySelector('img');image.loading='eager';image.removeAttribute('src');image.draggable=false;image.style.opacity='0';  
      fragment.append(card);pool.push({card,image,column,line,visible:null});  
    }  
    surface.replaceChildren(fragment);  
  }  
  let active=false,paused=reducedMotion.matches;  
  let x=0,y=0,targetX=0,targetY=0,vx=0,vy=0,pointer=null,dragX=0,dragY=0,dragTargetX=0,dragTargetY=0;  
  let width=0,height=0,cardWidth=0,cardHeight=0,stepX=0,stepY=0;  
  let cursorX=0,cursorY=0,cursorTargetX=0,cursorTargetY=0,lens=0,lensTarget=0;  
  let entrance,departures=\[\],arrivals=\[\],arrivalRun=0,pressedCard=null,dragDistance=0;  
  function cancelArrivals(){arrivalRun++;arrivals.forEach(a=\>a.cancel());arrivals=\[\];}  
  function flightOffset(card){const r=card.getBoundingClientRect();let dx=r.left+r.width/2-innerWidth/2,dy=r.top+r.height/2-innerHeight/2;const length=Math.hypot(dx,dy)\|\|1;dx=dx/length\*innerWidth\*1.4;dy=dy/length\*innerHeight\*1.6;if(length\<60){dx=innerWidth;dy=-innerHeight;}return {dx,dy};}  
  // No full-resolution preload of the entire project catalogue.  
  function prepare(){return Promise.resolve();}  
  function loadTile(tile,priority){  
    if(tile.loading)return;  
    tile.loading=true;  
    const original=tile.image.dataset.deferSrc\|\|tile.image.getAttribute('src');  
    const variants=CANVAS\_IMAGES\[original?.replace(/^\\//,'')\];  
    const wanted=cardWidth\*Math.min(devicePixelRatio\|\|1,2);  
    const selected=variants?.find((\[,w\])=\>w\>=wanted)\|\|variants?.at(-1);  
    tile.image.fetchPriority=priority?'high':'low';  
    tile.image.src=selected?'/'+selected\[0\]:original;  
    tile.image.decode().then(()=\>{tile.image.style.opacity='1';}).catch(()=\>{tile.image.style.opacity='1';});  
  }  
  function measure(){  
    const bounds=root.getBoundingClientRect();left=bounds.left;top=bounds.top;  
    width=root.clientWidth;height=root.clientHeight;  
    cardWidth=clamp(width/3.12,245,560);cardHeight=cardWidth\*498.006/458;  
    stepX=cardWidth+Math.max(4,cardWidth\*.014);stepY=cardHeight+Math.max(4,cardWidth\*.014);  
    root.style.setProperty('--project-width',\`\${cardWidth}px\`);  
    root.style.setProperty('--project-height',\`\${cardHeight}px\`);  
    root.style.setProperty('--project-scale',String(cardWidth/458));  
    buildPool();

  }  
  function paint(){

    function warp(px,py){  
      const nx=px/(width/2),ny=py/(height/2);  
      const factor=1+.15\*(nx\*nx+ny\*ny);  
      let wx=px\*factor,wy=py\*factor;  
      const dx=wx-cursorX,dy=wy-cursorY,reach=stepX\*1.5;  
      const push=.25\*lens\*Math.exp(-(dx\*dx+dy\*dy)/(reach\*reach));  
      return {x:wx+dx\*push,y:wy+dy\*push};  
    }  
    pool.forEach(tile=\>{  
      const px=wrapPosition(tile.column\*stepX+x,columns\*stepX);  
      const py=wrapPosition(tile.line\*stepY+y,rows\*stepY);  
      const visible=Math.abs(px)\<width/2+stepX && Math.abs(py)\<height/2+stepY;  
      if(tile.visible\!==visible){tile.card.style.visibility=visible?'visible':'hidden';tile.card.setAttribute('aria-hidden',String(\!visible));tile.card.tabIndex=visible?0:-1;tile.visible=visible;}  
      if(\!visible)return;  
      loadTile(tile,Math.abs(px)\<width/2 && Math.abs(py)\<height/2);  
      const q=\[warp(px-stepX/2,py-stepY/2),warp(px+stepX/2,py-stepY/2),warp(px-stepX/2,py+stepY/2),warp(px+stepX/2,py+stepY/2)\];  
      const inset=(c,a,b)=\>{  
        const da=Math.hypot(a.x-c.x,a.y-c.y)\|\|1,db=Math.hypot(b.x-c.x,b.y-c.y)\|\|1,gap=(stepX-cardWidth)/2;  
        return {x:c.x+gap\*((a.x-c.x)/da+(b.x-c.x)/db),y:c.y+gap\*((a.y-c.y)/da+(b.y-c.y)/db)};  
      };  
      const corners=\[inset(q\[0\],q\[1\],q\[2\]),inset(q\[1\],q\[0\],q\[3\]),inset(q\[2\],q\[0\],q\[3\]),inset(q\[3\],q\[1\],q\[2\])\];  
      tile.card.style.transform=quadMatrix(corners,cardWidth,cardHeight);  
      const driftX=clamp((cursorX-px)/(stepX\*1.5),-1,1)\*12\*lens;  
      const driftY=clamp((cursorY-py)/(stepX\*1.5),-1,1)\*12\*lens;  
      tile.image.style.transform=\`translate3d(\${driftX}px,\${driftY}px,0) scale(1.04)\`;  
    });  
  }  
  function tick(now,dt){  
    if(\!active \|\| document.hidden)return false;  
    if(pointer===null && \!paused && \!reducedMotion.matches){  
      targetX+=vx\*dt/16.67;targetY+=vy\*dt/16.67;  
      vx\*=Math.pow(.9,dt/16.67);vy\*=Math.pow(.9,dt/16.67);  
    }  
    const blend=reducedMotion.matches?1:1-Math.pow(.9,dt/16.67);  
    x+=(targetX-x)\*blend;y+=(targetY-y)\*blend;  
    cursorX+=(cursorTargetX-cursorX)\*(1-Math.pow(.88,dt/16.67));  
    cursorY+=(cursorTargetY-cursorY)\*(1-Math.pow(.88,dt/16.67));  
    const calm=1/(1+(Math.abs(targetX-x)+Math.abs(targetY-y))/40);  
    const desiredLens=paused \|\| reducedMotion.matches?0:lensTarget\*calm;  
    lens+=(desiredLens-lens)\*(1-Math.pow(.92,dt/16.67));  
    paint();  
    return pointer\!==null \|\| Math.abs(x-targetX)+Math.abs(y-targetY)\>.1 \|\| Math.abs(vx)+Math.abs(vy)\>.1 \|\| Math.abs(cursorX-cursorTargetX)+Math.abs(cursorY-cursorTargetY)\>.1 \|\| Math.abs(lens-desiredLens)\>.001;  
  }  
  const loop=createFrameLoop(tick);  
  function wake(){if(active && \!document.hidden)loop.wake();}  
  surface.addEventListener('pointerdown',e=\>{  
    if(\!active \|\| e.button\!==0 \|\| e.metaKey \|\| e.ctrlKey \|\| e.shiftKey \|\| e.altKey)return;  
    pressedCard=e.target.closest('.dome-tile');dragDistance=0;pointer=e.pointerId;dragX=e.clientX;dragY=e.clientY;dragTargetX=targetX;dragTargetY=targetY;vx=vy=0;  
    surface.setPointerCapture(pointer);root.classList.add('dome-dragging');root.focus({preventScroll:true});wake();  
  });  
  surface.addEventListener('pointermove',e=\>{  
    if(\!active)return;  
    if(e.pointerType==='mouse'){cursorTargetX=e.clientX-left-width/2;cursorTargetY=e.clientY-top-height/2;lensTarget=1;wake();}  
    if(e.pointerId\!==pointer)return;  
    const dx=e.clientX-dragX,dy=e.clientY-dragY;dragDistance=Math.max(dragDistance,Math.hypot(dx,dy));  
    const speed=e.pointerType==='touch'?2.5:1.5;  
    targetX=dragTargetX+dx\*speed;targetY=dragTargetY+dy\*speed;vx=vy=0;wake();  
  });  
  surface.addEventListener('click',e=\>{if(e.target.closest('a')&&\!e.metaKey&&\!e.ctrlKey&&\!e.shiftKey&&\!e.altKey)e.preventDefault();});  
  surface.addEventListener('dragstart',e=\>e.preventDefault());  
  surface.addEventListener('pointerleave',()=\>{lensTarget=0;wake();});  
  function release(e){const card=pressedCard;pressedCard=null;if(e?.type==='pointerup'&\&active&\&dragDistance\<7&\&card)onProject(card.dataset.project,card);pointer=null;root.classList.remove('dome-dragging');wake();}  
  surface.addEventListener('pointerup',release);surface.addEventListener('pointercancel',release);surface.addEventListener('lostpointercapture',release);  
  root.addEventListener('wheel',e=\>{  
    if(\!active \|\| e.ctrlKey)return;  
    e.preventDefault();e.stopPropagation();  
    const unit=e.deltaMode===1?16:e.deltaMode===2?height:1;  
    targetX-=e.deltaX\*unit;targetY-=e.deltaY\*unit;vx=vy=0;wake();  
  },{passive:false});  
  root.addEventListener('keydown',e=\>{  
    if(\!active \|\| e.target.closest('button'))return;  
    const tile=e.target.closest('.dome-tile');if(tile&&\['Enter',' '\].includes(e.key)){e.preventDefault();e.stopPropagation();onProject(tile.dataset.project,tile);return;}  
    if(\!\['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','PageUp','PageDown',' '\].includes(e.key))return;  
    e.preventDefault();e.stopPropagation();vx=vy=0;  
    if(e.key==='ArrowLeft')targetX+=stepX\*.7;  
    if(e.key==='ArrowRight')targetX-=stepX\*.7;  
    if(e.key==='ArrowUp'\|\|e.key==='PageUp')targetY+=stepY\*.7;  
    if(e.key==='ArrowDown'\|\|e.key==='PageDown')targetY-=stepY\*.7;  
    if(e.key===' ')targetY+=(e.shiftKey?1:-1)\*height\*.85;  
    if(e.key==='Home')targetX=targetY=0;  
    wake();  
  });  
  function start(){  
    entrance?.cancel();cancelArrivals();  
    surface.style.opacity='';  
    active=true;root.inert=true;root.setAttribute('aria-hidden','false');root.classList.add('projects-active');  
    measure();paint();wake();  
    const run=arrivalRun;  
    if(reducedMotion.matches){  
      entrance=surface.animate(\[{opacity:0},{opacity:1}\],{duration:180});  
      arrivals=\[entrance\];  
    }else{  
      // Reverse the canvas departure: each tile travels in from its own edge.  
      // Individual translate/rotate leave the live dome projection untouched.  
      arrivals=pool.filter(tile=\>tile.visible).map(({card})=\>{  
        const {dx,dy}=flightOffset(card);  
        return card.animate(\[  
          {translate:\`\${dx}px $dypx`,rotate:`${(Math.random()-.5)\*70}deg\`,opacity:0},  
          {translate:'0 0',rotate:'0deg',opacity:1}  
        \],{duration:1450,delay:Math.random()\*160,easing:'cubic-bezier(.2,.7,.25,1)',fill:'backwards'});  
      });  
    }  
    Promise.all(arrivals.map(a=\>a.finished.catch(()=\>{}))).then(()=\>{  
      if(active&\&run===arrivalRun){root.inert=false;root.focus({preventScroll:true});}  
    });  
  }  
  function stop(){  
    // Hide before cancelling filled departures, otherwise tiles snap back during the root fade.  
    surface.style.opacity='0';  
    active=false;loop.stop();entrance?.cancel();cancelArrivals();departures.forEach(a=\>a.cancel());departures=\[\];  
    if(pointer\!==null && surface.hasPointerCapture(pointer))surface.releasePointerCapture(pointer);  
    pointer=null;vx=vy=0;  
    root.inert=true;root.setAttribute('aria-hidden','true');root.classList.remove('projects-active','dome-dragging');  
  }  
  async function leave(){  
    active=false;loop.stop();root.inert=true;entrance?.cancel();cancelArrivals();  
    departures=pool.filter(t=\>t.visible).map(({card})=\>{const {dx,dy}=flightOffset(card);  
      return card.animate(reducedMotion.matches?\[{opacity:1},{opacity:0}\]:\[{translate:'0 0',rotate:'0deg',opacity:1},{translate:\`\${dx}px $dypx`,rotate:`${(Math.random()-.5)\*70}deg\`,opacity:0}\],{duration:reducedMotion.matches?180:1200,delay:reducedMotion.matches?0:Math.random()\*160,easing:'cubic-bezier(.45,0,.8,.3)',fill:'forwards'});  
    });await Promise.all(departures.map(a=\>a.finished.catch(()=\>{})));stop();  
  }  
  async function openProject(card){  
    active=false;loop.stop();entrance?.cancel();cancelArrivals();root.inert=true;  
    const r=card.getBoundingClientRect(),origin=\`\${r.left+r.width/2-left}px \${r.top+r.height/2-top}px\`;  
    surface.style.transformOrigin=origin;  
    const effects=reducedMotion.matches?\[\]:pool.filter(t=\>t.visible).map(t=\>({card:t.card,effect:pixelCard(t.card)}));  
    await Promise.all(effects.map(({effect})=\>effect.prepare()));  
    const pixelStart=performance.now();let pixelFrame;  
    function pixelate(now){const p=Math.min(1,(now-pixelStart)/900);effects.forEach(({effect})=\>effect.set(1-p\*.95));if(p\<1)pixelFrame=requestAnimationFrame(pixelate);}  
    if(effects.length)pixelFrame=requestAnimationFrame(pixelate);  
    const zoom=surface.animate(reducedMotion.matches?\[{opacity:1},{opacity:0}\]:\[{transform:'scale(1)'},{transform:'scale(2.8)'}\],{duration:reducedMotion.matches?150:650,easing:'cubic-bezier(.65,0,.25,1)',fill:'forwards'});departures.push(zoom);await zoom.finished.catch(()=\>{});  
    if(\!reducedMotion.matches){const drop=root.animate(\[{transform:'translateY(0)'},{transform:'translateY(110%)'}\],{duration:950,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});departures.push(drop);await drop.finished.catch(()=\>{});}  
    cancelAnimationFrame(pixelFrame);effects.forEach(({card})=\>{card.classList.remove('card-resolving');card.querySelector('.card-pixels')?.remove();});stop();surface.style.transformOrigin='';  
  }  
  function reset(){stop();x=y=targetX=targetY=cursorX=cursorY=cursorTargetX=cursorTargetY=lens=lensTarget=0;}  
  window.addEventListener('resize',()=\>{if(active){measure();paint();}});  
  document.addEventListener('visibilitychange',()=\>{if(document.hidden){loop.stop();}else wake();});  
  return {prepare,start,stop,reset,leave,openProject,setPaused(value){paused=value;if(value)vx=vy=0;wake();}};  
}

// Project a rectangle onto a quadrilateral with one CSS transform, including its caption.  
export function quadMatrix(\[p0,p1,p2,p3\],width,height){  
  const dx1=p1.x-p3.x,dy1=p1.y-p3.y,dx2=p2.x-p3.x,dy2=p2.y-p3.y;  
  const sx=p0.x-p1.x-p2.x+p3.x,sy=p0.y-p1.y-p2.y+p3.y;  
  const denominator=dx1\*dy2-dx2\*dy1;  
  const g=denominator?(sx\*dy2-dx2\*sy)/denominator:0;  
  const h=denominator?(dx1\*sy-sx\*dy1)/denominator:0;  
  const a=p1.x-p0.x+g\*p1.x,b=p2.x-p0.x+h\*p2.x;  
  const d=p1.y-p0.y+g\*p1.y,e=p2.y-p0.y+h\*p2.y;  
  return \`matrix3d(\${a/width},$d/width,0,${g/width},$b/height,${e/height},0,$h/height,0,0,1,0,${p0.x},\${p0.y},0,1)\`;  
}

// Input events only wake an idle loop: they never postpone a pending frame or reset its clock.  
export function createFrameLoop(render,{  
  request=callback=\>requestAnimationFrame(callback),  
  cancel=id=\>cancelAnimationFrame(id),  
  now=()=\>performance.now(),  
}={}){  
  let pending=null,last=0;  
  function step(time){  
    pending=null;  
    const dt=Math.min(40,Math.max(0,time-last));last=time;  
    if(render(time,dt))pending=request(step);  
  }  
  return {  
    wake(){if(pending\!==null)return;last=now();pending=request(step);},  
    stop(){if(pending\!==null)cancel(pending);pending=null;},  
  };  
}

entity-background.js  
// A slowly changing mosaic, with randomized refinement/coarsening over the original still image.  
export function animateEntryBackground(image, canvas, stage, reduced) {  
    const context \= canvas.getContext('2d', {  
        willReadFrequently: true  
    });  
    const bayer \= \[0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5\];  
    let frame, stopped \= false, previous \= 0, changed \= 0, from \= 0, target \= .45, amount \= 0, duration \= 2600;  
    canvas.classList.add('ambient-dither');  
    function tick(now) {  
        if (stopped)  
            return;  
        if (\!document.hidden && \!reduced.matches && image.complete && image.naturalWidth \> 0 && now \- previous \> 65\) {  
            previous \= now;  
            if (\!changed)  
                changed \= now;  
            let p \= Math.min(1, (now \- changed) / duration)  
              , e \= p \* p \* (3 \- 2 \* p);  
            amount \= from \+ (target \- from) \* e;  
            if (p \=== 1\) {  
                from \= amount;  
                target \= target \> .3 ? .12 \+ Math.random() \* .08 : .36 \+ Math.random() \* .14;  
                changed \= now;  
                duration \= 1800 \+ Math.random() \* 3400;  
            }  
            if (amount \< .035) {  
                canvas.style.opacity \= '0';  
            } else {  
                const block \= Math.max(2, Math.round(2 \+ amount \* 10));  
                canvas.width \= Math.ceil(Math.min(stage.clientWidth, 1440\) / block);  
                canvas.height \= Math.ceil(canvas.width \* stage.clientHeight / stage.clientWidth);  
                const k \= Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)  
                  , focal \= parseFloat(getComputedStyle(stage).getPropertyValue('--opening-position')) / 100;  
                context.drawImage(image, (canvas.width \- image.naturalWidth \* k) \* focal, (canvas.height \- image.naturalHeight \* k) / 2, image.naturalWidth \* k, image.naturalHeight \* k);  
                const pixels \= context.getImageData(0, 0, canvas.width, canvas.height)  
                  , levels \= Math.max(1, Math.round(18 \* (1 \- amount) \*\* 2))  
                  , mono \= levels \<= 2 ? 1 : Math.max(0, (amount \- .65) / .35);  
                for (let y \= 0; y \< canvas.height; y++)  
                    for (let x \= 0; x \< canvas.width; x++) {  
                        const i \= (y \* canvas.width \+ x) \* 4  
                          , t \= (bayer\[(y % 4\) \* 4 \+ x % 4\] \+ .5) / 16 \- .5  
                          , gray \= pixels.data\[i\] \* .2126 \+ pixels.data\[i \+ 1\] \* .7152 \+ pixels.data\[i \+ 2\] \* .0722;  
                        for (let c \= 0; c \< 3; c++) {  
                            const v \= (pixels.data\[i \+ c\] \* (1 \- mono) \+ gray \* mono);  
                            pixels.data\[i \+ c\] \= Math.max(0, Math.min(255, Math.round(v / 255 \* levels \+ t) / levels \* 255));  
                        }  
                    }  
                context.putImageData(pixels, 0, 0);  
                canvas.style.opacity \= String(Math.min(1, amount \* 5));  
            }  
        }  
        frame \= requestAnimationFrame(tick);  
    }  
    function visibility() {  
        cancelAnimationFrame(frame);  
        if (document.hidden \|\| reduced.matches \|\| stage.dataset.motionPaused \=== 'true') {  
            canvas.style.opacity \= '0';  
        } else if (\!stopped) {  
            previous \= performance.now();  
            frame \= requestAnimationFrame(tick);  
        }  
    }  
    document.addEventListener('visibilitychange', visibility);  
    reduced.addEventListener('change', visibility);  
    stage.addEventListener('motionchange', visibility);  
    visibility();  
    return () \=\> {  
        stopped \= true;  
        cancelAnimationFrame(frame);  
        document.removeEventListener('visibilitychange', visibility);  
        reduced.removeEventListener('change', visibility);  
        stage.removeEventListener('motionchange', visibility);  
        canvas.classList.remove('ambient-dither');  
    }  
    ;  
}

final.js  
import {GALLERY\_IMAGES} from './gallery-images.js';  
import {pixelReveal, wrapWords} from './story.js';  
import {pixelCard, draggableStrip} from './card-effects.js';  
export function createFinal(reduced) {  
    const root \= document.querySelector('.final-scene')  
      , copy \= root.querySelector('.final-copy')  
      , title \= root.querySelector('.final-title');  
    root.style.setProperty('--grain', getComputedStyle(document.querySelector('.story-viewport')).getPropertyValue('--grain'));  
    const track \= root.querySelector('.team-track');  
    // Omit duplicate studio photos; studio-4 repeats the interior between Loren and Tom.  
    const extras \= GALLERY\_IMAGES.filter(item \=\> item.group \=== 'studio-photos' && \!\['/assets/tornado/studio-3.webp', '/assets/tornado/studio-4.webp'\].includes(item.src));  
    extras.forEach(item \=\> {  
        const card \= document.createElement('article');  
        card.className \= 'team-card';  
        const image \= new Image();  
        image.dataset.deferSrc \= item.src;  
        image.alt \= 'Life at garcy.studio';  
        image.loading \= 'eager';  
        image.decoding \= 'async';  
        image.width \= 282;  
        image.height \= 361;  
        card.append(image);  
        track.append(card);  
    }  
    );  
    const cards \= \[...root.querySelectorAll('.team-card')\]  
      , pixels \= cards.map(pixelCard);  
    \[copy, title\].forEach(wrapWords);  
    draggableStrip(root.querySelector('.team-strip'));  
    let generation \= 0, timers \= \[\], cleanups \= \[\], frame, active \= false, paused \= reduced.matches;  
    function reset() {  
        generation++;  
        active \= false;  
        timers.forEach(clearTimeout);  
        timers \= \[\];  
        cleanups.forEach(f \=\> f());  
        cleanups \= \[\];  
        cancelAnimationFrame(frame);  
        root.classList.remove('final-active', 'final-title-ready', 'final-joy-ready');  
        root.inert \= true;  
        root.setAttribute('aria-hidden', 'true');  
        cards.forEach(c \=\> {  
            c.style.transform \= '';  
            c.style.opacity \= '0';  
        }  
        );  
    }  
    function start() {  
        reset();  
        const run \= generation;  
        active \= true;  
        root.inert \= false;  
        root.setAttribute('aria-hidden', 'false');  
        root.classList.add('final-active');  
        root.querySelectorAll('\[data-defer-src\]').forEach(img \=\> {  
            img.loading \= 'eager';  
            img.src \= img.dataset.deferSrc;  
            delete img.dataset.deferSrc;  
        }  
        );  
        root.focus({  
            preventScroll: true  
        });  
        cleanups.push(pixelReveal(copy, {  
            duration: 1000,  
            stagger: 90,  
            reduced: reduced.matches  
        }));  
        const later \= (fn, ms) \=\> timers.push(setTimeout( () \=\> {  
            if (active)  
                fn();  
        }  
        , reduced.matches ? 0 : ms));  
        later( () \=\> {  
            root.classList.add('final-title-ready');  
            cleanups.push(pixelReveal(title, {  
                duration: 1800,  
                reduced: reduced.matches  
            }));  
        }  
        , 1600);  
        later( () \=\> root.classList.add('final-joy-ready'), 3500);  
        later(async () \=\> {  
            // Offscreen lazy images must never hold the entire strip invisible.  
            const preparation \= Promise.allSettled(pixels.map(p \=\> p.prepare()));  
            let deadline;  
            await Promise.race(\[preparation, new Promise(resolve \=\> {  
                deadline \= setTimeout(resolve, 1200);  
            }  
            )\]);  
            clearTimeout(deadline);  
            if (\!active \|\| run \!== generation)  
                return;  
            const time \= performance.now();  
            function tick(now) {  
                if (\!active)  
                    return;  
                let done \= true;  
                cards.forEach( (c, i) \=\> {  
                    const p \= reduced.matches \|\| paused ? 1 : Math.max(0, Math.min(1, (now \- time \- Math.min(i, 4\) \* 220\) / 1400));  
                    if (p \< 1\)  
                        done \= false;  
                    c.style.opacity \= String(Math.min(1, p \* 5));  
                    c.style.transform \= \`translateX(\${(1 \- p) \*\* 3 \* innerWidth}px)\`;  
                    pixels\[i\].set(p);  
                }  
                );  
                if (\!done)  
                    frame \= requestAnimationFrame(tick);  
            }  
            frame \= requestAnimationFrame(tick);  
        }  
        , 3900);  
    }  
    return {  
        start,  
        reset,  
        setPaused(value) {  
            paused \= value;  
            root.classList.toggle('motion-paused', value);  
        }  
    };  
}

floppy-model.js  
// Solid CSS geometry, not a bitmap face. All measurements use the model's unit.  
export function floppyModel(brand='garcy') {  
    const tesseral \= brand \=== 'tesseral';  
    return \`\<span class="floppy-model $tesseral?'floppy-green':'floppy-yellow'"aria-hidden="true"><spanclass="floppy-facefloppy-back"><spanclass="floppy-hub"></span><spanclass="floppy-back-groove"></span></span><spanclass="floppy-edgefloppy-edge-left"></span><spanclass="floppy-edgefloppy-edge-right"></span><spanclass="floppy-edgefloppy-edge-top"></span><spanclass="floppy-edgefloppy-edge-bottom"></span><spanclass="floppy-facefloppy-front"><spanclass="floppy-grain"></span><spanclass="floppy-track"></span><spanclass="floppy-arrow">↑</span><spanclass="floppy-emboss">${tesseral ? 't' : 'g'}\*\</span\>\<span class="floppy-shutter"\>\<span class="floppy-shutter-slot"\>\</span\>\<span class="floppy-metal-etch"\>HD · 1.44 MB\</span\>\</span\>\<span class="floppy-label"\>\<span class="floppy-logo-wrap"\>\<img src="$tesseral?'/assets/menu/tesseral-logo.svg':'/assets/logo.svg'"alt=""></span><spanclass="floppy-label-rule"></span><spanclass="floppy-edition">${tesseral ? 'DIGITAL SYSTEMS' : 'JOY THROUGH DESIGN'}\<br\>STUDIO ARCHIVE / 0\${tesseral ? '2' : '1'}\</span\>\<span class="floppy-barcode"\>\</span\>\<span class="floppy-serial"\>GS—2026\</span\>\</span\>\<span class="floppy-notch notch-left"\>\</span\>\<span class="floppy-notch notch-right"\>\</span\>\<span class="floppy-seam"\>\</span\>\</span\>  
 \</span\>\`;  
}

floppy-stack.js  
export function createFloppyStack(dialog, floppy, reduced) {  
    const orbit \= dialog.querySelector('.disk-orbit')  
      , tesseral \= orbit.querySelector('.disk-tesseral');  
    let rotation \= {  
        x: \-16,  
        y: \-45  
    }, drag \= null, blockClick \= false, flight, keyboard \= false;  
    const pose \= () \=\> {  
        orbit.style.setProperty('--stack-x', rotation.x \+ 'deg');  
        orbit.style.setProperty('--stack-y', rotation.y \+ 'deg');  
    }  
    ;  
    pose();  
    function enter() {  
        const before \= floppy.getBoundingClientRect();  
        flight?.cancel();  
        floppy.classList.add('in-stack');  
        orbit.prepend(floppy);  
        const after \= floppy.getBoundingClientRect();  
        dialog.classList.remove('tesseral-front');  
        if (\!reduced.matches)  
            flight \= floppy.animate(\[{  
                translate: \`\${before.x \+ before.width / 2 \- after.x \- after.width / 2}px \${before.y \+ before.height / 2 \- after.y \- after.height / 2}px\`,  
                rotate: 'y 38deg'  
            }, {  
                translate: '0 0',  
                rotate: 'y 0deg'  
            }\], {  
                duration: 1000,  
                easing: 'cubic-bezier(.22,1,.36,1)'  
            });  
    }  
    function leave() {  
        flight?.cancel();  
        for (const d of \[floppy, tesseral\])  
            d.classList.remove('is-lifted');  
        dialog.append(floppy);  
        floppy.classList.remove('in-stack');  
        dialog.classList.remove('stack-dragging', 'tesseral-front');  
        drag \= null;  
        rotation \= {  
            x: \-16,  
            y: \-45  
        };  
        pose();  
    }  
    const disks \= \[floppy, tesseral\];  
    dialog.addEventListener('pointerdown', () \=\> keyboard \= false, true);  
    dialog.addEventListener('keydown', e \=\> {  
        if (e.key \=== 'Tab')  
            keyboard \= true;  
    }  
    , true);  
    const lift \= disk \=\> {  
        if (drag)  
            return;  
        for (const item of disks)  
            item.classList.toggle('is-lifted', item \=== disk);  
    }  
    ;  
    for (const disk of disks) {  
        disk.draggable \= false;  
        disk.addEventListener('pointerenter', () \=\> lift(disk));  
        disk.addEventListener('focusin', e \=\> {  
            if (keyboard && e.target.matches(':focus-visible'))  
                lift(disk);  
        }  
        );  
    }  
    orbit.addEventListener('dragstart', e \=\> e.preventDefault());  
    orbit.addEventListener('pointerdown', e \=\> {  
        if (e.button \!== 0\)  
            return;  
        drag \= {  
            id: e.pointerId,  
            x: e.clientX,  
            y: e.clientY,  
            rx: rotation.x,  
            ry: rotation.y,  
            moved: false  
        };  
        blockClick \= false;  
    }  
    );  
    orbit.addEventListener('pointermove', e \=\> {  
        if (\!drag \|\| e.pointerId \!== drag.id)  
            return;  
        const dx \= e.clientX \- drag.x  
          , dy \= e.clientY \- drag.y;  
        if (\!drag.moved && Math.hypot(dx, dy) \< 6\)  
            return;  
        drag.moved \= true;  
        orbit.setPointerCapture(e.pointerId);  
        dialog.classList.add('stack-dragging');  
        rotation \= {  
            x: Math.max(-55, Math.min(35, drag.rx \- dy \* .28)),  
            y: drag.ry \+ dx \* .35  
        };  
        pose();  
    }  
    );  
    const release \= e \=\> {  
        if (\!drag \|\| e.pointerId \!== drag.id)  
            return;  
        blockClick \= drag.moved;  
        drag \= null;  
        dialog.classList.remove('stack-dragging');  
    }  
    ;  
    orbit.addEventListener('pointerup', release);  
    orbit.addEventListener('pointercancel', release);  
    orbit.addEventListener('lostpointercapture', release);  
    orbit.addEventListener('click', e \=\> {  
        if (blockClick) {  
            e.preventDefault();  
            e.stopImmediatePropagation();  
            blockClick \= false;  
        }  
    }  
    , true);  
    return {  
        enter,  
        leave  
    };  
}  
gallery-animation.js  
export const GALLERY\_IMAGES \= \[  
  {  
    "src": "/assets/tornado/libinst4.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/Libinst4.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/nachonacho6.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/NachoNacho6.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/aomu-4.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/aomu-4.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/aomu-7.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/aomu-7.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/arkady-1.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/arkady-1.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/koscom-1.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/koscom-1.png",  
    "width": 640,  
    "height": 640  
  },  
  {  
    "src": "/assets/tornado/magu-1.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/magu-1.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/magu-2.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/magu-2.png",  
    "width": 640,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/otk-2.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/otk-2.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/sofa-1.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/sofa-1.png",  
    "width": 597,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/sofa-2.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/sofa-2.png",  
    "width": 640,  
    "height": 640  
  },  
  {  
    "src": "/assets/tornado/studio-1.webp",  
    "group": "studio-photos",  
    "source": "source-media/tornado/studio-1.png",  
    "width": 821,  
    "height": 1100  
  },  
  {  
    "src": "/assets/tornado/studio-2.webp",  
    "group": "studio-photos",  
    "source": "source-media/tornado/studio-2.png",  
    "width": 900,  
    "height": 509  
  },  
  {  
    "src": "/assets/tornado/studio-3.webp",  
    "group": "studio-photos",  
    "source": "source-media/tornado/studio-3.png",  
    "width": 821,  
    "height": 1100  
  },  
  {  
    "src": "/assets/tornado/studio-4.webp",  
    "group": "studio-photos",  
    "source": "source-media/tornado/studio-4.png",  
    "width": 821,  
    "height": 1100  
  },  
  {  
    "src": "/assets/tornado/studio-5.webp",  
    "group": "studio-photos",  
    "source": "source-media/tornado/studio-5.png",  
    "width": 821,  
    "height": 1100  
  },  
  {  
    "src": "/assets/tornado/studio-6.webp",  
    "group": "studio-photos",  
    "source": "source-media/tornado/studio-6.png",  
    "width": 821,  
    "height": 1100  
  },  
  {  
    "src": "/assets/tornado/sunnysoft-1.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/sunnysoft-1.png",  
    "width": 450,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/unit-1.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/unit-1.png",  
    "width": 600,  
    "height": 800  
  },  
  {  
    "src": "/assets/tornado/unit-3.webp",  
    "group": "product-mockups",  
    "source": "source-media/tornado/unit-3.png",  
    "width": 597,  
    "height": 800  
  }  
\];  
logo.animation-js  
import animationData from './assets/loader/logo-motion.js';  
let renderer;  
function loadRenderer(){return renderer??=new Promise((resolve,reject)=\>{const script=document.createElement('script');script.src='./assets/vendor/lottie-svg-5.13.0.min.js';script.onload=()=\>resolve(window.lottie);script.onerror=reject;document.head.append(script);});}  
export async function animateEntryLogo(container,reduced){  
 const lottie=await loadRenderer();container.replaceChildren();  
 const animation=lottie.loadAnimation({container,renderer:'svg',loop:false,autoplay:false,animationData:structuredClone(animationData),rendererSettings:{preserveAspectRatio:'xMidYMid meet',progressiveLoad:false}});  
 await new Promise((resolve,reject)=\>{animation.addEventListener('DOMLoaded',resolve);animation.addEventListener('data\_failed',reject);});  
 animation.goToAndStop(75,true);  
 const svg=container.querySelector('svg'),art=svg.querySelector('g');  
 const bounds=art.getBBox();  
 svg.setAttribute('viewBox',\`\${bounds.x} \${bounds.y} \${bounds.width} $bounds.height`);svg.style.overflow='visible';container.style.aspectRatio=`${bounds.width} / \${bounds.height}\`;  
 // Keep the original bottom dot inside the stage while retaining every authored keyframe.  
 const position=()=\>{const box=art.getBBox(),overflow=Math.max(0,box.y+box.height-bounds.y-bounds.height);svg.style.translate=\`0 \${-overflow\*container.clientWidth/bounds.width}px\`;};  
 animation.addEventListener('enterFrame',position);  
 if(reduced){position();return ()=\>animation.destroy();}  
 animation.goToAndStop(0,true);position();  
 await new Promise(resolve=\>{animation.addEventListener('complete',resolve);animation.play();});  
 const stopHover=await pixelLogoHover(container,svg);  
 return ()=\>{stopHover();animation.destroy();};  
}

// Rasterize the completed authored SVG once; never substitute a different logo.  
async function pixelLogoHover(container,svg){  
 const clone=svg.cloneNode(true),box=svg.viewBox.baseVal;  
 clone.setAttribute('width',Math.ceil(box.width));clone.setAttribute('height',Math.ceil(box.height));  
 clone.style.cssText='';  
 const image=new Image(),url=URL.createObjectURL(new Blob(\[new XMLSerializer().serializeToString(clone)\],{type:'image/svg+xml'}));  
 try{image.src=url;await image.decode();}catch{URL.revokeObjectURL(url);return ()=\>{};}  
 URL.revokeObjectURL(url);  
 const canvas=document.createElement('canvas'),small=document.createElement('canvas');  
 canvas.className='entry-logo-pixels';canvas.setAttribute('aria-hidden','true');canvas.hidden=true;container.append(canvas);  
 const ctx=canvas.getContext('2d'),sample=small.getContext('2d');let frame,value=0;  
 function draw(){  
  const ratio=Math.min(devicePixelRatio,2);canvas.width=Math.ceil(container.clientWidth\*ratio);canvas.height=Math.ceil(container.clientHeight\*ratio);  
  const block=1+value\*14;  
  small.width=Math.max(1,Math.round(canvas.width/block));small.height=Math.max(1,Math.round(canvas.height/block));  
  sample.drawImage(image,0,0,small.width,small.height);ctx.imageSmoothingEnabled=false;ctx.drawImage(small,0,0,canvas.width,canvas.height);  
 }  
 function animate(target){  
  cancelAnimationFrame(frame);const from=value,start=performance.now();canvas.hidden=false;svg.style.opacity='0';  
  function tick(now){const p=Math.min(1,(now-start)/(target?420:950));value=from+(target-from)\*(1-(1-p)\*\*3);draw();  
   if(p\<1)frame=requestAnimationFrame(tick);else if(\!target){canvas.hidden=true;svg.style.opacity='';}}  
  frame=requestAnimationFrame(tick);  
 }  
 const enter=event=\>{if(event.pointerType==='mouse')animate(1);},leave=()=\>animate(0);  
 container.addEventListener('pointerenter',enter);container.addEventListener('pointerleave',leave);  
 return ()=\>{cancelAnimationFrame(frame);container.removeEventListener('pointerenter',enter);container.removeEventListener('pointerleave',leave);canvas.remove();svg.style.opacity='';};  
}

measurement-events.js  
// Keep analytics payloads explicit and free of form contents or URL parameters.  
const events=new Set(\['page\_view','contact\_click','generate\_lead','testimonial\_play','web\_vital'\]);  
export function measurementEvent(event,fields,{origin,pathname,title,source}){  
 if(\!events.has(event))return null;  
 const page=typeof fields.page==='string'&&/^\\/(?\!\\/)/.test(fields.page)?fields.page.split(/\[?\#\]/)\[0\]:pathname;  
 const detail={source,page};  
 for(const key of \['section','name','person','service'\])if(typeof fields\[key\]==='string')detail\[key\]=fields\[key\].slice(0,100);  
 if(Number.isFinite(fields.value))detail.value=fields.value;  
 if(event==='page\_view')Object.assign(detail,{page\_location:origin+page,page\_title:title});  
 return detail;  
}  
measurement.js  
import {measurementEvent} from './measurement-events.js';  
// No third-party requests without configuration AND explicit visitor consent.  
// Production deployments also have Vercel aliases: never measure preview visitors.  
const config \= location.hostname \=== 'www\.garcy.studio' ? document.querySelector('meta\[name="ga-measurement-id"\]')?.content : undefined;  
let enabled \= false, lastPage, currentPage \= {  
    page: location.pathname,  
    section: 'entry'  
};  
function source() {  
    try {  
        const host \= new URL(document.referrer).hostname;  
        return /(^\|\\.)(chatgpt\\.com\|chat\\.openai\\.com\|perplexity\\.ai\|claude\\.ai\|gemini\\.google\\.com\|copilot\\.microsoft\\.com)\$/.test(host) ? 'ai-referral' : host ? 'referral' : 'direct';  
    } catch {  
        return 'direct';  
    }  
}  
const acquisition \= source();  
export function track(event, fields={}) {  
    const detail \= measurementEvent(event, fields, {  
        origin: location.origin,  
        pathname: location.pathname,  
        title: document.title,  
        source: acquisition  
    });  
    if (\!detail)  
        return;  
    if (event \=== 'page\_view') {  
        currentPage \= {  
            page: detail.page,  
            section: detail.section  
        };  
        const key \= detail.page \+ '\|' \+ detail.section;  
        if (lastPage \=== key)  
            return;  
        lastPage \= key;  
    }  
    document.dispatchEvent(new CustomEvent('studio:measurement',{  
        detail: {  
            event,  
            ...detail  
        }  
    }));  
    if (enabled)  
        window.gtag('event', event, detail);  
}  
function activate() {  
    if (enabled \|\| \!/^G-\[A-Z0-9\]+\$/.test(config \|\| ''))  
        return;  
    enabled \= true;  
    window\['ga-disable-' \+ config\] \= false;  
    window.dataLayer \= window.dataLayer \|\| \[\];  
    window.gtag \= function() {  
        window.dataLayer.push(arguments);  
    }  
    ;  
    window.gtag('consent', 'update', {  
        analytics\_storage: 'granted'  
    });  
    if (\!document.querySelector('\[data-studio-analytics\]')) {  
        window.gtag('js', new Date());  
        let referrer \= '';  
        try {  
            referrer \= new URL(document.referrer).origin;  
        } catch {}  
        // Manual routing owns page views; disable GA's automatic history-change views  
        // in the stream as well to prevent duplicate reporting.  
        window.gtag('config', config, {  
            send\_page\_view: false,  
            page\_referrer: referrer,  
            ...(new URLSearchParams(location.search).has('diagnostics') ? {  
                debug\_mode: true  
            } : {})  
        });  
        const script \= document.createElement('script');  
        script.async \= true;  
        script.dataset.studioAnalytics \= '';  
        script.src \= \`https\://www\.googletagmanager.com/gtag/js?id=\${config}\`;  
        document.head.append(script);  
    }  
    if (lastPage \!== undefined) {  
        lastPage \= undefined;  
        track('page\_view', currentPage);  
    }  
}  
export function chooseAnalytics(choice) {  
    try {  
        localStorage.setItem('studio-analytics-consent', choice);  
    } catch {}  
    if (choice \=== 'yes')  
        activate();  
    else {  
        enabled \= false;  
        window\['ga-disable-' \+ config\] \= true;  
        window.gtag?.('consent', 'update', {  
            analytics\_storage: 'denied'  
        });  
    }  
}  
export function showAnalyticsPreference() {  
    if (document.querySelector('\[data-analytics-preference\]'))  
        return;  
    if (\!document.querySelector('\[data-consent-style\]')) {  
        const css \= document.createElement('link');  
        css.rel \= 'stylesheet';  
        css.href \= '/consent.css';  
        css.dataset.consentStyle \= '';  
        document.head.append(css);  
    }  
    const aside \= document.createElement('aside');  
    aside.dataset.analyticsPreference \= '';  
    aside.className \= 'analytics-glass';  
    aside.setAttribute('aria-label', 'Analytics preference');  
    aside.innerHTML \= '\<p class="analytics-copy" title="Allow Google Analytics to help us improve the website?"\>Analytics to improve our site?\</p\>\<div class="analytics-actions"\>\<button type="button" data-choice="no"\>No thanks\</button\>\<button type="button" data-choice="yes" aria-label="Allow Google Analytics"\>Allow\</button\>\</div\>';  
    aside.addEventListener('click', e \=\> {  
        const choice \= e.target.dataset.choice;  
        if (\!choice)  
            return;  
        chooseAnalytics(choice);  
        aside.remove();  
    }  
    );  
    document.body.append(aside);  
}  
if (config) {  
    let consent;  
    try {  
        consent \= localStorage.getItem('studio-analytics-consent');  
    } catch {}  
    const intro \= document.querySelector('.entry-actions');  
    const atIntro \= intro && location.pathname \=== '/' && (\!location.hash \|\| location.hash \=== '\#/loader' \|\| location.hash \=== '\#loader');  
    if (consent \=== 'yes')  
        activate();  
    else if (consent \!== 'no' && \!atIntro)  
        showAnalyticsPreference();  
}  
document.addEventListener('click', e \=\> {  
    if (e.target.closest('\[data-analytics-settings\]')) {  
        e.preventDefault();  
        showAnalyticsPreference();  
    }  
    if (e.target.closest('a\[href^="mailto:"\]'))  
        track('contact\_click', {  
            page: location.pathname  
        });  
    const play \= e.target.closest('\[data-testimonial\]');  
    if (play)  
        track('testimonial\_play', {  
            person: play.dataset.testimonial,  
            page: location.pathname  
        });  
}  
);  
// Google's pinned measurement implementation handles page lifecycle and interaction percentiles.  
async function measureVitals() {  
    const {onLCP, onINP, onCLS} \= await import('/assets/vendor/web-vitals-6.2.2.js');  
    const report \= metric \=\> {  
        document.documentElement.dataset\[metric.name.toLowerCase()\] \= String(metric.value);  
        track('web\_vital', {  
            name: metric.name,  
            value: metric.value,  
            page: location.pathname  
        });  
    }  
    ;  
    onLCP(report, {  
        reportAllChanges: true  
    });  
    onINP(report, {  
        reportAllChanges: true  
    });  
    onCLS(report, {  
        reportAllChanges: true  
    });  
}  
if (document.readyState \=== 'complete')  
    measureVitals();  
else  
    window.addEventListener('load', measureVitals, {  
        once: true  
    });  
let longTasks \= 0;  
try {  
    new PerformanceObserver(list \=\> {  
        longTasks \+= list.getEntries().length;  
        document.documentElement.dataset.longTasks \= String(longTasks);  
    }  
    ).observe({  
        type: 'longtask',  
        buffered: true  
    });  
} catch {}  
// Scene routes report during startup. Content/loader pages receive one fallback view.  
const initialView \= () \=\> {  
    if (lastPage \=== undefined)  
        track('page\_view', {  
            page: location.pathname,  
            section: document.querySelector('.entry') ? 'loader' : 'content'  
        });  
}  
;  
if (document.readyState \=== 'complete')  
    initialView();  
else  
    window.addEventListener('load', initialView, {  
        once: true  
    });

setTimeout( () \=\> {  
    const resources \= performance.getEntriesByType('resource');  
    document.documentElement.dataset.transferBytes \= String(resources.reduce( (total, r) \=\> total \+ r.transferSize, 0));  
    document.documentElement.dataset.requestCount \= String(resources.length);  
    if (new URLSearchParams(location.search).has('diagnostics'))  
        document.documentElement.dataset.resourceReport \= JSON.stringify(resources.filter(r \=\> r.transferSize \> 50000).map(r \=\> ({  
            asset: r.name.split('/').pop().split('?')\[0\],  
            bytes: r.transferSize  
        })).sort( (a, b) \=\> b.bytes \- a.bytes));  
}  
, 5000);

menu-effects.js  
// A bounded, local raster transition: reuse already decoded media and laid-out text.  
// No screenshot service, image downloads, or continuous full-screen rendering.  
export function menuDisruption(stage, dialog, reduced) {  
    const overlay \= document.createElement('canvas');  
    overlay.className \= 'menu-raster';  
    overlay.setAttribute('aria-hidden', 'true');  
    dialog.prepend(overlay);  
    const source \= document.createElement('canvas')  
      , small \= document.createElement('canvas');  
    let frame;  
    function stop() {  
        cancelAnimationFrame(frame);  
        overlay.style.opacity \= 0;  
    }  
    function play() {  
        stop();  
        if (reduced.matches)  
            return;  
        const w \= innerWidth  
          , h \= innerHeight  
          , scale \= Math.min(1, 1200 / w);  
        source.width \= Math.ceil(w \* scale);  
        source.height \= Math.ceil(h \* scale);  
        overlay.width \= source.width;  
        overlay.height \= source.height;  
        const ctx \= source.getContext('2d');  
        ctx.setTransform(scale, 0, 0, scale, 0, 0);  
        ctx.fillStyle \= '\#191919';  
        ctx.fillRect(0, 0, w, h);  
        for (const el of stage.querySelectorAll('img,video,canvas')) {  
            const r \= el.getBoundingClientRect();  
            if (\!r.width \|\| \!r.height \|\| r.bottom \< 0 \|\| r.top \> h \|\| r.right \< 0 \|\| r.left \> w \|\| \!el.checkVisibility({  
                checkOpacity: true,  
                checkVisibilityCSS: true  
            }))  
                continue;  
            try {  
                ctx.save();  
                ctx.beginPath();  
                ctx.rect(r.left, r.top, r.width, r.height);  
                ctx.clip();  
                const iw \= el.videoWidth \|\| el.naturalWidth \|\| el.width  
                  , ih \= el.videoHeight \|\| el.naturalHeight \|\| el.height;  
                if (\!iw \|\| \!ih) {  
                    ctx.restore();  
                    continue;  
                }  
                const k \= getComputedStyle(el).objectFit \=== 'contain' ? Math.min(r.width / iw, r.height / ih) : Math.max(r.width / iw, r.height / ih);  
                ctx.drawImage(el, r.left \+ (r.width \- iw \* k) / 2, r.top \+ (r.height \- ih \* k) / 2, iw \* k, ih \* k);  
                ctx.restore();  
            } catch {  
                ctx.restore();  
            }  
        }  
        const walker \= document.createTreeWalker(stage, NodeFilter.SHOW\_TEXT);  
        let count \= 0;  
        while (walker.nextNode() && count \< 500\) {  
            const node \= walker.currentNode  
              , el \= node.parentElement;  
            if (\!node.textContent.trim() \|\| \!el.checkVisibility({  
                checkOpacity: true,  
                checkVisibilityCSS: true  
            }))  
                continue;  
            const style \= getComputedStyle(el);  
            for (const match of node.textContent.matchAll(/\\S+/g)) {  
                const range \= document.createRange();  
                range.setStart(node, match.index);  
                range.setEnd(node, match.index \+ match\[0\].length);  
                const r \= range.getBoundingClientRect();  
                if (\!r.width \|\| r.bottom \< 0 \|\| r.top \> h)  
                    continue;  
                ctx.font \= \`\${style.fontStyle} \${style.fontWeight} \${style.fontSize} \${style.fontFamily}\`;  
                ctx.fillStyle \= style.color;  
                ctx.textBaseline \= 'top';  
                ctx.fillText(style.textTransform \=== 'uppercase' ? match\[0\].toUpperCase() : match\[0\], r.left, r.top);  
                count++;  
            }  
        }  
        const paint \= overlay.getContext('2d')  
          , sample \= small.getContext('2d')  
          , start \= performance.now();  
        overlay.style.opacity \= 1;  
        function tick(now) {  
            const p \= Math.min(1, (now \- start) / 720\)  
              , block \= Math.round(2 \+ 30 \* Math.sin(p \* Math.PI \* .7));  
            small.width \= Math.max(1, Math.ceil(source.width / block));  
            small.height \= Math.max(1, Math.ceil(source.height / block));  
            sample.drawImage(source, 0, 0, small.width, small.height);  
            paint.imageSmoothingEnabled \= false;  
            paint.clearRect(0, 0, overlay.width, overlay.height);  
            paint.drawImage(small, 0, 0, overlay.width, overlay.height);  
            for (let y \= 0; y \< overlay.height; y \+= 4\) {  
                paint.fillStyle \= 'rgba(0,0,0,.18)';  
                paint.fillRect(0, y, overlay.width, 1);  
            }  
            overlay.style.opacity \= String(1 \- p);  
            overlay.style.transform \= \`translateX(\${Math.sin(p \* 55\) \* (1 \- p) \* 8}px)\`;  
            if (p \< 1\)  
                frame \= requestAnimationFrame(tick);  
            else  
                stop();  
        }  
        frame \= requestAnimationFrame(tick);  
    }  
    return {  
        play,  
        stop  
    };  
}  
export function pixelFloppy(element, reduced) {  
    const model \= element.querySelector('.floppy-model');  
    let frame;  
    return hidden \=\> {  
        cancelAnimationFrame(frame);  
        if (reduced.matches)  
            return;  
        const start \= performance.now();  
        function tick(now) {  
            const p \= Math.min(1, (now \- start) / 480\)  
              , cut \= hidden ? p : 1 \- p;  
            let cells \= '';  
            const size \= 16;  
            for (let y \= 0; y \< 19; y++)  
                for (let x \= 0; x \< 18; x++) {  
                    const noise \= ((x \* 73 \+ y \* 137\) % 101\) / 101;  
                    if (noise \> cut \* .97)  
                        cells \+= \`\<rect x="$x*size"y="${y \* size}" width="$size"height="${size}" fill="white"/\>\`;  
                }  
            model.style.maskImage \= \`url("data:image/svg+xml,\${encodeURIComponent(\`\<svg xmlns="http\://www\.w3.org/2000/svg" width="288" height="304"\>\${cells}\</svg\>\`)}")\`;  
            model.style.maskSize \= '100% 100%';  
            if (p \< 1\)  
                frame \= requestAnimationFrame(tick);  
            else  
                model.style.maskImage \= '';  
        }  
        frame \= requestAnimationFrame(tick);  
    }  
    ;  
}

menu-search.js  
export const MENU\_PAGES=\[  
 {title:'Intro',type:'Page',href:'/\#/opening'},  
 {title:'Moments',type:'Page',href:'/\#/moment'},  
 {title:'Our work',type:'Page',href:'/projects/'},  
 {title:'The difference',type:'Page',href:'/approach/'},  
 {title:'The studio',type:'Page',href:'/studio/'},  
 {title:'Let’s talk',type:'Window',href:'\#contact'}  
\];  
export function searchMenu(items,query='',filter=''){  
 const clean=s=\>String(s\|\|'').normalize('NFD').replace(/\[\\u0300-\\u036f\]/g,'').toLowerCase();  
 const terms=clean(query).trim().split(/\\s+/).filter(Boolean);  
 return items.filter(item=\>(\!filter\|\|item.type===filter)&\&terms.every(term=\>clean(item.title+' '+(item.description\|\|'')).includes(term))).map((item,index)=\>({item,index,score:terms.reduce((s,t)=\>s+(clean(item.title).startsWith(t)?3:clean(item.title).includes(t)?2:0),0)})).sort((a,b)=\>b.score-a.score\|\|a.index-b.index).map(x=\>x.item);  
}

moment.js  
import { GALLERY\_IMAGES } from './gallery-images.js';

export function createMomentScene(scene, reducedMotion) {  
  const gallery \= scene.querySelector('.tornado-cards');  
  const pixels \= scene.querySelector('.headline-pixels');  
  const headline \= scene.querySelector('.moment-title');  
  const continueButton \= scene.querySelector('.moment-continue');  
  let formed \= false, headlineComplete \= false;  
  const canContinue \= () \=\> active && (formed \|\| (headlineComplete && flightTime \>= 3500));  
  function updateReady() {  
    if (canContinue()) formed \= true;  
    continueButton.disabled \= \!formed;  
  }  
  let headlineHovered \= false;  
  let headlineRun \= 0;  
  let active \= false;  
  let paused \= reducedMotion.matches;  
  let frame;  
  let angle \= 0;  
  let yaw \= 0, targetYaw \= 0, tilt \= 0, targetTilt \= 0, pan \= 0, targetPan \= 0;  
  let velocity \= 0;  
  let flightTime \= 0;  
  let dragging \= false;  
  let pointer \= null;  
  let lastPointerX \= 0, lastPointerY \= 0;  
  const clamp \= (v,min,max) \=\> Math.min(max,Math.max(min,v));  
  const mix \= (a,b,t) \=\> a+(b-a)\*t;  
  const smooth \= t \=\> t\*t\*(3-2\*t);  
  let last \= 0;  
  let run \= 0;  
  let preparePromise;  
  let revealAnimation;  
  let items \= \[\];  
  const shuffle \= values \=\> {  
    const result \= \[...values\];  
    for (let i=result.length-1;i\>0;i--) {  
      const j=Math.floor(Math.random()\*(i+1));  
      \[result\[i\],result\[j\]\]=\[result\[j\],result\[i\]\];  
    }  
    return result;  
  };  
  function prepare(fresh=false) {  
    if(fresh){gallery.replaceChildren();preparePromise=null;items=\[\];}  
    if (preparePromise) return preparePromise;  
    const products=shuffle(GALLERY\_IMAGES);  
    items=products.map((asset,i) \=\> {  
      const card=document.createElement('div');  
      card.className='tornado-card';  
      const image=new Image();  
      image.alt='';  
      image.decoding='async';  
      image.width=asset.width;  
      image.height=asset.height;  
      image.src=asset.src;  
      image.addEventListener('error',()=\>{ card.style.visibility='hidden'; });  
      card.append(image);  
      gallery.append(card);  
      return {card,image,index:i, scatter:(Math.random()-.5), spin:(Math.random()-.5)\*110};  
    });  
    preparePromise=Promise.allSettled(\[  
      ...items.map(({image})=\>image.decode()),  
      document.fonts.load('600 25px "Restart Soft"'),  
      document.fonts.load('600 25px "Perfectly Nineties"'),  
    \]);  
    position();  
    return preparePromise;  
  }  
  function position() {  
    const width=scene.clientWidth, height=scene.clientHeight;  
    const narrow=width\<600;  
    // Occupy most of the viewport, leaving space around the outermost cards.  
    const radius=Math.min(width\*.38,620);  
    const step=narrow?48:65;  
    const cardWidth=narrow?clamp(width\*.29,106,150):clamp(width\*.15,145,195);  
    gallery.style.transform=\`translate3d(0,$panpx,0)rotateX(${tilt}deg)\`;  
    items.forEach(({card,index,scatter,spin})=\>{  
      const a=index\*(narrow?52:30)+angle+yaw;  
      const radians=a\*Math.PI/180;  
      const depth=Math.cos(radians);  
      const targetY=(index-(items.length-1)/2)\*step;  
      const time=flightTime-index\*38;  
      const rise=reducedMotion.matches?1:clamp(time/1400,0,1);  
      const assemble=reducedMotion.matches?1:smooth(clamp((time-950)/1900,0,1));  
      const lift=1-Math.pow(1-rise,3);  
      const cloudX=scatter\*width\*.85;  
      const cloudY=(index-(items.length-1)/2)\*27;  
      const x=mix(cloudX,Math.sin(radians)\*radius,assemble);  
      const y=mix(height\*.85+index\*12, mix(cloudY,targetY,assemble),lift);  
      const z=mix(-220,depth\*radius,assemble);  
      card.style.width=\`$cardWidthpx`;card.style.height=`${cardWidth\*1.32}px\`;  
      card.style.opacity=String(clamp(rise\*3,0,1));  
      card.style.transform=\`translate(-50%,-50%) translate3d($xpx,${y}px,$zpx)rotateY(${a\*assemble}deg) rotateZ($spin*(1-assemble)deg)`;card.style.filter=`brightness(${.4+(depth+1)\*.22}) blur(\${Math.max(0,-depth)\*1.2\*assemble}px)\`;  
    });  
  }  
  function tick(now) {  
    if (\!active \|\| document.hidden) return;  
    const delta=Math.min(now-last,50);  
    last=now;  
    flightTime+=delta;  
    if(\!paused && \!dragging) angle+=delta\*.006;  
    if(\!dragging && \!paused) { targetYaw+=velocity\*delta/16.67; velocity\*=Math.pow(.94,delta/16.67); }  
    const ease=1-Math.exp(-delta/100);  
    yaw=mix(yaw,targetYaw,ease);  
    tilt=mix(tilt,targetTilt,ease);  
    pan=mix(pan,targetPan,ease);  
    position();  
    updateReady();  
    if(\!paused \|\| flightTime\<3600 \|\| dragging \|\| Math.abs(targetYaw-yaw)\>.02 \|\| Math.abs(targetPan-pan)\>.1 \|\| Math.abs(targetTilt-tilt)\>.02) frame=requestAnimationFrame(tick);  
  }  
  function wake() {  
    cancelAnimationFrame(frame);  
    if(active && \!document.hidden) { last=performance.now(); frame=requestAnimationFrame(tick); }  
  }  
  scene.addEventListener('pointerdown',event=\>{  
    if(\!active \|\| event.button\!==0 \|\| event.target.closest('button')) return;  
    dragging=true; pointer=event.pointerId; velocity=0;  
    lastPointerX=event.clientX; lastPointerY=event.clientY;  
    scene.setPointerCapture(pointer);  
    scene.classList.add('explored','dragging');  
    wake();  
  });  
  scene.addEventListener('pointermove',event=\>{  
    if(\!dragging \|\| event.pointerId\!==pointer) return;  
    const dx=event.clientX-lastPointerX, dy=event.clientY-lastPointerY;  
    targetYaw+=dx\*.24;  
    velocity=clamp(dx\*.18,-4,4);  
    targetTilt=clamp(targetTilt-dy\*.06,-16,16);  
    targetPan=clamp(targetPan+dy\*.65,-scene.clientHeight\*.3,scene.clientHeight\*.3);  
    lastPointerX=event.clientX; lastPointerY=event.clientY;  
  });  
  const release=()=\>{dragging=false;pointer=null;scene.classList.remove('dragging');};  
  scene.addEventListener('pointerup',release);  
  scene.addEventListener('pointercancel',release);  
  scene.addEventListener('lostpointercapture',release);  
  scene.addEventListener('wheel',event=\>{  
    if(\!active \|\| event.ctrlKey \|\| Math.abs(event.deltaY)\>Math.abs(event.deltaX)) return;  
    event.preventDefault(); event.stopPropagation();  
    targetYaw+=(event.deltaX+event.deltaY)\*.1;  
    scene.classList.add('explored'); wake();  
  },{passive:false});  
  scene.addEventListener('keydown',event=\>{  
    if(\!active \|\| \!\['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'\].includes(event.key))return;  
    event.preventDefault();  
    if(event.key==='ArrowLeft')targetYaw-=24;  
    if(event.key==='ArrowRight')targetYaw+=24;  
    if(event.key==='ArrowUp')targetPan=clamp(targetPan+70,-scene.clientHeight\*.3,scene.clientHeight\*.3);  
    if(event.key==='ArrowDown')targetPan=clamp(targetPan-70,-scene.clientHeight\*.3,scene.clientHeight\*.3);  
    if(event.key==='Home'){targetYaw=0;targetTilt=0;targetPan=0;velocity=0;}  
    scene.classList.add('explored');wake();  
  });  
  function revealHeadline() {  
    const revealId=++headlineRun;  
    cancelAnimationFrame(revealAnimation);  
    scene.classList.remove('text-ready','for-ready');  
    if(headlineHovered) { scene.classList.add('text-ready'); return; }  
    if (reducedMotion.matches) { scene.classList.add('text-ready','for-ready'); headlineComplete=true; updateReady(); return; }  
    const ctx=pixels.getContext('2d');  
    const buffer=document.createElement('canvas');  
    buffer.width=460; buffer.height=108;  
    const b=buffer.getContext('2d');  
    if (\!ctx \|\| \!b) { scene.classList.add('text-ready','for-ready'); headlineComplete=true; updateReady(); return; }  
    b.fillStyle='\#e7e7e7'; b.textBaseline='alphabetic';  
    const box=headline.getBoundingClientRect();  
    headline.querySelectorAll('.moment-words\>span:first-child,.moment-line\>span').forEach(line=\>{  
      const rect=line.getBoundingClientRect(),style=getComputedStyle(line);  
      b.font=\`\${style.fontWeight} \${parseFloat(style.fontSize)\*2}px $style.fontFamily`;b.letterSpacing=`${parseFloat(style.letterSpacing)\*2}px\`;  
      const marker=document.createElement('span');marker.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';line.append(marker);  
      const baseline=marker.getBoundingClientRect().top;marker.remove();  
      const text=line.textContent.toUpperCase(),width=b.measureText(text).width;  
      b.fillText(text,(rect.left-box.left)\*2+(rect.width\*2-width)/2,(baseline-box.top)\*2);  
    });  
    const source=b.getImageData(0,0,460,108).data;  
    pixels.width=460; pixels.height=108;  
    const started=performance.now(), currentRun=run;  
    function draw(now) {  
      if (\!active \|\| currentRun\!==run \|\| revealId\!==headlineRun) return;  
      const p=Math.min(1,(now-started)/1900);  
      ctx.clearRect(0,0,460,108);  
      const size=p\<.3?8:p\<.65?4:2;  
      for(let y=0;y\<108;y+=size) for(let x=0;x\<460;x+=size) {  
        const alpha=source\[(y\*460+x)\*4+3\];  
        const noise=((x\*17+y\*31)%101)/101;  
        if(alpha && noise\<p) { ctx.fillStyle=\`rgba(231,231,231,\${alpha/255})\`; ctx.fillRect(x,y,size,size); }  
      }  
      if(p\<1) revealAnimation=requestAnimationFrame(draw);  
      else {  
        scene.classList.add('text-ready');  
        // Hold the completed words for 1.5 seconds before the italic word enters.  
        setTimeout(()=\>{if(active && currentRun===run && revealId===headlineRun && \!headlineHovered) { scene.classList.add('for-ready'); setTimeout(()=\>{if(active && currentRun===run && revealId===headlineRun){headlineComplete=true;updateReady();}},850); }},1500);  
      }  
    }  
    revealAnimation=requestAnimationFrame(draw);  
  }  
  headline.addEventListener('pointerenter',event=\>{  
    if(\!active \|\| \!formed \|\| event.pointerType\!=='mouse')return;  
    headlineHovered=true; headlineRun++;  
    cancelAnimationFrame(revealAnimation);  
    scene.classList.add('text-ready');  
    scene.classList.remove('for-ready');  
  });  
  headline.addEventListener('pointerleave',event=\>{  
    if(\!active \|\| event.pointerType\!=='mouse' \|\| \!headlineHovered)return;  
    headlineHovered=false;  
    revealHeadline();  
  });  
  async function start() {  
    active=true; formed=false; headlineComplete=false; continueButton.disabled=true;  
    const currentRun=++run;  
    await Promise.race(\[prepare(true),new Promise(resolve=\>setTimeout(resolve,2000))\]);  
    if(\!active \|\| currentRun\!==run) return;  
    scene.classList.add('moment-active');  
    flightTime=reducedMotion.matches?3600:0;  
    last=performance.now();  
    position();  
    frame=requestAnimationFrame(tick);  
    setTimeout(()=\>{if(active && currentRun===run) revealHeadline();},reducedMotion.matches?0:1300);  
  }  
  function reset() {  
    active=false; formed=false; headlineComplete=false; continueButton.disabled=true; run++; headlineRun++; headlineHovered=false;  
    dragging=false; velocity=0; flightTime=0;  
    yaw=targetYaw=tilt=targetTilt=pan=targetPan=0;  
    cancelAnimationFrame(frame); cancelAnimationFrame(revealAnimation);  
    scene.classList.remove('moment-leaving');  
    items.forEach(({card})=\>card.getAnimations().forEach(a=\>a.cancel()));  
    scene.classList.remove('moment-active','text-ready','for-ready','explored','dragging');  
    const ctx=pixels.getContext('2d');  
    ctx?.clearRect(0,0,pixels.width,pixels.height);  
  }  
  function setPaused(value) {  
    paused=value;  
    cancelAnimationFrame(frame);  
    last=performance.now();  
    if(active && \!document.hidden) frame=requestAnimationFrame(tick);  
  }  
  document.addEventListener('visibilitychange',()=\>setPaused(paused));  
  window.addEventListener('resize',()=\>{if(active)position();});  
  async function leave() {  
    active=false;run++;headlineRun++;  
    cancelAnimationFrame(frame);cancelAnimationFrame(revealAnimation);  
    await Promise.all(items.map(({card,index,scatter,spin})=\>{  
      const from=card.style.transform;  
      const animation=card.animate(reducedMotion.matches?\[{opacity:1},{opacity:0}\]:\[  
        {transform:from,opacity:1},  
        {transform:\`\${from} translate3d($scatter*180px,40px,0)rotateZ(${spin\*.1}deg)\`,opacity:1,offset:.15},  
        {transform:\`$fromtranslate3d(${scatter\*1800}px,$-scene.clientHeight*3px,0)rotateZ(${spin\*3}deg)\`,opacity:0},  
      \],{duration:reducedMotion.matches?180:1500,delay:reducedMotion.matches?0:index\*22,easing:'cubic-bezier(.55,0,.8,.4)',fill:'forwards'});  
      return animation.finished.catch(()=\>{});  
    }));  
  }  
  function resume() {  
    reset();  
    prepare(true);  
    active=true; formed=headlineComplete=true; flightTime=3600;  
    scene.classList.add('moment-active','text-ready','for-ready');  
    position(); updateReady(); wake();  
  }  
  return {prepare,start,reset,setPaused,leave,resume,canContinue};  
}

export function createMusicPlayer() {  
  const audio=document.querySelector('.music-track');  
  const button=document.querySelector('.music-toggle');  
  const icon=button.querySelector('img');  
  const podcast=document.querySelector('.podcast-track');  
  const podcastButton=document.querySelector('.podcast-toggle');  
  function syncPodcast() {  
    const playing=\!podcast.paused && \!podcast.ended;  
    podcastButton.setAttribute('aria-label',playing?'Pause garcy.studio podcast':'Play garcy.studio podcast');  
    podcastButton.setAttribute('aria-pressed',String(playing));  
    podcastButton.querySelector('img').src=playing?'./assets/controls/pause.svg':'./assets/controls/play.svg';  
    podcastButton.classList.toggle('playing',playing);  
  }  
  podcastButton.addEventListener('click',async()=\>{  
    if(\!podcast.paused){podcast.pause();return;}  
    audio.pause();  
    try { await podcast.play(); } catch { /\* Keep the play control available for retry. \*/ }  
    syncPodcast();  
  });  
  podcast.addEventListener('play',()=\>{audio.pause();syncPodcast();});  
  podcast.addEventListener('pause',syncPodcast);  
  podcast.addEventListener('ended',syncPodcast);  
  podcast.addEventListener('error',()=\>podcastButton.setAttribute('aria-label','Podcast could not load. Try again'));  
  audio.addEventListener('play',()=\>podcast.pause());  
  syncPodcast();  
  audio.volume=.24;  
  function sync() {  
    const playing=\!audio.paused;  
    button.setAttribute('aria-label',playing?'Pause Starfall by Ryan Taubert':'Play Starfall by Ryan Taubert');  
    button.setAttribute('aria-pressed',String(playing));  
    icon.src=playing?'./assets/controls/pause.svg':'./assets/controls/play.svg';  
    button.classList.toggle('playing',playing);  
  }  
  async function play() {  
    try { await audio.play(); } catch { /\* Play control remains available if playback is blocked. \*/ }  
    sync();  
  }  
  button.addEventListener('click',()=\>audio.paused?play():audio.pause());  
  audio.addEventListener('play',sync); audio.addEventListener('pause',sync);  
  audio.addEventListener('error',()=\>{button.setAttribute('aria-label','Music could not load. Try again');});  
  sync();  
  return {play,pause:()=\>audio.pause()};  
}

project-pages.js  
import {pixelCard} from './card-effects.js';  
import {PROJECT\_SLUGS} from './project-registry.js';  
export {PROJECT\_SLUGS};  
export function createProjectPages(reduced, onBack) {  
    const root \= document.querySelector('.case-studies');  
    let observer, warmObserver, effects \= new WeakMap(), active \= false, paused \= reduced.matches, generation \= 0, animations \= \[\];  
    const visibleVideos \= new Set();  
    let firstStart \= true  
      , serviceOrigin \= null;  
    try {  
        const ref \= new URL(document.referrer);  
        if (ref.origin \=== location.origin && /^\\/projects\\/\[^/\]+\\/?\$/.test(location.pathname) && \['/best-branding/', '/websites/', '/mobile-apps-saas-design/', '/full-product-design/'\].includes(ref.pathname))  
            serviceOrigin \= ref.pathname;  
    } catch {}  
    const back \= () \=\> {  
        if (serviceOrigin) {  
            if (history.length \> 1\)  
                history.back();  
            else  
                location.assign(serviceOrigin);  
        } else  
            onBack();  
    }  
    ;  
    if (serviceOrigin)  
        root.querySelectorAll('.case-back,.case-return').forEach(link \=\> {  
            link.href \= serviceOrigin;  
            const label \= link.querySelector('span');  
            if (label)  
                label.textContent \= 'Back to service';  
        }  
        );  
    function media() {  
        root.querySelectorAll('video').forEach(v \=\> {  
            if (active && \!paused && \!document.hidden && visibleVideos.has(v)) {  
                if (\!v.src) {  
                    v.src \= v.dataset.src;  
                    v.load();  
                }  
                v.play().catch( () \=\> {}  
                );  
            } else  
                v.pause();  
        }  
        );  
    }  
    function prepareBlock(block) {  
        let prepared \= effects.get(block);  
        if (prepared)  
            return prepared;  
        block.querySelectorAll('img\[loading="lazy"\]').forEach(img \=\> {  
            img.loading \= 'eager';  
        }  
        );  
        const video \= block.querySelector('video');  
        if (video?.dataset.deferPoster) {  
            video.poster \= video.dataset.deferPoster;  
            delete video.dataset.deferPoster;  
        }  
        const effect \= pixelCard(block);  
        prepared \= {  
            effect,  
            ready: effect.prepare()  
        };  
        effects.set(block, prepared);  
        return prepared;  
    }  
    async function reveal(block, run) {  
        if (reduced.matches) {  
            block.classList.add('case-revealed');  
            return;  
        }  
        const {effect, ready} \= prepareBlock(block);  
        await ready;  
        if (run \!== generation) {  
            block.querySelector('.card-pixels')?.remove();  
            return;  
        }  
        effect.set(0);  
        block.classList.add('case-revealed');  
        const animation \= block.animate(\[{  
            transform: 'translateY(100px)',  
            opacity: .3  
        }, {  
            transform: 'translateY(0)',  
            opacity: 1  
        }\], {  
            duration: 1100,  
            easing: 'cubic-bezier(.16,1,.3,1)'  
        });  
        animations.push(animation);  
        const start \= performance.now();  
        function tick(now) {  
            if (run \!== generation)  
                return;  
            const p \= Math.min(1, (now \- start) / 1400);  
            effect.set(p);  
            if (p \< 1\)  
                requestAnimationFrame(tick);  
            else {  
                block.querySelector('.card-pixels')?.remove();  
                effects.delete(block);  
            }  
        }  
        requestAnimationFrame(tick);  
    }  
    function start(slug) {  
        reset();  
        active \= true;  
        root.hidden \= false;  
        root.inert \= false;  
        const run \= generation;  
        let page \= root.querySelector(\`\[data-case="\${slug}"\]\`);  
        if (\!page) {  
            const template \= root.querySelector(\`template\[data-project-template="\${slug}"\]\`);  
            if (template) {  
                root.append(template.content.cloneNode(true));  
                page \= root.querySelector(\`\[data-case="\${slug}"\]\`);  
            }  
        }  
        if (\!page) {  
            page \= root.querySelector('\[data-case="generic"\]');  
            const id \= Object.keys(PROJECT\_SLUGS).find(k \=\> PROJECT\_SLUGS\[k\] \=== slug);  
            const card \= document.querySelector(\`.project-card\[data-project="\${id}"\]\`);  
            page.querySelector('.case-cover img').src \= (card.querySelector('img').dataset.deferSrc \|\| card.querySelector('img').src);  
            page.querySelector('h1').textContent \= card.querySelector('h3').textContent;  
            page.querySelector('.case-intro').textContent \= \[...card.querySelector('.project-services').childNodes\].map(n \=\> n.textContent.trim()).filter(Boolean).join(', ');  
            page.querySelector('.case-logo p').textContent \= card.querySelector('h3').textContent;  
        }  
        page.hidden \= false;  
        page.querySelectorAll('\[data-defer-src\]').forEach(img \=\> {  
            if (img.dataset.deferSrcset) {  
                img.srcset \= img.dataset.deferSrcset;  
                delete img.dataset.deferSrcset;  
            }  
            img.src \= img.dataset.deferSrc;  
            delete img.dataset.deferSrc;  
        }  
        );  
        root.scrollTop \= 0;  
        root.focus({  
            preventScroll: true  
        });  
        document.title \= JSON.parse(document.querySelector('\#project-metadata')?.textContent \|\| '{}').projects?.\[slug\]?.title \|\| \`\${page.querySelector('h1').firstChild.textContent} — garcy.studio\`;  
        const directLanding \= firstStart && document.documentElement.dataset.project \=== slug;  
        firstStart \= false;  
        for (const block of page.querySelector('.case-hero').children) {  
            block.dataset.revealed \= 'true';  
            const video \= block.querySelector('video');  
            if (video?.dataset.deferPoster) {  
                video.poster \= video.dataset.deferPoster;  
                delete video.dataset.deferPoster;  
            }  
            if (directLanding)  
                block.classList.add('case-revealed');  
            else  
                reveal(block, run);  
        }  
        warmObserver \= new IntersectionObserver(entries \=\> {  
            for (const e of entries)  
                if (e.isIntersecting) {  
                    prepareBlock(e.target);  
                    warmObserver.unobserve(e.target);  
                }  
        }  
        ,{  
            root,  
            rootMargin: '75% 0px',  
            threshold: 0  
        });  
        observer \= new IntersectionObserver(entries \=\> {  
            for (const e of entries) {  
                const v \= e.target.querySelector('video');  
                if (v) {  
                    if (e.isIntersecting && v.dataset.deferPoster) {  
                        v.poster \= v.dataset.deferPoster;  
                        delete v.dataset.deferPoster;  
                    }  
                    if (e.isIntersecting)  
                        visibleVideos.add(v);  
                    else  
                        visibleVideos.delete(v);  
                    media();  
                }  
                if (e.isIntersecting && \!e.target.dataset.revealed) {  
                    e.target.dataset.revealed \= 'true';  
                    reveal(e.target, run);  
                }  
            }  
        }  
        ,{  
            root,  
            threshold: .01  
        });  
        page.querySelectorAll('.case-block').forEach(block \=\> {  
            warmObserver.observe(block);  
            observer.observe(block);  
        }  
        );  
        if (page.querySelector('.case-cover video'))  
            observer.observe(page.querySelector('.case-cover'));  
    }  
    function reset() {  
        generation++;  
        active \= false;  
        observer?.disconnect();  
        warmObserver?.disconnect();  
        effects \= new WeakMap();  
        visibleVideos.clear();  
        animations.forEach(a \=\> a.cancel());  
        animations \= \[\];  
        media();  
        root.hidden \= true;  
        root.inert \= true;  
        root.querySelectorAll('.case-page').forEach(p \=\> p.hidden \= true);  
        root.querySelectorAll('.case-block,.case-hero\>\*').forEach(b \=\> {  
            delete b.dataset.revealed;  
            b.classList.remove('case-revealed', 'card-resolving');  
            b.querySelector('.card-pixels')?.remove();  
        }  
        );  
        document.title \= 'garcy.studio';  
    }  
    root.addEventListener('click', e \=\> {  
        if (\!e.target.closest('.case-back,.case-return') \|\| e.metaKey \|\| e.ctrlKey \|\| e.shiftKey \|\| e.altKey)  
            return;  
        e.preventDefault();  
        back();  
    }  
    );  
    root.addEventListener('keydown', e \=\> {  
        if (e.key \=== 'Escape') {  
            e.preventDefault();  
            back();  
        }  
    }  
    );  
    document.addEventListener('visibilitychange', media);  
    return {  
        start,  
        reset,  
        setPaused(value) {  
            paused \= value;  
            media();  
        }  
    };  
}

project-registry.js  
// Generated by the project editor/build. Content lives in content/projects.json.  
export const PROJECT\_SLUGS \= {  
    "society-for-all": "society-for-all",  
    "koscom-30": "koscom-30",  
    "unit-architects": "unit-architects",  
    "oslo": "otk",  
    "goodveri": "goodveri",  
    "magu": "magu",  
    "aomu": "aomu",  
    "oslo-02": "arkady",  
    "magu-02": "luxury-travel-digest",  
    "aomu-02": "sunnysoft",  
    "liberalni-institut": "liberalni-institut",  
    "nachonacho": "nachonacho",  
    "walletii": "walletii"  
};  
export const PROJECT\_NAMES \= {  
    "society-for-all": "SOFA, Society for All",  
    "koscom-30": "Koscom",  
    "unit-architects": "UNIT architekti",  
    "otk": "Oslo Tennisklubb",  
    "goodveri": "Goodveri",  
    "magu": "Magu",  
    "aomu": "AOMU",  
    "arkady": "Arkády",  
    "luxury-travel-digest": "Luxury Travel Digest",  
    "sunnysoft": "Sunnysoft",  
    "liberalni-institut": "Liberální institut",  
    "nachonacho": "NachoNacho",  
    "walletii": "Walletii"  
};  
routes.js  
import {PROJECT\_SLUGS} from './project-pages.js';  
import {SECTION\_PAGES} from './site-content.js';  
export const SECTION\_ROUTES \= \['loader', 'opening', 'moment', 'approach', 'clients', 'testimonials', 'projects', 'studio'\];  
export function readRoute(hash, pathname='/') {  
   const project \= pathname.match(/^\\/projects\\/(\[^/\]+)\\/?\$/);  
   if (project && Object.values(PROJECT\_SLUGS).includes(project\[1\]))  
       return \`project/\${project\[1\]}\`;  
   const section \= Object.entries(SECTION\_PAGES).find( (\[,page\]) \=\> page.path.replace(/\\/\$/, '') \=== pathname.replace(/\\/\$/, ''));  
   if (section)  
       return section\[0\];  
   const route \= hash.replace(/^\#\\/?/, '');  
   return SECTION\_ROUTES.includes(route) \|\| (route.startsWith('project/') && Object.values(PROJECT\_SLUGS).includes(route.slice(8))) ? route : 'loader';  
}  
scene-effects.js  
// Small, cached ordered-dither masks dissolve live DOM without taking screenshots.  
let masks;  
function ditherMasks(){  
  if(masks)return masks;  
  const bayer=\[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5\];  
  const canvas=document.createElement('canvas');canvas.width=canvas.height=32;  
  const ctx=canvas.getContext('2d');if(\!ctx)return \[\];  
  masks=Array.from({length:17},(\_,level)=\>{  
    ctx.clearRect(0,0,32,32);ctx.fillStyle='\#fff';  
    bayer.forEach((value,i)=\>{if(value\>=level)ctx.fillRect(i%4\*8,Math.floor(i/4)\*8,8,8);});  
    return \`url("\${canvas.toDataURL()}")\`;  
  });return masks;  
}  
export function flyAwayInPixels(element,reduced){  
  const textures=ditherMasks();let frame,resolve,finished=false;  
  const duration=reduced?180:1450,start=performance.now();  
  const animation=element.animate(reduced?\[{opacity:1},{opacity:0}\]:\[  
    {translate:'0 0',opacity:1},{translate:'0 \-115vh',opacity:0}  
  \],{duration,easing:'cubic-bezier(.55,0,.8,.4)',fill:'forwards'});  
  const done=new Promise(r=\>resolve=r);  
  function finish(){if(finished)return;finished=true;cancelAnimationFrame(frame);resolve();}  
  function draw(now){  
    const p=Math.min(1,(now-start)/duration);  
    const level=Math.min(16,Math.floor(Math.max(0,(p-.15)/.85)\*17));  
    if(\!reduced && textures.length){element.style.maskImage=textures\[level\];element.style.maskSize='32px 32px';}  
    if(p\<1)frame=requestAnimationFrame(draw);  
  }  
  frame=requestAnimationFrame(draw);animation.finished.then(finish,finish);  
  return {done,cancel(){finish();animation.cancel();element.style.maskImage='';element.style.maskSize='';}};  
}

export function scatterInPixels(elements,reduced,startDelay=0){  
 const effects=elements.map((element,i)=\>{  
  const textures=ditherMasks(),duration=reduced?160:1100+Math.random()\*450,delay=reduced?0:startDelay+Math.random()\*160;  
  const animation=element.animate(reduced?\[{opacity:1},{opacity:0}\]:\[{translate:'0 0',rotate:'0deg',opacity:1},{translate:\`\${(Math.random()-.5)\*60}vw \-125vh\`,rotate:\`\${(Math.random()-.5)\*45}deg\`,opacity:0}\],{duration,delay,easing:'cubic-bezier(.45,0,.8,.3)',fill:'forwards'});  
  let frame;const start=performance.now()+delay;  
  function draw(now){const p=Math.max(0,Math.min(1,(now-start)/duration));if(\!reduced){element.style.maskImage=textures\[Math.min(16,Math.floor(p\*p\*17))\];element.style.maskSize='32px 32px';}if(p\<1)frame=requestAnimationFrame(draw);}  
  frame=requestAnimationFrame(draw);  
  return {done:animation.finished.catch(()=\>{}),cancel(){cancelAnimationFrame(frame);animation.cancel();element.style.maskImage=element.style.maskSize='';}};  
 });  
 return {done:Promise.all(effects.map(e=\>e.done)),cancel(){effects.forEach(e=\>e.cancel());}};  
}

// Lift cards out of the horizontally clipped carousel before their vertical flight.  
export function departStory(viewport,textElements,cards,reduced){  
 const rect=viewport.getBoundingClientRect(),layer=document.createElement('div');layer.className='story-departure';viewport.append(layer);  
 const visible=cards.map(card=\>({card,rect:card.getBoundingClientRect(),opacity:card.style.opacity})).filter(({rect:r})=\>r.right\>rect.left&\&r.left\<rect.right);  
 const clones=visible.map(({card,rect:r})=\>{const clone=card.cloneNode(true);clone.querySelectorAll('canvas').forEach(c=\>c.remove());clone.classList.remove('card-resolving');Object.assign(clone.style,{position:'absolute',left:\`\${r.left-rect.left}px\`,top:\`$r.top-rect.toppx`,width:`${r.width}px\`,height:\`\${r.height}px\`,transform:'none',opacity:'1',backdropFilter:'none',webkitBackdropFilter:'none'});layer.append(clone);card.style.opacity='0';return clone;});  
 const textEffects=textElements.map(el=\>flyAwayInPixels(el,reduced));  
 const cardEffect=scatterInPixels(clones,reduced,300);  
 return {done:Promise.all(\[...textEffects.map(e=\>e.done),cardEffect.done\]),cancel(){textEffects.forEach(e=\>e.cancel());cardEffect.cancel();layer.remove();visible.forEach(({card,opacity})=\>card.style.opacity=opacity);}};  
}

site-content.js  
// Shared, factual site metadata. Project-specific editorial content lives in content/projects.json.  
export const SITE \= {  
    origin: 'https\://www\.garcy.studio',  
    name: 'garcy.studio',  
    title: 'Design that makes you unmistakable — garcy.studio',  
    description: 'A brand people ask about. A website that makes things click. We design brands, websites and digital products that make your business unmistakable.',  
    email: 'hello@garcy.studio',  
    measurementId: 'G-3DXVNT1G04',  
    // Existing verified studio stream; activated only in public builds.  
    socials: \['https\://www\.behance.net/thisisgarcy', 'https\://www\.instagram.com/garcy.studio/', 'https\://www\.linkedin.com/company/garcy-studio/', 'https\://www\.youtube.com/@garcystudio'\],  
};  
export {SERVICES} from './content/services.js';  
import {PROJECT\_NAMES} from './project-registry.js';  
export {PROJECT\_NAMES};  
export const SECTION\_PAGES \= {  
    projects: {  
        path: '/projects/',  
        title: 'Selected design projects — garcy.studio',  
        description: 'Explore selected branding, packaging and digital design projects by garcy.studio.'  
    },  
    studio: {  
        path: '/studio/',  
        title: 'The studio — garcy.studio',  
        description: 'Meet the people behind garcy.studio, an independent design studio in Prague creating distinctive brands and digital experiences since 2008.'  
    },  
    approach: {  
        path: '/approach/',  
        title: 'The difference — garcy.studio',  
        description: 'Our approach to distinctive brands, websites and digital products. Design for people who refuse to be forgettable.'  
    }  
};  
export function routeMeta(route, projects={}) {  
    const slug \= route.startsWith('project/') ? route.slice(8) : null;  
    return slug && PROJECT\_NAMES\[slug\] ? {  
        title: \`\${PROJECT\_NAMES\[slug\]} — Selected work — garcy.studio\`,  
        description: \`Explore $PROJEC{T}_{N}AMES[slug],aselecteddesignprojectbygarcy.studio.`,path:`/projects/${slug}/\`,  
        ...projects\[slug\]  
    } : SECTION\_PAGES\[route\] \|\| {  
        title: SITE.title,  
        description: SITE.description,  
        path: '/'  
    };  
}

story.js  
import {pixelCard} from './card-effects.js';  
import { departStory } from './scene-effects.js';  
import { testimonialVideo,setupTestimonialLoops } from './testimonial-videos.js';  
// Desktop 03–05. Native vertical scrolling drives the staged composition.  
const clamp \= (n, a=0, b=1) \=\> Math.max(a, Math.min(b,n));  
const ease \= n \=\> { n=clamp(n); return n\*n\*(3-2\*n); };  
const LOGOS \= \['o2','ooredoo','skoda','creative-dock','mccann','cnc','cbre','cpi','magu','anect','nachonacho','lmc','linet','seba','sefira'\];

// Draw the laid-out words, including italic spans, so the pixel layer follows wrapping.  
export function pixelReveal(element, {duration=1600, stagger=0, reduced=false, exclude=null}={}) {  
  element.querySelectorAll(':scope \> canvas').forEach(c=\>c.remove());  
  const words=\[...element.querySelectorAll('\[data-pixel-word\]')\].filter(word=\>\!exclude \|\| \!word.closest(exclude));  
  if(reduced \|\| \!words.length) { words.forEach(w=\>w.style.opacity=''); return ()=\>{}; }  
  const rect=element.getBoundingClientRect(), scale=2;  
  const source=document.createElement('canvas'), canvas=document.createElement('canvas');  
  source.width=canvas.width=Math.ceil(rect.width\*scale); source.height=canvas.height=Math.ceil(rect.height\*scale);  
  const ctx=source.getContext('2d'), out=canvas.getContext('2d');  
  if(\!ctx \|\| \!out \|\| \!source.width \|\| \!source.height)return ()=\>{};  
  canvas.className='pixel-overlay'; canvas.setAttribute('aria-hidden','true');  
  const lines=\[\];  
  words.forEach(word=\>{  
    const r=word.getBoundingClientRect(), s=getComputedStyle(word);  
    let row=lines.find(l=\>Math.abs(l.y-(r.top-rect.top))\<4);  
    if(\!row){row={y:r.top-rect.top,height:r.height,words:\[\]};lines.push(row);}  
    row.words.push(word);  
    ctx.font=\`\${s.fontStyle} \${s.fontWeight} \${parseFloat(s.fontSize)\*scale}px $s.fontFamily`;ctx.letterSpacing=`${parseFloat(s.letterSpacing\|\|0)\*scale \|\| 0}px\`;  
    ctx.fillStyle=s.color; ctx.textBaseline='alphabetic';  
    const marker=document.createElement('span');marker.style.cssText='display:inline-block;width:0;height:0;padding:0;margin:0;vertical-align:baseline';word.append(marker);  
    const baseline=marker.getBoundingClientRect().top;marker.remove();  
    const text=s.textTransform==='uppercase'?word.textContent.toLocaleUpperCase('en'):s.textTransform==='lowercase'?word.textContent.toLocaleLowerCase('en'):word.textContent;  
    ctx.fillText(text,(r.left-rect.left)\*scale,(baseline-rect.top)\*scale);  
    word.style.opacity='0';  
  });  
  lines.sort((a,b)=\>a.y-b.y); element.append(canvas);  
  const data=ctx.getImageData(0,0,source.width,source.height).data;  
  let frame, stopped=false; const start=performance.now();  
  function draw(now){  
    if(stopped)return; out.clearRect(0,0,canvas.width,canvas.height);  
    let done=true;  
    lines.forEach((line,i)=\>{  
      const p=clamp((now-start-i\*stagger)/duration);  
      if(p===1){line.words.forEach(w=\>w.style.opacity='');return;}  
      done=false;const step=p\<.3?8:p\<.65?4:2;  
      for(let y=Math.max(0,Math.floor(line.y\*scale));y\<Math.min(canvas.height,(line.y+line.height)\*scale);y+=step){  
        for(let x=0;x\<canvas.width;x+=step){const offset=(y\*canvas.width+x)\*4;  
          if(data\[offset+3\] && ((x\*17+y\*31)%101)/101\<p){out.fillStyle=\`rgba($data[offset],${data\[offset+1\]},$data[offset+2],${data\[offset+3\]/255})\`;out.fillRect(x,y,step,step);}  
        }  
      }  
    });  
    if(\!done)frame=requestAnimationFrame(draw);else canvas.remove();  
  }  
  frame=requestAnimationFrame(draw);  
  return ()=\>{stopped=true;cancelAnimationFrame(frame);canvas.remove();words.forEach(w=\>w.style.opacity='');};  
}  
export function wrapWords(root){  
  const walker=document.createTreeWalker(root,NodeFilter.SHOW\_TEXT); const nodes=\[\];  
  while(walker.nextNode())nodes.push(walker.currentNode);  
  nodes.forEach(node=\>{const fragment=document.createDocumentFragment();node.textContent.split(/(\\s+)/).forEach(text=\>{if(\!text)return;if(/^\\s+\$/.test(text))fragment.append(document.createTextNode(text));else{const span=document.createElement('span');span.dataset.pixelWord='';span.textContent=text;fragment.append(span);}});node.replaceWith(fragment);});  
}  
export function createStory(reducedMotion,onSection=()=\>{}){  
  setupTestimonialLoops();  
  const root=document.querySelector('.story'), viewport=root.querySelector('.story-viewport');  
  const copy=root.querySelector('.story-copy'), title=root.querySelector('.story-title'), wall=root.querySelector('.logo-wall');  
  const slider=root.querySelector('.testimonials'), track=root.querySelector('.testimonial-track');  
  const videos=\[...root.querySelectorAll('video')\];  
  const cardElements=\[...track.children\],cardPixels=cardElements.slice(0,4).map(pixelCard);  
  let preparedCards=false;  
  \[copy,title,...root.querySelectorAll('.testimonial-copy')\].forEach(wrapWords);  
  const grain=document.createElement('canvas');grain.width=grain.height=128;  
  const grainContext=grain.getContext('2d');  
  if(grainContext){const noise=grainContext.createImageData(128,128);for(let i=0;i\<noise.data.length;i+=4){const value=Math.floor(Math.random()\*256);noise.data\[i\]=noise.data\[i+1\]=noise.data\[i+2\]=value;noise.data\[i+3\]=255;}grainContext.putImageData(noise,0,0);viewport.style.setProperty('--grain',\`url("\${grain.toDataURL()}")\`);}  
  const words=\[...copy.querySelectorAll('\[data-pixel-word\]')\];  
  let active=false,paused=reducedMotion.matches,unreveals=\[\],headlineShown=false,cardsShown=false,copyScale=1,resizeTimer;  
  let progress=0,lastLogoSlot=null,cycleTimer,scrollFrame;  
  let departure;  
  const logoTransitions=new Set();  
  const slots=LOGOS.slice(0,11).map(name=\>{const slot=document.createElement('div');slot.className='logo-slot';const img=new Image();img.dataset.deferSrc=\`./assets/logos/\${name}.svg\`;img.alt=name;slot.dataset.logo=name;slot.append(img);wall.append(slot);return slot;});  
  let titleTimers=\[\], cancelTitle=()=\>{}, titleHovered=false;  
  function clearTitle(){titleTimers.forEach(clearTimeout);titleTimers=\[\];cancelTitle();}  
  function revealTitle(){  
    clearTitle();title.classList.remove('space-ready','dont-ready');  
    if(reducedMotion.matches \|\| paused){title.classList.add('space-ready','dont-ready');return;}  
    cancelTitle=pixelReveal(title,{duration:1900,exclude:'.story-insert'});  
    titleTimers.push(setTimeout(()=\>{if(active && \!titleHovered)title.classList.add('space-ready');},3400));  
    titleTimers.push(setTimeout(()=\>{if(active && \!titleHovered)title.classList.add('dont-ready');},3650));  
  }  
  title.addEventListener('pointerenter',event=\>{if(\!active \|\| \!headlineShown \|\| event.pointerType\!=='mouse')return;titleHovered=true;clearTitle();title.classList.remove('space-ready','dont-ready');});  
  title.addEventListener('pointerleave',event=\>{if(\!titleHovered \|\| event.pointerType\!=='mouse')return;titleHovered=false;revealTitle();});  
  function fit(){  
    copy.style.transform='';copy.style.fontSize='';  
    const available=viewport.clientHeight-155;  
    if(copy.scrollHeight\>available)copy.style.fontSize=\`\${Math.max(15,parseFloat(getComputedStyle(copy).fontSize)\*available/copy.scrollHeight)}px\`;  
    copyScale=innerWidth\<700?.45:Math.min(.59,400/copy.offsetWidth);  
    render();  
  }  
  function media(){videos.forEach(v=\>{  
    const bounds=v.parentElement.getBoundingClientRect();  
    const visible=bounds.right\>0 && bounds.left\<innerWidth;  
    if(active && progress\>2.8 && visible && \!paused && \!document.hidden && \!dialog.open){if(v.paused)v.play().catch(()=\>{});}else if(\!v.paused)v.pause();  
  });}  
  function render(){  
    if(\!active)return;  
    progress=root.scrollTop/viewport.clientHeight;  
    const highlight=clamp(progress/1.2);  
    words.forEach((word,i)=\>word.style.color=i\<Math.max(6,highlight\*words.length)?'\#eee':'\#9d9d9d');  
    const shrink=ease((progress-1.25)/.6), testimonials=ease((progress-2.3)/.4);  
    copy.style.transform=\`translateY($innerWidth<700?-testimonials*190:0px)scale(${1-(1-copyScale)\*shrink})\`;  
    copy.style.opacity=String((1-.22\*shrink)\*(innerWidth\<700?1-shrink:1));  
    title.style.setProperty('--title-shift',\`$-testimonials*viewport.clientHeight*(innerWidth<700?.36:.118)px`);title.style.opacity=String(clamp((progress-1.75)/.2));constlogoEntrance=ease((progress-2.0)/.3);wall.style.transform=`translateY(${(1-logoEntrance)\*110-testimonials\*viewport.clientHeight\*(innerWidth\<700?.43:.30)}px)\`;  
    wall.style.opacity=String(logoEntrance);  
    slider.style.transform='none';  
    cardElements.forEach((card,i)=\>{const p=i\<4?clamp((progress-2.8-i\*.045)/.40):1;card.style.transform=\`translateX(\${(1-ease(p))\*innerWidth\*1.05}px)\`;card.style.opacity=String(Math.min(1,p\*5));cardPixels\[i\]?.set(reducedMotion.matches?1:p\*\*1.8);});  
    slider.style.opacity=String(clamp((progress-2.78)/.12));  
    root.querySelector('.story-continue').classList.toggle('available',progress\>=2.8);  
    slider.inert=progress\<2.8;wall.inert=logoEntrance\<.2;  
    title.style.visibility=progress\>1.7?'visible':'hidden';  
    if(progress\>1.75 && \!headlineShown){headlineShown=true;revealTitle();}  
    if(progress\>2.0 && \!preparedCards){preparedCards=true;Promise.all(cardPixels.map(p=\>p.prepare())).then(render);}  
    onSection(progress\<1.75?'approach':progress\<2.8?'clients':'testimonials');  
    media();  
  }  
  root.addEventListener('scroll',()=\>{cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(render);},{passive:true});  
  function scheduleCycle(){clearTimeout(cycleTimer);cycleTimer=setTimeout(()=\>{if(\!active)return;cycle();scheduleCycle();},innerWidth\<700?600+Math.random()\*400:950+Math.random()\*1100);}  
  function cycle(){  
    if(\!active \|\| paused \|\| document.hidden \|\| progress\<2.1 \|\| dialog.open)return;  
    const visible=slots.filter(slot=\>getComputedStyle(slot).display\!=='none');  
    const candidates=visible.filter(slot=\>slot\!==lastLogoSlot);  
    const slot=candidates\[Math.floor(Math.random()\*candidates.length)\];lastLogoSlot=slot;  
    const replacements=LOGOS.filter(name=\>\!slots.some(s=\>s.dataset.logo===name));  
    const name=replacements\[Math.floor(Math.random()\*replacements.length)\];  
    const img=new Image();img.src=\`./assets/logos/\${name}.svg\`;img.alt=name;  
    img.decode().then(()=\>{  
      if(\!active)return;const previous=slot.firstElementChild;slot.dataset.logo=name;slot.append(img);  
      const finish=pixelLogoSwap(slot,previous,img,()=\>\!active \|\| paused \|\| reducedMotion.matches \|\| document.hidden,()=\>logoTransitions.delete(finish));  
      logoTransitions.add(finish);  
    }).catch(()=\>{});  
  }  
  let dragging=false,startX=0,startScroll=0,lastX=0,velocity=0,dragDistance=0,inertia;  
  const maxScroll=()=\>slider.scrollWidth-slider.clientWidth;  
  slider.addEventListener('pointerdown',event=\>{if(event.pointerType==='touch'){dragDistance=0;return;}if(event.button\!==0)return;dragging=true;startX=lastX=event.clientX;startScroll=slider.scrollLeft;dragDistance=0;velocity=0;cancelAnimationFrame(inertia);});  
  slider.addEventListener('pointermove',event=\>{if(\!dragging)return;dragDistance=Math.max(dragDistance,Math.abs(event.clientX-startX));if(dragDistance\>6){slider.setPointerCapture(event.pointerId);slider.classList.add('dragging');slider.scrollLeft=startScroll-(event.clientX-startX);velocity=lastX-event.clientX;}lastX=event.clientX;});  
  function release(){if(\!dragging)return;dragging=false;slider.classList.remove('dragging');let previous=performance.now();function tick(now){const dt=Math.min(32,now-previous)/16.67;previous=now;slider.scrollLeft=clamp(slider.scrollLeft+velocity\*dt,0,maxScroll());velocity\*=Math.pow(.92,dt);if(Math.abs(velocity)\>.2 && \!paused)inertia=requestAnimationFrame(tick);}inertia=requestAnimationFrame(tick);}  
  slider.addEventListener('pointerup',release);slider.addEventListener('pointercancel',release);slider.addEventListener('lostpointercapture',release);  
  slider.addEventListener('click',e=\>{if(dragDistance\>6 && e.detail\!==0){e.preventDefault();e.stopImmediatePropagation();}},{capture:true});  
  slider.addEventListener('scroll',()=\>{const center=slider.getBoundingClientRect().left+slider.clientWidth/2;videos.forEach(v=\>{const r=v.parentElement.getBoundingClientRect();v.style.transform=\`translateX(\${clamp((center-r.left-r.width/2)\*.07,-22,22)}px) scale(1.15)\`;});media();},{passive:true});  
  slider.addEventListener('keydown',e=\>{if(\['ArrowLeft','ArrowRight'\].includes(e.key)){e.preventDefault();slider.scrollBy({left:(e.key==='ArrowLeft'?-1:1)\*336,behavior:reducedMotion.matches?'instant':'smooth'});}});  
  root.querySelectorAll('.video-play').forEach(button=\>setupPixelPlay(button,reducedMotion));  
  const dialog=document.querySelector('.video-dialog'), frame=dialog.querySelector('.testimonial-player'), music=document.querySelector('.music-track'), podcast=document.querySelector('.podcast-track');let restoreMusic=false,restorePodcast=false,trigger;  
  root.querySelectorAll('\[data-testimonial\]').forEach(button=\>button.addEventListener('click',()=\>{  
    trigger=button;restoreMusic=\!music.paused;restorePodcast=\!podcast.paused;music.pause();podcast.pause();  
    frame.title=\`\${button.dataset.person} — testimonial\`;  
    frame.src=testimonialVideo(button.dataset.testimonial);  
    dialog.showModal();frame.play().catch(()=\>{});media();  
  }));  
  dialog.querySelector('.video-close').addEventListener('click',()=\>dialog.close());  
  dialog.addEventListener('click',e=\>{if(e.target===dialog)dialog.close();});  
  dialog.addEventListener('close',()=\>{frame.pause();frame.removeAttribute('src');frame.load();if(restoreMusic)music.play().catch(()=\>{});if(restorePodcast)podcast.play().catch(()=\>{});restoreMusic=restorePodcast=false;media();trigger?.focus({preventScroll:true});});  
  function start(at=0){wall.querySelectorAll('\[data-defer-src\]').forEach(img=\>{img.src=img.dataset.deferSrc;delete img.dataset.deferSrc;});active=true;root.inert=false;root.setAttribute('aria-hidden','false');root.classList.add('story-active');root.scrollTop=at\*viewport.clientHeight;fit();root.focus({preventScroll:true});if(at\<1.75)unreveals.push(pixelReveal(copy,{duration:800,stagger:95,reduced:reducedMotion.matches}));scheduleCycle();}  
  function reset(){departure?.cancel();departure=null;clearTitle();titleHovered=false;title.classList.remove('space-ready','dont-ready');active=false;root.inert=true;root.setAttribute('aria-hidden','true');root.classList.remove('story-active');root.scrollTop=0;headlineShown=cardsShown=false;preparedCards=false;unreveals.forEach(fn=\>fn());unreveals=\[\];clearTimeout(cycleTimer);logoTransitions.forEach(finish=\>finish());logoTransitions.clear();lastLogoSlot=null;cancelAnimationFrame(inertia);if(dialog.open)dialog.close();media();}  
  window.addEventListener('resize',()=\>{if(\!active)return;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=\>{unreveals.forEach(fn=\>fn());clearTitle();if(headlineShown)title.classList.add('space-ready','dont-ready');fit();},120);});  
  document.addEventListener('visibilitychange',media);  
  function atEnd(){return active && progress\>=3.335-3/viewport.clientHeight;}  
  async function leave(){  
    active=false;root.inert=true;clearTimeout(cycleTimer);clearTitle();  
    logoTransitions.forEach(finish=\>finish());logoTransitions.clear();  
    unreveals.forEach(fn=\>fn());cancelAnimationFrame(inertia);media();  
    departure=departStory(viewport,\[copy,title,wall\],cardElements,reducedMotion.matches \|\| paused);  
    await departure.done;  
    root.classList.remove('story-active');root.setAttribute('aria-hidden','true');  
  }  
  function resumeTestimonials(){  
    departure?.cancel();departure=null;active=true;  
    root.inert=false;root.setAttribute('aria-hidden','false');root.classList.add('story-active');  
    root.scrollTop=root.scrollHeight-root.clientHeight;headlineShown=cardsShown=true;  
    title.classList.add('space-ready','dont-ready');fit();render();media();scheduleCycle();root.focus({preventScroll:true});  
  }  
  return {start,reset,atEnd,leave,resumeTestimonials,setPaused(value){paused=value;if(value){logoTransitions.forEach(finish=\>finish());logoTransitions.clear();unreveals.forEach(fn=\>fn());clearTitle();if(headlineShown)title.classList.add('space-ready','dont-ready');}media();}};  
}

// The exact Figma export supplies both the button shape and play glyph.  
export function setupPixelPlay(button,reducedMotion){  
  const image=button.querySelector('.play-square img'),canvas=button.querySelector('.play-pixels');  
  const context=canvas.getContext('2d'),source=document.createElement('canvas');source.width=source.height=90;  
  const sourceContext=source.getContext('2d');let pixels,frame,amount=0,target=0,hovered=false,focused=false;  
  const ready=image.decode().then(()=\>{sourceContext.drawImage(image,0,0,90,90);pixels=sourceContext.getImageData(0,0,90,90).data;}).catch(()=\>{});  
  function draw(value,coarse){  
    if(\!pixels \|\| \!context)return;  
    context.clearRect(0,0,90,90);  
    const size=coarse;  
    for(let y=0;y\<90;y+=size)for(let x=0;x\<90;x+=size){  
      const i=(Math.min(89,y+Math.floor(size/2))\*90+Math.min(89,x+Math.floor(size/2)))\*4;  
      const brightness=pixels\[i\]/255;  
      context.fillStyle=\`rgba($pixels[i],${pixels\[i+1\]},$pixels[i+2]*(1-value)+brightness*64*value,${pixels\[i+3\]/255})\`;  
      context.fillRect(x,y,size,size);  
    }  
  }  
  async function update(){  
    target=hovered \|\| focused?1:0;await ready;if(\!pixels)return;  
    cancelAnimationFrame(frame);button.classList.add('pixel-hover');  
    const from=amount,start=performance.now(),destination=target;  
    function tick(now){  
      const p=reducedMotion.matches?1:clamp((now-start)/650),eased=1-Math.pow(1-p,3);  
      amount=from+(destination-from)\*eased;  
      const block=p===1?1:Math.max(2,Math.round(Math.sin(p\*Math.PI)\*7));  
      draw(amount,block);  
      if(p\<1)frame=requestAnimationFrame(tick);else if(destination===0)button.classList.remove('pixel-hover');  
    }  
    frame=requestAnimationFrame(tick);  
  }  
  button.addEventListener('pointerenter',()=\>{hovered=true;update();});  
  button.addEventListener('pointerleave',()=\>{hovered=false;update();});  
  button.addEventListener('focus',()=\>{focused=button.matches(':focus-visible');update();});  
  button.addEventListener('blur',()=\>{focused=false;update();});  
}

// Pixelate the supplied logo vectors while preserving the vertical swap motion.  
export function pixelLogoSwap(slot,previous,next,shouldStop,onFinish){  
  const canvas=document.createElement('canvas'),buffer=document.createElement('canvas'),small=document.createElement('canvas');  
  const width=slot.clientWidth,height=slot.clientHeight,ratio=2;  
  canvas.width=buffer.width=Math.ceil(width\*ratio);canvas.height=buffer.height=Math.ceil(height\*ratio);  
  canvas.className='logo-pixels';canvas.setAttribute('aria-hidden','true');  
  const context=canvas.getContext('2d'),paint=buffer.getContext('2d'),sample=small.getContext('2d');  
  let frame,finished=false;  
  const finish=()=\>{if(finished)return;finished=true;cancelAnimationFrame(frame);previous.remove();next.style.opacity='';canvas.remove();onFinish();};  
  if(\!context \|\| \!paint \|\| \!sample \|\| \!width){requestAnimationFrame(finish);return finish;}  
  const slotRect=slot.getBoundingClientRect();  
  const bounds=image=\>{const r=image.getBoundingClientRect();return{x:(r.left-slotRect.left)\*ratio,y:(r.top-slotRect.top)\*ratio,width:r.width\*ratio,height:r.height\*ratio};};  
  const oldBox=bounds(previous),newBox=bounds(next);  
  previous.style.opacity=next.style.opacity='0';slot.append(canvas);  
  const started=performance.now();  
  function tick(now){  
    if(finished)return;  
    const p=clamp((now-started)/1000);  
    if(p===1 \|\| shouldStop()){finish();return;}  
    const movement=ease(p),block=Math.max(1,Math.round(Math.sin(p\*Math.PI)\*8));  
    paint.clearRect(0,0,buffer.width,buffer.height);  
    paint.drawImage(previous,oldBox.x,oldBox.y-movement\*height\*ratio,oldBox.width,oldBox.height);  
    paint.drawImage(next,newBox.x,newBox.y+(1-movement)\*height\*ratio,newBox.width,newBox.height);  
    small.width=Math.max(1,Math.ceil(buffer.width/block));small.height=Math.max(1,Math.ceil(buffer.height/block));  
    sample.drawImage(buffer,0,0,small.width,small.height);  
    context.clearRect(0,0,canvas.width,canvas.height);context.imageSmoothingEnabled=false;  
    context.drawImage(small,0,0,canvas.width,canvas.height);  
    frame=requestAnimationFrame(tick);  
  }  
  frame=requestAnimationFrame(tick);return finish;  
}

studio-menu.js  
import {setupContact} from './contact.js';  
import {createFloppyStack} from './floppy-stack.js';  
import {pixelCard} from './card-effects.js';  
import {floppyModel} from './floppy-model.js';  
import {menuDisruption, pixelFloppy} from './menu-effects.js';  
import {MENU\_PAGES, searchMenu} from './menu-search.js';  
export function setupStudioMenu({onToggle= () \=\> {}  
, onNavigate}={}) {  
    const contactModal \= setupContact({  
        onToggle  
    });  
    const trigger \= document.querySelector('.profile-button');  
    if (\!trigger)  
        return;  
    const triggers \= \[...document.querySelectorAll('.profile-button,.search-shortcut')\];  
    const apple \= /Mac\|iPhone\|iPad\|iPod/i.test(navigator.userAgentData?.platform \|\| navigator.platform);  
    const shortcut \= document.querySelector('.search-shortcut');  
    if (shortcut) {  
        shortcut.querySelector('.shortcut-command').hidden \= \!apple;  
        shortcut.querySelector('.shortcut-control').hidden \= apple;  
        shortcut.title \= \`Open studio search (\${apple ? '⌘' : 'Ctrl+'}K)\`;  
    }  
    const reduced \= matchMedia('(prefers-reduced-motion: reduce)')  
      , dialog \= document.createElement('dialog');  
    dialog.className \= 'studio-menu';  
    dialog.id \= 'studio-menu';  
    dialog.setAttribute('aria-label', 'Studio search and navigation');  
    dialog.innerHTML \= \`\<div class="menu-tv" aria-hidden="true"\>\</div\>\<button class="menu-close" aria-label="Close studio search"\>\<span class="esc-key"\>esc\</span\>\</button\>  
 \<div class="menu-composition"\>\<div class="menu-window"\>\<label class="menu-search-row"\>\<img src="/assets/menu/search.svg" alt=""\>\<input aria-label="Studio search" role="combobox" aria-autocomplete="list" aria-controls="studio-results" aria-expanded="true" autocomplete="off" spellcheck="false" placeholder="Studio search"\>\</label\>\<section class="menu-panel"\>\<div class="menu-filters" aria-label="Search filters"\>\<button data-filter="Project" aria-pressed="false"\>Our work\</button\>\<button data-filter="Service" aria-pressed="false"\>Services\</button\>\</div\>\<div class="menu-results" id="studio-results" role="listbox" aria-label="Suggestions"\>\<div class="menu-selection" aria-hidden="true"\>\</div\>\</div\>\<p class="menu-status" role="status"\>\</p\>\</section\>\</div\>  
 \<div class="menu-floppy"\>\<button class="floppy-grip" aria-label="Drag to rotate floppy"\>\${floppyModel('garcy')}\</button\>\<p class="menu-eject"\>more discs coming soon\<span\>Drag to rotate\</span\>\</p\>\</div\>\</div\>  
 \<section class="menu-disks" aria-label="Choose a studio" hidden\>\<div class="disk-orbit"\>\<a class="studio-disk disk-tesseral" href="https\://tesseral.design" aria-label="Visit tesseral.design"\>\${floppyModel('tesseral')}\</a\>\</div\>\<button class="menu-return"\>Back to search\</button\>\<p\>CHOOSE YOUR DISK\</p\>\</section\>  
 \<section class="menu-contact" hidden aria-label="Contact garcy.studio"\>\<h2\>Let’s make something unmistakable.\</h2\>\<a href="mailto:hello@garcy.studio"\>hello@garcy.studio ↗\</a\>\<button class="menu-contact-back"\>Back to search\</button\>\</section\>\`;  
    document.body.append(dialog);  
    // iOS keeps the layout viewport tall when its keyboard covers the page.  
    // Position the search against the visible viewport instead.  
    function fitKeyboard() {  
        const view \= window.visualViewport;  
        dialog.style.setProperty('--menu-viewport-height', \`\${view?.height \|\| innerHeight}px\`);  
        dialog.style.setProperty('--menu-viewport-top', \`\${view?.offsetTop \|\| 0}px\`);  
        dialog.classList.toggle('keyboard-open', Boolean(view && innerHeight \- view.height \> 140));  
    }  
    window.visualViewport?.addEventListener('resize', fitKeyboard);  
    window.visualViewport?.addEventListener('scroll', fitKeyboard);  
    window.addEventListener('resize', fitKeyboard);

    const floppy \= dialog.querySelector('.menu-floppy')  
      , grip \= dialog.querySelector('.floppy-grip');  
    dialog.append(floppy);  
    const stackController \= createFloppyStack(dialog, floppy, reduced);  
    const brand \= document.querySelector('.site-header\>a')?.cloneNode(true);  
    if (brand) {  
        brand.className \= 'menu-brand';  
        dialog.append(brand);  
    }  
    const disruption \= menuDisruption(document.querySelector('.stage'), dialog, reduced)  
      , floppyPixels \= pixelFloppy(dialog.querySelector('.menu-floppy'), reduced);  
    triggers.forEach(button \=\> {  
        button.disabled \= false;  
        button.setAttribute('aria-label', 'Open studio search');  
        button.setAttribute('aria-haspopup', 'dialog');  
        button.setAttribute('aria-controls', dialog.id);  
        button.setAttribute('aria-expanded', 'false');  
        button.setAttribute('aria-keyshortcuts', \`\${apple ? 'Meta' : 'Control'}+k\`);  
    }  
    );  
    const input \= dialog.querySelector('input')  
      , results \= dialog.querySelector('.menu-results')  
      , selection \= dialog.querySelector('.menu-selection')  
      , status \= dialog.querySelector('.menu-status')  
      , disks \= dialog.querySelector('.menu-disks')  
      , contact \= dialog.querySelector('.menu-contact');  
    let index \= \[\], filter \= '', active \= 0, visible \= \[\], timers \= \[\], previousFocus, typing \= false;  
    const later \= (fn, ms) \=\> {  
        const id \= setTimeout(fn, reduced.matches ? 0 : ms);  
        timers.push(id);  
        return id;  
    }  
    ;  
    const clearTimers \= () \=\> {  
        timers.forEach(clearTimeout);  
        timers \= \[\];  
        input.placeholder \= 'Studio search';  
        dialog.classList.remove('is-opening');  
        document.querySelector('.stage')?.classList.remove('menu-disruption');  
    }  
    ;  
    async function load() {  
        try {  
            const response \= await fetch('/search-index.json');  
            if (\!response.ok)  
                throw Error('Search unavailable');  
            index \= await response.json();  
            if (dialog.open)  
                render();  
        } catch {  
            status.textContent \= 'Project and journal search is temporarily unavailable.';  
        }  
    }  
    function select(i) {  
        active \= Math.max(0, Math.min(i, visible.length \- 1));  
        const rows \= \[...results.querySelectorAll('.menu-result')\];  
        rows.forEach( (row, n) \=\> row.setAttribute('aria-selected', String(n \=== active)));  
        const row \= rows\[active\];  
        selection.hidden \= \!row;  
        if (row) {  
            selection.style.transform \= \`translateY($row.offsetToppx)`;selection.style.height=`${row.offsetHeight}px\`;  
            input.setAttribute('aria-activedescendant', row.id);  
        } else  
            input.removeAttribute('aria-activedescendant');  
    }  
    function render() {  
        const query \= input.value.trim();  
        const nextTyping \= Boolean(query \|\| filter);  
        if (typing \!== nextTyping) {  
            typing \= nextTyping;  
            floppyPixels(typing);  
        }  
        dialog.classList.toggle('is-typing', typing);  
        dialog.querySelector('.menu-floppy').inert \= typing;  
        visible \= searchMenu(query \|\| filter ? \[...MENU\_PAGES, ...index\] : MENU\_PAGES, query, filter);  
        results.querySelectorAll('.menu-result').forEach(n \=\> n.remove());  
        for (const \[i,item\] of visible.entries()) {  
            const row \= document.createElement('a');  
            row.href \= item.href;  
            row.className \= 'menu-result';  
            row.id \= \`studio-result-\${i}\`;  
            row.setAttribute('role', 'option');  
            row.tabIndex \= \-1;  
            const label \= document.createElement('span');  
            label.className \= 'menu-result-title';  
            label.textContent \= item.title;  
            const arrow \= document.createElement('img');  
            arrow.src \= '/assets/menu/arrow.svg';  
            arrow.alt \= '';  
            label.append(arrow);  
            const type \= document.createElement('span');  
            type.className \= 'menu-result-type';  
            type.textContent \= item.type;  
            const enter \= document.createElement('span');  
            enter.className \= 'menu-enter';  
            enter.textContent \= 'Enter';  
            type.append(enter);  
            row.append(label, type);  
            row.addEventListener('pointerenter', () \=\> select(i));  
            row.addEventListener('click', event \=\> activate(event, item));  
            results.append(row);  
        }  
        status.textContent \= visible.length ? '' : 'No matches. Try another word or filter.';  
        select(0);  
    }  
    async function activate(event, item) {  
        if (event && (event.metaKey \|\| event.ctrlKey \|\| event.shiftKey \|\| event.altKey))  
            return;  
        event?.preventDefault();  
        if (dialog.classList.contains('is-navigating'))  
            return;  
        if (item.href \=== '\#contact') {  
            close(true);  
            contactModal.open();  
            return;  
        }  
        dialog.classList.add('is-navigating');  
        const panel \= dialog.querySelector('.menu-window');  
        const effect \= pixelCard(panel);  
        await effect.prepare();  
        const start \= performance.now();  
        let frame;  
        function pixels(now) {  
            const p \= Math.min(1, (now \- start) / 900);  
            effect.set(1 \- p \* .95);  
            if (p \< 1\)  
                frame \= requestAnimationFrame(pixels);  
        }  
        if (\!reduced.matches)  
            frame \= requestAnimationFrame(pixels);  
        await panel.animate(\[{  
            transform: 'scale(1)'  
        }, {  
            transform: 'scale(2.8)'  
        }\], {  
            duration: reduced.matches ? 0 : 650,  
            easing: 'cubic-bezier(.65,0,.25,1)',  
            fill: 'forwards'  
        }).finished;  
        const handled \= onNavigate?.(item.href);  
        if (\!handled) {  
            dialog.classList.add('is-leaving-page');  
            cancelAnimationFrame(frame);  
            location.assign(item.href);  
            return;  
        }  
        await dialog.animate(\[{  
            transform: 'translateY(0)',  
            opacity: 1  
        }, {  
            transform: 'translateY(110%)',  
            opacity: 0  
        }\], {  
            duration: reduced.matches ? 100 : 950,  
            easing: 'cubic-bezier(.76,0,.24,1)',  
            fill: 'forwards'  
        }).finished;  
        cancelAnimationFrame(frame);  
        panel.querySelector('.card-pixels')?.remove();  
        panel.classList.remove('card-resolving');  
        if (handled) {  
            close(true);  
            dialog.getAnimations().forEach(a \=\> a.cancel());  
            panel.getAnimations().forEach(a \=\> a.cancel());  
        } else  
            location.assign(item.href);  
    }  
    let openingAnimation;  
    function expandFromButton() {  
        openingAnimation?.cancel();  
        if (reduced.matches)  
            return;  
        const panel \= dialog.querySelector('.menu-window');  
        const origin \= (previousFocus?.matches('.profile-button,.search-shortcut') ? previousFocus : shortcut \|\| trigger).getBoundingClientRect();  
        const target \= panel.getBoundingClientRect();  
        openingAnimation \= panel.animate(\[{  
            transform: \`translate(\${origin.x \+ origin.width / 2 \- target.x \- target.width / 2}px,$origin.y+origin.height/2-target.y-target.height/2px)scale(${origin.width / target.width},\${origin.height / target.height})\`,  
            opacity: .35,  
            borderRadius: '24px'  
        }, {  
            transform: 'translate(0,0) scale(1,1)',  
            opacity: 1,  
            borderRadius: '12px'  
        }\], {  
            duration: 650,  
            easing: 'cubic-bezier(.22,1,.36,1)'  
        });  
    }  
    function open() {  
        if (dialog.open)  
            return;  
        clearTimers();  
        stackController.leave();  
        previousFocus \= document.activeElement;  
        input.value \= '';  
        filter \= '';  
        dialog.className \= 'studio-menu';  
        dialog.querySelector('.menu-composition').inert \= false;  
        disks.hidden \= true;  
        contact.hidden \= true;  
        floppy.style.setProperty('--pull-y', '0px');  
        grip.setAttribute('aria-label', 'Drag to rotate floppy');  
        dialog.querySelectorAll('\[data-filter\]').forEach(b \=\> b.setAttribute('aria-pressed', 'false'));  
        render();  
        dialog.showModal();  
        fitKeyboard();  
        expandFromButton();  
        disruption.play();  
        triggers.forEach(button \=\> button.setAttribute('aria-expanded', 'true'));  
        onToggle(true);  
        document.querySelector('.stage')?.classList.add('menu-underlay');  
        dialog.classList.add('is-opening');  
        document.querySelector('.stage')?.classList.add('menu-disruption');  
        input.placeholder \= '';  
        input.focus();  
        const text \= 'Studio search';  
        for (let i \= 1; i \<= text.length; i++)  
            later( () \=\> input.placeholder \= text.slice(0, i), 180 \+ i \* 45);  
        later( () \=\> {  
            dialog.classList.remove('is-opening');  
            document.querySelector('.stage')?.classList.remove('menu-disruption');  
        }  
        , 850);  
        if (\!index.length)  
            load();  
    }  
    function close(force=false) {  
        if (\!dialog.open \|\| (dialog.classList.contains('is-navigating') && force \!== true))  
            return;  
        clearTimers();  
        openingAnimation?.cancel();  
        disruption.stop();  
        dialog.close();  
        document.querySelector('.stage')?.classList.remove('menu-disruption');  
        triggers.forEach(button \=\> button.setAttribute('aria-expanded', 'false'));  
        document.querySelector('.stage')?.classList.remove('menu-underlay');  
        onToggle(false);  
        previousFocus?.focus({  
            preventScroll: true  
        });  
    }  
    function back() {  
        clearTimers();  
        stackController.leave();  
        dialog.querySelector('.menu-composition').inert \= false;  
        dialog.classList.remove('is-ejected', 'is-contact');  
        disks.hidden \= true;  
        contact.hidden \= true;  
        grip.setAttribute('aria-label', 'Drag to rotate floppy');  
        input.focus();  
    }  
    dialog.addEventListener('keydown', event \=\> event.stopPropagation());  
    triggers.forEach(button \=\> button.addEventListener('click', open));  
    dialog.querySelector('.menu-close').addEventListener('click', close);  
    dialog.addEventListener('cancel', event \=\> {  
        event.preventDefault();  
        close();  
    }  
    );  
    input.addEventListener('input', render);  
    dialog.querySelectorAll('\[data-filter\]').forEach(button \=\> button.addEventListener('click', () \=\> {  
        filter \= filter \=== button.dataset.filter ? '' : button.dataset.filter;  
        dialog.querySelectorAll('\[data-filter\]').forEach(b \=\> b.setAttribute('aria-pressed', String(b.dataset.filter \=== filter)));  
        render();  
        input.focus();  
    }  
    ));  
    function eject() {  
        if (dialog.classList.contains('is-ejected'))  
            return;  
        clearTimers();  
        floppy.style.setProperty('--pull-y', '0px');  
        dialog.classList.add('is-ejected');  
        dialog.querySelector('.menu-composition').inert \= true;  
        disks.hidden \= false;  
        stackController.enter();  
        grip.setAttribute('aria-label', 'Return to studio search');  
        later( () \=\> grip.focus({  
            preventScroll: true  
        }), 850);  
    }  
    dialog.querySelector('.menu-return').addEventListener('click', back);  
    dialog.querySelector('.menu-contact-back').addEventListener('click', back);  
    let drag \= null  
      , rx \= 0  
      , ry \= 0;  
    function rotate() {  
        grip.style.transform \= \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;  
    }  
    grip.addEventListener('pointerdown', event \=\> {  
        if (event.button \!== 0\)  
            return;  
        drag \= {  
            id: event.pointerId,  
            x: event.clientX,  
            y: event.clientY,  
            rx,  
            ry  
        };  
        grip.setPointerCapture(event.pointerId);  
        floppy.classList.add('is-dragging');  
    }  
    );  
    grip.addEventListener('pointermove', event \=\> {  
        if (\!drag \|\| drag.id \!== event.pointerId)  
            return;  
        rx \= Math.max(-65, Math.min(65, drag.rx \- (event.clientY \- drag.y) \* .3));  
        ry \= drag.ry \+ (event.clientX \- drag.x) \* .4;  
        rotate();  
    }  
    );  
    function release() {  
        drag \= null;  
        floppy.classList.remove('is-dragging');  
    }  
    grip.addEventListener('pointerup', release);  
    grip.addEventListener('pointercancel', release);  
    // Keep browser shortcuts intact while another modal or the loading screen is active.  
    window.addEventListener('keydown', event \=\> {  
        if (event.key.toLowerCase() \!== 'k' \|\| event.altKey \|\| event.shiftKey \|\| \!(apple ? event.metaKey && \!event.ctrlKey : event.ctrlKey && \!event.metaKey))  
            return;  
        if (\!dialog.open && (trigger.disabled \|\| trigger.closest('\[inert\]') \|\| document.querySelector('dialog\[open\]')))  
            return;  
        event.preventDefault();  
        event.stopImmediatePropagation();  
        if (event.repeat)  
            return;  
        if (dialog.open)  
            close();  
        else  
            open();  
    }  
    , {  
        capture: true  
    });  
    // Capture scene shortcuts/gestures so the screen behind the dialog stays in place.  
    for (const type of \['wheel', 'touchstart', 'touchmove', 'touchend', 'keydown'\])  
        window.addEventListener(type, event \=\> {  
            if (\!dialog.open)  
                return;  
            if (type \=== 'keydown') {  
                if (event.key \=== 'Escape') {  
                    event.preventDefault();  
                    close();  
                } else if (\!dialog.classList.contains('is-ejected') && \!dialog.classList.contains('is-contact') && \['ArrowDown', 'ArrowUp'\].includes(event.key)) {  
                    event.preventDefault();  
                    select((active \+ (event.key \=== 'ArrowDown' ? 1 : \-1) \+ visible.length) % Math.max(1, visible.length));  
                    results.querySelector(\`\#studio-result-\${active}\`)?.scrollIntoView({  
                        block: 'nearest'  
                    });  
                } else if (event.key \=== 'Enter' && event.target \=== input && visible\[active\]) {  
                    event.preventDefault();  
                    results.querySelector(\`\#studio-result-\${active}\`).click();  
                }  
            }  
            if (type \!== 'keydown' \|\| \!\['Tab', 'Enter', ' '\].includes(event.key) \|\| event.target \=== input)  
                event.stopImmediatePropagation();  
        }  
        , {  
            capture: true,  
            passive: false  
        });  
    return {  
        open,  
        close,  
        openContact: contactModal.open  
    };  
}

testimonial-videos.js  
// Self-hosted derivatives; original landscape and portrait masters are preserved.  
export const TESTIMONIAL\_VIDEOS \= {  
    andy: '/assets/testimonials/andy-full.mp4',  
    lukas: '/assets/testimonials/lukas-full.mp4'  
};  
export function testimonialVideo(id) {  
    return matchMedia('(max-width: 700px)').matches ? \`/assets/testimonials/\${id}-portrait.mp4\` : TESTIMONIAL\_VIDEOS\[id\];  
}  
export function setupTestimonialLoops(root=document) {  
    if (\!matchMedia('(max-width: 700px)').matches)  
        return;  
    root.querySelectorAll('.video-testimonial video\[data-person\]').forEach(video \=\> {  
        const id \= video.dataset.person;  
        video.poster \= \`/assets/testimonials/\${id}-portrait-poster.webp\`;  
        video.src \= \`/assets/testimonials/\${id}-portrait-loop.mp4\`;  
    }  
    );  
}

go through all these files and recreate the whole project in js if you need to but i want everything to look like how it does in the video website and not like the current website  
