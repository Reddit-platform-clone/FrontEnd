# CSS FOR POST



``` css
 /*css for create post the toolbar containing 'post' 'image' 'link' 'poll'*/   
      
.create-post-container {
  margin-top: 20px; /* Adjust the margin as needed */
}

.toolbar {    
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: stretch;
  align-items: stretch;
  margin-top:5px; 
}

.toolbar-button {
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  padding: 15px 17px;
  z-index: 1;
  position: relative;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  border-color:white;
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-radius: 0;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  color: var(--newRedditTheme-actionIcon);
  white-space: nowrap;
}

.active-component {
  margin-top: 0px; /* Adjust the margin as needed */
}           


```
### css for create post the toolbar containing 'post' 'image' 'link' 'poll'

```css
.post-editor-container {
  width: 100%;
  padding: 0px;
 
}

.post-editor-toolbar {
  display: flex;
  margin-bottom: 0px;
  margin-left:10px;

  
}

.post-button {
  position: sticky;
  top: 48px;
  z-index: 8;
  -ms-flex-align: center;
  align-items: center;
  background-color:rgba(232, 224, 224, 0.723); ;
  border-color:white;
  border-style: solid;
  border-width: 0;
  border-radius: 0;
  box-sizing: border-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  margin-left:0px; 
  color: gray;
  padding:10px; 
  
}

.post-button.active {
  
  color: black;
  
}

.post-editor-textarea {
  width: 95%;
  min-height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-left:10px;
}

```
### css for postbuttons