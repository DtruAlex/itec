import React, { useState } from 'react';
import { Slider, Modal, Select } from "antd";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SleepForm.css';
import { Button } from 'antd';

const { Option } = Select;

function StrokePredictor() {
    const [formData, setFormData] = useState({
        gender: 1,
        age: 67.0,
        hypertension: 0,
        heart_disease: 1,
        ever_married: 1,
        work_type: 2,
        Residence_type: 1,
        avg_glucose_level: 228.69,
        bmi: 36.6,
        smoking_status: 2
    });

    const [response, setResponse] = useState({
        probability_of_stroke: '',
        stroke_prediction: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSliderChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://testbed-gpu.info.uvt.ro:1234/stroke/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                setResponse({
                    probability_of_stroke: data.probability_of_stroke,
                    stroke_prediction: data.stroke_prediction
                });
                setIsModalVisible(true);
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
            <h1>Stroke Predictor</h1>
            <form onSubmit={handleSubmit}>
                <Container>
                    <Row className="sleep-form-row">
                        <Col>
                            <label>Gender:</label>
                        </Col>
                        <Col>
                            <Select
                                name="gender"
                                value={formData.gender}
                                style={{ width: '100%' }}
                                onChange={(value) => handleChange("gender", value)}
                            >
                                <Option value={0}>Female</Option>
                                <Option value={1}>Male</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Age ({formData.age}):</label>
                        </Col>
                        <Col>
                            <Slider
                                name="age"
                                style={{ width: '100%' }}
                                value={formData.age}
                                min={0}
                                max={100}
                                step={0.1}
                                onChange={(value) => handleSliderChange("age", value)}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Hypertension:</label>
                        </Col>
                        <Col>
                            <Select
                                name="hypertension"
                                value={formData.hypertension}
                                style={{ width: '100%' }}
                                onChange={(value) => handleChange("hypertension", value)}
                            >
                                <Option value={0}>No</Option>
                                <Option value={1}>Yes</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Heart Disease:</label>
                        </Col>
                        <Col>
                            <Select
                                name="heart_disease"
                                value={formData.heart_disease}
                                style={{ width: '100%' }}
                                onChange={(value) => handleChange("heart_disease", value)}
                            >
                                <Option value={0}>No</Option>
                                <Option value={1}>Yes</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Ever Married:</label>
                        </Col>
                        <Col>
                            <Select
                                name="ever_married"
                                value={formData.ever_married}
                                style={{ width: '100%' }}
                                onChange={(value) => handleChange("ever_married", value)}
                            >
                                <Option value={0}>No</Option>
                                <Option value={1}>Yes</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Work Type:</label>
                        </Col>
                        <Col>
                            <Select
                                name="work_type"
                                value={formData.work_type}
                                style={{ width: '100%' }}
                                onChange={(value) => handleChange("work_type", value)}
                            >
                                <Option value={0}>Private</Option>
                                <Option value={1}>Self-employed</Option>
                                <Option value={2}>Govt_job</Option>
                                <Option value={3}>children</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Residence Type:</label>
                        </Col>
                        <Col>
                            <Select
                                name="Residence_type"
                                value={formData.Residence_type}
                                style={{ width: '100%' }}
                                onChange={(value) => handleChange("Residence_type", value)}
                            >
                                <Option value={0}>Rural</Option>
                                <Option value={1}>Urban</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Average Glucose Level ({formData.avg_glucose_level}):</label>
                        </Col>
                        <Col>
                            <Slider
                                name="avg_glucose_level"
                                style={{ width: '100%' }}
                                value={formData.avg_glucose_level}
                                min={50}
                                max={300}
                                step={0.01}
                                onChange={(value) => handleSliderChange("avg_glucose_level", value)}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>BMI ({formData.bmi}):</label>
                        </Col>
                        <Col>
                            <Slider
                                name="bmi"
                                style={{ width: '100%' }}
                                value={formData.bmi}
                                min={10}
                                max={50}
                                step={0.1}
                                onChange={(value) => handleSliderChange("bmi", value)}
                            />
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <Col>
                            <label>Smoking Status:</label>
                        </Col>
                        <Col>
                            <Select
                                name="smoking_status"
                                value={formData.smoking_status}
                                style={{ width: '100%' }}
                                onChange={(value) => handleChange("smoking_status", value)}
                            >
                                <Option value={0}>never smoked</Option>
                                <Option value={1}>formerly smoked</Option>
                                <Option value={2}>smokes</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row className="sleep-form-row">
                        <button type="submit" className="sleep-form-button">Submit</button>
                    </Row>
                </Container>
            </form>
            <Modal
                title="Stroke Prediction"
                visible={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <h3>Probability of Stroke:</h3>
                <p>{response.probability_of_stroke}</p>
                <h3>Stroke prediction:</h3>
                <p>{response.stroke_prediction}</p>
            </Modal>
        </div>
    );
}

export default StrokePredictor;