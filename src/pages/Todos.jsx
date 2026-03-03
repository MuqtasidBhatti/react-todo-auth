import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

const Todos = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState(() => {
        const stored = localStorage.getItem("todos")
        return stored ? JSON.parse(stored) : []

    })
    const [editTodo, setEditTodo] = useState(null);
    const [editInput, setEditInput] = useState("");

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (e) => {
        e.preventDefault()

        if (input.trim() === "") return;
        setTodos([
            ...todos,
            { id: Date.now(), text: input, completed: false }
        ])
        setInput("")
    }

    const dltTodo = (id) => {
        const deleteTodo = todos.filter((todo) => id !== todo.id)
        setTodos(deleteTodo)
    }

    const editTodoHandler = (id, text) => {
        setEditTodo(id)
        setEditInput(text)
    }

    const updateTodo = () => {
        const updatedTodo = todos.map(todo =>
            todo.id === editTodo ?
                { ...todo, text: editInput } : todo
        )

        setTodos(updatedTodo)
        setEditTodo(null)
        setEditInput("")
    }

    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ?
                    { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    return (

        <div className="min-h-screen bg-linear-to-br from-gray-800 via-purple-950 to-black p-4 text-white">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-10">

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">


                    <h2 className="text-4xl font-bold mb-8 text-center tracking-wide">
                        Todo-List
                    </h2>

                    <form
                        onSubmit={addTodo}
                        className="flex flex-col sm:flex-row gap-3 mb-8"
                    >

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />

                        <button
                            type='submit'
                            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all duration-200 font-semibold shadow-md cursor-pointer"
                        >
                            Add Task
                        </button>
                    </form>


                    {todos.length > 0 ? (
                        <ul className="space-y-4">
                            {todos.map(todo => (
                                <li
                                    key={todo.id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/10 border border-white/20 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">

                                    <div className="flex items-start gap-4 flex-1">
                                        <input
                                            type='checkbox'
                                            checked={todo.completed}
                                            onChange={() => toggleTodo(todo.id)}
                                            className="w-5 h-5 mt-1 accent-purple-500 cursor-pointer"
                                        />

                                        {editTodo === todo.id ? (
                                            <input
                                                type='text'
                                                value={editInput}
                                                onChange={(e) => setEditInput(e.target.value)}
                                                className="flex-1 w-full min-w-0 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                        ) : (
                                            <span
                                                className={`flex-1 break-words text-lg ${todo.completed ? "line-through opacity-60" : ""
                                                    }`}>
                                                {todo.text}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {editTodo === todo.id ? (
                                            <button
                                                onClick={updateTodo}
                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 active:scale-95 shadow cursor-pointer"
                                            >
                                                Update
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => editTodoHandler(todo.id, todo.text)}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 active:scale-95 shadow cursor-pointer"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => dltTodo(todo.id)}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 active:scale-95 shadow cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-300 mt-10 text-lg italic opacity-80">
                            No tasks yet. Add one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Todos;
