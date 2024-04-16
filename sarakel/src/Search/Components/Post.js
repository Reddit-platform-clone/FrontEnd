import './Post.css'
import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json'

function Post(){
    return(
       <><div className='overview-post-comment1'>
       {jsonData.posts.map(post => {
               // const user = jsonData.users.find(user => user.id === post.user_id);
               // if (!user) return null; // If user does not exist, skip this post
               return (
                   <div className='post' key={post.id}>
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
                       
                   </div>
               );
           })}
       </div>
       </>
    );
}

export default Post