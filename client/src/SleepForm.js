import React, { useState } from 'react';
import { Slider, Modal } from "antd";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SleepForm.css';
import { Button } from 'antd';

function SleepForm() {
    const [formData, setFormData] = useState({
        age: 30,
        gender: 'male',
        occupation: 'Programmer',
        sleep_duration: 7.0,
        sleep_quality: 6.0,
        stress: 6.0,
        BMI: 'overweight',
        blood_pressure: '140/90',
        heart_rate: 80,
        step_count: 5000,
    });

    const [response, setResponse] = useState({
        diagnostic: '',
        recommendations: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === 'heart_rate') {
            parsedValue = value;
        } else if (name === 'step_count') {
            parsedValue = value;
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'heart_rate') {
            const parsedInt = parseInt(value, 10);
            let clampedValue = 40;
            if (!isNaN(parsedInt)) {
                clampedValue = Math.max(40, Math.min(200, parsedInt));
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: clampedValue
            }));
        } else if (name === 'step_count') {
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
            const res = await fetch('http://127.0.0.1:8000/sleep', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                setResponse({
                    diagnostic: data.diagnostic,
                    recommendations: data.recommendations
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
            <form onSubmit={handleSubmit}>
                <Container>
                    <Row className="sleep-form-row">
                        <Col>
                            <label>Age ({formData.age}):</label>
                        </Col>
                        <Col>
                            <Slider
                                name="age"
                                style={{ width: '100%' }}
                                value={formData.age}
                                min={1}
                                max={99}
                                onChange={(value) => handleSliderChange("age", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={1}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Gender ({formData.gender}):</label>
                        </Col>
                        <Row className="sleep-form-radio-row">

                            <Col>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
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
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row className="sleep-form-row">
                        <Col>
                            <label>Sleep Duration ({formData.sleep_duration}):</label>
                        </Col>
                        <Col>
                            <Slider
                                size="small"
                                name="sleep_duration"
                                value={formData.sleep_duration}
                                min={0}
                                max={24}
                                onChange={(value) => handleSliderChange("sleep_duration", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={0.1}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Sleep Quality ({formData.sleep_quality}):</label>
                        </Col>
                        <Col>
                            <Slider
                                size="small"
                                name="sleep_quality"
                                value={formData.sleep_quality}
                                min={0}
                                max={9}
                                onChange={(value) => handleSliderChange("sleep_quality", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={0.1}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Stress ({formData.stress}):</label>
                        </Col>
                        <Col>
                            <Slider
                                size="small"
                                name="stress"
                                value={formData.stress}
                                min={0}
                                max={9}
                                onChange={(value) => handleSliderChange("stress", value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                className="sleep-form-slider"
                                step={0.1}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label>BMI ({formData.BMI}):</label>
                        </Col>
                        <Row className="sleep-form-radio-row">
                            <Col>
                                <label>
                                    <input
                                        type="radio"
                                        name="BMI"
                                        value="normal"
                                        checked={formData.BMI === 'normal'}
                                        onChange={handleChange}
                                    />
                                    Normal
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="BMI"
                                        value="overweight"
                                        checked={formData.BMI === 'overweight'}
                                        onChange={handleChange}
                                    />
                                    Overweight
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="BMI"
                                        value="other"
                                        checked={formData.BMI === 'other'}
                                        onChange={handleChange}
                                    />
                                    Other
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
                                    name="blood_pressure"
                                    value={formData.blood_pressure}
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
                                name="heart_rate"
                                value={formData.heart_rate}
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
                                name="step_count"
                                value={formData.step_count}
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
                <p>{response.diagnostic}</p>
                <h3>Recommendations:</h3>
                <p>{response.recommendations}</p>
            </Modal>
        </div>
    );
}

export default SleepForm;