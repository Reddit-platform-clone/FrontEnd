# Queues.js
### ApprovePost(postID):
```jsx

async function ApprovePost(postID){
        const promise = await axios.post(`http://localhost:5000/r/${communityId}/api/approve`,{postId: postID},{headers:{Authorization: `Bearer ${token}`}})
        GetQueues()
        return console.log(promise)
    }

```
#### This asynchronous function sends a POST request to approve a specific post (postID) within a community.
#### It uses axios.post to make the request to the specified endpoint (http://localhost:5000/r/${communityId}/api/approve).
#### The request body includes the postId.
#### It adds an Authorization header with the token (Bearer ${token}).
#### After the request is successful, it calls GetQueues() to update the moderator queues and logs the promise result to the console.
### RemovePost
```jsx
async function RemovePost(postID){
        const promise = await axios.post(`http://localhost:5000/r/${communityId}/api/remove`,{postId: postID},{headers:{Authorization: `Bearer ${token}`}})
        GetQueues()
        return console.log(promise)
    }

```
#### This asynchronous function sends a POST request to remove a specific post (postID) within a community.
#### It uses axios.post to make the request to the specified endpoint (http://localhost:5000/r/${communityId}/api/remove).
#### The request body includes the postId.
#### It adds an Authorization header with the token (Bearer ${token}).
#### After the request is successful, it calls GetQueues() to update the moderator queues and logs the promise result to the console.

### GetModQueue(), GetRemoved(), GetReported(), GetEdited(), GetUnMod()
```jsx

 async function GetModQueue (){
        const promise = await axios.get(`http://localhost:5000/api/r/${communityId}/about/modqueue`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }

```

```jsx

async function GetRemoved (){
        const promise = await axios.get(`http://localhost:5000/api/r/${communityId}/about/removed`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }

```

```jsx

async function GetReported (){
        const promise = await axios.get(`http://localhost:5000/api/r/${communityId}/about/reports`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }

```

```jsx

async function GetEdited (){
        const promise = await axios.get(`http://localhost:5000/api/r/${communityId}/about/edited`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }

```

```jsx

async function GetUnMod (){
        const promise = await axios.get(`http://localhost:5000/api/r/${communityId}/about/unmoderated`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }

```
#### These asynchronous functions are responsible for fetching specific types of post queues or data related to moderation within a community.
#### Each function sends a GET request using axios.get to a specific endpoint based on the type of data being requested (modqueue, removed, reports, edited, unmoderated).
#### They include an Authorization header with the token (Bearer ${token}).
#### Each function returns the data received from the request.


```jsx

async function GetQueues(){
        const modData = await GetModQueue()
        const removedData = await GetRemoved()
        const reportedData = await GetReported()
        const editedData = await GetEdited()
        const unmodData = await GetUnMod()
        if(modData && removedData && reportedData && editedData && unmodData){
            setModQueue(modData.posts)
            setReported(reportedData.posts)
            setRemoved(removedData.posts)
            setEdited(editedData.posts)
            setUnMod(unmodData.posts)
        }
    }

```
#### This function is used to fetch and update all moderator queues for the community.
#### It internally calls GetModQueue(), GetRemoved(), GetReported(), GetEdited(), and GetUnMod() to gather the necessary data asynchronously.
#### If all data fetches are successful (modData, removedData, reportedData, editedData, unmodData are all truthy), it updates the component state using setModQueue, setReported, setRemoved, setEdited, and setUnMod.
#### This function is typically called to initialize or update the moderator queues in the component.


### useEffect GetQueues()
```jsx

 React.useEffect(()=>{
        async function GetQueues(){
            const modData = await GetModQueue()
            const removedData = await GetRemoved()
            const reportedData = await GetReported()
            const editedData = await GetEdited()
            const unmodData = await GetUnMod()
            if(modData && removedData && reportedData && editedData && unmodData){
                setModQueue(modData.posts)
                setReported(reportedData.posts)
                setRemoved(removedData.posts)
                setEdited(editedData.posts)
                setUnMod(unmodData.posts)
            }
        }

        GetQueues()
    },[])

```
#### This useEffect hook is used to trigger the GetQueues() function when the component mounts (empty dependency array []).
#### It ensures that the moderator queues are fetched and updated when the component first renders.