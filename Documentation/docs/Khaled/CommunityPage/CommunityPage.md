# community Page

### GetRole()
```jsx

async function GetRole(){
            const promise = await axios.get(`http://localhost:5000/api/r/${communityId}`, {
                headers:{Authorization: `Bearer ${token}`}
        });
            return promise.data
    }

```
#### This function makes an asynchronous HTTP GET request to http://localhost:5000/api/r/${communityId} to fetch user role information.
#### It includes an Authorization header with the token for authentication.
#### Upon successful completion, it returns the data property of the response.


### GetCommInfo()
```jsx

 async function GetCommInfo(){
        const promise = await axios.get(`http://localhost:5000/api/community/${communityId}/getCommunityInfoByName`);
        return promise.data;
    }


```
#### This function makes an asynchronous HTTP GET request to http://localhost:5000/api/community/${communityId}/getCommunityInfoByName.
#### It retrieves community information based on communityId.
#### It returns the data property of the response upon completion.


### setRoles()
```jsx

const setRoles = () => {
        if(userRole === "moderator"){
            setText("Mod Tools")
            setMember(true)
        }else if(userRole === "member"){
            setText("Joined")
            setMember(true)
        }
    }

```
#### This function sets text and member state based on userRole.
#### If userRole is "moderator", it sets the text to "Mod Tools" and sets member to true.
#### If userRole is "member", it sets the text to "Joined" and sets member to true.