import React, { useState } from "react";
// Collapse Component adds a Collapse animation to a child element or component
// in which it vertically expands from the top of the child element.

import InputCard from "../InputCard";

import "./styles.scss";

function InputContainer({ listId, type }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="input-container">
      <div>
        <InputCard setOpen={setOpen} listId={listId} type={type} />
      </div>
    </div>
  );
}

export default InputContainer;
