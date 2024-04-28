import jsonData from '../../mock.json'
import style from'./Posts.module.css'
import { CgAddR } from "react-icons/cg";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";

function Posts(){
    return (
        <div className={style.overviewPostComment1}>
            {jsonData.posts.map(post => (
                <div className={style.post} key={post.id}>
                    <div className={style.postheader}>
                        <img src={post.user.image} alt='User Avatar' className={style.logoup1} />
                        <span className={style.username2}>{post.user.name}</span>
                        <div className={style.posttime}>
                            <span className={style.posttime}> {post.time} ago</span>
                        </div>
                    </div>
                    <div className={style.postcontent}>
                        <h3>{post.title}</h3>
                        <p>{post.text}</p>
                        {Array.isArray(post.media) ? (
                            post.media.map((media, index) => (
                                <img src={media} key={index} alt={`Media ${index}`} />
                            ))
                        ) : (
                            <img src={post.media} alt='Media' />
                        )}
                    </div>
                    <div className={style.postactions}>
                        <button><BiUpvote /> {post.likes}</button>
                        <button><BiDownvote /> {post.comments}</button>
                        <button><GoReply /> Reply</button>
                        <button><LuShare /> Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Posts