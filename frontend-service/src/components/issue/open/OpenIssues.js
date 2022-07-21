import React, {useEffect, useState} from 'react';
import EditPage from "../../actions/edit/EditPage"
import axios from "axios";
import './openissues.css'

const RenderAssignee = ({username}) => {
    return   <tr className="table__assignee">
        <td colSpan="10">Assignee : {username} </td>
    </tr>
}

const Priority = ({priority}) => {
    if (priority === "NORMAL") {
        return <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.5" y1="1.5" x2="13.5" y2="1.5" stroke="#029EF5" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    } else if (priority === "IMPORTANT") {
        return <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.5" y1="6.5" x2="13.5" y2="6.5" stroke="#181818" strokeWidth="3" strokeLinecap="round"/>
            <line x1="1.5" y1="1.5" x2="13.5" y2="1.5" stroke="#181818" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    } else {
        return <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.5" y1="11.5" x2="13.5" y2="11.5" stroke="#CC0303" strokeWidth="3" strokeLinecap="round"/>
            <line x1="1.5" y1="6.5" x2="13.5" y2="6.5" stroke="#CC0303" strokeWidth="3" strokeLinecap="round"/>
            <line x1="1.5" y1="1.5" x2="13.5" y2="1.5" stroke="#CC0303" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    }
}

const RenderInfo = ({issues}) => {
    const [state, setState] = useState(false)
    const [issueId, setIssueId] = useState(0)
    return (
        <>
            {issues.map((e) =>
            <tr className="table__data-row">
                <td data-label="Account">
                    <span className={'badge badge--'+`${e.status}`}>{e.status}</span>
                </td>
                <td data-label="Due Date">
                    <a className="table__link" href="" onClick={() => {
                        setIssueId(e.issueId)
                        setState(true)
                    }} > #12024 </a>
                </td>
                <td data-label="Amount" colSpan="4">
                    {e.subject}
                </td>
                <td data-label="Category">category</td>
                <td data-label="Priority">
                    <div className="priority-wrapper">
                        <Priority priority={e.priority}/>
                    </div>
                </td>
                <td data-label="Last Update">{e.lastUpdated}</td>
                <td data-label="Created">12:11:23 AM</td>
            </tr> ).reverse()}
            <EditPage open={state} onClose={() => setState(false)} issueId={issueId}/>
        </>

    )
}

const OpenIssues = () => {
    const [state, setState] = useState([])

    useEffect(() => {

        axios.get("http://localhost:9191/users/getusersandissues").then((e) => {
            setState(e.data)
        })

    }, []);
    return (
        <>
            <caption>
            Issues
        </caption>
        <table>
            <thead>
            <tr>
                <th scope="col">Status</th>
                <th scope="col">Key</th>
                <th scope="col" colSpan="4">Subject</th>
                <th scope="col">Category</th>
                <th scope="col">Priority</th>
                <th scope="col">Last Update</th>
                <th scope="col">Created</th>
            </tr>
            </thead>

                {state.map((e) =>
                    <>
                        <tbody>
                        <RenderAssignee username={e.user.fname + " " + e.user.lname}/>
                        <RenderInfo issues={e.issues}/>
                        </tbody>
                        </>
                )}
        </table>
        </>



    );

}

export default OpenIssues