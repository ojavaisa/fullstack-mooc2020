import React from 'react';

const Notification = ({ message, msgColor }) => {
    const styleColor = {
        color: msgColor
    }
    if (message === null) {
        return null;
    }

    return (
        <div className="notification" style={styleColor}>
            {message}
        </div>
    );
};

export default Notification;