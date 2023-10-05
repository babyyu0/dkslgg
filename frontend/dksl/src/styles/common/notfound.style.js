import styled from 'styled-components';

export const NotFoundLayout = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://post-phinf.pstatic.net/MjAxODA1MzFfMTgx/MDAxNTI3NzY1OTg4OTk3.1aLLMdmLVyDDJhcNRlVBDzw25jzU6dpbD2wjopcWwlUg.55NMlhkznwQZBP-tLIATnHTOJGFmhjY9JTctn1EWTiQg.JPEG/IygFnvCTrbYinT_wkRO3x91SCIoU.jpg?type=w400');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: hsl(var(--hue), 10%, 10%);
  display: flex;
  font:
    1em/1.5 Nunito,
    sans-serif;
  height: 100vh;
  transition:
    background-color var(--trans-dur),
    color var(--trans-dur);

  & * {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    --hue: 223;
    --bg: hsl(var(--hue), 10%, 90%);
    --fg: hsl(var(--hue), 10%, 10%);
    --primary: hsl(var(--hue), 90%, 45%);
    --primary-down: hsl(var(--hue), 90%, 65%);
    --trans-dur: 0.3s;
    font-size: calc(16px + (24 - 16) * (100vw - 320px) / (2560 - 320));
  }
  & .main {
    display: flex;
    grid-gap: 3em 1.5em;
    margin: auto;
    max-width: 40em;
    padding: 3em 0;
    text-align: center;
    width: calc(100% - 3em);
  }
  h1 {
    font-size: 3em;
    color: var(--maincolor-depth2);
    line-height: 1;
    margin: 0 0 1.5rem;
    margin-bottom: 3rem;
  }
  .btn-link {
    background: var(--maincolor-depth1);
    border-radius: 15px;
    display: inline-block;
    outline: transparent;
    padding: 0.75em 1.5em;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.15s linear;
  }
  .btn-link,
  .btn-link:visited {
    color: hsl(0, 0%, 100%);
  }
  .btn-link:focus-visible,
  .btn-link:hover {
    background: var(--primary-down);
  }
  .btn-link:hover {
    text-decoration: none;
  }
  .paper {
    display: block;
    margin: auto;
    overflow: visible;
    width: 100%;
    max-width: 224px;
    height: auto;
  }
  .paper__fill {
    fill: hsl(0, 0%, 100%);
  }
  .paper__outline,
  .paper__lines {
    transition: stroke var(--trans-dur);
  }
  .paper__outline {
    stroke: hsl(var(--hue), 10%, 10%);
  }
  .paper__lines {
    stroke: hsl(var(--hue), 10%, 70%);
  }
  .paper__shadow {
    fill: hsl(var(--hue), 10%, 70%);
    transition: fill var(--trans-dur);
  }
  .paper__top,
  .paper__bottom,
  .paper__tear,
  .paper__tear-fill {
    animation: paperTop 1.25s cubic-bezier(0.77, 0, 0.18, 1);
  }
  .paper__top,
  .paper__bottom {
    transform-origin: 0 148px;
    transition: transform var(--trans-dur) cubic-bezier(0.77, 0, 0.18, 1);
  }
  .paper__top {
    transform: translate(0, 8px);
  }
  .paper__bottom {
    animation-name: paperBottom;
    transform: translate(0, 42px);
  }
  .paper__tear,
  .paper__tear-fill {
    animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
  }
  .paper__tear {
    animation-name: paperTear;
    stroke-dashoffset: 0;
  }
  .paper__tear-fill {
    animation-name: paperTearFill;
  }
  .paper__outline:hover .paper__top,
  .paper__outline:hover .paper__bottom {
    transform: translate(0, 25px);
  }

  /* Dark theme */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: hsl(var(--hue), 10%, 25%);
      --fg: hsl(var(--hue), 10%, 90%);
    }
    .paper__shadow:first-child {
      fill: hsl(var(--hue), 10%, 15%);
    }
  }

  /* Beyond mobile */
  @media (min-width: 768px) {
    main {
      grid-template-columns: 1fr 2fr;
      align-items: center;
      text-align: left;
    }
    .paper {
      max-width: 300px;
    }
  }

  /* Animations */
  @keyframes paperTop {
    from,
    40% {
      animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
      transform: translate(0, 25px) rotate(0);
      transform-origin: 61px 148px;
    }
    70% {
      animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1.5);
      transform: translate(0, 25px) rotate(-5deg);
      transform-origin: 61px 148px;
    }
    to {
      transform: translate(0, 8px) rotate(0);
      transform-origin: 0 148px;
    }
  }
  @keyframes paperBottom {
    from,
    40% {
      animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
      transform: translate(0, 25px) rotate(0);
      transform-origin: 61px 148px;
    }
    70% {
      animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1.5);
      transform: translate(0, 25px) rotate(5deg);
      transform-origin: 61px 148px;
    }
    to {
      transform: translate(0, 42px) rotate(0);
      transform-origin: 0 148px;
    }
  }
  @keyframes paperTear {
    from,
    40% {
      stroke-dashoffset: -198;
    }
    70%,
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes paperTearFill {
    from,
    40% {
      width: 187px;
    }
    70%,
    to {
      width: 0;
    }
  }
`;
