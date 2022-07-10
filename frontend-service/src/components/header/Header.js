import React, {useState} from "react";
// import "/Users/don/Desktop/local code/projects/bugtracker/frontend-service/src/style.css"
import "../style.css"
import IssuePopup from "../popup/IssuePopup"
import {Link} from "react-router-dom";
import UserPopup from "../popup/UserPopup";
// import logo from "./bug-svgrepo-com.svg"

const Header = ({openIssue, openUser}) => {
    const [state, setState] = useState(false)
    const [user, setUser] = useState(false)

    const DynamicCreateBtn = () => {
         return (
             // eslint-disable-next-line jsx-a11y/anchor-is-valid
             <a
                 onClick={() => {
                     setState(openIssue)
                     setUser(openUser)
                 }
             }
                 className="btn btn-sm btn-primary w-full w-lg-auto popup-btn"
             >
                 Create
             </a>
         )
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
                <div className="container-xl">
                    {/*<a className="navbar-brand" >*/}
                    {/*    <img  className="h-8"*/}
                    {/*         alt="..."/>*/}
                    {/*    <src={logo}</src>*/}
                    {/*</a>*/}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                    </button>
                    <div className="navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav mx-lg-auto">
                            <Link to="/">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="nav-item nav-link active"  aria-current="page">All issues</a>
                            </Link>
                            <Link to="/open-issues">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="nav-item nav-link">Open issues</a>
                            </Link>
                            <Link to="/completed-issues">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="nav-item nav-link" >Completed issues</a>
                            </Link>
                            <a className="nav-item nav-link" href="https://www.linkedin.com/in/tochidon/" target="_blank" rel="noreferrer">About me</a>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="nav-item nav-link">Source</a>
                        </div>
                        <div className="navbar-nav ms-lg-4">
                            <Link to="/user">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="nav-item nav-link">User</a>
                            </Link>
                        </div>
                        <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                                <DynamicCreateBtn />
                        </div>
                        <div className="navbar-nav ms-lg-0">
                            <Link to="/user">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-item nav-link">Logout</a>
                            </Link>
                        </div>
                    </div>
                </div>

            </nav>
            <IssuePopup open={state} onClose={() => setState(false)} />
            <UserPopup  open={user} onClose={() => setUser(false)}/>
        </>
    )
}



export default Header