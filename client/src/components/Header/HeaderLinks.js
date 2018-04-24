import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage';

class HeaderLinks extends Component{
	    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
			token: ''
        };

		// Binding my signin, signout & logout functions to the constructor
		// this.onSignIn = this.onSignIn.bind(this);
		// this.onSignUp = this.onSignUp.bind(this);
		this.onLogOut = this.onLogOut.bind(this);
	}

	// Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted
	componentDidMount() {
		const obj = getFromStorage('papayas_app');
        if (obj && obj.token) {
            const { token } = obj;
			console.log(obj);
			// Verify Token
            fetch('/api/account/verify?token=' + token)
				.then(res => res.json())
				.then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false
                        });
                    }
                })
		} else {
			this.setState({
				isLoading: false
			});
		}
    }
	/*
	** Logout Function
	*/
	onLogOut() {
		this.setState({
			isLoading: true
		});
		const obj = getFromStorage('papayas_app');
		if (obj && obj.token) {
			const { token } = obj;
			// Verify token
			fetch('/api/account/logout?token=' + token)
				.then(res => res.json())
				.then(json => {
					if (json.success) {
						this.setState({
							token: '',
							isLoading: false
						});
					} else {
						this.setState({
							isLoading: false
						});
					}
				});
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
    render(){
        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        return (
            <div>
                <Nav>
                    <NavItem eventKey={1} href="/Dashboard">
                        <i className="fa fa-dashboard"></i>
                        <p className="hidden-lg hidden-md">Dashboard</p>
                    </NavItem>
                    <NavDropdown eventKey={2} title={notification} noCaret id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                        <MenuItem eventKey={2.5}>Another notifications</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={3} href="#">
                        <i className="fa fa-search"></i>
                        <p className="hidden-lg hidden-md">Search</p>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/Signin">Sign In</NavItem>
                    <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown-right">
                        <MenuItem eventKey={2.1}>Action</MenuItem>
                        <MenuItem eventKey={2.2}>Another action</MenuItem>
                        <MenuItem eventKey={2.3}>Something</MenuItem>
                        <MenuItem eventKey={2.4}>Another action</MenuItem>
                        <MenuItem eventKey={2.5}>Something</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.5}>Help</MenuItem>
                    </NavDropdown>
                    <NavItem onClick={this.onLogOut}>Log Out</NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
