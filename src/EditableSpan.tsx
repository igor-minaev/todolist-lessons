import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    onClick: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    // const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // error && setError(false)
        setNewTitle(e.currentTarget.value)
    }
    const editHandler = () => {
        setEdit(!edit)
        edit && addTask()
    }
    const addTask = () => props.onClick(newTitle)
    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

