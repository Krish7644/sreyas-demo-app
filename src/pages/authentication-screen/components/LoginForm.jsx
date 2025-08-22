import React, { useState } from 'react';

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          {isNewUser ? 'Create Your SREYAS Account' : 'Welcome Back!'}
        </h2>

        <form>
          {isNewUser && (
            <>
              <input type="text" placeholder="Full Name" className="input" required />
              <input type="text" placeholder="Temple Name" className="input" required />
              <input type="text" placeholder="Center Name" className="input" required />
              <input type="text" placeholder="Counsellor Name" className="input" required />
              
              <select className="input" required>
                <option value="">Select Batch</option>
                <option>Nakula</option>
                <option>Arjuna</option>
                <option>Bhima</option>
                <option>Yudhishthir</option>
                <option>Passed Out</option>
              </select>

              <select className="input" required>
                <option value="">Select Course</option>
                <option>B.Tech</option>
                <option>Degree</option>
                <option>Graduate</option>
                <option>Working</option>
              </select>

              <select className="input" required>
                <option value="">Select Designation</option>
                <option>Devotee</option>
                <option>Inmate</option>
                <option>Counsellor</option>
                <option>HOD</option>
                <option>Temple President</option>
              </select>
            </>
          )}

          <input type="email" placeholder="Email" className="input" required />
          <input type="password" placeholder="Password" className="input" required />

          <button className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 mt-4">
            {isNewUser ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isNewUser ? 'Already have an account?' : 'New here?'}
          <button
            className="text-purple-600 font-semibold ml-2"
            onClick={() => setIsNewUser(!isNewUser)}
          >
            {isNewUser ? 'Login' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
