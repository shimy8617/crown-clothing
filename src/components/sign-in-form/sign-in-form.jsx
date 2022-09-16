import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button';

import { UserContext } from '../../contexts/user.context';

import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

import './sign-in.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email, 
                password);
            setCurrentUser(user);

            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error)
            }
        }
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
        <Button 
            type='button' 
            buttonType={BUTTON_TYPE_CLASSES.google} 
            onClick={signInWithGoogle}>Google Sign In
        </Button>

        </form>
    </div>
)

}

export default SignInForm;