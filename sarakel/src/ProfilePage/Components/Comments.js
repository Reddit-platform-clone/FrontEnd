import jsonData from '../../mock.json';
import './Comments2.css'


export default function Comments(){
    return(
        <>
        
        <div className='comments-container1'>
    {/* Display comments */}
    {jsonData.Comments.map(comment => (
        <div className='comment1233' key={comment.comment_id}>
            {/* Render each comment */}
            <div className='comment-header11'>
                {/* <span className='username'>{comment.comment_id}</span> */}
            </div>
            <div className='comment-content12'>
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