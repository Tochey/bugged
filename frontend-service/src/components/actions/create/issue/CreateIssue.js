import React, {useState, useEffect} from "react";
import './createissue.css'
import axios from "axios";



const RenderUsers = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get("http://localhost:9191/users/getall").then((e) => setUsers(e.data))
    }, []);
    return (
        users.map((e) => {
            return <option value={e.userId} > {e.fname + " " + e.lname}  </option>
        })
    )
}

const CreateIssue = ({open, onClose}) => {
    let userInput;

    const [issue, setIssue] = useState({
        subject : "",
        description: "",
        assignee: "",
        status: "",
        priority: ""

    });


    const handleChange = (e) => {
        e.preventDefault();
        userInput = e.target.value;

        setIssue({
            ...issue,
            [e.target.name] : userInput,
        });
    }

    if(!open){
        return null
    }
    return (
        <div id="popup-reg"  className="popup active">
            <div className="popup-content">
                <div className="event-header">
                    <h4>Create issue !</h4>
                </div>
                <form id="send" className="send-form">
                    <div className="form-group">
                        <input type="text" placeholder="Enter Subject..." id="name" name="subject" value = {issue.subject} required="required" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">

                        <textarea placeholder="Enter Description..." name="description" value =  {issue.description} id="text" cols="50" rows="6" maxLength="255" required onChange={(e) => handleChange(e)}></textarea>

                    </div>
                    <div className="form-group">

                        <select id="cars" name="assignee"   value = {issue.assignee} onChange={(e) => handleChange(e)} >
                            <option value="" disabled selected hidden>Assignee</option>
                            <option value={0} >Unassigned</option>
                            <RenderUsers />
                        </select>

                    </div>
                    <div className="form-group">

                        <select id="cars" name="status" value={issue.status}  onChange={(e) => handleChange(e)}>
                            <option value="" disabled selected hidden>Status</option>
                            <option value="TODO">TODO</option>
                            <option value="INPROGRESS">INPROGRESS</option>
                            <option value="REVIEW">REVIEW</option>
                            <option value="DONE">DONE</option>
                        </select>

                    </div>
                    <div className="form-group">

                        <select id="cars" name="priority"  value={issue.priority} onChange={(e) => handleChange(e)}>
                            <option value="" disabled selected hidden>Priority</option>
                            <option value="NORMAL">NORMAL</option>
                            <option value="IMPORTANT">IMPORTANT</option>
                            <option value="CRITICAL">CRITICAL</option>
                        </select>

                    </div>

                    <button  className="main-btn-rect" name="text" value="Send" onClick={()=>  axios.post("http://localhost:9191/issues/create", issue)}>
                        <i className="fa fa-paper-plane"></i>Save
                    </button>
                </form>
                <span className="fade-out main-btn-circle" onClick={onClose}
                   >╳</span>
            </div>
        </div>
    )

}

export default CreateIssue