import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export const AddItemForm = () => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)
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
    return (
        <div>
            <input className={error ? 'inputError' : ''} value={newTaskTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {errorMessage}
        </div>
    );
};

