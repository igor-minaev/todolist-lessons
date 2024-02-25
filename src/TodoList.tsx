import React, {FC} from 'react';
import {FilterType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (newFilterValue: FilterType) => void
}

export const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter
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

    const listItems: JSX.Element[] = tasks.map(t => {
        const removeTaskHandler = () => removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your tasks list is empty</span>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={()=>changeFilter('all')}>All</button>
                <button onClick={()=>changeFilter('active')}>Active</button>
                <button onClick={()=>changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

