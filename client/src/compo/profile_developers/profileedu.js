import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../redux__appli/utils/dateformate';

const Profileedu = ({ proff: {
    school, degree, fieldofstudy, current, to, from, description
} }) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                {formatDate(from)} - {to ? formatDate(to) : 'Now'}
            </p>
            <p>
                <strong>Degree: </strong> {degree}
            </p>
            <p>
                <strong>Field Of Study: </strong> {fieldofstudy}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

Profileedu.propTypes = { proff: PropTypes.object.isRequired };

export default Profileedu;