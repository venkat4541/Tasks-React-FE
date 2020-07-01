import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // eslint-disable-next-line 
import { registerUser } from "../../utils/authActions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log('New user: ', newUser);

        registerUser(newUser); 

    }

    render() {
        const {errors} = this.state;

        return (
            <section className="bg-grey-lighter mt-20 w-screen">
                <div className="container mx-auto h-full flex justify-center items-center">
                    <div className="w-2/5">
                    <h1 className="font-hairline text-xl mb-6 text-center">Create an Account</h1>
                        <div className="border-teal p-8 border-t-4 bg-white mb-6 rounded-lg shadow-lg">
                            <form noValidate onSubmit={this.onSubmit}>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="name" className="mb-2 uppercase font-bold text-md text-gray-700">Name</label>
                                <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className="border border-gray-300 py-1 px-3 text-grey-darkest"
                                autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="email" className="mb-2 uppercase font-bold text-md text-gray-700">Email</label>
                                <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className="border border-gray-300 py-1 px-3 text-grey-darkest"
                                autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="password" className="mb-2 uppercase font-bold text-md text-gray-700">Password</label>
                                <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className="border border-gray-300 py-1 px-3 text-grey-darkest"
                                autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="password2" className="mb-2 uppercase font-bold text-md text-gray-700">Confirm Password</label>
                                <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                className="border border-gray-300 py-1 px-3 text-grey-darkest"
                                autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <button 
                                    className="block bg-teal-400 hover:bg-teal-dark text-white uppercase text-lg mx-auto w-full py-2 m-3"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>
                            </form>
                            <p className="text-gray-600 text-darken-1 text-center mt-2 bg-gray-100 border border-gray-200 p-3">
                                Already have an account? <Link to="/login" className="text-teal-600">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
}

export default Register;