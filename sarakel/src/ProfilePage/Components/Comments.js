import jsonData from '../../mock.json';
import style from './Comments2.module.css'


export default function Comments(){
    return(
        <>
        
<div className={style.commentscontainer1}>
    {/* Display comments */}
    {jsonData.Comments.map(comment => (
        <div className={style.comment1233} key={comment.comment_id}>
            {/* Render each comment */}
            <div className={style.commentheader11}>
                {/* <span className='username'>{comment.comment_id}</span> */}
            </div>
            <div className={style.commentcontent12}>
                <p>{comment.text}</p>
            </div>
            <div className={style.commenttime}>
                    <span>{comment.time}</span>
                </div>
        </div>
    ))}
</div>

        

        </>
    );
}