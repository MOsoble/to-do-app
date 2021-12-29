import React, { useState } from "react";
import { Collapse } from "@material-ui/core";

import InputCard from "../InputCard";

import "./styles.scss";

export default function InputContainer({ boardId, type }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="input-container">
      <Collapse in={open}>
        <InputCard setOpen={setOpen} boardId={boardId} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <div className="input-content">
          <button onClick={() => setOpen(!open)}>
            {type === "card" ? "+ Add Card" : "+ Add Board"}
          </button>
        </div>
      </Collapse>
    </div>
  );
}
