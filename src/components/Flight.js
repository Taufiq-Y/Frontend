import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchFlights } from "../actions/postAction";


class Flight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "",
      destination: "",
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    console.log(this.props);
    this.props.fetchFlights();
  }
  //remaining
  routeChange = (e) => {
    const a = prompt("This page will directly take u to the sign up page, If you are already a user log in to see status of your flights, please enter 'CONFIRM' in input field...");
    if (a == 'CONFIRM') {
      let path = "/book/" + e.flightId + "/" + e.amount;
      this.props.history.push(path);
    } else {
      window.location.reload();
    }
  };


  onLoginSubmit(e) {
    e.preventDefault();
    const Post = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:7002/bookings/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(Post)
    })
      .then((res) => res.json())
      .then((rems) => {
        console.log(rems);
        alert(`message: ${rems.message}`);
        if (rems.token) {
          let path = "/checkstatus/" + rems.id;
          this.props.history.push(path);
        } else {
          alert("some error appeared!")
        }
      });
  }


  onSubmit(e) {
    e.preventDefault();
   
    const src = this.state.source.toLowerCase();
    const dest = this.state.destination.toLowerCase();

    fetch("http://localhost:7001/flights/" + src + "/" + dest)
      .then((response) =>
        response.json().catch((err) => {
          console.err(`'${err}' happened!`);
          return {};
        })
      )
      .then((json) => {
        // console.log("parsed json: ", json);
        this.setState({ flightData: json });
      })
      .catch((err) => {
        console.log("fetch request failed: ", err);
      });
  }

  render() {
    const filterdate=this.props.flightData.flights.filter((searchdata)=>
    {
      if((searchdata.flightSource.toLowerCase().includes(this.state.source.toLowerCase()))&&(searchdata.flightDestination.toLowerCase().includes(this.state.destination.toLowerCase())))
      {
        return searchdata
      }
   
    }
    )
    console.log(filterdate);
    const flightList = filterdate.map((flight) => (
      <tr key={flight._id}>
        <td>{flight.flightId}</td>
        <td>{flight.flightSource}</td>
        <td>{flight.flightDestination}</td>
        <td>{flight.flightArrival}</td>
        <td>{flight.flightDeparture}</td>
        <td>{flight.amount}</td>
        <td>
          <button
            className="btn btn-outline-secondary"
            onClick={() => this.routeChange(flight)}
          >
            Book
          </button>
        </td>
      </tr>
    ));



    return (

      <div className="container-sm mr-auto" style={{backgroundColor:"white"}} >

        <br />
        
        
        <div className="d-flex justify-content-between" style={{marginLeft:"100px"}}>
          <div>
            <form className="card w-30 mr-auto" style={{ textAlign: "center" }} onSubmit={this.onSubmit} >
              <div className="card-body " style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
                <h5 className="card-title">Start Your Journey Today !</h5>
                <h6 className="card-subtitle mb-2 text-muted">Search Flight Here</h6>
                <div>
                  <label>Source</label>
                  <input
                    type="text"
                    name="source"
                    placeholder="Source"
                    value={this.state.source}
                    className="form form-control"
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div>
                  <label>Destination :</label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={this.state.destination}
                    className="form form-control"
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Search
          </button>
              </div>
            </form>
          </div>

          <img src="https://image.freepik.com/free-vector/travel-background-with-airplane-white-clouds_11554-1087.jpg" className="rounded" style={{ height: "30rem", textAlign: "center", width: "40rem" }} />

          <div className="container-s" style={{marginRight:"100px"}}>
            <form className="card w-30 mr-auto" style={{ textAlign: "center", width: "18rem" }} onSubmit={this.onLoginSubmit} >
              <div className="card-body " style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
                <h5 className="card-title">Already a user ?</h5>
                <h6 className="card-subtitle mb-2 text-muted">Login</h6>
                <div>
                  <label>Username</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Username"
                    value={this.state.email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="form form-control"
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div>
                  <label>Password :</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    pattern=".{7,}"
                    className="form form-control"
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Search
          </button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <h4 style={{ textAlign: "center", backgroundColor:"rgb(255, 204, 0)"}}>All Flights</h4>
        <hr />
        <div>
          <table className="table table-hover">
            <thead style={{backgroundColor:"rgb(65, 100, 156)", color:"white"}}>
              <tr>
                <td> Number</td>
                <td> Source</td>
                <td> Destination</td>
                <td> Arrival</td>
                <td> Departure</td>
                <td>Price</td>
                <td>Book</td>
                <td></td>
              </tr>
            </thead>
            <tbody>{flightList}</tbody>
          </table>
          <br />
          <hr />
          <div style={{ textAlign: "center", margin: "30px", float: "right" }}>
            <h6>For Administrator and Other Bussiness Related Users: </h6>

            <NavLink to="/signup" className="btn btn-outline-primary" style={{ margin: "5px 5px" }} >Signup</NavLink>
            <NavLink to="/login" className="btn btn-outline-primary" style={{ margin: "5px 5px" }} >Login</NavLink>


          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  flightData: state.posts
})
export default connect(mapStateToProps, { fetchFlights })(withRouter(Flight));
