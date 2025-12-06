import { MdOutlineAutoAwesome } from "react-icons/md";
import { typography } from "../constants/typography";
import { css, cx } from "@emotion/css";
import colorPalette from "../constants/colorPalette";
import { useState } from "react";

const Header = ({ header, description }) => {
  return (
    <div
      className={cx(
        "header-border-right",
        css`
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 100%;

          border-bottom: 1px solid ${colorPalette.strokePrimary};
          padding: 10px 15px;
        `
      )}
    >
      <p className={typography.textLPlus}>{header}</p>
      <span
        className={cx(
          typography.textXsPlus,
          css`
            color: ${colorPalette.textSecondary};
          `
        )}
      >
        {description}
      </span>
    </div>
  );
};

const OutputTextArea = ({ value, onChange, readOnly = false }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={cx(
        "output-border-right",
        css`
          width: 100%;
          height: 300px;
          border: none;
          resize: none;
          padding: 15px;
          font-size: 14px;
          background-color: ${colorPalette.background};
          color: ${colorPalette.primary};

          cursor: ${readOnly ? "not-allowed" : "text"};
          &:focus {
            outline: none;
          }
        `
      )}
      readOnly={readOnly}
    ></textarea>
  );
};

const RenderTable = () => {
  const [inputText, setInputText] = useState("");
  const [anonymizedText, setAnonymizedText] = useState("");
  const [substitutedText, setSubstitutedText] = useState("");

  return (
    <div
      className={css`
        border: 1px solid ${colorPalette.strokePrimary};
      `}
    >
      <div
        className={css`
          display: flex;

          .header-border-right:not(:last-child) {
            border-right: 1px solid ${colorPalette.strokePrimary};
          }
        `}
      >
        <Header
          header="Wklej tekst tutaj"
          description="Surowy tekst do anonimizacji."
        />

        <Header
          header="Dane zanonimizowane"
          description="Tekst z danymi zastąpionymi tokenami"
        />

        <Header
          header="Dane zamienne"
          description="Tekst z przykładowymi wartościami pasującymi do tokenów."
        />
      </div>

      <div
        className={css`
          display: flex;

          .output-border-right:not(:last-child) {
            border-right: 1px solid ${colorPalette.strokePrimary};
          }
        `}
      >
        <OutputTextArea value={inputText} onChange={setInputText} />
        <OutputTextArea
          value={anonymizedText}
          onChange={setInputText}
          readOnly
        />
        <OutputTextArea
          value={substitutedText}
          onChange={setInputText}
          readOnly
        />
      </div>
    </div>
  );
};

export default RenderTable;
