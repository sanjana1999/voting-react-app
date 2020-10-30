import React from "react";
import HomeNavbar from "./component/Navbar";
import Posts from "./component/Posts";
import {connect} from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => {
    return {
      auth : state.authenticated
    }
  }

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }
    
    async componentDidMount(){
        if (!this.props.auth){
            this.props.history.push('/auth');
        }
        const posts = await axios.post("https://voting-backend-3010.herokuapp.com/posts/all");
        this.setState({
            posts:posts.data
        },()=>{
            console.log(this.state.posts)
        })
        
    }

    renderpost(){
        var posts = [];
        for(var i=0; i<this.state.posts.length;i++){
            posts.push(<Posts post={this.state.posts[i]}/>)
        }
        return posts
    }

    render(){
        return(
            <>
                <HomeNavbar />
                {this.renderpost()}
                
            </>
        );
    }
}
export default connect(mapStateToProps,null)(Home);