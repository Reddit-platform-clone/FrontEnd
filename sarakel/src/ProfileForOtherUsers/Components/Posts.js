import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";


export default function Posts(){
    return (
        <>
        <div>
                        {/* Display posts */}
                        {jsonData.posts.map(post => (
                            <div className='post' key={post.id}>
                                {/* Render each post */}
                                <div className='post-header'>
                                    <img src={post.user.image} alt='User Avatar' className='logoup1' />
                                    <span className='username1'>{post.user.name}</span>
                                    <div className='posttime'>
                                        <span className='posttime'>{post.time} ago</span>
                                    </div>
                                </div>
                                <div className='post-content'>
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
                                <div className='post-actions'>
                                    <button><BiUpvote /> {post.likes}</button>
                                    <button><BiDownvote /> {post.comments}</button>
                                    <button><GoReply /> Reply</button>
                                    <button><LuShare /> Share</button>
                                </div>
                            </div>
                        ))}
                    </div>
        </>
    );
}