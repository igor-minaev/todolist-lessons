import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'

    // useReducer()
    // redux

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')
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


    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeFilter = (newFilterValue: FilterType) => {
        setFilter(newFilterValue)
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
