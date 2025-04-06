import React, { useState } from 'react';
import './ImageConverter.css';
import { Modal, Button } from 'antd';

function ImageConvertor() {
    let [base64Image, setBase64Image] = useState('');
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        console.log("file is here?");
        if (file) {
            console.log("file is here yes");
            try {
                const base64 = await convertToBase64(file);
                setBase64Image(base64);
                console.log("base64 set and converted");
                setErrorMessage(''); // Clear any previous error messages
            } catch (error) {
                console.error("Error converting image to base64:", error);
                setErrorMessage('Failed to convert image to base64.');
                setBase64Image(''); // Clear the base64 image to prevent displaying an invalid image
            }
        } else {
            setBase64Image(''); // Ensure base64Image is cleared when no file is selected
            setErrorMessage(''); // Clear any previous error messages
        }
    };

    const handleSubmit = async () => {
        if (!base64Image) {
            setErrorMessage('Please upload an image.');
            return;
        }
        base64Image = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        console.log("IN handleSubmit");
        try {
            const res = await fetch('http://127.0.0.1:8000/cancer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image_data: base64Image }),
            });
            console.log("fetch done");
            if (res.ok) {
                const data = await res.text();
                setResponse(data);
                setIsModalVisible(true);
                setErrorMessage(''); // Clear any previous error messages
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
            <h1 style={{color:"black"}}>Acute Lymphocytic Leukemia Detector</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="upload-button"
                className="image-upload-input"
            />
            <label htmlFor="upload-button" className="image-upload-label">
                Upload Image
            </label>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {base64Image && (
                <img src={base64Image} alt="Uploaded" className="uploaded-image" />
            )}
            <Button type="primary" onClick={handleSubmit} disabled={!base64Image}>
                Submit
            </Button>

            <Modal
                title="Cancer Analysis Result"
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

export default ImageConvertor;