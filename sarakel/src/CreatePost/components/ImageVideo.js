import React  from 'react';


export default function ImageVideo() {
    const content=''

    const handleChange = (e) => {
        // Prevent users from typing in the textarea
        e.preventDefault();
    };

    const handleUpload = () => {
        const fileInput = document.getElementById('file-input');
        fileInput.click(); // Trigger the file selection dialog
    };

    return (
        <div className="ImageVideo-container">
            <textarea 
                className="ImageVideo-textarea"
                value={content}
                onChange={handleChange}
                placeholder="Drag and drop image or..."
                readOnly // Make the textarea read-only
            />

            <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                accept="image/*, video/*"
                
                onChange={(e) => {
                    // Handle file upload logic here
                    const selectedFile = e.target.files[0];
                    console.log('Selected file:', selectedFile);
                }}
                
            />
            
            <button className="upload" onClick={handleUpload}>Upload</button>
        </div>
    );
}