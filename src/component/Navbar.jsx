import React from "react";
import {Link} from "react-router-dom";
import {
    Navbar,
    Button
} from "react-bootstrap";
import { FaPowerOff, FaWindows } from 'react-icons/fa';
import {connect} from "react-redux";
import {signout} from "../redux-actions/actions";
const mapDispatchToProps = () => {
    return{
       signout
    }
}
const mapStateToProps = (state) => {
    return {
      auth : state.authenticated,
    }
}
class HomeNavbar extends React.Component{
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut(){
        console.log(this.props)
        this.props.signout();
        localStorage.removeItem("user")
        window.location.reload(false);
    }
    render(){
        return(
            <>
                <Navbar bg="light">
                    <Navbar.Brand href="#home">Voting App</Navbar.Brand>
                    <Link to="/addpost" className="ml-auto">
                    <Button variant="primary" style={{marginRight:"15px"}}>
                        Add Post
                    </Button></Link>
                    <Button variant="primary" onClick={()=>{this.signOut()}}>
                        <FaPowerOff style={{marginRight:"5px"}}/> Sign out
                    </Button>
                </Navbar>
                
            </>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(HomeNavbar);
