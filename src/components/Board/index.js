import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Title from "../Title";
import Card from "../Card";
import InputContainer from "../InputContainer";

import "./styles.scss";

export default function Board({ board, index }) {
  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="board-cards" {...provided.dragHandleProps}>
            <div className="title-board">
              <Title title={board.title} boardId={board.id} />
            </div>
            <div className="container-cards">
              <Droppable droppableId={board.id} type="task">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="card-container"
                  >
                    {board.cards.map((card, index) => (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        boardId={board.id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <InputContainer boardId={board.id} type="card" />
          </div>
        </div>
      )}
    </Draggable>
  );
}
