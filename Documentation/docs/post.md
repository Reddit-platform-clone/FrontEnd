# post
### first feature to be rendered to user

```jsx
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

```
#### two use state cases to adjust the 'content' that user writes in text area according to the formatting option he chooses


```jsx
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

```
### this function toggle the formatting options according to what user chooses and disables all options in case of choosing to write a header

```jsx

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
```
### first function sets the cntent according to changes and includes the logic for list if user chooses list button
### second function includes the changes applied to the font according to the user choice