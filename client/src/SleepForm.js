import React, { useState } from 'react';
import { Slider, Modal } from "antd";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SleepForm.css';
import { Button } from 'antd';

function SleepForm() {
    const [formData, setFormData] = useState({
        "Person ID": 1,
        "Age": 30,
        "Gender": 'Male',
        "Occupation": 'Programmer',
        "Sleep Duration": 7.0,
        "Quality of Sleep": 6.0,
        "Physical Activity Level": 30,
        "Stress Level": 6.0,
        "BMI Category": 'Overweight',
        "Blood Pressure": '140/90',
        "Heart Rate": 80,
        "Daily Steps": 5000,
    });

    const [response, setResponse] = useState({
        response: '',
        prediction: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === 'Heart Rate') {
            parsedValue = value;
        } else if (name === 'Daily Steps') {
            parsedValue = value;
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'Heart Rate') {
            const parsedInt = parseInt(value, 10);
            let clampedValue = 40;
            if (!isNaN(parsedInt)) {
                clampedValue = Math.max(40, Math.min(200, parsedInt));
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: clampedValue
            }));
        } else if (name === 'Daily Steps') {
            const parsedInt = parseInt(value, 10);
            let clampedValue = 0;
            if (!isNaN(parsedInt)) {
                clampedValue = parsedInt;
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: clampedValue
            }));
        }
    };


    const handleSliderChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: parseFloat(value)
        }));
    };

    const handleBloodPressureChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value.replace(/[^0-9\/]/g, '') // Only allow numbers and '/'
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://testbed-gpu.info.uvt.ro:1234/sleep/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Data:', data);
                setResponse({
                    prediction: data.prediction,
                    response: data.response
                });
                setIsModalVisible(true); // Show the modal
                console.log('Response:', data);
            } else {
                console.error('Error:', res.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };


    return (
        <div className="sleep-form-container">
            <h1>Sleep Analyser</h1>
            <form onSubmit={handleSubmit}>
                <Container>
                    <Row className="sleep-form-row">
                        <Col>
                            <label>Age ({formData.Age}):</label>
                        </Col>
                        <Col>
                            <Slider
                                name="Age"
                                style={{ width: '100%' }}
                                value={formData.Age}
                                min={1}
                                max={99}
                                onChange={(value) => handleSliderChange("Age", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={1}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Gender ({formData.Gender}):</label>
                        </Col>
                        <Row className="sleep-form-radio-row">

                            <Col>
                                <label>
                                    <input
                                        type="radio"
                                        name="Gender"
                                        value="Male"
                                        checked={formData.Gender === 'Male'}
                                        onChange={handleChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="Gender"
                                        value="Female"
                                        checked={formData.Gender === 'Female'}
                                        onChange={handleChange}
                                    />
                                    Female
                                </label>
                            </Col>
                        </Row>
                    </Row>
                    <Row className="sleep-form-row">
                        <Col>
                            <label>Occupation:</label>
                        </Col>
                        <Col>
                            <input
                                type="text"
                                name="Occupation"
                                value={formData.Occupation}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row className="sleep-form-row">
                        <Col>
                            <label>Sleep Duration ({formData["Sleep Duration"]}):</label>
                        </Col>
                        <Col>
                            <Slider
                                size="small"
                                name="Sleep Duration"
                                value={formData["Sleep Duration"]}
                                min={0}
                                max={24}
                                onChange={(value) => handleSliderChange("Sleep Duration", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={0.1}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Sleep Quality ({formData["Quality of Sleep"]}):</label>
                        </Col>
                        <Col>
                            <Slider
                                size="small"
                                name="Quality of Sleep"
                                value={formData["Quality of Sleep"]}
                                min={0}
                                max={9}
                                onChange={(value) => handleSliderChange("Quality of Sleep", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={0.1}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Stress ({formData["Stress Level"]}):</label>
                        </Col>
                        <Col>
                            <Slider
                                size="small"
                                name="Stress Level"
                                value={formData["Stress Level"]}
                                min={0}
                                max={9}
                                onChange={(value) => handleSliderChange("Stress Level", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={0.1}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Physical Activity Level ({formData["Physical Activity Level"]}):</label>
                        </Col>
                        <Col>
                            <Slider
                                size="small"
                                name="Physical Activity Level"
                                value={formData["Physical Activity Level"]}
                                min={0}
                                max={99}
                                onChange={(value) => handleSliderChange("Physical Activity Level", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={0.1}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label>BMI ({formData["BMI Category"]}):</label>
                        </Col>
                        <Row className="sleep-form-radio-row">
                            <Col>
                                <label>
                                    <input
                                        type="radio"
                                        name="BMI Category"
                                        value="Normal"
                                        checked={formData["BMI Category"] === 'Normal'}
                                        onChange={handleChange}
                                    />
                                    Normal
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="BMI Category"
                                        value="Overweight"
                                        checked={formData["BMI Category"] === 'Overweight'}
                                        onChange={handleChange}
                                    />
                                    Overweight
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="BMI Category"
                                        value="Obese"
                                        checked={formData["BMI Category"] === 'Obese'}
                                        onChange={handleChange}
                                    />
                                    Obese
                                </label>
                            </Col>
                        </Row>

                        <Row className="sleep-form-row">
                            <Col>
                                <label>Blood Pressure:</label>
                            </Col>
                            <Col>
                                <input
                                    type="text"
                                    name="Blood Pressure"
                                    value={formData["Blood Pressure"]}
                                    onChange={handleBloodPressureChange}
                                    placeholder="XXX/YYY"
                                />
                            </Col>
                        </Row>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Heart Rate:</label>
                        </Col>
                        <Col>
                            <input
                                type="number"
                                name="Heart Rate"
                                value={formData["Heart Rate"]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                min="40"
                                max="200"
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Step Count:</label>
                        </Col>
                        <Col>
                            <input
                                type="number"
                                name="Daily Steps"
                                value={formData["Daily Steps"]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <button type="submit" className="sleep-form-button">Submit</button>
                    </Row>
                </Container>
            </form>
            <Modal
                title="Sleep Analysis"
                visible={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <h3>Diagnostic:</h3>
                <p>{response.prediction}</p>
                <h3>Recommendations:</h3>
                <p>{response.response}</p>
            </Modal>
        </div>
    );
}

export default SleepForm;