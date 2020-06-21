import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Todo = props => (
  <tr>
      <td className={props.todo.completed ? 'completed border px-4 py-2' : 'border px-4 py-2'}>{props.todo.title}</td>
      <td className={props.todo.completed ? 'completed border px-4 py-2' : 'border px-4 py-2'}>{props.todo.user}</td>
      <td className={props.todo.completed ? 'completed border px-4 py-2' : 'border px-4 py-2'}>{props.todo.priority}</td>
      <td className="border px-4 py-2">
          <Link to={"/edit/"+props.todo._id} className="text-teal-500">Edit</Link>
      </td>
  </tr>
)

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8080/todos/')
      .then(response => {
        this.setState({ todos: response.data });
      })
     .catch((error) => {
        console.log(error);
      })
  }

  todoList() {
    return this.state.todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} key={i} />;
    })
  }

  render() {
    return (
      <div className="px-4">
        <h3>Todos List</h3>
        <table className="table-fixed" style={{ marginTop: 20 }} >
          <thead>
              <tr>
                <th className="px-4 py-2 w-1/4">Description</th>
                <th className="px-4 py-2 w-1/4">Responsible</th>
                <th className="px-4 py-2 w-1/4">Priority</th>
                <th className="px-4 py-2 w-1/4">Action</th>
              </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
  )}
}