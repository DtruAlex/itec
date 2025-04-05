import React, { useState } from 'react';
import { Slider } from "antd";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SleepForm() {
    const [formData, setFormData] = useState({
        age: 30,
        gender: 'male',
        occupation: '',
        sleep_duration: 7,
        sleep_quality: 3,
        stress: 2,
        BMI: 'normal',
        blood_pressure: '',
        heart_rate: 80,
        step_count: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === 'heart_rate') {
            parsedValue = Math.max(40, Math.min(200, value));
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    const handleBloodPressureChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value.replace(/[^0-9\/]/g, '') // Only allow numbers and '/'
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (

        <form
            onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col>
                        Age:
                    </Col>
                    <Col>{formData.age}</Col>
                    <Col><Slider
                        name="age"
                        style={{ width: '200px' }}
                        value={formData.age}
                        min={1}
                        max={99}
                        onChange={(e, newValue) => setFormData({ ...formData, age: newValue })}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    /></Col>
                </Row>
                <Row>
                    <Col><label>
                        Gender:

                    </label></Col>
                    <Col>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select></Col>

                </Row>
                <Row>
                    <Col>
                        <label>
                            Occupation:

                        </label>
                    </Col>
                    <Col>
                        <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            Sleep Duration:
                        </label>
                    </Col>
                    <Col>
                        {formData.sleep_duration}
                        <Slider
                            size="small"
                            name="sleep_duration"
                            value={formData.sleep_duration}
                            min={0}
                            max={24}
                            onChange={(e, newValue) => setFormData({ ...formData, sleep_duration: newValue })}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label>
                            Sleep Quality:
                        </label>
                    </Col>
                    <Col>
                        <Slider
                            size="small"
                            name="sleep_quality"
                            value={formData.sleep_quality}
                            min={0}
                            max={9}
                            onChange={(e, newValue) => setFormData({ ...formData, sleep_quality: newValue })}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        />
                    </Col>
                    <Col>
                        {formData.sleep_quality}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label>
                            Stress:
                        </label>
                    </Col>
                    <Col>
                        <Slider
                            size="small"
                            name="stress"
                            value={formData.stress}
                            min={0}
                            max={9}
                            onChange={(e, newValue) => setFormData({ ...formData, stress: newValue })}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        />
                    </Col>
                    <Col>
                        {formData.stress}
                    </Col>
                </Row>

                <Row>
                    <Col><label>
                        BMI:
                    </label>
                    </Col>
                    <Col>
                        <select name="BMI" value={formData.BMI} onChange={handleChange}>
                            <option value="normal">Normal</option>
                            <option value="overweight">Overweight</option>
                            <option value="other">Other</option>
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col><label>
                        Blood Pressure:
                    </label></Col>
                    <Col><input
                        type="text"
                        name="blood_pressure"
                        value={formData.blood_pressure}
                        onChange={handleBloodPressureChange}
                        placeholder="XXX/YYY"
                    />
                    </Col>
                </Row>

                <Row>
                    <Col><label>
                        Heart Rate:
                    </label></Col>
                    <Col><input
                        type="number"
                        name="heart_rate"
                        value={formData.heart_rate}
                        onChange={handleChange}
                        min="40"
                        max="200"
                    />
                    </Col>
                </Row>

                <Row>
                    <Col><label>
                        Step Count:
                    </label></Col>
                    <Col>
                        <input type="number" name="step_count" value={formData.step_count} onChange={handleChange} />
                    </Col>
                </Row>

                <Row>
                    <button type="submit">Submit</button>
                </Row>
            </Container>
        </form>


    );
}

export default SleepForm;