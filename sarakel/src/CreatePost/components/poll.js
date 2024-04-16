import React,{useState} from 'react';
import Post from './Post.js';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';







export default function Poll({setPostBody})
{
    const [options, setOptions] = useState(['option 1', 'option 2']);

    const addOption = () => {
        const newOptions = [...options, `option ${options.length + 1}`];
        setOptions(newOptions);
    };


    return (
        <div>
            <Post/>
            <div className='poll'>
                {options.map((option, index) => (
                    <input key={index} type='text' placeholder={option} className='pollinputs' />
                ))}
                <div className='poll2'>
                    <button className='polladd' onClick={addOption}> Add Option </button>
                    <label htmlFor="myDropdown" className='pollduration'>Voting Length</label>
                    <select id="myDropdown" name="myDropdown">
                        <option value="option1">1 day</option>
                        <option value="option2">2 days</option>
                        <option value="option3">3 days</option>
                    </select>
                </div>
            </div>
        </div>
    );
}