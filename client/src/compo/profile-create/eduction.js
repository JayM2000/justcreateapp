import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { education } from '../../redux__appli/action/profile';
import { Link, useNavigate } from 'react-router-dom';

const Education = ({ education }) => {

    const navi = useNavigate();

    const [addexp, setAddexp] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = addexp;


    function func(e) {
        setAddexp({ ...addexp, [e.target.name]: e.target.value });
    };

    function onfunc(e) {
        e.preventDefault();
        console.log(addexp);

        education(addexp, navi);
    }

    return (
        <React.Fragment>
            <section className="container">
                <h1 className="large text-primary">Add Your Education</h1>
                <p className="lead">
                    <i className="fas fa-code-branch" /> Add any school or bootcamp that you
                    have attended
                </p>
                <small>* = required field</small>
                <form
                    className="form"
                    onSubmit={(e) => onfunc(e)}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* School or Bootcamp"
                            name="school"
                            value={school}
                            onChange={(e) => func(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Degree or Certificate"
                            name="degree"
                            value={degree}
                            onChange={(e) => func(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Field of Study"
                            name="fieldofstudy"
                            value={fieldofstudy}
                            onChange={(e) => func(e)}
                        />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={(e) => func(e)} />
                    </div>
                    <div className="form-group">
                        <p>
                            <input
                                type="checkbox"
                                name="current"
                                checked={current}
                                value={current}
                                onChange={() => setAddexp({ ...addexp, current: !current })}
                            />{' '}
                            Current School
                        </p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input
                            type="date"
                            name="to"
                            value={to}
                            onChange={(e) => func(e)}
                            disabled={current}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Program Description"
                            value={description}
                            onChange={(e) => func(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary my-1 clickk" />
                    <Link className="btn btn-light my-1 clickk" to="/dashb">
                        Go Back
                    </Link>
                </form>
            </section>
        </React.Fragment>
    )
}

Education.propTypes = {
    eexp: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const maps = (st) => ({
    profile: st.profileall
});

export default connect(maps, { education })(Education);