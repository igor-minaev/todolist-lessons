import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    onClick: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedNewTaskTitle = newTitle.trim()
        if (trimmedNewTaskTitle) {
            props.onClick(trimmedNewTaskTitle)
        } else {
            setError(true)
        }
        setNewTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const errorMessage = error && <p style={{color: 'red'}}>Title is required!</p>
    return (
        <div>
            <input className={error ? 'inputError' : ''} value={newTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {errorMessage}
        </div>
    );
};

