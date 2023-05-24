import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../common/store';
import { setUsername } from './authSlice';

export interface LoginProps {
    hint: string;
    canRegister: boolean;
}

export const LoginComponent = (props: LoginProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [login, setLogin] = useState<string>('');
    const [users, setUsers] = useState<Array<string>>([]);
    const [search, setSearch] = useState<string>('');
    const [found, setFound] = useState<string>('');
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.auth.username);

    useEffect(() => {
        console.log('focus');
        inputRef.current?.focus();
        dispatch(setUsername('test'));
    });

    const addUser = () => {
        if (!login) {
            return;
        }
        setUsers([...users, login]);
        setLogin('');
    };

    const searchUser = () => {
        const foundUser = users.find((user) => user === search) || '';
        setFound(foundUser);
    };

    return (
        <>
            <h1>{props.hint}</h1>
            <h2>Login {username}</h2>
            <input value={login} ref={inputRef} onChange={(e) => setLogin(e.target.value)} type="text" />
            <button onClick={addUser}>Login</button>
            <h3>Online users:</h3>
            {users.map((user) => (
                <li key={user}>{user}</li>
            ))}
            <hr />
            <h3>Search user:</h3>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
            <button onClick={searchUser}>Search</button>
            <p>
                <b>{found}</b>
            </p>
        </>
    );
};
