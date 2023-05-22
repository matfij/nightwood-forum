import { useState } from 'react';

export interface LoginProps {
    hint: string;
    canRegister: boolean;
}

export const LoginComponent = (props: LoginProps) => {
    const [login, setLogin] = useState<string>('');
    const [users, setUsers] = useState<Array<string>>([]);
    const [search, setSearch] = useState<string>('');
    const [found, setFound] = useState<string>('');

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
            <h2>Login</h2>
            <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
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
