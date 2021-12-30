import React, { useContext, useState } from "react";
import { DeleteOutline } from "@material-ui/icons";

import storeApi from "../../utils/storeApi";

import "./styles.scss";

function Card({ card, index, listId }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const { removeCard, updateCardTitle } = useContext(storeApi);

  const handleOnBlur = () => {
    updateCardTitle(newTitle, index, listId);
    setOpen(!open);
  };

  return (
    <div className="card-content">
      {open ? (
        <textarea
          type="text"
          className="input-card-title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleOnBlur}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleOnBlur();
            }
            return;
          }}
        />
      ) : (
        <div onClick={() => setOpen(!open)} className="card-title-container">
          <p>{card.title}</p>
          <button
            onClick={() => {
              removeCard(index, listId);
            }}
          >
            <DeleteOutline />
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
