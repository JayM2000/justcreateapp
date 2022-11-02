import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../redux__appli/utils/dateformate';
import {deleteedu} from '../../redux__appli/action/profile';

const Education = ({ edu ,deleteedu}) => {

  const experiences =edu.length>0 ? edu.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td >{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => deleteedu(edu._id)}
          className="btn btn-danger clickk"
        >
          Delete
        </button>
      </td>
    </tr>
  )) : undefined

  return (
    experiences ? (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th >Degree</th>
            <th >Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  ) : (<div className="my-2">No <u>Education</u> details found</div>)
    );
  }

Education.propTypes = {
    edu: PropTypes.array.isRequired,
    deleteedu: PropTypes.func.isRequired
};

export default connect(null,{deleteedu})(Education);