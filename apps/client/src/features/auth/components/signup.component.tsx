import styles from './signup.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { parseError } from '../../../common/utils/parse-error';
import { useSignupMutation } from '../../../common/gql/gql-client';

export const SignupComponent = () => {
    const [signup, { loading, error }] = useSignupMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>();

    const onSignup = async (data: SignupFormData) => {
        const res = await signup({
            variables: {
                signupDto: {
                    username: data.username,
                    password: data.password,
                },
            },
        });
        if (!res.data) {
            return;
        }
        navigate('/');
    };

    return (
        <main>
            <h1 className="titleText">NotionGen</h1>
            <form onSubmit={handleSubmit((data) => onSignup(data))} className={styles.formWrapper}>
                <h3>Create a new account</h3>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input {...register('username', { required: true })} />
                    {errors.username && <p className="errorText">Username is required</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input {...register('password', { required: true })} type="password" />
                    {errors.password && <p className="errorText">Password is required</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="repeatPassword">Password</label>
                    <input
                        {...register('repeatPassword', {
                            required: true,
                            validate: (value) => value === watch('password'),
                        })}
                        type="password"
                    />
                    {errors.repeatPassword && <p className="errorText">Password does not match</p>}
                </fieldset>
                {error && <p className="errorText">{parseError(error)}</p>}
                <button disabled={loading} type="submit" className={styles.submitBtn}>
                    Create
                </button>
            </form>
            <button disabled={loading} onClick={() => navigate('/')} className={styles.navigateBtn}>
                Signin
            </button>
        </main>
    );
};

interface SignupFormData {
    username: string;
    password: string;
    repeatPassword: string;
}
