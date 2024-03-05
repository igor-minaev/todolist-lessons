import React, {ChangeEvent, FC, useRef, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, newFilterValue: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const TodoList: FC<TodoListPropsType> = (
    {
        id,
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        removeTodolist
    }) => {

    const getFilteredTasksForRender = (allTasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'active':
                return allTasks.filter(t => !t.isDone)
            case 'completed':
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }
    const filteredTasksForRender = getFilteredTasksForRender(tasks, filter)

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

    const listItems: JSX.Element[] = filteredTasksForRender.map(t => {
        const removeTaskHandler = () => removeTask(id, t.id)
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, t.id, e.currentTarget.checked)
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
            addTask(id, trimmedNewTaskTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const errorMessage = error && <p style={{color: 'red'}}>Title is required!</p>
    const removeTodolistHandler = () => removeTodolist(id)

    return (
        <div className="todolist">
            <h3>
                {title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <div>
                <input className={error ? 'inputError' : ''} value={newTaskTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {errorMessage}
            {tasksList}
            <div>
                <button className={filter === 'all' ? 'activeBtn' : ''} onClick={() => changeFilter(id, 'all')}>All
                </button>
                <button className={filter === 'active' ? 'activeBtn' : ''}
                        onClick={() => changeFilter(id, 'active')}>Active
                </button>
                <button className={filter === 'completed' ? 'activeBtn' : ''}
                        onClick={() => changeFilter(id, 'completed')}>Completed
                </button>
            </div>
        </div>
    );
};

