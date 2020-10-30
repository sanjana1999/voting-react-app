import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  Button,
  Form,
} from "react-bootstrap";
import {connect} from "react-redux";
import {signin, signout,assignuserinfo} from "./redux-actions/actions";
import axios from "axios";
const mapDispatchToProps = () => {
    return{
       signin,
       signout,
       assignuserinfo
    }
}

const mapStateToProps = (state) => {
  return {
    auth : state.authenticated,
    uniqueid : state.uniqueid
  }
}
 
class Auth extends React.Component {
  constructor(props){
    super();
    this.state={
      unique:"",
    }
    this.onlogin = this.onlogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem("user")){
      this.props.signin()
      this.props.assignuserinfo(localStorage.getItem("user"));
      this.props.history.push('/home');
    }
  }

  handleChange(evt){
    this.setState({
       [evt.target.name]:evt.target.value
    })
  }

  async onlogin(){
      axios.post("http://localhost:5000/uniqueid/signin",this.state)
      .then(res=>{
        this.props.signin()
        this.props.assignuserinfo(res.data.unique);
        localStorage.setItem("user",res.data.unique)
        this.props.history.push('/home');
      })
      .catch(e=>{
        alert("Enter Unique Id")
      })
  }
  render(){
  return (
      <Card border="primary" style={{ width: '18rem',margin:'0 auto' }}>
        <Card.Body>
          <Form>
            <Form.Group>
            <Form.Label>Unique Id</Form.Label>
            <Form.Control 
                name="unique"
                type="text" 
                value={this.state.unique} 
                onChange={this.handleChange}
                placeholder="Enter unique id" />
            </Form.Group>
          </Form>
        </Card.Body>
        <Button onClick={this.onlogin} variant="primary">View Posts</Button>
      </Card>
  );
  }
}
export default connect(mapStateToProps,mapDispatchToProps())(Auth);
