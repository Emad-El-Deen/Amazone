import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaFacebook, FaGoogle, FaTwitter, FaWhatsapp, FaGoogleWallet } from 'react-icons/fa';
import '../Auth/register.css';

function Register() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = [];

    if (!id) errorMessage.push('ID');
    if (!name) errorMessage.push('Name');
    if (!password) errorMessage.push('Password');
    if (!email) errorMessage.push('Email');
    if (!phone) errorMessage.push('Phone');
    if (!gender) errorMessage.push('Gender');

    if (errorMessage.length > 0) {
      isProceed = false;
      toast.error(`Please enter: ${errorMessage.join(', ')}`);
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) {
      let regObj = { id, name, password, email, phone, gender };
      fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regObj),
      })
        .then(() => {
          toast.success("You registered successfully!");
          navigate('/login');
        })
        .catch(() => toast.error("Registration failed. Please try again."));
    }
  };

  return (
    <div className='parent-regster'>
      <div className='container col-md-3 mt-5 bg-light parent-reg'>
        <form onSubmit={handleSubmit}>
          <div className='card card_parent'>
            <div className='card-head card_head'>
              <h2 className='Ftitle'>Amazon</h2>
              <FaGoogleWallet className='cart-icon' />
            </div>
            <div className='card-body'>
              <div className='row'>
                {['id', 'name', 'password', 'email', 'phone'].map((field) => (
                  <div className='input1' key={field}>
                    <div className='form-group'>
                      <input
                        style={{ borderRadius: '20px' }}
                        type={field === 'password' ? 'password' : 'text'}
                        value={eval(field)}
                        onChange={(e) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`)(e.target.value)}
                        className='form-control form-controlN'
                        placeholder={`Enter your ${field}`}
                      />
                    </div>
                  </div>
                ))}
                <div className='input1'>
                  <div className='form-group gender'>
                    <label>Gender</label>
                    <br />
                    <input type='radio' checked={gender === 'male'} onChange={() => setGender('male')} name='gender' value='male' className='app-check' /> Male
                    <input type='radio' checked={gender === 'female'} onChange={() => setGender('female')} name='gender' value='female' className='app-check' /> Female
                    <div className='input1'>
                      <button className='signup' type='submit'>Register</button>
                      <span className='account'> Have an account?</span> <Link to='/login'>Log In</Link>
                    </div>
                  </div>
                </div>
                <div className='icons'>
                  <FaFacebook className='face' />
                  <FaGoogle className='google' />
                  <FaTwitter className='twitter' />
                  <FaWhatsapp className='whatsapp' />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
