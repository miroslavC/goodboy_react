import React, { useRef } from 'react';
import { AppState } from '../store/AppState';
import { useSelector } from 'react-redux';

function UserDisplay () {
    const renderCount = useRef(0);
    const user = useSelector((state: AppState) => state.user);

    if(user) {
        return (<React.Fragment>

            <div>
                <label>username:</label>
                  {user.donate_sum}
            </div>
            <div>
                <label>email:</label>
                {user.email}
            </div>
            <div>
                <label>Donote type:</label>
                {user.donate_type}
            </div>
        </React.Fragment>);
    } else {
        return null;
    }
};

export default UserDisplay