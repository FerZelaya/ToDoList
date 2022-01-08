import React, { useEffect } from 'react'


interface LoginProps{
    auth: {
        isLogged: boolean,
        login: Function
    }
}

const Login:React.FC<LoginProps> = ({auth}) => {
    const {isLogged, login} = auth
    const title = isLogged ? "YMCMB" : "LOL"
    
    useEffect(() => {
        login()
    },[login])

    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

export default Login
