# search
### toggle
```jsx
    const [activeTab, setActiveTab] = useState(0);
    const [relevanceOpen, setRelevanceOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ text: "Relevance", icon: <AiOutlineRocket /> });
    const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");
    const tabLabels = ["Users", "Posts", "Comments", "Communities"];


```
##### activeTab: Keeps track of the currently active tab index.
##### relevanceOpen: Represents whether the relevance dropdown is open or closed.
##### timeOpen: Represents whether the time dropdown is open or closed.
##### selectedOption: Holds the currently selected sorting option for relevance, including its text and corresponding icon.
##### selectedTimeOption: Holds the currently selected time filtering option
##### const tabLabels : contains the labels for different tabs in the search component. Each label corresponds to a different category of search results, such as Users, Posts, Comments, and Communities.


### Functions
```jsx
const handleTabClick = (index) => {
        setRelevanceOpen(false);
        setTimeOpen(false);
        setActiveTab(index);
    };

    const toggleRelevanceDropdown = () => {
        setRelevanceOpen(!relevanceOpen);
        setTimeOpen(false);
    };

    const toggleTimeDropdown = () => {
        setTimeOpen(!timeOpen);
        setRelevanceOpen(false);
    }

    const handleOptionSelect = (optionText, icon) => {
        setSelectedOption({ text: optionText, icon: icon });
        setRelevanceOpen(false); 
    };
    const handleTimeOptionSelect = (option) => {
        setSelectedTimeOption(option);
        setTimeOpen(false); 
    };


```
##### handleTabClick(index): A function triggered when a tab is clicked. It sets the activeTab state to the index of the clicked tab and closes both relevance and time dropdowns.
##### toggleRelevanceDropdown(): Toggles the visibility of the relevance dropdown by flipping the value of relevanceOpen. It also ensures that the time dropdown is closed.
##### toggleTimeDropdown(): Toggles the visibility of the time dropdown by flipping the value of timeOpen. It also ensures that the relevance dropdown is closed.
##### handleOptionSelect(optionText, icon): Updates the selected sorting option for relevance. It sets the selectedOption state to the provided text and icon and closes the relevance dropdown.
##### handleTimeOptionSelect(option): Updates the selected time filtering option. It sets the selectedTimeOption state to the provided option and closes the time dropdown.

### frontend part
```jsx
 <div className='search-title'>
                <span>Search-results</span>
            </div>
            <div className='Contents2'>
                {tabLabels.map((label, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>
```

##### search-title contain a span element with the text "Search-results". This section typically displays a title or heading to indicate what the search results represent whether it's (user,comment,communities,post)

##### div with the class name 'Contents2'. Inside this div, it maps over the tabLabels an event handler for when the button is clicked. It calls the handleTabClick function, passing the index of the clicked tab as an argument. This function typically updates the state to reflect the clicked tab as the active tab.


## Search Components
#### 1-users

```jsx
<div className='User-search-data-container'>
            {jsonData.users.map(user => (
                <div key={user.id} className='User-search-data'>
                    <img src={user.image} alt='Profile' className='user-avatar' />
                    <div>
                        <h3 className='username3'>{user.name}</h3>
                        <h6 className='sarakelid2'>{user.sarakelid}</h6>
                        <span className='aboutme'>{user.AboutMe}</span>
                        
                    </div>
                    {/* <div className="line-after"></div> */}
                </div>
            ))}
        </div>
```

##### div className='User-search-data-container: This div element acts as a container for the user search data. It likely contains all the user search results.

##### jsonData.users.map(user => (...)): This JavaScript expression maps over an array of user data (jsonData.users). For each user object in the array, it generates JSX elements.
 
 #####  This img element displays the user's profile image.

 ##### This h3 element displays the user's name. The content inside the curly braces ({}) represents JavaScript code, which accesses the name property of the user object.

 #####  This h6 element displays the user's sarakelid. Similar to the name.

 ##### This span element displays the user's AboutMe information. It accesses the AboutMe property of the user object

 #### 2-comments
 ```jsx

 <div className='comments-container'>
    {/* Display comments */}
    {jsonData.Comments.map(comment => (
        <div className='comment' key={comment.comment_id}>
            {/* Render each comment */}
            <div className='comment-header'>
                {/* <span className='username'>{comment.comment_id}</span> */}
            </div>
            <div className='comment-content'>
                <p>{comment.text}</p>
            </div>
            <div className='comment-time'>
                    <span>{comment.time}</span>
                </div>
        </div>
    ))}
</div>
 ```
 #### at the first we map through the mock to find comments and then w display the text of the comments and the the time when the comment was posted

 #### 3- community
```jsx
<div className='Community-search-data-container'>
    {jsonData.communities.map(Community => (
        <div key={Community.id} className='Community-search-data'>
            <img src={Community.image} alt='Profile' className='Community-avatar' />
            <div>
                <h3 className='Communityname3'>{Community.name}</h3>
                {/* <h6 className='communityid2'>{Community.id}</h6> */}
                <span className='description'>{Community.description}</span>
            </div>
            <span className='Community-type'>{Community.type}</span>
        </div>
    ))}
</div>
```
##### we map through the mock server to find the communities in it then w display the image of the community then next to it the it's name and under the name you can find description of the community and at last at the right you can find the type of community whether it's public or private

#### 4-posts

```jsx
<div className='overview-post-comment1'>
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

```

##### we map through mock to find the user posts then next we put the user name who posted the post and his image then if the post have an image with then it's displayed and then the post text and the time where it's posted appears