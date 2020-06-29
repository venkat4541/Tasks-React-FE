import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/todos/')
      .then(response => {
        this.setState({ todos: response.data });
      })
     .catch((error) => {
        console.log(error);
      })
  }

  todoList() {
    return this.state.todos.map((currentTodo, i) => {
      return this.renderTodo({todo: currentTodo, key: i});
    });
  }

  // markAsComplete = (id) => {
  //   console.log('before: ', this.state);
  //   const obj = {
  //     completed: !this.state.completed
  //   };
  //   console.log('after: ', this.state);
  //   axios.post('http://localhost:5000/todos/update/'+id, obj)
  //   .then(res => {
  //     // window.location.reload(false);
  //   });
  // }

  deleteTask = (id) => {
    axios.post('http://localhost:5000/todos/delete/'+id)
    .then(res => {
      window.location.reload(false);
    });
  }

  renderTodo = (props) => {
    return (
      <tr key={props.todo._id}>
        <td className={props.todo.completed ? 'completed border px-4 py-2' : 'border px-4 py-2'}>{props.todo.title}</td>
        <td className={props.todo.completed ? 'completed border px-4 py-2' : 'border px-4 py-2'}>{props.todo.user}</td>
        <td className={props.todo.completed ? 'completed border px-4 py-2' : 'border px-4 py-2'}>{props.todo.priority}</td>
        <td className="actions border px-4 py-2 flex justify-around">
            <Link to={"/edit/"+props.todo._id} className="text-teal-500">
              <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
            </Link>
            <span onClick={() => this.deleteTask(props.todo._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="30px" height="30px"><path fill="#f78f8f" d="M21 24.15L8.857 36.293 4.707 32.143 16.85 20 4.707 7.857 8.857 3.707 21 15.85 33.143 3.707 37.293 7.857 25.15 20 37.293 32.143 33.143 36.293z"/><path fill="#c74343" d="M33.143,4.414l3.443,3.443L25.15,19.293L24.443,20l0.707,0.707l11.436,11.436l-3.443,3.443 L21.707,24.15L21,23.443l-0.707,0.707L8.857,35.586l-3.443-3.443L16.85,20.707L17.557,20l-0.707-0.707L5.414,7.857l3.443-3.443 L20.293,15.85L21,16.557l0.707-0.707L33.143,4.414 M33.143,3L21,15.143L8.857,3L4,7.857L16.143,20L4,32.143L8.857,37L21,24.857 L33.143,37L38,32.143L25.857,20L38,7.857L33.143,3L33.143,3z"/></svg>
            </span>
            {/* <span onClick={() => this.markAsComplete(props.todo._id)}>
              <svg height="20px" viewBox="0 -46 417.81333 417" fill="#97CE68" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
            </span> */}
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div className="px-8 py-2 mt-10">
        <h3 className="text-2xl font-bold text-center text-teal-700">Your tasks</h3>
        <table className="table-fixed text mx-auto my-0" style={{ marginTop: 20 }} >
          <thead>
              <tr>
                <th className="px-4 py-2 w-1/4">Description</th>
                <th className="px-4 py-2 w-1/4">Responsible</th>
                <th className="px-4 py-2 w-1/4">Priority</th>
                <th className="px-4 py-2 w-1/4">Actions</th>
              </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
  )}
}