import React, { useContext, useState } from "react";
import { Clear } from "@material-ui/icons";
import storeApi from "../../utils/storeApi";
import "./styles.scss";

export default function InputCard({ setOpen, boardId, type }) {
  const { addMoreCard, addMoreBoard } = useContext(storeApi);
  const [title, setTitle] = useState("");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBtnConfirm = () => {
    if (type === "card") {
      addMoreCard(title, boardId);
    } else {
      addMoreBoard(title);
    }
    setOpen(false);
    setTitle("");
  };

  return (
    <div className="input-card">
      <div className="input-card-container">
        <textarea
          onChange={handleOnChange}
          value={title}
          className="input-text"
          placeholder={
            type === "card"
              ? "Enter a title of this card..."
              : "Enter board title"
          }
          autoFocus
        />
      </div>
      <div className="confirm">
        <button className="button-confirm" onClick={handleBtnConfirm}>
          {type === "card" ? "Add Card" : "Add Board"}
        </button>
        <button
          className="button-cancel"
          onClick={() => {
            setTitle("");
            setOpen(false);
          }}
        >
          <Clear />
        </button>
      </div>
    </div>
  );
}
