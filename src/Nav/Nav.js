import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import UsersCRUD from "../Admin/UsersCRUD";
import CandidatesCRUD from "../Admin/CandidatesCRUD";
import ProductShowcase from "../Products/ProductShowcase"
import CertificateCRUD  from "../Admin/CertificateCRUD";
import {useState} from "react";
import CertificatesShowcase from "../Certificates/CertificatesShowcase";
import "./Nav.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import Purchases from "../MyPurchases/Purchases";
import MarkExams from "../Admin/MarkExams";
import Products from "../Admin/Products";

export default function Nav() {
    const [Role, setRole] = useState("Admin");
    const [usernameLogged, setUsernameLogged] = useState("Admin");

    function BeCandidade() {
        setRole("Candidate");
    }
    function BeAdmin() {
        setRole("Admin");
    }
    function BeQA() {
        setRole("QA");
    }
    function BeMarker() {
        setRole("Marker");
    }

    return (<div className="Application">
        <BrowserRouter>
            <nav >
                        <Link  to="/">{Role==="Marker"?"Exams to Mark" : "Products"}    </Link>
                {(Role==="Admin"|| Role==="QA") && <>
                        <Link  to="/Candidates" >Candidates   </Link>
                        <Link  to="/Users">Users     </Link>
                        <Link  to="/Certificates" >Certificates    </Link>
                        <Link  to="/MarkExams">Exam Delegation   </Link>
                        <Link  to="/Purchases">Mark Exams </Link>
                    </>
                }
                {
                    Role==="Candidate"&& <>
                        <Link  to="/Purchases">Purchases </Link>
                        <Link  to="/CertificatesShowcase">CertificatesShowcase   </Link>

                    </>
                }




                <div className="dropdown">
                    <button onClick={BeCandidade}>Be Candidate</button>
                    <button onClick={BeAdmin}>Be Admin</button>
                    <button onClick={BeQA}>Be QA</button>
                    <button onClick={BeMarker}>Be Marker</button>
                    </div>
                <div className="dropdown">
     <span className="icon">
         <p className="SignedAs"><FontAwesomeIcon icon={faUserGraduate}/> {usernameLogged}</p>
     </span>
                    <div className="dropdown-content">
                        <Link to="/Settings">Settings</Link>
                        <p className="SignedAs" >Logout</p>
                    </div>

                </div>
            </nav>

            <Routes>
                        <Route path="/"  element = {Role ==="Candidate"? <ProductShowcase/>: (Role==="QA"|| Role ==="Admin" )? <Products  Role={Role}/>: <Purchases Role={Role} /> }/>
                {(Role==="Admin"|| Role==="QA") && <>
                <Route path="/Candidates"  element={<CandidatesCRUD Role={Role}/>} />
                <Route path="/Users" element={<UsersCRUD Role={Role}/>} />
                <Route path="/Certificates" element={<CertificateCRUD Role={Role}/>} /> </>}
                        <Route path="/Purchases"  element={<Purchases Role={Role} />}  />
                        <Route path="/CertificatesShowcase"  element={<CertificatesShowcase/>} />
                        <Route path="/MarkExams"  element={<MarkExams Role={Role} />} />





                        <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    </div>);
}