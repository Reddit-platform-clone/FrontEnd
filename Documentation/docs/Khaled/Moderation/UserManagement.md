# User Management
## Functions in Listing:
### GetUserName(id):
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
#### Purpose: Retrieves the username associated with a given id from a mock user data array (mock.users).
#### Parameters:
#### id: The identifier of the user.
#### Return Value: Returns the username corresponding to the provided id.

### GetUserImage(id):
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

#### Purpose: Retrieves the user image associated with a given id from the mock user data array (mock.users).
#### Parameters:
#### id: The identifier of the user.
#### Return Value: Returns the user image URL corresponding to the provided id.


### useEffect(() => { ... }, []):
```jsx

 useEffect(() => {
      const fetchData = () => {
        setTimeout(() => {
          setPosts(mock.communities[0]);
          setLoading(false);
        }, 1000);
      };
  
      fetchData();
  
      return () => {
        // Cleanup tasks if needed
      };
    }, []);

```
#### Purpose: Fetches data asynchronously (mock data) and sets the fetched posts in the component's state (posts and loading).
#### Functionality:
#### Simulates an asynchronous data fetch with a delay using setTimeout.
#### Updates the component state (posts and loading) after the delay.
#### Executes the cleanup function on component unmount (currently empty).

## Functions in UserManagement:
### BanUser(user):
```jsx

async function BanUser(user){
      const promise = await axios.post(`http://localhost:5000/r/${communityId}/api/ban/${user}`,{headers:{Authorization: `Bearer ${token}`}})
      console.log(promise)
      return promise
    }

```
#### Purpose: Sends a POST request to ban a user identified by user within a specific community (communityId).
#### Parameters:
#### user: Identifier or username of the user to be banned.
#### Returns: A promise resolved with the response data from the API call.


### MuteUser(user):
```jsx
async function MuteUser(user){
      const promise = await axios.post(`http://localhost:5000/r/${communityId}/api/ban/${user}`,{headers:{Authorization: `Bearer ${token}`}})
      return promise
    }

```

#### Purpose: Sends a POST request to mute a user identified by user within a specific community (communityId).
#### Parameters:
#### user: Identifier or username of the user to be muted.
#### Returns: A promise resolved with the response data from the API call.



### InviteMod(user):

```jsx
  async function InviteMod(user){
      const promise = await axios.post(`http://localhost:5000/r/${communityId}/api/invite/${user}`,{headers:{Authorization: `Bearer ${token}`}})
      return promise
    }
```

#### Purpose: Sends a POST request to invite a user identified by user as a moderator within a specific community (communityId).
#### Parameters:
#### user: Identifier or username of the user to be invited as a moderator.
#### Returns: A promise resolved with the response data from the API call.



### useEffect(() => { ... }, []):
```jsx
 React.useEffect(()=>{
      async function GetLists(){
        const BannedList = await GetBanned()
        if(BannedList){
          setBanned(BannedList.bannedUsers)
        }
      }
    },[])

```

#### Purpose: Fetches initial data (e.g., banned users, moderators) for the user management component.
#### Functionality:
#### Executes asynchronously to retrieve banned users and set them in the component state (Banned).


### AddNewUser():

```jsx
 async function AddNewUser(){
         if(button === 'Ban User'){
            if((AddUser === false)){ alert('Enter A user')
            }else{
                const ban = await BanUser(AddUser)
                if(ban){alert("banned")}
                setUser(false)
        }}
        if(button === 'Mute User'){
            if( (AddUser === false)){ alert('Enter A user')
            }else{
              const ban = await MuteUser(AddUser)
                setUser(false)}
        }if(button === 'Invite user as mod'){
            if((AddUser === false)){ alert('Enter A user')
            }else{
              const ban = await InviteMod(AddUser)
                setUser(false)}
        }
    }

```

#### Purpose: Adds a new user action based on the selected button (Ban User, Mute User, Invite user as mod) and the entered user (AddUser).
#### Functionality:
#### Sends appropriate API requests (BanUser, MuteUser, InviteMod) based on the selected button and user input (AddUser).
#### Displays alerts on successful actions.
