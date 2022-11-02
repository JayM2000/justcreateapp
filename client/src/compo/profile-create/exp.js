import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { eexp } from '../../redux__appli/action/profile';
import { Link, useNavigate } from 'react-router-dom';

const Expe = ({ eexp }) => {

    const navi = useNavigate();

    const [addexp, setAddexp] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const { company, title, location, from, to, current, description } = addexp;


    function func(e) {
        setAddexp({...addexp, [e.target.name]:e.target.value});
    };

    function onfunc(e) {
        e.preventDefault();
        console.log(addexp);

        eexp(addexp,navi);
    }

    return (
        <React.Fragment>
            <section className="container">
                <h1 className="large text-primary">
                    Add An Experience
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any developer/programming
                    positions that you have had in the past
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={(e) => onfunc(e) }>
                    <div className="form-group">
                        <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={(e) => 
                            func(e)
                        } />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Company" name="company" required value={company} onChange={(e) => 
                            func(e)
                        } />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => 
                            func(e)
                        } />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={(e) => 
                            func(e)
                        } />
                    </div>
                    <div className="form-group">
                        <p><input type="checkbox" name="current" value={current}
                            onChange={() => 
                                setAddexp({ ...addexp, current: !current })
                            } />{' '}Current Job</p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input type="date" name="to" value={to} onChange={(e) => func(e)}
                         disabled={current}/>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
                            value={description}
                            onChange={(e) => 
                                func(e)
                            }
                        ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1 clickk" />
                    <Link className="btn btn-light my-1 clickk" to="/dashb">Go Back</Link>
                </form>
            </section>
        </React.Fragment>
    )
}

Expe.propTypes = {
    eexp: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const maps = (st) => ({
    profile: st.profileall
});

export default connect(maps, { eexp })(Expe);