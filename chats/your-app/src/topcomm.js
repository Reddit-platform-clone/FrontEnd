import React, { useState } from 'react';
import CommunityCard from './CommunityCard';
import Pagination from './Pagination';
import NavBar from './NavBar'; // Assuming you have a NavBar component

const TopCommunities = ({ communities }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const communitiesPerPage = 10; // Adjust as needed

  // Get current communities
  const indexOfLastCommunity = currentPage * communitiesPerPage;
  const indexOfFirstCommunity = indexOfLastCommunity - communitiesPerPage;
  const currentCommunities = communities.slice(indexOfFirstCommunity, indexOfLastCommunity);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <NavBar />
      <div className="top-communities">
        <h1>Best of Reddit</h1>
        {currentCommunities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
      <Pagination
        communitiesPerPage={communitiesPerPage}
        totalCommunities={communities.length}
        paginate={paginate}
      />
    </div>
  );
};

export default TopCommunities;
