import { useState } from 'react';

import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import Button from '../button/button';

import './sign-in.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch(error) {}
    }


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
    <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
        <FormInput
            label='Email' 
            inputOptions = {{
            type:'email' ,
            required: true ,
            onChange:handleChange,
            name:'email',
            value:email,
            }}
        />
        
        <FormInput
            label='Password' 
            inputOptions = {{
                type:'password' ,
                required: true ,
                onChange:handleChange,
                name:'password', 
                value:password,
            }}
        />
        <Button type='submit'>Sign In</Button>
        <Button onClick={signInWithGoogle}>Google Sign In</Button>

        </form>
    </div>
)

}

export default SignInForm;