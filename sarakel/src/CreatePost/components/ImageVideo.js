import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

export default function ImageVideo({handlemedia}) {
    const content=''
    const [media,setMedia] = React.useState()
    const handleChange = (e) => {
        // Prevent users from typing in the textarea
        e.preventDefault();
    };

    const handleUpload = () => {
        const fileInput = document.getElementById('file-input');
        fileInput.click(); // Trigger the file selection dialog
    };

    return (
        <div className="container ">
            

            <input
                type="file"
                id="file-input"
                
                accept="image/*, video/*"
                
                onChange={(e) => {
                    // Handle file upload logic here
                    const selectedFile = e.target.files[0];
                    console.log('Selected file:', selectedFile);
                    handlemedia(selectedFile)
                }}
                
            />
            <div>
                {media ? <img src={media}></img> : <></>}
            </div>
            
           
        </div>
    );
}