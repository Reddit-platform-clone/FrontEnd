import jsonData from '../../mock.json';
import styles from './Comment.module.css'; // Import CSS module

export default function Comments() {
    return (
        <div className={styles.commentsContainer}>
            {/* Display comments */}
            {jsonData.Comments.map(comment => (
                <div className={styles.comment} key={comment.comment_id}>
                    {/* Render each comment */}
                    <div className={styles.commentHeader}>
                        {/* <span className='username'>{comment.comment_id}</span> */}
                    </div>
                    <div className={styles.commentContent}>
                        <p>{comment.text}</p>
                    </div>
                    <div className={styles.commentTime}>
                        <span>{comment.time}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
