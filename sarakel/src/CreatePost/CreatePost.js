import React, { useState , useEffect } from 'react';
//import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic,  faStrikethrough, faCode, faSuperscript, faExclamation } from '@fortawesome/free-solid-svg-icons';
import Post from './components/Post.js';
import ImageVideo from './components/ImageVideo.js';
import { faImage , faLink , faSquarePollHorizontal ,faFileLines ,faPlus,faTag} from '@fortawesome/free-solid-svg-icons';


export default function CreatePost() {
    const [showCreate, setShowCreate] = useState(false);
    const [activeComponent, setActiveComponent] = useState(<Post />);



    const renderComponent = (component) => {
        setActiveComponent(component);
    };

    return (
        <div>
            {!showCreate && <button onClick={() => setShowCreate(true)}>Create Post</button>}
            {showCreate && (
                <div className="create-post-container">
                    <label htmlFor="myDropdown">Choose a community</label>
                    <select id="myDropdown" name="myDropdown">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                    
                    <div className="toolbar">
                        <button className="toolbar-button postbtn1" onClick={() => renderComponent(<Post />)}><FontAwesomeIcon icon={faFileLines} /> Post</button>
                        <button className="toolbar-button postbtn2" onClick={() => renderComponent(<ImageVideo />)}><FontAwesomeIcon icon={faImage} /> Image & Video</button>
                        <button className="toolbar-button postbtn3"><FontAwesomeIcon icon={faLink} />Link</button>
                        <button className="toolbar-button postbtn4"> <FontAwesomeIcon icon={faSquarePollHorizontal} /> Poll</button>
                    </div>
                    
                    <input type="text" placeholder="Title" className="title" />
                    
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
                    <button className="postprobbutton" id="post"> Post</button>
                    </div>
                  
                
                </div>
            )}
        </div>
    );
}
