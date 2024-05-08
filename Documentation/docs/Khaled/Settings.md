1. **useState**: React hook functions to manage component state.

```jsx
    const [search, setSearch] = React.useState()
    const [personal1, setPersonal1] = React.useState()
    const [alcohol, setAlcohol] = React.useState()
    const[date, setDate] = React.useState()
    const [gamble, setGambling] = React.useState()
    const[pregnancy, setPregnancy] = React.useState()
    const[weight,setWeight ] = React.useState()
    const[twofactor, setTwoFactor] = React.useState()
    const [block, setBlock] = React.useState(null)
    const [mute, setMute] = React.useState(null)
```
I usee these to manage data in code until In either pass their values to the database or set theier values from the database they handle the toggles

## Handlers
```jsx
    function handleSearch(){
        setSearch(!search);
        sendInfo({showInSearch: !search});
       
    }
    function handlePersonalied(){
        setPersonal1(!personal1);
        sendInfo({personalizeAds: !personal1});
 
    }
    function handleAlcohol(){
        setAlcohol(!alcohol);
        sendInfo({alcohol: !alcohol});
    }
    function handleDating(){
        setDate(!date);
        sendInfo({dating: !date});

    }
    function handleGambling(){
        setGambling(!gamble);
        sendInfo({gambling: !gamble});
       
    }
    function handlePregnancy(){
        setPregnancy(!pregnancy);
        sendInfo({pregnancyAndParenting: !pregnancy});
       
    }
    function handleWeight(){
        setWeight(!weight);
        sendInfo({weightLoss: !weight});
       
    }
    function handleTwoFactor(){
        setTwoFactor(!twofactor);
        sendInfo({twoFactorAuthentication: !twofactor});
    }
```
These are used when one of the toggles are pressed so they set the variable accordingly and call the "sendInfo" function to set it in the database


## Setter and Getter

```jsx
    async function sendInfo(data){
            const promise = await axios.patch('http://57.151.116.81:5000/api/v1/me/prefs',data,{
                headers:{Authorization: `Bearer ${token} `}
            });
            return promise;
    }
    async function GetInfo(){
        const promise = await axios.get('http://57.151.116.81:5000/api/v1/me/prefs',{
            headers:{Authorization: `Bearer ${token}`}
        });
        return promise.data;
    }
```
these handle sending and recieving data from the database by sending HTTPS requests either get or post


## Initiation

```jsx
React.useEffect(() =>{
        async function GetandApply(){
            const data = await GetInfo()
            if(data){+
                setSearch(data.settings.showInSearch)
                setPersonal1(data.settings.personalizeAds)
                setAlcohol(data.settings.alcohol)
                setDate(data.settings.dating)
                setGambling(data.settings.gambling)
                setPregnancy(data.settings.pregnancyAndParenting)
                setWeight(data.settings.weightLoss)
                setTwoFactor(data.settings.twoFactorAuthentication)
            }
        }
        GetandApply()
    },[])
```
This initiates my variables mentioned above in the usestates section to intiate them as the website loads thats why I used React.useEffect because it allows me to call this function only once
