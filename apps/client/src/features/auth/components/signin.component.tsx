import styles from './signin.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../common/state/hooks';
import { useForm } from 'react-hook-form';
import { parseError } from '../../../common/utils/parse-error';
import { SigninDto, useSigninMutation } from '../../../common/gql/gql-client';
import { setSigninData } from '../state/authSlice';

export const SigninComponent = () => {
    const dispatch = useAppDispatch();
    const [signinMutation, { loading, error }] = useSigninMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninDto>();

    const onSignin = async (data: SigninDto) => {
        try {
            const res = await signinMutation({
                variables: {
                    signinDto: data,
                },
            });
            if (!res.data) {
                return;
            }
            dispatch(setSigninData(res.data.signin));
            navigate('/workspace');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main>
            <h1 className="titleText" data-testid="test-app-name">NotionGen</h1>
            <form onSubmit={handleSubmit((data) => onSignin(data))} className={styles.formWrapper} autoComplete="on">
                <h3>Sign in</h3>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input {...register('username', { required: true })} autoComplete="username" />
                    {errors.username && <p className="errorText">Username is required.</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input
                        {...register('password', { required: true })}
                        type="password"
                        autoComplete="current-password"
                    />
                    {errors.password && <p className="errorText">Password is required.</p>}
                </fieldset>
                {error && <p className="errorText">{parseError(error)}</p>}
                <button disabled={loading} type="submit" className={styles.submitBtn}>
                    Signin
                </button>
            </form>
            <button disabled={loading} onClick={() => navigate('/signup')} className={styles.navigateBtn}>
                Signup
            </button>
        </main>
    );
};
