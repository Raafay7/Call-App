import React, { useState, useEffect } from 'react';
import './Call.css';

const CallPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [voiceMessage, setVoiceMessage] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+\d{1,12}$/;
        return phoneRegex.test(phoneNumber);
    };

    const startVoiceInput = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.start();

        let finalTranscript = '';

        recognition.onresult = (event) => {
            const voiceMessage = event.results[0][0].transcript;
            if (voiceMessage.toLowerCase().includes('over')) {
                finalTranscript += voiceMessage.split('over')[0].trim() + ' ';
                recognition.stop();
            } else {
                finalTranscript += voiceMessage + ' ';
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            alert('An error occurred during speech recognition: ' + event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition service disconnected');
            setVoiceMessage(finalTranscript.trim());
        };
    };

    const makeCall = () => {
        if (!phoneNumber) {
            setPhoneError('Please enter a phone number.');
            return;
        } else if (!isValidPhoneNumber(phoneNumber)) {
            setPhoneError('Please enter a valid phone number with up to 12 characters, including only numbers and the "+" symbol.');
            return;
        } else {
            setPhoneError('');
        }

        fetch('/api/makeCall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ phoneNumber, message: voiceMessage }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                setPhoneError('Error: ' + data.error.message);
            } else {
                alert('Call initiated successfully');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setPhoneError('An error occurred while trying to make the call.');
        });
    };

    useEffect(() => {
        document.getElementById('phoneNumber').addEventListener('input', function (e) {
            this.value = this.value.replace(/[^\d+]/g, '');
        });
    }, []);

    return (
        <div className="call-container">
            <h1>Phone Call</h1>
            <div className="input-group">
                <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    maxLength="13"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p className="error">{phoneError}</p>
            </div>
            <button className="button record" onClick={startVoiceInput}>
                🎤 Record Message
            </button>
            <button className="button call" onClick={makeCall}>
                📞 Call
            </button>

            {voiceMessage && (
                <div className="message-container" id="messageContainer">
                    <div className="message-title">Recorded Message:</div>
                    <div className="message-content">{voiceMessage}</div>
                </div>
            )}
        </div>
    );
};

export default CallPage;
