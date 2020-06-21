import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props) {
      super(props);
      this.state = {
          title: '',
          user: '',
          priority: '',
          completed: false
      }

      this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
      this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
      this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    
    render() {
        return (
            <div className="px-8 py-2">
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group my-6"> 
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title: </label>
                        <input  type="text"
                                placeholder="Describe the task"
                                className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={this.state.title}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group my-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">User: </label>
                        <input 
                                type="text" 
                                placeholder="Assignee"
                                className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={this.state.user}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group my-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Priority: </label>
                        <select 
                          onChange={this.onChangeTodoPriority}
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
                        <input type="button" value="Cancel" onClick={this.cancel}
                          className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 mx-4 rounded cursor-pointer"/>
                    </div>
                </form>
            </div>
        )
    }

    onChangeTodoDescription(e) {
      this.setState({
          title: e.target.value
      });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            user: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    onSubmit(e) {
      e.preventDefault();
    
      const newTodo = {
          title: this.state.title,
          user: this.state.user,
          priority: this.state.priority,
          completed: this.state.completed
      };

      axios.post('http://localhost:8080/todos/add', newTodo)
          .then(res => {
            console.log(res.data);
            this.props.history.push('/');
          });

      this.setState({
          title: '',
          user: '',
          priority: '',
          completed: false
      });
    }

    cancel = () => this.props.history.push('/');
}