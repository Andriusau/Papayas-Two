import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import imagine from '../../assets/img/sidebar-5.jpg';
import logo from '../../assets/img/reactlogo.png';
import Header from '../Header/Header';

class Sidebar extends Component {
    constructor(props){
        super(props);
		this.state = {
			width: window.innerWidth,
		};
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}


	/* End Log Out Function */
    render(){
        const sidebarBackground = {
            backgroundImage: 'url(' + imagine + ')'
        };
        return (
            <div id='sidebar' className='sidebar' data-color='black' data-image={imagine}>
                <div className='sidebar-background' style={sidebarBackground}></div>
                    <div className='logo'>
                        <a href='https://new-papayas-project.herokuapp.com/' className='simple-text logo-mini'>
                            <div className='logo-img'>
                                <img src={logo} alt='logo_image'/>
                            </div>

                        </a>
                        <a href='https://new-papayas-project.herokuapp.com/' className='simple-text logo-normal'>
                            Papayas Project 3
                        </a>
                    </div>
				<div className='sidebar-wrapper'>
					<ul className='nav'>
						{this.state.width <= 991 ? (<Header />) : null}
							<li className='nav-item active'>
							<NavLink to='/user' className='nav-link'> User Profile</NavLink>
							<NavLink to='/dashboard' className='nav-link'> Dashboard</NavLink>
							<NavLink to='/transcribe' className='nav-link'> Upload & Transcribe Audio</NavLink>
							</li>
					</ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;