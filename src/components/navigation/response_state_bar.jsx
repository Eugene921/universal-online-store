import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResponseState } from '../../actions';

function ResponseStateBar({ clearResponseState, response: { state, link, text, name, stack } }) {
  if(!state || state === '') return null;

  let className = 'status_bar';
  if( state === 'confirm') className += ' ' + 'status_bar_confirm'; 
  if( state === 'reject') className += ' ' + 'status_bar_reject';
  if( state === 'warn') className += ' ' + 'status_bar_warn';

  return (
    <div className={className} >
      { name && <h3>{name}</h3> }
      <p>{text}</p>
      { stack && <span>{stack}</span> }
      { link && <Link to={`${link}`} >View</Link> }
      <button onClick={clearResponseState} >×</button>
    </div>
  );
}

ResponseStateBar.propTypes = {
  clearResponseState: PropTypes.func,
  response: PropTypes.shape({
    state: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    stack: PropTypes.string,
  })
};

export default connect(state => ({ response: state.response.response }), {clearResponseState: clearResponseState})(ResponseStateBar);
