import { useState } from 'react';
import '../Auth/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import { FaUser, FaLock, FaFacebook, FaGooglePlusG, FaTwitter, FaWhatsapp } from 'react-icons/fa';

function Login() {
  const [useremail, setuseremail] = useState('');
  const [password, setpassword] = useState('');
  const usenavigate = useNavigate();

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:3000/user?email=${encodeURIComponent(useremail)}`)
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error('Please Enter valid email');
          } else {
            if (resp.password && resp.password === password) {
              toast.success('Success');
              usenavigate('/');
            } else {
              toast.error('Please enter valid credentials');
            }
          }
        })
        .catch((err) => {
          toast.error('Login Failed due to: ' + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (!useremail) {
      result = false;
      toast.warning('Please enter your email');
    } else if (!/\S+@\S+\.\S+/.test(useremail)) {
      result = false;
      toast.warning('Please enter a valid email');
    }

    if (!password) {
      result = false;
      toast.warning('Please enter your password');
    }

    return result;
  };

  return (
    <div className='parent-login'>
      <div className='row'>
        <div className="col-lg-4">
          <form onSubmit={proceedLogin} className='container containerL'>
            <div className='card card1'>
              <div className="card-head">
                <h2 className='logintitle'>Welcome Back</h2>
                <div className="iconL">
                  <FaFacebook className="face" />
                  <FaGooglePlusG className="google" />
                  <FaTwitter className="twitter" />
                  <FaWhatsapp className="whatsapp" />
                </div>  
              </div>

              <div className="card-body card-bodyE">
                <div className="form-group groups">
                  <input
                    value={useremail}
                    onChange={(e) => setuseremail(e.target.value)}
                    className='form-control Finput'
                    type='email'
                    placeholder='Enter your email'
                    required
                  />
                  <FaUser className="input-icon" />
                </div>
                <div className="form-group groups">
                  <input
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className='form-control Finput'
                    type='password'
                    placeholder='Enter your password'
                    required
                  />
                  <FaLock className="input-icon" />
                </div>
              </div>

              <div className="card-end">
                <button type='submit' className='btn btn-primary'>
                  Sign In
                </button>
                <Link to='/register' className='btn btn-link'>
                 Don’t have an account? Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
