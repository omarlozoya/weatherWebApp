import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  //   constructor(props) {
  //     super(props); // super is a reference to the parent's constructer function.

  //     // This is the only time we do direct assignment to our state.
  //     this.state = { lat: null, errorMsg: "" };
  //   }

  state = { lat: null, errorMsg: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        // we called setState!! to update our state
        this.setState({ lat: position.coords.latitude });
      },
      err => this.setState({ errorMsg: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMsg && !this.state.lat) {
      return <div>Error: {this.state.errorMsg} </div>;
    }
    if (!this.state.errorMsg && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner msg="Please accept location request" />;
  }

  // React says we have to define render!! render will be re-rendered when we get our lat from our state.
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
