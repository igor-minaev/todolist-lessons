import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'

    // useReducer()
    // redux

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    const addTask = (title: string) => {
        const newTask: TaskType = {id: crypto.randomUUID(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t))
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeFilter = (newFilterValue: FilterType) => {
        setFilter(newFilterValue)
    }
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
    const filteredTasksForRender: TaskType[] = getFilteredTasksForRender(tasks, filter)

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasksForRender}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
