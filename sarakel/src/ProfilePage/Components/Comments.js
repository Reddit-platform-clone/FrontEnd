import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';
import './Comments2.css'


export default function Comments(){
    return(
        <>
        
        <div className='comments-container1'>
    {/* Display comments */}
    {jsonData.Comments.map(comment => (
        <div className='comment' key={comment.comment_id}>
            {/* Render each comment */}
            <div className='comment-header'>
                {/* <span className='username'>{comment.comment_id}</span> */}
            </div>
            <div className='comment-content'>
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