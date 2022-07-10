import React, {useState} from "react";
import axios from "axios"



const UserPopup = ({open, onClose}) => {
    let userInput;
    const [user, setUser] = useState({
        fname:"",
        lname: "",
        email: ""
    });


    const handleChange= (e)=> {
        e.preventDefault();
        userInput = e.target.value;

        setUser({
            ...user,
            [e.target.name] : userInput
        })
    }


    if(!open){
       console.log("not rendering this" + open)
       return null
   }

    return (
        <>
    <div id="popup-reg" className="popup active">
        <div className="popup-content">
            <div className="event-header">
                <h4>Create User !</h4>
            </div>
            <form id="send" className="send-form">
                <div className="form-group">

                    <input type="text" placeholder="First Name..." id="name" name = "fname" value={user.fname} required="required" onChange={(e)=> handleChange(e)} />

                </div>
                <div className="form-group">

                    <input type="text" placeholder="Last Name..." id="name" value={user.lname} name="lname" required="required" onChange={(e)=> handleChange(e)} />

                </div>
                <div className="form-group">

                    <input type="text" placeholder="Title..." id="name" value={user.title} name="title" required="required" onChange={(e)=> handleChange(e)} />

                </div>

                <button type="submit" className="main-btn-rect" name="text" onClick= {()=> axios.post("http://localhost:9191/users/create", user)}>
                    <i className="fa fa-paper-plane"></i>Save</button>
            </form>
            <span className="fade-out main-btn-circle" onClick={onClose}>╳</span>
        </div>
    </div>
     </>
    )
}
export default UserPopup