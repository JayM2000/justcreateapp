import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../redux__appli/utils/dateformate';

const Profileexp = ({ proff: {
    company, title, location, current, to, from, description
} }) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                {formatDate(from)} - {to ? formatDate(to) : 'Now'}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Location: </strong> {location}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

Profileexp.propTypes = {proff: PropTypes.object.isRequired};

export default Profileexp;