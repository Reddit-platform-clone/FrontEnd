import React, { useState } from 'react';
import NavBarUnlogged from '../HomePage/Components/NavBar Unlogged/NavBarUnlogged.js';
import SideBar from '../HomePage/Components/SideBar/SideBar.js';
import './Search.css';
import Users from './Components/Users';
import Post from './Components/Post.js';
import Community from './Components/Community.js';
import Comment from './Components/Comment.js';
import { AiOutlineRocket } from "react-icons/ai";
import { FaCalendarWeek } from "react-icons/fa";
import { PiFireSimple } from "react-icons/pi";
import { LuArrowUpFromLine } from "react-icons/lu";
import { MdOutlineFiberNew } from "react-icons/md";
import { FaComment } from "react-icons/fa";

function Search() {
    const [activeTab, setActiveTab] = useState(0);
    const [relevanceOpen, setRelevanceOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ text: "Relevance", icon: <AiOutlineRocket /> });
    const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");

    const tabLabels = ["Users", "Posts", "Comments", "Communities"];

    const handleTabClick = (index) => {
        setRelevanceOpen(false);
        setTimeOpen(false);
        setActiveTab(index);
    };

    const toggleRelevanceDropdown = () => {
        setRelevanceOpen(!relevanceOpen);
        setTimeOpen(false);
    };

    const toggleTimeDropdown = () => {
        setTimeOpen(!timeOpen);
        setRelevanceOpen(false);
    }

    const handleOptionSelect = (optionText, icon) => {
        setSelectedOption({ text: optionText, icon: icon });
        setRelevanceOpen(false); 
    };
    const handleTimeOptionSelect = (option) => {
        setSelectedTimeOption(option);
        setTimeOpen(false); 
    };

    return (
        <>
            <NavBarUnlogged />
            <SideBar />
            <div className='search-title'>
                <span>Search-results</span>
            </div>
            <div className='Contents2'>
                {tabLabels.map((label, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>


            <div className='sort-by-title'>
                <span className='sort-by'>Sort by:</span>
            </div>


            <div className='sort-by-dropdown'>
            <button className='relevance-button' onClick={toggleRelevanceDropdown}>
                {selectedOption.icon}
                {selectedOption.text}
            </button>
            {relevanceOpen && (
                <div className="relevance-content">
                    <button onClick={() => handleOptionSelect("Relevance", <AiOutlineRocket />)}>
                        <AiOutlineRocket />
                        Relevance
                    </button>
                    <button onClick={() => handleOptionSelect("Hot", <PiFireSimple />)}>
                        <PiFireSimple />
                        Hot
                    </button>
                    <button onClick={() => handleOptionSelect("Top", <LuArrowUpFromLine />)}>
                        <LuArrowUpFromLine />
                        Top
                    </button>
                    <button onClick={() => handleOptionSelect("New", <MdOutlineFiberNew />)}>
                        <MdOutlineFiberNew />
                        New
                    </button>
                    <button onClick={() => handleOptionSelect("Most Comments", <FaComment />)}>
                        <FaComment />
                        Most Comments
                    </button>
                </div>
            )}
                    
                    <button className='all-time-button' onClick={toggleTimeDropdown}>
                <FaCalendarWeek />
                {selectedTimeOption}
            </button>
            <div className="line-after-all-time"></div>
            {timeOpen && (
                <div className='all-time-content'>
                    <label>
                        <input type="radio" name="allTimeOption" value="All Time" onChange={() => handleTimeOptionSelect("All Time")} checked={selectedTimeOption === "All Time"} />
                        All Time
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Year" onChange={() => handleTimeOptionSelect("Past Year")} checked={selectedTimeOption === "Past Year"} />
                        Past Year
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Month" onChange={() => handleTimeOptionSelect("Past Month")} checked={selectedTimeOption === "Past Month"} />
                        Past Month
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Week" onChange={() => handleTimeOptionSelect("Past Week")} checked={selectedTimeOption === "Past Week"} />
                        Past Week
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past 24 hrs" onChange={() => handleTimeOptionSelect("Past 24 hrs")} checked={selectedTimeOption === "Past 24 hrs"} />
                        Past 24 hrs
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Hour" onChange={() => handleTimeOptionSelect("Past Hour")} checked={selectedTimeOption === "Past Hour"} />
                        Past Hour
                    </label>
                </div>
            )}
            </div>
            <div className="tab-content">
                {activeTab === 0 && (
                    <div className="user-content">
                        <Users/>
                    </div>
                )}
                {activeTab === 1 && (
                    <div className="post-content">
                        <Post/>

                    </div>
                )}
                {activeTab === 2 && (
                    <div className="comment-content">
                        <Comment/>

                    </div>
                )}
                {activeTab === 3 && (
                    <div className="community-content">
                        <Community/>
                        
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;
