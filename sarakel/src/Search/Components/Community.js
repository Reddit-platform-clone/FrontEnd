import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Community.module.css'; // Import CSS module
import { useAuth } from "../../HomePage/Components/AuthContext.js";


function Community() {
    const [communities, setCommunities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchCommunities() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/communities', { keyword: searchTerm }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const communitiesData = response.data.communitiesResults; // Set communities to communitiesResults array
                setCommunities(communitiesData);
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        }
        
        fetchCommunities();
    }, [searchTerm, token]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.CommunitySearchContainer}>
            <input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
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
        </div>
    );
}

export default Community;
