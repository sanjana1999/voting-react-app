import React from "react";
import {
    Card,
    Button,
  } from "react-bootstrap";
import { FaArrowCircleDown,FaArrowCircleUp } from 'react-icons/fa';
import photo from "../assets/user.png"
import {connect} from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => {
    return {
      auth : state.authenticated,
      uniqueid : state.uniqueid
    }
  }

class Posts extends React.Component{
    constructor(props){
        super(props);
        this.state={
            post: this.props.post
        }
        this.upvote =this.upvote.bind(this);      
        this.downvote = this.downvote.bind(this);  
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.post !== this.props.post) {
            this.setState({
                post: this.props.post,
            });
        }
    }
    async upvote(){
        const post = await axios.post("http://localhost:5000/posts/upvote",{id:this.props.post._id,unique:this.props.uniqueid});
        if (post.data.msg === undefined){
            this.setState({
                post:post.data
            },()=>{
                console.log(this.state.post)
            })
        }
        else{
            alert(post.data.msg)
        }
    }
    
    async downvote(){
        const post = await axios.post("http://localhost:5000/posts/downvote",{id:this.props.post._id,unique:this.props.uniqueid});
        if (post.data.msg === undefined){
            this.setState({
                post:post.data
            },()=>{
                console.log(this.state.post)
            })
        }
        else{
            alert(post.data.msg)
        }
    }

    render(){
        return(
            <>
            <Card className="text-left" style={{width:"50%",margin:'0 auto',marginBottom:"10px"}}>  
            <Card.Body>
                <div style={{display:"flex"}}>
                    <img src={photo} className="rounded-circle" style={{width:"36px", height:"36px", marginRight:"10px",marginTop:"3px"}}/>
                        <p><span style={{fontWeight:"bold", fontSize:"small"}}>User's Name</span><span style={{color:"gray", fontSize:"small"}}> <br></br> User's Bio </span></p> 
                </div>
                <Card.Title as="h6">{this.state.post.title}</Card.Title>
                <Card.Text >
                    {this.state.post.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer >
                {this.state.post.upvotesid.includes(this.props.uniqueid) &&
                    <p>you have upvoted</p>
                }
                {this.state.post.downvotesid.includes(this.props.uniqueid) &&
                    <p>you have downvoted</p>
                }
                <Button onClick={()=>{this.upvote()}} style={{marginRight:"10px"}}>
                    {this.state.post.upvotes} <FaArrowCircleUp/>
                </Button>
                
                <Button onClick={()=>{this.downvote()}}style={{marginRight:"10px"}}>
                    {this.state.post.downvotes} <FaArrowCircleDown/>
                </Button>
            </Card.Footer>
            </Card>
            </>
        );
    }
}
export default connect(mapStateToProps,null)(Posts);
