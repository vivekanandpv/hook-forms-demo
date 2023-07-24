import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Login = (props) => {
  const { register, control, handleSubmit, reset, formState } = useForm();

  const { isSubmitSuccessful, isSubmitting, isSubmitted } = formState;

  const submit = (data) => {
    console.log('form submitted', data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <h3>Login Form</h3>
      <form noValidate onSubmit={handleSubmit(submit)}>
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='email'
            className='form-control'
            id='username'
            {...register('username')}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            {...register('password')}
          />
        </div>

        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
