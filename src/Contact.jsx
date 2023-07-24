import { DevTool } from '@hookform/devtools';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const Contact = (props) => {
  const { register, control, handleSubmit, reset, formState } = useForm();

  const {
    isSubmitSuccessful,
    isSubmitting,
    isSubmitted,
    errors,
    dirtyFields,
    touchedFields,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control: control,
  });

  const submit = (data) => {
    console.log('form submitted', data);
  };

  const submissionError = (errors) => {
    console.log('submission errors', errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <>
      <h3>Contact Details</h3>
      <form noValidate onSubmit={handleSubmit(submit, submissionError)}>
        <div className='mb-3'>
          <label htmlFor='firstName' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            {...register('firstName')}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='lastName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            {...register('lastName')}
          />
        </div>
        <div className='my-4'>
          <button className='btn btn-info btn-sm' type='button'>
            Add Phone Number
          </button>
        </div>
        {fields.map((p, i) => {
          return (
            <div className='mb-3' key={p.id}>
              <input type='text' className='form-control' />
              <button className='btn btn-danger btn-sm ms-4' type='button'>
                Remove Phone Number
              </button>
            </div>
          );
        })}

        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </>
  );
};

export default Contact;
