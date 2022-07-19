import "./App.css"
import Header from "../components/header/Header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import AllIssues from "../components/issue/all/AllIssues";
import OpenIssues from "../components/issue/open/OpenIssues";
import UserCard from "../components/cards/user/UserCard";
import CompletedIssues from "../components/issue/completed/CompletedIssues";


function App() {
    return (

         <Router>
             <>
                    <Routes>
                    <Route exact path="/" element={   <> <Header openIssue ={true} openUser ={false}/> <AllIssues /> </>} />
                    <Route exact path="/open-issues" element={  <> <Header openIssue ={true} openUser ={false}/> <OpenIssues /> </>} />
                        <Route exact path="/user" element={  <> <Header openIssue ={false} openUser ={true}/> <UserCard /> </>} />
                        <Route exact path="/completed-issues" element={  <> <Header openIssue ={true} openUser ={false}/> <CompletedIssues /> </>} />
            </Routes>
             </>
         </Router>


    );


}

export default App
