import React from 'react';
import './Users.css';
import jsonData from '../../mock.json';

function Users() {
    return (
        <div className='User-search-data-container'>
            {jsonData.users.map(user => (
                <div key={user.id} className='User-search-data'>
                    <img src={user.image} alt='Profile' className='user-avatar' />
                    <div>
                        <h3 className='username3'>{user.name}</h3>
                        <h6 className='sarakelid2'>{user.sarakelid}</h6>
                        <span className='aboutme'>{user.AboutMe}</span>
                        
                    </div>
                    {/* <div className="line-after"></div> */}
                </div>
            ))}
        </div>
    );
}

export default Users;
