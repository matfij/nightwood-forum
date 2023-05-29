import { Link, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../../common/apiSlice';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { setUsername } from './authSlice';

export const SigninComponent = () => {
    const username = useAppSelector((state) => state.auth.username);
    const dispatch = useAppDispatch();
    const [signin, { isLoading, isError }] = useSigninMutation();
    const navigate = useNavigate();

    const onSignin = async () => {
        try {
            const res = await signin({
                username: 'userpro',
                password: 'secretAA123',
            });
            if (!('data' in res)) {
                return;
            }
            dispatch(setUsername(res.data.username));
            navigate('/workspace');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h2>Hello {username}</h2>
            <button onClick={onSignin}>Login</button>
            <hr />
            {isLoading && <p>Signing in...</p>}
            {isError && <p>Incorrect credentials</p>}
            <Link to={'/signup'}>Sign up</Link>
            <Link to={'/workspace'}>To home</Link>
        </>
    );
};
