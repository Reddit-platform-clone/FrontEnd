import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";
import jsonData from '../../mock.json';
import style from './Overview.module.css';

function Overview() {
  return (
    <div className={style.overviewpostcomment1}>
      {jsonData.posts.map(post => (
        <div className={style.post} key={post.id}>
          <div className={style.postheader}>
            <img src={post.user.image} alt='User Avatar' className={style.logoup1} />
            <span className={style.username1}>{post.user.name}</span>
            <div className={style.posttime}>
              <span className={style.posttime}>{post.time} ago</span>
            </div>
          </div>
          <div className={style.postcontent}>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
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

export default Overview;
