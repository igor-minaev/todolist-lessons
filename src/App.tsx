import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    const todolistTitle_1 = 'What to learn'
    const todolistTitle_2 = 'What to buy'

    const tasks_1: TaskType[] = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'REACT', isDone: false}
    ]
    const tasks_2: TaskType[] = [
        {id: 4, title: 'MEAT', isDone: true},
        {id: 5, title: 'FISH', isDone: true},
        {id: 6, title: 'WATER', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={todolistTitle_1} tasks={tasks_1}/>
            <Todolist title={todolistTitle_2}  tasks={tasks_2}/>
        </div>
    );
}

export default App;
