import React, { useEffect } from 'react';

const Login = props => {
    let login =
        <div>
            <form>
                <input type="email" placeholder="Email Address" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <input type="submit" value="Login" />
            </form>
        </div>

    return login
}

export default Login
