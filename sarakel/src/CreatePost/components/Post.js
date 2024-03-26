import React , { useState ,useRef }  from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold ,faItalic , faLink , faStrikethrough ,faCode ,faSuperscript , faExclamation} from '@fortawesome/free-solid-svg-icons';


export default function Post(){
    const [content, setContent] = useState('');
    const [formattingOptions, setFormattingOptions] = useState({
        bold: false,
        italic: false,
        link: false,
        strikethrough: false,
        inlineCode: false,
        superscript: false,
        spoiler: false
    });

    const toggleFormattingOption = (option) => {
        setFormattingOptions(prevOptions => ({
            ...prevOptions,
            [option]: !prevOptions[option]
        }));
    };

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const fontStyle = {
        fontWeight: formattingOptions.bold ? 'bold' : 'normal',
        fontStyle: formattingOptions.italic ? 'italic' : 'normal',
        textDecoration: formattingOptions.strikethrough ? 'line-through' : 'none'
    };

    return (
        <div className="post-editor-container">
            <div className="post-editor-toolbar">
            
             <button className={`post-button ${formattingOptions.bold ? 'active' : ''}`} onClick={() => toggleFormattingOption('bold')}>
              <FontAwesomeIcon icon={faBold} />
              </button>

                <button className={`post-button ${formattingOptions.italic ? 'active' : ''}`} onClick={() => toggleFormattingOption('italic')}>
                  <FontAwesomeIcon icon={faItalic} />
                </button>
                
                <button className={`post-button ${formattingOptions.link ? 'active' : ''}`} onClick={() => toggleFormattingOption('link')}>
                   <FontAwesomeIcon icon={faLink} />
                </button>
                
                <button className={`post-button ${formattingOptions.strikethrough ? 'active' : ''}`} onClick={() => toggleFormattingOption('strikethrough')}>
                   <FontAwesomeIcon icon={faStrikethrough} />
                </button>
                
                <button className={`post-button ${formattingOptions.inlineCode ? 'active' : ''}`} onClick={() => toggleFormattingOption('inlineCode')}>
                    <FontAwesomeIcon icon={faCode} />
                </button>
                
                <button className={`post-button ${formattingOptions.superscript ? 'active' : ''}`} onClick={() => toggleFormattingOption('superscript')}>
                   <FontAwesomeIcon icon={faSuperscript} />
                </button>
                
                <button className={`post-button ${formattingOptions.spoiler ? 'active' : ''}`} onClick={() => toggleFormattingOption('spoiler')}>
                   <FontAwesomeIcon icon={faExclamation} />
                </button>
                
            </div>
            <textarea
                className="post-editor-textarea"
                value={content}
                onChange={handleChange}
                placeholder="Write your post here..."
                style={fontStyle}
            />
        </div>
        
        
    );
}