import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';

import './Comments1.css'


export default function Comments(){
    return(
        <>
        
        <div className='comments-container54321'>
    {/* Display comments */}
    {jsonData.Comments.map(comment => (
        <div className='comment54321' key={comment.comment_id}>
            {/* Render each comment */}
            <div className='comment-header54321'>
                {/* <span className='username'>{comment.comment_id}</span> */}
            </div>
            <div className='comment-content54321'>
                <p>{comment.text}</p>
            </div>
            <div className='comment-time'>
                    <span>{comment.time}</span>
                </div>
        </div>
    ))}
</div>

        

        </>
    );
}