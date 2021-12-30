import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Title from "../Title";
import Card from "../Card";
import InputContainer from "../InputContainer";

import "./styles.scss";

function List({ list, index }) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="list-cards" {...provided.dragHandleProps}>
            <div className="title-list">
              <Title title={list.title} listId={list.id} />
            </div>
            <div className="container-cards">
              <div className="card-container">
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    listId={list.id}
                  />
                ))}
              </div>
            </div>
            <InputContainer listId={list.id} type="card" />
          </div>
        </div>
      )}
    </Draggable>
  );
}
export default List;
