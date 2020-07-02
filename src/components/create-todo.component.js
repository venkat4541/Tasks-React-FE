import React, { useState } from 'react';
import axios from 'axios';

function CreateTodo(props) {
     
    const [todo, setTodo] = useState({
        title: '',
        user: '',
        priority: '',
        completed: false
    });

    const onChangeTodoDescription = (e) => {
        setTodo({...todo, title: e.target.value});
    }

    const onChangeTodoResponsible = (e) => {
        setTodo({...todo, user: e.target.value});
    }

    const onChangeTodoPriority = (e) => {
        setTodo({...todo, priority: e.target.value});
    }

    const onSubmit = (e) => {
      e.preventDefault();
    
      const newTodo = {
          title: todo.title,
          user: todo.user,
          priority: todo.priority ? todo.priority : 'Low',
          completed: todo.completed
      };

      axios.post('http://localhost:5000/api/todos/add', newTodo)
          .then(res => {
            props.history.push('/');
          });

        setTodo({
          title: '',
          user: '',
          priority: '',
          completed: false
      });
    }

    const cancel = () => props.history.push('/');

    return (
        <div className="px-8 py-2">
            <h3>Create New Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group my-6"> 
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title: </label>
                    <input  type="text"
                            placeholder="Describe the task"
                            className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={todo.title}
                            onChange={onChangeTodoDescription}
                            />
                </div>
                <div className="form-group my-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">User: </label>
                    <input 
                            type="text" 
                            placeholder="Assignee"
                            className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={todo.user}
                            onChange={onChangeTodoResponsible}
                            />
                </div>
                <div className="form-group my-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Priority: </label>
                    <select 
                        onChange={onChangeTodoPriority}
                        className="block appearance-none w-1/3 cursor-pointer bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                <div className="form-group my-8">
                    <input type="submit" value="Create Todo" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
                    <input type="button" value="Cancel" onClick={cancel}
                        className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 mx-4 rounded cursor-pointer"/>
                </div>
            </form>
        </div>
    );
}

export default CreateTodo;