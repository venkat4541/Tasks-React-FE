import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditTodo(props) {

  const [todo, setTodo] = useState({
    title: 'temp',
    user: 'temp',
    priority: 'temp',
    completed: false
  });

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos/'+props.match.params.id)
      .then(response => {
        setTodo({
          title: response.data.title,
          user: response.data.user,
          priority: response.data.priority,
          completed: response.data.completed
        });  
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  const onChangeTodoDescription = (e) => {
    setTodo({...todo, title: e.target.value});
  }

  const onChangeTodoResponsible = (e) => {
    setTodo({...todo, user: e.target.value});
  }

  const onChangeTodoPriority = (e) => {
    setTodo({...todo, priority: e.target.value});
  }

  const onChangeTodoCompleted = (e) => {
    setTodo({...todo, completed: !todo.completed});
  }

  const cancelEdit = () => props.history.push('/');

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {
        title: todo.title,
        user: todo.user,
        priority: todo.priority,
        completed: todo.completed
    };
    axios.post('http://localhost:5000/api/todos/update/'+props.match.params.id, obj)
        .then(res => {
          console.log(res.data);
          props.history.push('/');
      });
  }

  return (
    <div className="px-8 py-2">
      <h3>Update Todo</h3>
      <form onSubmit={onSubmit}>
          <div className="form-group my-6"> 
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title: </label>
              <input  type="text"
                      className="appearance-none block w-full lg:w-1/3 md:w-1/2 sm:w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={todo.title}
                      onChange={onChangeTodoDescription}
                      />
          </div>
          <div className="form-group my-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">User: </label>
              <input 
                      type="text" 
                      className="appearance-none block w-full lg:w-1/3 md:w-1/2 sm:w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={todo.user}
                      onChange={onChangeTodoResponsible}
                      />
          </div>
          <div className="form-group my-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Priority: </label>
              <select 
                onChange={onChangeTodoPriority}
                value={todo.priority}
                className="block appearance-none w-full lg:w-1/3 md:w-1/2 sm:w-full cursor-pointer bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="md:w-2/3 block text-gray-500 font-bold">
                <input
                  name="completedCheckbox"
                  onChange={onChangeTodoCompleted}
                  checked={todo.completed || false}
                  value={todo.completed || false}
                  className="mr-2 leading-tight cursor-pointer" type="checkbox"
                />
                <span className="text-md">
                  Completed
                </span>
              </label>
            </div>
          </div>
          <div className="form-group my-8">
              <input type="submit" value="Update Todo"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"/>
            <input type="button" value="Cancel" onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 mx-4 rounded cursor-pointer"/>
          </div>
      </form>
    </div>
  );
}

export default EditTodo;