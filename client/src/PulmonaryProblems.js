import React, { useState } from 'react';
import './ImageConverter.css';
import { Modal, Button } from 'antd';

function PulmonaryProblems() {
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [base64Audio, setBase64Audio] = useState('');
    const [response, setResponse] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleAudioUpload = async (e) => {
        const file = e.target.files[0];
        setSelectedAudio(file);
        if (file) {
            console.log("file is here yes");
            try {
                const base64 = await convertToBase64(file);
                setBase64Audio(base64);
                console.log("base64 set and converted");
                setErrorMessage('');
            } catch (error) {
                console.error("Error converting audio to base64:", error);
                setErrorMessage('Failed to convert audio to base64.');
                setBase64Audio('');
            }
        } else {
            setBase64Audio('');
            setErrorMessage('');
        }
    };

    const handleSubmit = async () => {
        if (!base64Audio) {
            setErrorMessage('Please upload an audio file.');
            return;
        }
        // Ensure the base64 string is in the correct format
        // Remove the data URL prefix
        const base64Data = base64Audio.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/, '');

        try {
            const res = await fetch('http://127.0.0.1:8000/pulmonary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ audio_data: base64Data }),
            });
            console.log("fetch done");
            if (res.ok) {
                const data = await res.text();
                setResponse(data);
                setIsModalVisible(true);
                setErrorMessage('');
            } else {
                try {
                    const errorData = await res.json();
                    setErrorMessage(`Error: ${res.status} - ${errorData.detail}`);
                    console.error('Error:', res.status, errorData);
                } catch (e) {
                    const errorText = await res.text();
                    setErrorMessage(`Error: ${res.status} - ${errorText}`);
                    console.error('Error:', res.status, errorText);
                }
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
            console.error('Error:', error);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="image-converter-container">
            <h1 style={{color: "black"}}>Pulmonary Problems Detector</h1>
            <input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                id="upload-button"
                className="image-upload-input"
            />
            <label htmlFor="upload-button" className="image-upload-label">
                Upload Audio
            </label>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {selectedAudio && (
                <audio controls>
                    <source src={base64Audio} type={selectedAudio.type}/>
                    Your browser does not support the audio element.
                </audio>
            )}
            <Button type="primary" onClick={handleSubmit} disabled={!base64Audio}>
                Submit
            </Button>

            <Modal
                title="Pulmonary Analysis Result"
                visible={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <p>{response}</p>
            </Modal>
        </div>
    );
}

export default PulmonaryProblems;