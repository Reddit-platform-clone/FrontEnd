import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faLink, 
    faStrikethrough, faCode, faSuperscript, faExclamation,
     faHeading,faList,faQuoteRight ,
     faImage,faTable} from '@fortawesome/free-solid-svg-icons';




     

export default function Post({ setPostBody }) {

    
       
  

    const [content, setContent] = useState('');
    const [formattingOptions, setFormattingOptions] = useState({
        bold: false,
        italic: false,
        link: false,
        strikethrough: false,
        inlineCode: false,
        superscript: false,
        spoiler: false,

        header: false,
        list:false,
        numlist:false,
        qoute:false,

        table:false,
       

    });

    const toggleFormattingOption = (option) => {
        // Check if 'Header' option is clicked, if yes, disable other options
        if (option === 'header') {
            setFormattingOptions(prevOptions => ({
                ...prevOptions,
                [option]: !prevOptions[option],
                bold: false,
                italic: false,
                link: false,
                strikethrough: false,
                inlineCode: false,
                superscript: false,
                spoiler: false
            }));
        } else {
            setFormattingOptions(prevOptions => ({
                ...prevOptions,
                [option]: !prevOptions[option]
            }));
        }
    };

    const handleChange = (e) => {
        let value = e.target.value;
        // If list option is active, convert text into bulleted list
        if (formattingOptions.list) {
            value = value.split('\n').map((line) => {
                if (line.trim() === '') {
                    return `• ${line}`;
                } else {
                    return line;
                }
                
            }).join('\n');
          
        }

   
    // If numlist option is active, convert text into numbered list

    /*if (formattingOptions.numlist) {
        let counter = 0;  // Initialize the counter
        value = value.split('\n').map((line) => {
           
            if (line.trim() === '') 
            {
                counter=counter+1
                return `${counter}. ${line}`; // Increment the counter after each numbered item
            } 
            else {
                return line;
            }
    
        }).join('\n');
    }*/

    

        setContent(value);
        setPostBody(value);
    };
    

    const fontStyle = {
        fontWeight: formattingOptions.bold ? 'bold' : 'normal',
        fontStyle: formattingOptions.italic ? 'italic' : 'normal',
        textDecoration: formattingOptions.strikethrough ? 'line-through' : 'none',
        color: formattingOptions.inlineCode ? 'pink' : 'inherit',
        //backgroundColor:  formattingOptions.spoiler ? 'grey': formattingOptions.inlineCode ? 'grey' : 'transparent',

        fontSize: formattingOptions.superscript ? '1em' : formattingOptions.inlineCode ? '1em' : formattingOptions.header ? '2.5em' : '1.5em',

    };
    
    /*const handleTableClick = () => {
        if (!formattingOptions.table) {
            // Insert table format only if the table option is not already active
            setFormattingOptions(prevOptions => ({
                ...prevOptions,
                table: true
            }));
            setContent('|           |         |           |\n|          |          |       |\n|          |          |          |');
        }
    };*/

    //for the image button
    const handleUpload = () => {
        const fileInput = document.getElementById('file-input');
        fileInput.click(); // Trigger the file selection dialog
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

                <button className={`post-button ${formattingOptions.spoiler ? 'active' : ''}`} onClick={() => toggleFormattingOption('spoiler')}  >
                    <FontAwesomeIcon icon={faExclamation} />
                </button>



                <button className={`post-button ${formattingOptions.header ? 'active' : ''}`} onClick={() => toggleFormattingOption('header')}  >
                    <FontAwesomeIcon icon={faHeading} />
                </button>

                <button className={`post-button ${formattingOptions.list ? 'active' : ''}`} onClick={() => toggleFormattingOption('list')}  >
                <FontAwesomeIcon icon={faList} />
                </button>

               

                <button className={`post-button ${formattingOptions.qoute ? 'active' : ''}`} onClick={() => toggleFormattingOption('qoute')}  >
                <FontAwesomeIcon icon={faQuoteRight} />
                </button>
                   
                <button className={`post-button ${formattingOptions.table ? 'active' : ''}`} >
                <FontAwesomeIcon icon={faTable} />
                </button>

                <input
               type="file"
                id="file-input"
             style={{ display: 'none' }}
                 accept="image/*"
    
                 onChange={(e) => {
                   // Handle file upload logic here
                 const selectedFile = e.target.files[0];
                console.log('Selected file:', selectedFile);
                 }}
    
                    />

                  <button className={`post-button ${formattingOptions.image ? 'active' : ''}`}  onClick={handleUpload}><FontAwesomeIcon icon={faImage} /></button>

            </div>

            <div>
                <textarea
                    className="post-editor-textarea"
                    value={content}
                    onChange={handleChange}
                    style={fontStyle}
                />
            </div>
        </div>
    );
}
