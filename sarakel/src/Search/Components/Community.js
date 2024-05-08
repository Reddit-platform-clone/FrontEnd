import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Community.module.css'; // Import CSS module

function Community() {
    const [communities, setCommunities] = useState([]);
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bmlvciIsImlhdCI6MTcxMzg1MzAxOX0.x3EN0N2FMiRvLZen6Ro1nuVc4JJYcU88XCYtI2N510g';

    useEffect(() => {
        async function fetchCommunities() {
            try {
                const response = await axios.post('http://57.151.116.81:5000/searchBy/communities', { keyword: "test" }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                const communitiesData = response.data.communitiesResults; // Set communities to communitiesResults array
                setCommunities(communitiesData);
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        }
        
        fetchCommunities();
    }, [authToken]);

    return (
        <div className={styles.CommunitySearchDataContainer}>
            {Array.isArray(communities) && communities.map((community, index) => (
                <div key={index} className={styles.CommunitySearchData}>
                    <img src={community.displayPic} alt='Profile' className={styles.CommunityAvatar} />
                    <div>
                        <h3 className={styles.CommunityName}>{community.communityName}</h3>
                        <span className={styles.Description}>{community.description}</span>
                    </div>
                    <span className={styles.CommunityType}>{community.type}</span>
                    {community.isNSFW && <span className={styles.NSFWIndicator}>NSFW</span>}
                </div>
            ))}
        </div>
    );
}

export default Community;
