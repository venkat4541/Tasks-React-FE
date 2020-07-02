import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../utils/authActions";

function Login() {
  
  const [user, setUser] = useState({
      email: "",
      password: ""
    });


  const onChange = e => {
    setUser({...user, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('user:', user);
    const userData = {
        email: user.email,
        password: user.password
        };
    loginUser(userData)
  };

  // if ( !loggedin ) {
    return (
      <section className="bg-grey-lighter mt-20 w-screen">
        <div className="container mx-auto h-full flex justify-center items-center">
          <div className="w-2/5">
            <h1 className="font-hairline text-xl mb-6 text-center">Login To Noitac</h1>
            <div className="border-teal p-8 border-t-4 bg-white mb-6 rounded-lg shadow-lg">
              <form noValidate onSubmit={onSubmit}>
                <div className="flex flex-col mb-4">
                  <label htmlFor="email" className="mb-2 uppercase font-bold text-md text-gray-700">Email</label>
                  <input
                    onChange={onChange}
                    value={user.email}
                    id="email"
                    type="email"
                    className="border border-gray-300 py-1 px-3 text-grey-darkest"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="password" className="mb-2 uppercase font-bold text-md text-gray-700">Password</label>
                  <input
                    onChange={onChange}
                    value={user.password}
                    id="password"
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
                      Login
                  </button>
                </div>
              </form>
              <p className="text-gray-600 text-darken-1 text-center mt-2 bg-gray-100 border border-gray-200 p-3">
                Don't have an account? <Link to="/register" className="text-teal-600">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  //  } else {
  //     return (
  //       <Redirect
  //         to={{
  //           pathname: '/',
  //           state: { from: props.location }
  //         }}
  //       />
  //     );
  //   }
}

export default Login;