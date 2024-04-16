# UserProfile
#### it's the page where if you search of other user it appears with his overview , posts , comments then and ther right there a container which allow the user who's is logged in to follow/unfollow , chat , send mesaage ,report , block 

### Toggle
```jsx
const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
        };

```
##### activeTab: Keeps track of the currently active tab index.
##### handleTabClick : It's used to appear the content only of the active tab

### Functions 
```jsx
const [isFollowing, setIsFollowing] = useState(false);
    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
            GetLoggedIn();
            Followerlist1();
        }
        if (isFollowing) {
            Clearfollowlist();
        }
    };
```

##### isFollowing: This state variable is initialized using the useState hook. It represents whether the user is currently following someone or not. Initially, it's set to false


##### toggleFollow:This function is called when the user interacts with the follow button. It toggles the isFollowing state between true and false using setIsFollowing(!isFollowing).The function then checks the value of isFollowing:If isFollowing is false, it executes the GetLoggedIn() and Followerlist1() functions. responsible for updating user's logged-in status and fetching follower lists. If isFollowing is true, it executes the Clearfollowlist() function. This function likely clears the follow list or performs some cleanup related to following.


```jsx
const GetLoggedIn = () => {
        jsonData.users.map((user) => {
            if (user.LoggedIn === 1) {
                x = user.id;
                y = user.name
                return JSON.stringify(user.id);
            }
        });
    };

```

##### GetLoggedIn function appears to iterate over an array of user data (jsonData.users). It checks if any user is logged in by inspecting the LoggedIn property. If a user is found to be logged in (LoggedIn === 1), it assigns the user's ID to the variable x and the user's name to the variable y, and it returns a JSON string representation of the user's ID.

```jsx 
const Followerlist1 = () => {
        jsonData.users.forEach((user) => {
            if (user.id === x) {
                // Check if followinglist exists, if not initialize it as an empty array
                if (!user.followinglist) {
                    user.followinglist = [];
                }
                user.followinglist.push({ id: userid, name: username });
                console.log(user.name,"Following List:", user.followinglist);
            }
        });
}
jsonData.users.forEach((user) => {
            if (user.id === userid) {
                // Check if followerlist exists, if not initialize it as an empty array
                if (!user.followerlist) {
                    user.followerlist = [];
                }
                user.followerlist.push({ id: x, name: y });
                console.log(user.name,"Follower List:", user.followerlist);
            }
        });

```

##### Followerlist1 function iterates over the jsonData.users array to find the user whose ID matches the value stored in the x variable. Once it finds the user, it adds a new object representing a follower to their followinglist array. This object contains the ID and name of the follower. and also it goes through the the user where he isn't logged but the process being followed is applied on him to put the user who followed him in his follower list

```jsx
const Clearfollowlist = () => {
        jsonData.users.forEach((user) => {
            if (user.id === x) {
                // Check if followinglist exists before attempting to splice
                if (user.followinglist) {
                    const index = user.followinglist.findIndex(item => item.id === userid);
                    if (index !== -1) {
                        user.followinglist.splice(index, 1);
                    }
                    console.log(user.name,"Following List:", user.followinglist);
                }
            }
        });
    
        jsonData.users.forEach((user) => {
            if (user.id === userid) {
                // Check if followerlist exists before attempting to splice
                if (user.followerlist) {
                    const index = user.followerlist.findIndex(item => item.id === user.id);
                    if (index !== -1) {
                        user.followerlist.splice(index, 1);
                    }
                    console.log(username,"Follower List:", user.followerlist);
                }
            }
        });
    };


```


##### Clearfollowlist function iterates over the jsonData.users array to find the user whose ID matches the x variable, which presumably represents the currently logged-in user. It performs two main tasks: Removing User from Following Lists: It checks if the followinglist exists for the user. If the followinglist exists, it finds the index of the follower with ID userid within the followinglist array using findIndex. If the follower is found it removes the follower from the followinglist using splice.

```jsx
const handleBlockAccount = () => {
        jsonData.users.map((user) => {
            if (user.id === x) {
                // Initialize blockedacc as an array if it's undefined
                if (!user.blockedacc) {
                    user.blockedacc = [];
                }
                user.blockedacc.push({ name: username });
                console.log(user.name, "has blocked", username, "account", user.blockedacc);
    
                // Filter out the user from followinglist
                user.followinglist = user.followinglist.filter((item) => item.id !== userid);
                console.log(user.name, "Following List:", user.followinglist);
    
                // If the user is the same as the one being blocked, remove from followerlist
                if (user.id === userid) {
                    user.followerlist = user.followerlist.filter((item) => item.id !== user.id);
                    console.log(username, "Follower List:", user.followerlist);
                }
            }
        });
        GetLoggedIn();
    };

```
##### handleBlockAccount function iterates through the jsonData.users array to find the currently logged-in user (x). Upon finding the user, it initializes a blockedacc array if it doesn't already exist and adds an object containing the name of the user being blocked (username) to this array. It then logs a message confirming the blocking action.Furthermore, it removes the user being blocked from the followinglist array of the current user. Additionally, if the current user's ID matches the userid, indicating that the current user is blocking their own account, it also filters out the current user from their own followerlist. Overall, this function handles the blocking of a user account by the currently logged-in user, including logging the action, updating the blockedacc, and modifying related lists (followinglist and followerlist).





.


```jsx
const handleReportAccount = () => {
        jsonData.users.map((user) => {
            if (user.id === x) {
                // Check if reportedacc is undefined, if so, initialize it as an empty array
                if (!user.reportedacc) {
                    user.reportedacc = [];
                }
                user.reportedacc.push({ name: username, id: userid });
                console.log(user.name, "has reported", username, "account", user.reportedacc);
            }
        });
        GetLoggedIn();
    };
```
##### The handleReportAccount function iterates over the jsonData.users array to find the currently logged-in user. Once found, it adds the reported user's name and ID to the reportedacc array of the logged-in user, initializing the array if it doesn't exist. Then, it logs a message confirming the report action. Finally, it calls the GetLoggedIn function, likely to update the state with the reported user's information. This function essentially handles the reporting of a user account by the currently logged-in user.


### front end
```jsx
<div className='user-data'>
                <img src={jsonData.users[0].image} alt='User Avatar' className='logoup' />
                <span className='username'>{jsonData.users[0].name}</span>
            </div>

            <div className='Contents'>
                <a className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(0)}>
                    <span>Overview</span>
                </a>
                <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(1)}>
                    <span>Posts</span>
                </a>
                <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(2)}>
                    <span>Comments</span>
                </a>
                <br/>
                <hr className="hr-solid1"></hr>
            </div>

            <div className='overview-post-comment1'>
                {activeTab === 0 && (
                    /* Render content for Overview tab */
                    <div>
                        <Overview/>
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        <Posts/>
                    </div>
                    
                )}
                {activeTab === 2 && (
                    /* Render content for Comments tab */
                    <div>
                        <Comments/>
                    </div>
                )}
            </div>

            <div className='containerUP'>
                <h6 className=''>{jsonData.users[0].name}</h6>
                <div className='button-container'>
                    <button className={`button ${isFollowing ? 'following' : ''}`} onClick={toggleFollow}>
                        {isFollowing ? '- Unfollow' : '→ Follow'}
                    </button>
                    <button className='button'>Chat</button>
                    <div>
                        <button className='button' onClick={() => setShowList(!showList)}>
                            {showList ? 'Close' : 'Options'}
                        </button>
                        {showList && (
                            <div>
                                <ul>
                                    <button className='button'>Share</button><br/>
                                    <button className='button' >Send a message</button>
                                    <button className='button' onClick={handleBlockAccount}>Block account</button>
                                    <button className='button' onClick={handleReportAccount}>Report account</button>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <br/>
                <div className='usersdata'>
                    <div className='horizontalali'>
                        <p className='text-sm text-gray-500'>Post Karma</p>
                        <p className='text-lg font-bold'>1</p>
                    </div>
                    <div className='horizontalali'>
                        <p className='text-sm text-gray-500'>Comment Karma</p>
                        <p className='text-lg font-bold'>0</p>
                    </div>
                    <div className='horizontalali'>
                        <p className='text-sm text-gray-500'>Cake day</p>
                        <p className='text-lg font-bold'>Mar 1, 2024</p>
                    </div>
                </div>
            </div>

```

##### User Data Section: Displays the user's avatar and name fetched from jsonData.users[0].


##### Tabs Navigation:Allows the user to switch between different tabs: "Overview", "Posts", and "Comments"


##### Follow Button: Toggles the follow status of the user by calling the toggleFollow function.

###### Chat Button: Performs a chat action.
###### Options Button: Toggles the display of additional options.
###### Additional Options:
###### Share Button: Allows sharing content.
###### Send a Message Button: Initiates a message sending action.
###### Block Account Button: Calls the handleBlockAccount function to block the user's account.
###### Report Account Button: Calls the handleReportAccount function to report the user's account.