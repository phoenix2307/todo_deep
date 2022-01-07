import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {
            id: v1(), title: title, isDone: false
        }
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todoList = todoLists.find(tl => tl.id === todolistId)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListId: string) {
        debugger
        todoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(todoLists)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    //

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoListId1, title: 'What to learn', filter: 'active'},
            {id: todoListId2, title: 'What to buy', filter: 'completed'}
        ]
    )


    const [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true}
        ]
    })

    return (
        <div className="App">

            {
                todoLists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id]
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    } else {}

                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            remove={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }


        </div>
    );
}


export default App;
