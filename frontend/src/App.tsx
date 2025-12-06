import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import RenderTable from "./components/MainWrapper";
import { css } from "@emotion/css";
import colorPalette from "./constants/colorPalette";

function App() {
  return (
    <div
      className={css`
        width: 100%;
        min-height: 100vh;
        background-color: ${colorPalette.background};
        display: grid;
        place-items: center;
      `}
    >
      <div
        className={css`
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
        `}
      >
        <RenderTable />

      </div>
    </div>
  );
}

export default App;
