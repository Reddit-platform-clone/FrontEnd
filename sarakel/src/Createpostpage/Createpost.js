
function Createpost(){
    return(
        <body className="body">
             <div className="Title">
               <h2 className="createpost">Create Post</h2>
               <hr/>
                <label for="Text">Title</label><br/>
                <textarea id="Title" rows="4" cols="40" placeholder="Title"></textarea><br/><br/>
                <label for="Text">Text</label><br/>
                <textarea id="text" rows="6" cols="90" placeholder="Text(optional)"></textarea><br/><br/>

            </div>
            

        </body>
       
    );
}
export default Createpost