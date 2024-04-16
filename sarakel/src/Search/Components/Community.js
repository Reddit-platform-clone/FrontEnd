import './Community.css'
import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';

function Community(){
    return (
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
    );
}

export default Community