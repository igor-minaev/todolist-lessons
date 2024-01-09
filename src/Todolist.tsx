import React from 'react';
import {Button} from "./Button";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {
    const listItems: JSX.Element[] = tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })
    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button name='+'/>
            </div>
            <ul>
                {listItems}
            </ul>
            <div>
                <Button name='All'/>
                <Button name='Active'/>
                <Button name='Completed'/>
            </div>
        </div>
    );
};

