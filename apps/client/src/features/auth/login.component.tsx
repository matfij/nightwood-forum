import { useSigninMutation } from '../../common/apiSlice';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { setUsername } from './authSlice';

export interface LoginProps {
    hint: string;
    canRegister: boolean;
}

export const LoginComponent = (props: LoginProps) => {
    const username = useAppSelector((state) => state.auth.username);
    const dispatch = useAppDispatch();
    const [signin, { isLoading, isError }] = useSigninMutation();

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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1>{props.hint}</h1>
            <h2>Hello {username}</h2>
            <button onClick={onSignin}>Login</button>
            <hr />
            {isLoading && <p>Signing in...</p>}
            {isError && <p>Incorrect credentials</p>}
        </>
    );
};
