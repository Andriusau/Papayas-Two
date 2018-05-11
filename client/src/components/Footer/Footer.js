import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
            <footer className="footer">
                <Grid>
                    <p className="copyright pull-right">
                        &copy; {(new Date()).getFullYear()} <a href="https://github.com/iggy788/Second-Papayas-Project-3">Papayas Project 3</a>, made with a lot of my hard work!
                    </p>
                </Grid>
            </footer>
		);
	}
}

export default Footer;
