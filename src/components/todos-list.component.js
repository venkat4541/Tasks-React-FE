import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Todo = props => (
  <tr>
      <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
      <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
      <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
      <td>
          <Link to={"/edit/"+props.todo._id}>Edit</Link>
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

  updateTodo(todo) {
    console.log(todo);
 }

  render() {
    return (
      <div className="px-4">
        <h3>Todos List</h3>
        <table className="" style={{ marginTop: 20 }} >
          <thead>
              <tr>
                <th>Description</th>
                <th>Responsible</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
  )}
}