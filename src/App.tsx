import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

type TasksObjType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksObjType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}

        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'React2', isDone: false}
        ]
    })

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        })
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeFilter = (todolistId: string, newFilterValue: FilterType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: newFilterValue} : t))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistsType = {id: newTodolistId, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    }

    return (
        <div className="App">
            <AddItemForm onClick={addTodolist}/>
            {todolists.map(el => {
                return (
                    <TodoList
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
                        filter={el.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
