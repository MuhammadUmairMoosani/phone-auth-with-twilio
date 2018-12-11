import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      code:"",
      UIStatus:"auth"
    };
  }
  sendVerificationMsg = () => {
    fetch("http://localhost:4000/sendMsg", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ phone:this.state.phone })
    })
    .then(function(response) {
      return response.json();
    })
      .then((res) => {
        this.setState({UIStatus:"code"})
      })
      .catch(function(res) {
        console.log(res);
      });
  };

  verifyCodeFunction = () => {
    fetch("http://localhost:4000/verifycode", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ phone:this.state.phone,token:this.state.code })
    })
    .then(function(response) {
      return response.json();
    })
      .then((res) => {
        if(res.success) {
          this.setState({UIStatus:"successfully"})
        } else {
          this.setState({UIStatus:"Failed"})
        }
      })
      .catch((res) => {
        this.setState({UIStatus:"Failed"})
      });
  };
  UIRenderFunction = () => {
     switch(this.state.UIStatus) {
       case "auth":
       return  <div className="App">
        <div className="mainDiv">
          <from className="formstyle">
            <h2>PHONE AUTHENTICATION</h2>
            <div className="inDiv">
              <span>+92</span>
              <input
                type="number"
                onChange={text => this.setState({ phone: text.target.value })}
              />
            </div>
            <button
              onClick={this.sendVerificationMsg}
              className={this.state.phone.length === 10 ? "" : "hide"}
            >
              Submit
            </button>
          </from>
        </div>
      </div>;
      break;
      case "code":
      return  <div className="App">
        <div className="mainDiv">
          <from className="formstyle">
            <h2>ENTER VERIFICATION CODE</h2>
            <div className="inDiv">
              <input
                type="number"
                onChange={text => this.setState({ code: text.target.value })}
              />
            </div>
            <button
              onClick={this.verifyCodeFunction}
            >
              Submit
            </button>
          </from>
        </div>
      </div>;
      case "successfully":
      return <div className="App">
      <div className="mainDiv">
          <h2>SUCCESSFULLY REGISTERED</h2>
      </div>
    </div>;
    case "Failed":
    return <div className="App">
    <div className="mainDiv">
        <h2>FAILED</h2>
    </div>
  </div>;
       default: return "";
     }
  }

  render() {
    return this.UIRenderFunction()
  }
}

export default App;
