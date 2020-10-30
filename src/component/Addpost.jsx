import React from "react";
import {
    Card,
    Form,
    Button
} from "react-bootstrap";
import {connect} from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => {
    return {
      auth : state.authenticated
    }
  }

class Addpost extends React.Component{
    constructor(){
        super();
        this.state={
            title:"",
            content:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.addpost = this.addpost.bind(this);
    }
  
    componentDidMount(){
        if (!this.props.auth)
            this.props.history.push('/auth');
    }

    handleChange(evt){
      this.setState({
         [evt.target.name]:evt.target.value
      })
    }

    addpost(){
        axios.post("https://voting-backend-3010.herokuapp.com/posts/add",this.state)
            .then(res=>{
                console.log(res.data);
                this.props.history.push('/home')
            })
            .catch(e=>{
                alert(e)
            })
    }

    render(){
        return(
            <>
            <Card style={{ width: '80%',margin:'0 auto', marginTop:"100px" }}>
            <Card.Body>
            <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    name="title"
                    type="text" 
                    value={this.state.title} 
                    onChange={this.handleChange}
                    placeholder="Enter title" />
            </Form.Group>
            
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Post</Form.Label>
                <Form.Control as="textarea" rows={3} 
                    name="content"
                    value={this.state.content} 
                    onChange={this.handleChange}
                    placeholder="Enter content" 
                />
            </Form.Group>
            </Form>
            </Card.Body>
            <Button variant="primary" onClick={this.addpost}style={{margin:'0 auto'}}>Add post</Button>
            </Card>
            </>
        );
    }
}
export default connect(mapStateToProps,null)(Addpost);