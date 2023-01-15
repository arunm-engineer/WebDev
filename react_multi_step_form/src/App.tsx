import { useState } from 'react'
import { useMultiStepForm } from './useMultiStepForm'
import { UserForm } from './UserForm'
import { AddressForm } from './AddressForm'
import { AccountForm } from './AccountForm'
import { FormEvent } from 'react';

type FormData = {
  firstName: string
  lastName: string
  age: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}

function App() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ... fields }
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = 
  useMultiStepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />
  ]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert('Successful Account Creation');
  }

  return (
    <div
      style={{
        position: 'relative',
        margin: '1rem',
        border: '1px solid black',
        padding: '2rem',
        background: 'white',
        borderRadius: '0.5rem',
        fontFamily: 'Arial',
        maxWidth: 'max-content'
      }}
    >
      <form onSubmit={submit}>
        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem'
          }}
        >
          {!isFirstStep && (
            <button onClick={back} type='button'>
              Back
            </button>
          )}
          <button type='submit'>
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
