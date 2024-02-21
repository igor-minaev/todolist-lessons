import React from 'react';
import './App.css';
import {TodoList} from './TodoList';

function App() {
    const todoListTitle_1: string = 'What to learn'
    const todoListTitle_2: string = 'What to buy'
    const tasks_1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    const tasks_2 = [
        {id: 4, title: 'HTML&CSS', isDone: true},
        {id: 5, title: 'JS', isDone: true},
        {id: 6, title: 'React', isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle_1}/>
            <TodoList title={todoListTitle_2}/>
        </div>
    );
}

export default App;
