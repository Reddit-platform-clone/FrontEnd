# Listing
### mock.users.map((user) => { ... }):

```jsx
export default function Listing(){
    let img
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            img = user.image
            return
        }
    }) 
}
```

#### Purpose: This code snippet iterates over an array of mock.users to find the image URL of a logged-in user (user.LoggedIn === 1).
#### Usage:
#### Sets the img variable to the image URL of the logged-in user.



### State Management (useState):
```jsx
const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(true);

    const [hiddenPosts, setHiddenPosts] = useState({});
```
#### const [posts, setPosts] = useState();:

#### Purpose: Initializes state for posts, representing the fetched posts data.
#### Usage: Stores and updates the fetched posts data.
#### const [loading, setLoading] = useState(true);:

#### Purpose: Initializes state for loading, indicating whether data is being fetched (true for loading, false when data fetching is complete).
#### Usage: Controls the display of loading indicators or content based on data fetching status.
#### const [hiddenPosts, setHiddenPosts] = useState({});:

#### Purpose: Initializes state for hiddenPosts, which can be used to track and manage hidden or filtered posts.
#### Usage: Enables dynamic hiding or filtering of posts based on user interaction.


### GetUserName(id) Function:

```jsx
function GetUserName(id){
        let username = 5
        mock.users.map((user) => {
            if(user.id === id){
                username = user.name
                  return user.name
            }
        })
        return username
    }
```
#### Purpose: Retrieves the username associated with a given id from mock.users.
#### Parameters:
#### id: Identifier of the user.
#### Return Value: Returns the username corresponding to the provided id.


### GetUserImage(id) Function:

```jsx
function GetUserImage(id){
        mock.users.map((user) => {
            if(user.id === id){
                console.log(566)
                 return user.image[0]  
            }
        })
    }

```
#### Purpose: Attempts to retrieve the image URL associated with a given id from mock.users.
#### Parameters:
#### id: Identifier of the user.
#### Return Value: This function doesn't currently return or utilize the user image URL effectively due to its structure.

