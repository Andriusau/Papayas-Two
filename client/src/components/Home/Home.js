import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const Home = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/signup">Sign Up Page</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard Page</Link>
        </li>
      </ul>
      <Route path="/Signup" component={Signup} />
      <Route path="/Signin" component={Signin} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/Signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Signup = () => <h3>Sign Up</h3>;
const Dashboard = () => <h3>Dashboard</h3>;

class Signin extends React.Component {
  state = {
    redirectToReferrer: false
  };

  Signin = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must Sign In to view the page at {from.pathname}</p>
        <button onClick={this.signin}>Sign In</button>
      </div>
    );
  }
}

export default Home;