import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutCurrentUser } from '../../actions';

import incognito from '../../../public/images/incognito.svg';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    };

    this.open = this.open.bind(this);
    this.closse = this.closse.bind(this);
  }

  closse() { this.setState({ isOpen: false  }); }
  open() { this.setState({ isOpen: true  }); }

  render() {
    const { isOpen } = this.state;
    const { currentUser, signOutCurrentUser, isAdmin } = this.props;
    const userImage = currentUser ? currentUser.image : null;

    return (
      <div className="user" onMouseLeave={this.closse}>
        <div className="icon" onMouseOverCapture={this.open} >
          <img src={userImage ? userImage : incognito} />
        </div>
        { isOpen && (
          <div className="user_nav">
            <ul>
              { currentUser && <li><Link to="/user" onClick={this.closse}>Account</Link></li> }
              { isAdmin ? (
                <React.Fragment>
                  <li>
                    <Link to="/admin" onClick={this.closse} >Doc</Link>
                  </li>
                  <li>
                    <Link to="/admin/store" onClick={this.closse} >Admin Store</Link>
                  </li>
                </React.Fragment>
               ) : (null)
              }
  
              {currentUser ? (    
                <li>
                  <button onClick={signOutCurrentUser}>Sign Out</button>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

User.propTypes = {
  currentUser: PropTypes.shape({
    image: PropTypes.string,
    email: PropTypes.string,
  }),
  isAdmin: PropTypes.bool,
  signOutCurrentUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAdmin: state.user.isAdmin,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutCurrentUser: () => dispatch(signOutCurrentUser())
});


export default connect(mapStateToProps, mapDispatchToProps)(User);