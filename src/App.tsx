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
    const [boards, setBoards] = useState<BoardType[]>([
        {
            id: 1,
            title: 'Сделать',
            items: [{id: 1, title: 'Пойти в магазин'}, {id: 2, title: 'Выкинуть мусор'}, {id: 3, title: 'Покушать'}]
        },
        {
            id: 2,
            title: 'Сделать',
            items: [{id: 4, title: 'Пойти в магазин'}, {id: 5, title: 'Выкинуть мусор'}, {
                id: 6,
                title: 'Задачи на фибоначчи'
            }]
        },
        {
            id: 3,
            title: 'Сделать',
            items: [{id: 7, title: 'Пойти в магазин'}, {id: 8, title: 'Выкинуть мусор'}, {id: 9, title: 'Отрендерить'}]
        },
    ])
    // Components before rendering
    const componentBoards = boards.map(board =>
        <div className={'board'} key={board.id}>
            <div className={'board__title'}>{board.title}</div>
            {board.items.map(item =>
                <div className={'item'} key={item.id}>{item.title}</div>
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

