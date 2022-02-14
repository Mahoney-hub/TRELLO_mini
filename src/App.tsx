import React, {useState} from 'react';
import './App.css';

type ItemsType = {
    id: number,
    title: string
}

type BoardType = {
    id: number,
    title: string
    items: ItemsType[]
}

const App = () => {
    // BLL
    const [boards, setBoards] = useState<BoardType[]>([
        {
            id: 1,
            title: 'Сделать',
            items: [{id: 1, title: 'Пойти в магазин'}, {id: 2, title: 'Выкинуть мусор'}, {id: 3, title: 'Покушать'}]
        },
        {
            id: 2,
            title: 'Сделать',
            items: [{id: 4, title: 'Пойти в спортзал'}, {id: 5, title: 'Выкинуть кошку'}, {
                id: 6,
                title: 'Задачи на фибоначчи'
            }]
        },
        {
            id: 3,
            title: 'Послушать',
            items: [{id: 7, title: 'Прочитать книгу'}, {id: 8, title: 'Послушать музыку'}, {
                id: 9,
                title: 'Отрендерить'
            }]
        },
    ])
    const [currentBoard, setCurrentBoard] = useState<BoardType | null>(null)
    const [currentItem, setCurrentItem] = useState<ItemsType | null>(null)

    // Functions
    function handlerDragStart(e: React.DragEvent<HTMLDivElement>, board: BoardType, item: ItemsType) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function handlerDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function handlerDragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function handlerDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        if (e.currentTarget.className === 'item') {
            e.currentTarget.style.boxShadow = '0 4px 3px gray'
        }
    }

    function handlerDrop(e: React.DragEvent<HTMLDivElement>, board: BoardType, item: ItemsType) {
        e.preventDefault()
        let currentIndex
        if (currentBoard && currentItem) {
            currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            const dropIndex = board.items.indexOf(item)
            board.items.splice(dropIndex + 1, 0, currentItem)
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }

    }

    function handlerDropCard(e: React.DragEvent<HTMLDivElement>, board: BoardType) {
        let currentIndex
        if (currentBoard && currentItem) {
            board.items.push(currentItem)
            currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }
    }

    // Components before rendering
    const componentBoards = boards.map(board =>
        <div className={'board'}
             key={board.id}
             onDragOver={e => handlerDragOver(e)}
             onDrop={e => handlerDropCard(e, board)}
        >
            <div className={'board__title'}>{board.title}</div>
            {board.items.map(item =>
                <div className={'item'}
                     key={item.id}
                     draggable
                     onDragStart={e => handlerDragStart(e, board, item)}
                     onDragLeave={e => handlerDragLeave(e)}
                     onDragEnd={e => handlerDragEnd(e)}
                     onDragOver={e => handlerDragOver(e)}
                     onDrop={e => handlerDrop(e, board, item)}
                >
                    {item.title}
                </div>
            )}
        </div>
    )
    return (
        <div className="app">
            {componentBoards}
        </div>
    );
};

export default App

