import React, {ChangeEvent, FC, useRef, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterType
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter
    }) => {

    // const listItems: JSX.Element[] = []
    // for (let i = 0; i < tasks.length; i++) {
    //     const newListItem = <li key={tasks[i].id}>
    //         <input type="checkbox" checked={tasks[i].isDone}/>
    //         <span>{tasks[i].title}</span>
    //     </li>
    //     listItems.push(newListItem)
    // }
    // const tasksList: JSX.Element = tasks.length
    //     ? <ul>{listItems}</ul>
    //     : <span>Your tasks list is empty</span>

    //useRef
    // const titleInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler = () => {
    //     if (titleInput.current) {
    //         addTask(titleInput.current.value);
    //         titleInput.current.value = ''
    //     }
    // }
    // <input ref={titleInput}/>

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const listItems: JSX.Element[] = tasks.map(t => {
        const removeTaskHandler = () => removeTask(t.id)
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                <span className={t.isDone ? 'taskDone' : 'task'}>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your tasks list is empty</span>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedNewTaskTitle = newTaskTitle.trim()
        if (trimmedNewTaskTitle) {
            addTask(trimmedNewTaskTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const errorMessage = error && <p style={{color:'red'}}>Title is required!</p>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input className={error ? 'inputError' : ''} value={newTaskTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {errorMessage}
            {tasksList}
            <div>
                <button className={filter === 'all' ? 'activeBtn' : ''} onClick={() => changeFilter('all')}>All</button>
                <button className={filter === 'active' ? 'activeBtn' : ''}
                        onClick={() => changeFilter('active')}>Active
                </button>
                <button className={filter === 'completed' ? 'activeBtn' : ''}
                        onClick={() => changeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

