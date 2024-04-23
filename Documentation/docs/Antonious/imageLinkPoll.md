#  remaining features

## image and video
```jsx
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


```
#### fuction that accepts image or video as input when user clicks on upload btton

## Link
```jsx

export default function Link({ setPostBody })
{
    const [content, setContent] = useState('');

    const handleChange = (e) => {
        let value = e.target.value;
     setContent(value);
     setPostBody(value);

    };
    


   return (
   


         <div>
                <textarea
                    className="link-textarea"
                    value={content}
                    onChange={handleChange}
                    
                />
            </div>

        
        
    
   )
}

```
#### just the text area for user to put in the link the sets the content accorgdingly

## poll
```jsx
export default function Poll({setPostBody})
{
    const [options, setOptions] = useState(['option 1', 'option 2']);

    const addOption = () => {
        const newOptions = [...options, `option ${options.length + 1}`];
        setOptions(newOptions);
    };


    return (
        <div>
            <Post/>
            <div className='poll'>
                {options.map((option, index) => (
                    <input key={index} type='text' placeholder={option} className='pollinputs' />
                ))}
                <div className='poll2'>
                    <button className='polladd' onClick={addOption}> Add Option </button>
                    <label htmlFor="myDropdown" className='pollduration'>Voting Length</label>
                    <select id="myDropdown" name="myDropdown">
                        <option value="option1">1 day</option>
                        <option value="option2">2 days</option>
                        <option value="option3">3 days</option>
                    </select>
                </div>
            </div>
        </div>
    );
}


```
#### calls 'post' function as it displays the same features , then adds the poll option and a button to add more otions if needed