import React, { useState } from 'react';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    passwordMatchError: false,
    usernameError: false,
    signInSuccess: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setFormData((prevData) => ({
        ...prevData,
        passwordMatchError: name === 'password' ? prevData.confirmPassword !== value : prevData.password !== value,
      }));
    } else if (name === 'username') {
      const lettersRegex = /^[A-Za-z]+$/;
      setFormData((prevData) => ({
        ...prevData,
        usernameError: !lettersRegex.test(value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (name === 'password' || name === 'confirmPassword') {
      setFormData((prevData) => ({
        ...prevData,
        passwordMatchError: name === 'password' ? prevData.confirmPassword !== prevData.password : value !== prevData.password,
      }));
    } else if (name === 'username') {
      const lettersRegex = /^[A-Za-z]+$/;
      setFormData((prevData) => ({
        ...prevData,
        usernameError: !lettersRegex.test(value),
      }));
    }

    if (value.trim() === '') {
      setFormData((prevData) => ({
        ...prevData,
        [`${name}Error`]: true,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [`${name}Error`]: false,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormData((prevData) => ({
        ...prevData,
        passwordMatchError: true,
      }));
      return;
    }

    console.log(formData);
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      passwordMatchError: false,
      usernameError: false,
      signInSuccess: true,
    });
  };

  const isSignInDisabled =
    formData.usernameError ||
    formData.passwordMatchError ||
    formData.username.trim() === '' ||
    formData.password.trim() === '' ||
    formData.confirmPassword.trim() === '';

  return (
      <>
      <h2 style={styles.header}>Sign In Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label htmlFor="username" style={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            style={styles.input}
            required
          />
          {formData.usernameError && (
            <p style={styles.error}>Username must contain only letters.</p>
          )}
        </div>
        <div>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" style={styles.label}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            style={styles.input}
            required
          />
          {formData.passwordMatchError && (
            <p style={styles.error}>Passwords do not match.</p>
          )}
        </div>
        <button
            type="submit"
            style={{
              ...styles.button,
              backgroundColor: isSignInDisabled ? '#ccc' : '#4caf50',
              cursor: isSignInDisabled ? 'not-allowed' : 'pointer',
            }}
            disabled={isSignInDisabled}
        >
          Sign In
        </button>
        {formData.signInSuccess && (
          <p style={styles.successMessage}>Sign In successful!</p>
        )}
      </form>
      </>
  );
};

const styles = {
  form: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  input: {
    width: '95%',
    padding: '8px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    marginTop: '4px',
    color: 'red',
    fontSize: '12px',
  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  successMessage: {
    textAlign: 'center',
    color: '#4caf50',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
  }
};

// Media queries for responsiveness
const mediaQueryTablet = '@media (maxWidth: 768px)';
const mediaQueryMobile = '@media (maxWidth: 480px)';

// Responsive styles
styles.form = {
  ...styles.form,
  [mediaQueryTablet]: {
    maxWidth: '90%',
  },
};

styles.input = {
  ...styles.input,
  [mediaQueryMobile]: {
    width: '100%',
  },
};

styles.button = {
  ...styles.button,
  [mediaQueryMobile]: {
    width: '100%',
  },
};


export default SignInForm;
