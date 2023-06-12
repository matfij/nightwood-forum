import styles from './signin.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/hooks';
import { setSigninData } from './authSlice';
import { useForm } from 'react-hook-form';
import { SigninDto } from './models';
import { parseError } from '../../common/parse-error';
import { useSigninMutation } from './authApiSlice';

export const SigninComponent = () => {
    const dispatch = useAppDispatch();
    const [signin, { isLoading, error }] = useSigninMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninDto>();

    const onSignin = async (data: SigninDto) => {
        try {
            const res = await signin(data);
            if (!('data' in res)) {
                return;
            }
            dispatch(setSigninData(res.data));
            navigate('/workspace');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main>
            <h1 className="titleText">NotionGen</h1>
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
                <button disabled={isLoading} type="submit" className={styles.submitBtn}>
                    Signin
                </button>
            </form>
            <button disabled={isLoading} onClick={() => navigate('/signup')} className={styles.navigateBtn}>
                Signup
            </button>
        </main>
    );
};
