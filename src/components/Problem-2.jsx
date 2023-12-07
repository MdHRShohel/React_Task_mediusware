import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [currentModal, setCurrentModal] = useState(null);
    const [showEvenIds, setShowEvenIds] = useState(false);
    const [USCountry, setUSCountry] = useState([]);
    const [contact, setContact] = useState(null);

    //ALl Contacts 
    useEffect(() => {
        axios
            .get('https://contact.mediusware.com/api/contacts/?format=json')
            .then((response) => {
                const responseData = response.data;
                if(responseData && responseData.results) {
                    setModalContent(responseData.results);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //US Contacts
    useEffect(() => {
        axios
            .get('https://contact.mediusware.com/api/country-contacts/United%20States/?format=json')
            .then((response) => {
                const responseData = response.data;
                if(responseData && responseData.results) {
                    setUSCountry(responseData.results);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const openModal = (modal) => {
        if (modal === 'A') {
            setShowModalA(true);
            setShowModalB(false);
            setShowModalC(false);
            setCurrentModal('A');
        } else if (modal === 'B') {
            setShowModalB(true);
            setShowModalA(false);
            setShowModalC(false);
            setCurrentModal('B');
        } else if (modal === 'C') {
            setShowModalA(false);
            setShowModalB(false);
            setShowModalC(true);
            setCurrentModal('C');
        }
    };

    const closeModal = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
        setCurrentModal(null);
    };

    const contactDetails = (x,y) =>{
       setContact({
        name : x,
        num : y
       })
       openModal('C')
    };

    const filteredModalContent = showEvenIds ? modalContent.filter((item) => item.id % 2 === 0) : modalContent;
    const USfilteredModalContent = showEvenIds ? USCountry.filter((item) => item.id % 2 === 0) : USCountry;

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg"
                        style={{ backgroundColor: '#46139f', color: 'white' }}
                        type="button"
                        onClick={() => openModal('A')}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg"
                        style={{ backgroundColor: '#ff7f50', color: 'white' }}
                        type="button"
                        onClick={() => openModal('B')}
                    >
                        US Contacts
                    </button>
                </div>
            </div>

            {/* Modal A */}
            <div
                className={`modal fade ${showModalA ? 'show' : ''}`}
                id="modalA"
                tabIndex="-1"
                role="dialog"
                style={{ display: showModalA ? 'block' : 'none' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <h2 className='text-center'>ALL Contacts</h2>
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredModalContent.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <button
                                             className="btn m-1"
                                             style={{ backgroundColor: '#83249e', color: 'white' }}
                                             onClick={() => contactDetails(item.country.name,item.phone)}
                                            >{item.phone}</button>  
                                        <td>{item.country.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className="d-flex">
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: '#46139f', color: 'white' }}
                                onClick={() => openModal('A')}
                            >
                                All Contacts
                            </button>
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: '#ff7f50', color: 'white' }}
                                onClick={() => openModal('B')}
                            >
                                US Contacts
                            </button>
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: 'white', color: '#46139f', border: '1px solid #46139f' }}
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                        <div className="ms-2">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showEvenIds}
                                    onChange={() => setShowEvenIds(!showEvenIds)}
                                />{' '}
                                Show Even IDs
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal B */}
            <div
                className={`modal fade ${showModalB ? 'show' : ''}`}
                id="modalB"
                tabIndex="-1"
                role="dialog"
                style={{ display: showModalB ? 'block' : 'none' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <h2 className='text-center'>US Contacts</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {USfilteredModalContent.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <button
                                             className="btn m-1"
                                             style={{ backgroundColor: '#83249e', color: 'white' }}
                                             onClick={() => contactDetails(item.country.name,item.phone)}
                                            >{item.phone}</button>    
                                        </td>
                                        <td>{item.country.name}</td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className="d-flex">
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: '#46139f', color: 'white' }}
                                onClick={() => openModal('A')}
                            >
                                All Contacts
                            </button>
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: '#ff7f50', color: 'white' }}
                                onClick={() => openModal('B')}
                            >
                                US Contacts
                            </button>
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: 'white', color: '#46139f', border: '1px solid #46139f' }}
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                         <div className="ms-2">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showEvenIds}
                                    onChange={() => setShowEvenIds(!showEvenIds)}
                                />{' '}
                                Show Even IDs
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal C */}
            <div
                className={`modal fade p-5 ${showModalC ? 'show' : ''}`}
                id="modalC"
                tabIndex="-1"
                role="dialog"
                style={{ display: showModalC ? 'block' : 'none' }}
            >
                <div className="modal-dialog p-5" role="document">
                    <div className="modal-content">
                        <h2 className='text-center'>Modal C</h2>
                        
                        <h3>Country Name: {contact?.name}</h3>
                        <h4> Phone Number: {contact?.num}</h4>
                        
                        
                        <div className="d-flex">
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: '#46139f', color: 'white' }}
                                onClick={() => openModal('A')}
                            >
                                All Contacts
                            </button>
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: '#ff7f50', color: 'white' }}
                                onClick={() => openModal('B')}
                            >
                                US Contacts
                            </button>
                            <button
                                className="btn m-1"
                                style={{ backgroundColor: 'white', color: '#46139f', border: '1px solid #46139f' }}
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem2;
