import React, { useEffect } from 'react';

const Landing = props => {

    /*useEffect(() => {
        console.log('useEffect runs');
        if (props.auth.isAuthenticated) {
            props.history.push('/folders')
        }
    }, [])*/

    let landing =
        <div>
            <h1>BudJet</h1>
            <hr></hr>
            <p>The simple budget planner app</p>
        </div>


    return landing
}

export default Landing