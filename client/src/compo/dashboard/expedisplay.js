import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../redux__appli/utils/dateformate';
import { deleteexp } from '../../redux__appli/action/profile';

const Experience = ({ experience, deleteexp }) => {

  const experiences = experience.length>0 ? (experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => deleteexp(exp._id)}
          className="btn btn-danger clickk"
        >
          Delete
        </button>
      </td>
    </tr>
  )))
  :  (undefined)

  return (
      experiences ? (<Fragment>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </Fragment>) : (<div className="my-2">No <u>Experience</u> details found</div>)
  );
};

Experience.propTypes = {
  deleteexp: PropTypes.func.isRequired,
};

export default connect(null, { deleteexp })(Experience);