import React, { useState } from 'react';

function ImageConvertor() {
    const [base64Image, setBase64Image] = useState('');

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

        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setBase64Image(base64);
                console.log(base64);
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="upload-button"
                style={{ display: 'none' }}
            />
            <label htmlFor="upload-button">
                Upload Image
            </label>
            {base64Image && (
                <img src={base64Image} alt="Uploaded" style={{ maxWidth: '300px' }} />
            )}
            {base64Image}
        </div>
    );
}

export default ImageConvertor;