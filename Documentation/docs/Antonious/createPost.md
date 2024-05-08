
# create post
```jsx

import React, { useState } from 'react';
//import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Post from './components/Post.js';
import ImageVideo from './components/ImageVideo.js';
import Link from './components/Link.js';
import Poll from './components/poll.js';
import { faImage , faLink , faSquarePollHorizontal ,faFileLines ,faPlus,faTag} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

```
### necessary imports to link it with features of the post


```jsx
export default function CreatePost() {

    
    const[postTitle, setPostTitle] = useState('');
    const[postBody, setPostBody] = useState('');
    const[community,setCommunity]=useState('');
    let lock=false;

  async function handleSubmit  () {
        
   
    const newPost = { title: postTitle, content: postBody ,communityId: community ,userId:'1',parentId:'1', isLocked:lock}
    try {
    const response = await sendInfo(newPost);

    console.log("post created successfully:", response.data);

    } catch (err) {
    console.log(`Error: post not created`);

}
console.log( newPost);
}

async function sendInfo(data){
    const promise = await axios.post('http://57.151.116.81:5000/createPost/create', data, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaHJhZiIsImlhdCI6MTcxMjc1NTMyMH0.rLf3qX_XiDt8Ujb9IYdLgfAt89cWyD_1C5MOYPYik9k'
        }
    });
    return promise;
}




```
 ### setting the data and sending it to backend using axios library

 ```jsx 
 
 
 
 
 const [showCreate, setShowCreate] = useState(false);
 const [activeComponent, setActiveComponent] = useState(<Post setPostBody={setPostBody}/>);



    const renderComponent = (component) => {
        setActiveComponent(component);
        // Clear the post body when switching components
        setPostBody('');
    };




    return (
        <div>
            {!showCreate && <button onClick={() => setShowCreate(true)}>Create Post</button>}
            {showCreate && (
                <div className="create-post-container">
                    <label htmlFor="myDropdown">Choose a community</label>
                    <select id="myDropdown" name="myDropdown" onChange={(e) => setCommunity(e.target.value)}>
                        <option value="option1" >Community 1</option>
                        <option value="option2" >Community 2</option>
                        <option value="option3" >Community 3</option>
                    </select>
                    
                    <div className="toolbar">
                        <button className="toolbar-button postbtn1" onClick={() => renderComponent(<Post setPostBody={setPostBody}/>)}><FontAwesomeIcon icon={faFileLines} /> Post</button>
                        <button className="toolbar-button postbtn2" onClick={() => renderComponent(<ImageVideo />)}><FontAwesomeIcon icon={faImage} /> Image & Video</button>
                        <button className="toolbar-button postbtn3" onClick={() => renderComponent(<Link setPostBody={setPostBody} />)}><FontAwesomeIcon icon={faLink} />Link</button>
                        <button className="toolbar-button postbtn4" onClick={() => renderComponent(<Poll setPostBody={setPostBody}/>)}> <FontAwesomeIcon icon={faSquarePollHorizontal} /> Poll</button>
                    </div>
                    
                    <input type="text" placeholder="Title" className="title" onChange={(e)=>setPostTitle(e.target.value)} />
                    

                    
                    <div className="active-component">{activeComponent}


                    </div>
                    
                    <div className="postprob">
                         <button className="postprobbutton" id="original content"><FontAwesomeIcon icon={faPlus} /> OC</button>
                         <button className="postprobbutton" id="spoiler"><FontAwesomeIcon icon={faPlus} />Spoiler</button>
                         <button className="postprobbutton" id="not safe"><FontAwesomeIcon icon={faPlus} />NSFW</button>
                         <button className="postprobbutton" id="flair"><FontAwesomeIcon icon={faTag} />Flair</button>
                    </div>
                    
                    <div className="savepost">
                    <button className="postprobbutton" id="draft"> Save Draft</button>
                    <button className="postprobbutton" id="post" onClick={handleSubmit}> Post</button>
                    </div>
                  
                
                </div>
            )}
        </div>
    );
}

 
 
 
 ```

### rendering the options using useState
#### starting with rendering "post" and sending setPostBody as a prop when clicking 'create post' by setting showCreate to true   
#### then setting the activeComponent according to what user chooses
##### passing handleSubmit function to the 'post' button and each setter function to its corresponding button