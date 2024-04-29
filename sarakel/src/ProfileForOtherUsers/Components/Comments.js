import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';

import style from './Comments1.module.css'


export default function Comments(){
    return(
        <>
        
        <div className={style.commentscontainer54321}>
    {/* Display comments */}
    {jsonData.Comments.map(comment => (
        <div className={style.comment54321} key={comment.comment_id}>
            {/* Render each comment */}
            <div className={style.commentheader54321}>
                {/* <span className='username'>{comment.comment_id}</span> */}
            </div>
            <div className={style.commentcontent54321}>
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