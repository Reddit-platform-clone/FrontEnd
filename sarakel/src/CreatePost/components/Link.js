import React, { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Link({ setPostBody })
{
    const [content, setContent] = useState('');

    const handleChange = (e) => {
        let value = e.target.value;
     setContent(value);
     setPostBody(value);

    };
    


   return (
   


         <div>
                <textarea
                    className="link-textarea"
                    value={content}
                    onChange={handleChange}
                    
                />
            </div>

        
        
    
   )
}