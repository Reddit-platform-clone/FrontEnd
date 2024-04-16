import React  from 'react';
import ReactDOM from 'react-dom/client';
import mock from '../mock.json';
import axios from 'axios';
import './CreateCommunity.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'



export default function Community ()
{
    
let name
let type = "public"
let adult=false
 



function setname(n){
    name=n
}

//function handlename(){
   
   // sendInfo({communityName: name});
   
//}


function settype(t){type =t}

/*function handletype(){
   
    sendInfo({type: type});
   
}*/

function setadult(a){adult =a}

//function handleadult(){
   
    //sendInfo({isNSFW: adult});
   
//}

function CountCommunity()
{
    let count=0
    mock.communities.map(() =>{
   count++
    })
    return count
}

/*function CreateCommunity()
{
     

    mock.communities.push({id:CountCommunity()+1,name:name,   description: "basketball",
    image: "https://wallpapercave.com/wp/5L7rDlY.jpg",  type:type,
    adult:adult})

    mock.communities.map((item) =>{
        console.log(item)
         })
}*/
async function CreateCommunity() {
    const communityData = {
        communityName: name,
       // description: "basketball", // Assuming this is a placeholder for the community description
       // image: "https://wallpapercave.com/wp/5L7rDlY.jpg", // Assuming this is a placeholder for the community image
        type: type,
        isNSFW: adult
    };

    // Pushing the new community data into the mock data (if needed)
    mock.communities.push({
        id: CountCommunity() + 1,
        ...communityData
    });

    try {
        // Sending the community data to the server
        const response = await sendInfo(communityData);
        console.log("Community created successfully:", response.data);
    } catch (error) {
        console.error("Error creating community:", error);
    }

    console.log("Community data:", communityData);
}



async function sendInfo(data){
    const promise = await axios.post('http://localhost:5000/api/site_admin', data, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaHJhZiIsImlhdCI6MTcxMjc1NTMyMH0.rLf3qX_XiDt8Ujb9IYdLgfAt89cWyD_1C5MOYPYik9k'
        }
    });
    return promise;
}



function ComName({onNameChange}){
    return (
        <div>
        <h1>Create a Community</h1>
        <p>Build and grow a community about something you care about. We'll help you set things up.</p>
            
    <input className="w90" type="text" placeholder="Name"  onChange= {onNameChange=(e) => setname(e.target.value)}></input>
  
        <p>Name can not be changed later</p>
        
        </div>
    )
    
}


function ComType()
{
    return (
        <div className="type">
                    <h2>TYPE</h2>
            <ul className="typeslist">
                <li onClick={()=>{settype("public")}}>
                    <input type="radio" id="public" name="communityType" value="public" defaultChecked/>
                    <svg className="ml10" rpl="" fill="currentColor" height="20" icon-name="world-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M5.8 9.25H.038A10 10 0 0 1 9.22.039C7.114.879 5.93 5.068 5.8 9.25Zm8.393 0h5.766A10 10 0 0 0 10.78.039c2.106.84 3.29 5.029 3.421 9.211h-.007ZM10 1.375c-1.052 0-2.553 3.045-2.7 7.875h5.4c-.148-4.83-1.649-7.875-2.7-7.875Zm0 17.25c1.051 0 2.552-3.045 2.7-7.875H7.3c.147 4.83 1.648 7.875 2.7 7.875ZM5.8 10.75H.038a10 10 0 0 0 9.182 9.211c-2.106-.84-3.29-5.029-3.42-9.211Zm4.976 9.211a10 10 0 0 0 9.183-9.211H14.2c-.13 4.182-1.315 8.371-3.42 9.211h-.004Z"></path> </svg>
                    <label className="ml10" htmlFor="public">Public</label>
                </li>
                <li onClick={()=>{settype("ristricted")}}>
                    <input type="radio" id="restricted" name="communityType" value="restricted" />
                    <svg className="ml10" rpl="" fill="currentColor" height="20" icon-name="views-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M4.078 9.691a9.85 9.85 0 0 0-.774 1A8.613 8.613 0 0 1 1.97 9.683 8.192 8.192 0 0 1 .211 7.377a1.94 1.94 0 0 1 0-1.753A8.757 8.757 0 0 1 8.014 1a8.679 8.679 0 0 1 7.735 4.5c.227.43.3.924.205 1.4-.391-.157-.792-.29-1.2-.4a.885.885 0 0 0-.106-.412A7.43 7.43 0 0 0 8.014 2.25a7.5 7.5 0 0 0-6.689 3.941.7.7 0 0 0 0 .619 6.938 6.938 0 0 0 1.49 1.953c.388.353.81.664 1.263.928Zm1.635-2.6a2.217 2.217 0 0 1 .222-1.71A2.352 2.352 0 0 1 7.4 4.278c.202-.051.408-.078.616-.078a2.372 2.372 0 0 1 2.3 1.709c.029.113.048.228.06.344.411-.062.826-.1 1.242-.113a3.513 3.513 0 0 0-.1-.563A3.648 3.648 0 0 0 7.08 3.069a3.592 3.592 0 0 0-2.227 1.686 3.442 3.442 0 0 0 .286 3.893c.314-.27.644-.52.988-.75a2.268 2.268 0 0 1-.413-.808v.001Zm11.893 9.889a8.198 8.198 0 0 0 2-2.488A2.142 2.142 0 0 0 19.6 12.5 8.499 8.499 0 0 0 12 8a8.586 8.586 0 0 0-7.67 4.628 1.968 1.968 0 0 0 0 1.745 8.176 8.176 0 0 0 1.726 2.306 8.78 8.78 0 0 0 11.551.3v.001Zm.89-3.9a.899.899 0 0 1 0 .833c-.422.808-1 1.524-1.7 2.108a7.527 7.527 0 0 1-9.89-.254 6.926 6.926 0 0 1-1.464-1.954.716.716 0 0 1 0-.626A7.328 7.328 0 0 1 12 9.25a7.262 7.262 0 0 1 6.5 3.83h-.003Zm-5.572 3.849a3.546 3.546 0 0 0 2.175-1.663 3.508 3.508 0 0 0 .352-2.687 3.588 3.588 0 0 0-5.632-1.897 3.543 3.543 0 0 0-.92 1.051 3.506 3.506 0 0 0-.352 2.686 3.582 3.582 0 0 0 4.377 2.51Zm1.322-4.024a2.265 2.265 0 0 1-.227 1.735 2.306 2.306 0 0 1-1.42 1.081 2.334 2.334 0 0 1-2.849-1.628 2.265 2.265 0 0 1 .227-1.735 2.298 2.298 0 0 1 1.416-1.08 2.357 2.357 0 0 1 2.018.395c.406.308.7.74.835 1.232Z"></path> </svg>
                    <label className="ml10" htmlFor="restricted">Restricted</label>
                </li>
                <li onClick={()=>{settype("private")}}>
                    <input type="radio" id="private" name="communityType" value="private" />
                    <svg className="ml10" rpl="" fill="currentColor" height="20" icon-name="lock-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M16.375 8H15V5.312A5.17 5.17 0 0 0 10 0a5.169 5.169 0 0 0-5 5.312V8H3.625A1.629 1.629 0 0 0 2 9.63v7.74A1.629 1.629 0 0 0 3.625 19h12.75A1.629 1.629 0 0 0 18 17.37V9.63A1.629 1.629 0 0 0 16.375 8ZM6.25 5.312A3.92 3.92 0 0 1 10 1.25a3.92 3.92 0 0 1 3.75 4.062V8h-7.5V5.312Zm10.5 12.058a.378.378 0 0 1-.375.38H3.625a.378.378 0 0 1-.375-.38V9.63a.383.383 0 0 1 .375-.38h12.75a.378.378 0 0 1 .375.38v7.74Z"></path> </svg>
                    <label className="ml10" htmlFor="private">Private</label>
                </li>
            </ul>
        
       </div>
    )
    
    
}




function Create()
{
    return(
    <div className='w00'>
    
    <ComName/>
    <ComType />
    
<div className="adult">


 <div className="adult-header">
  Adult Content
 </div>

   <div className="adultCheckbox">
   <input type="checkbox" onClick={()=>{setadult(!adult)}} />
   <p> 18+ year old community </p>
   
   </div>
   

</div>
    
    
    <div className="cancelcreate">
 <button className="cancel">cancel</button> <button className="create" onClick={()=>{CreateCommunity()}}>create</button>  
   </div>
    
    </div>
    
    )
}


    return (
        <div>
            <button className='sidebarButtons' onClick={() => ReactDOM.createRoot(document.getElementById("pop-page")).render(<Create/>)}>  
            <svg rpl="" className='sideIcon' fill="currentColor" height="20" icon-name="add-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path></svg>
            Create Community</button>
            
            <div id="pop-page"></div>
        </div>
    );
    
}