import React, { useState } from 'react';
import Modal from 'react-modal';
//import { useAuth } from '../HomePage/Components/AuthContext';
import axios from 'axios';
import './CreateCommunity.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

export default function Community() {
    //const { token } = useAuth();
    let name;
    let type = "public";
    let adult = false;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    async function CreateCommunity() {
        const communityData = {
            communityName: name,
            type: type,
            isNSFW: adult
        };

        try {
            const response = await sendInfo(communityData);
            console.log("Community created successfully:", response.data);
        } catch (error) {
            console.error("Error creating community:", error);
        }

        console.log("Community data:", communityData);
    }

    async function sendInfo(data) {
        try {
            const response = await axios.post('http://localhost:5000/api/community/create', data, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhaGV5MSIsImlhdCI6MTcxNTEwODI0MX0.l4yDvmBHyap-LoZ4oRgK5vZziN6FoY-BB6-gzw4FQKo`
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    return (
        <div>
            <button className='sidebarButtons' onClick={openModal}>
                <svg rpl="" className='sideIcon' fill="currentColor" height="20" icon-name="add-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path></svg>
                Create Community
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Create Community Modal"
            >
                <div className="modal-content">
                    <h1>Create a Community</h1>
                    <p>Build and grow a community about something you care about. We'll help you set things up.</p>

                    <input className="w90" type="text" placeholder="Name" onChange={(e) => { name = e.target.value }}></input>
                    <p>Name can not be changed later</p>

                    <h2>TYPE</h2>
                    <ul className="typeslist">
                        <li onClick={() => { type = "public" }}>
                            <input type="radio" id="public" name="communityType" value="public" defaultChecked />
                            <label className="ml10" htmlFor="public">Public</label>
                        </li>
                        <li onClick={() => { type = "restricted" }}>
                            <input type="radio" id="restricted" name="communityType" value="restricted" />
                            <label className="ml10" htmlFor="restricted">Restricted</label>
                        </li>
                        <li onClick={() => { type = "private" }}>
                            <input type="radio" id="private" name="communityType" value="private" />
                            <label className="ml10" htmlFor="private">Private</label>
                        </li>
                    </ul>

                    <div className="adult">
                        <div className="adult-header">Adult Content</div>
                        <div className="adultCheckbox">
                            <input type="checkbox" onClick={() => { adult = !adult }} />
                            <p>18+ year old community</p>
                        </div>
                    </div>

                    <div className="cancelcreate">
                        <button className="cancel" onClick={closeModal}>Cancel</button>
                        <button className="create" onClick={CreateCommunity}>Create</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
