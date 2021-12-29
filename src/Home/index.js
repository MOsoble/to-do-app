import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import InputContainer from "../components/InputContainer";
import Board from "../components/Board";

import store from "../utils/store";
import StoreApi from "../utils/storeApi";

import "./styles.scss";

const dataStorage = JSON.parse(window.localStorage.getItem("dataKanban"));

const initialState = () => {
  if (dataStorage) {
    return dataStorage;
  } else {
    window.localStorage.setItem("dataKanban", JSON.stringify(store));
    return store;
  }
};

export default function Home() {
  const [data, setData] = useState(initialState);

  const addMoreCard = (title, boardId) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const board = data.boards[boardId];
    board.cards = [...board.cards, newCard];

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };
  const removeCard = (index, boardId) => {
    const board = data.boards[boardId];

    board.cards.splice(index, 1);

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const updateCardTitle = (title, index, boardId) => {
    const board = data.boards[boardId];
    board.cards[index].title = title;

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };
  const addMoreBoard = (title) => {
    if (!title) {
      return;
    }

    const newBoardId = uuid();
    const newBoard = {
      id: newBoardId,
      title,
      cards: [],
    };
    const newState = {
      boardIds: [...data.boardIds, newBoardId],
      boards: {
        ...data.boards,
        [newBoardId]: newBoard,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const updateBoardTitle = (title, boardId) => {
    const board = data.boards[boardId];
    board.title = title;

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };

    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const deleteBoard = (boardId) => {
    const boards = data.boards;
    const boardIds = data.boardIds;

    delete boards[boardId];

    boardIds.splice(boardIds.indexOf(boardId), 1);

    const newState = {
      boards: boards,
      boardIds: boardIds,
    };

    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "board") {
      const newBoardIds = data.boardIds;

      newBoardIds.splice(source.index, 1);
      newBoardIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        boardIds: newBoardIds,
      };
      setData(newState);
      window.localStorage.setItem("dataKanban", JSON.stringify(newState));

      return;
    }

    const sourceBoard = data.boards[source.droppableId];
    const destinationBoard = data.boards[destination.droppableId];
    const draggingCard = sourceBoard.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceBoard.cards.splice(source.index, 1);
      destinationBoard.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        boards: {
          ...data.boards,
          [sourceBoard.id]: destinationBoard,
        },
      };
      setData(newState);
      window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    } else {
      sourceBoard.cards.splice(source.index, 1);
      destinationBoard.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        boards: {
          ...data.boards,
          [sourceBoard.id]: sourceBoard,
          [destinationBoard.id]: destinationBoard,
        },
      };

      setData(newState);
      window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    }
  };
  return (
    <StoreApi.Provider
      value={{
        addMoreCard,
        addMoreBoard,
        updateBoardTitle,
        removeCard,
        updateCardTitle,
        deleteBoard,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="board" direction="horizontal">
          {(provided) => (
            <div
              className="wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.boardIds.map((boardId, index) => {
                const board = data.boards[boardId];

                return <board board={board} key={boardId} index={index} />;
              })}
              <div>
                <InputContainer type="board" />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StoreApi.Provider>
  );
}
