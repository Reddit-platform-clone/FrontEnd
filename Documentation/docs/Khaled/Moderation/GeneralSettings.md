# GeneralSettings
### setInfo() Function
```jsx

async function setInfo(data){
        const promise = await axios.patch(`http://localhost:5000/api/r/${communityId}/edit_community`,data,{
            headers:{Authorization: `Bearer ${token}`}
    });
        console.log(promise)
        console.log(data)
    }

```
#### This function is an asynchronous function that takes data as an argument.
#### It performs a PATCH request using axios.patch to update community information at the specified endpoint (http://localhost:5000/api/r/${communityId}/edit_community).
#### It includes the data object in the request body.
#### The request is made with an Authorization header containing the token (Bearer ${token}).
#### Once the request is resolved, it logs the promise (response) and the data that was passed to the function.
#### The function is intended to update community information asynchronously.

### React.useEffect(() => { getInfo() }, [])
```jsx

React.useEffect(() => {
        async function getInfo(){
            const promise = await GetCommInfo()
            if(promise){
               setType(promise.data.data.type)
               console.log(Type) 
            }
        }
        getInfo()
    },[])

```
#### This useEffect hook runs once (empty dependency array []) when the component mounts.
#### It defines an inner asynchronous function getInfo() that awaits the result of GetCommInfo() (presumably another asynchronous function).
#### f the result (promise) is truthy (not null or undefined), it updates the component state with the type data from the response (promise.data.data.type).
#### The Type state variable is then logged to the console.

### ChangeName Event Handler
```jsx

 const changeName = event =>{
        setName(event.target.value)
        return
    }

```
#### This is a simple event handler function (onChange) for input elements.
#### It updates the component state with the new value from the input field (event.target.value) using the setName function.
#### The function immediately returns after setting the new name value.

### changeAbout Event Handler
```jsx

 const changeAbout = event =>{
        setAboutMe(event.target.value)
        return
    }

```
#### Similarly to changeName, this is another event handler function (onChange) for updating the aboutMe state.
#### It sets the aboutMe state to the new value from the input field (event.target.value) using the setAboutMe function.
#### The function returns immediately after updating the aboutMe state.

### Save() Function
```jsx

async function Save(){
        const data = {
            rules: ["soncs"],
            type : Type,
            descruption: aboutMe
        }
        const save = await setInfo(data)
        return
    }

```
#### This function is an asynchronous function responsible for saving changes to community information.
#### It constructs a data object containing rules, type, and description (descruption seems to be a typo, assuming it's description).
#### It then calls the setInfo(data) function (defined earlier) to initiate the PATCH request and update the community information.
#### The Save() function is typically called when a user triggers a save action (e.g., clicking a "Save" button).
#### The function does not explicitly return anything (save variable is unused).
