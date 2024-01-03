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
import ProductsCRUD from "../Admin/ProductsCRUD";
import AdminHome from "../Admin/AdminHome";
import ExamQuestions from "../Questions/ExamQuestions";
export default function Nav() {
    const [Role, setRole] = useState("Candidate");
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
                        <Link  to="/">ProductShowcase    </Link>
                        <Link  to="/CandidatesCRUD" >My CandidatesCRUD   </Link>
                        <Link  to="/UsersCRUD">UsersCRUD     </Link>
                        <Link  to="/ProductsCRUD">ProductsCRUD     </Link>
                        <Link  to="/CertificateCRUD" >CertificateCRUD    </Link>
                        <Link  to="/CertificatesShowcase">CertificatesShowcase   </Link>
                        <Link  to="/Purchases">{Role==="Candidate"?  "Purchases": "Marking"}   </Link>
                        <Link  to="/MarkExams">Exam Delegation   </Link>
                        <Link  to="/AdminHome">Admin Home   </Link>
                        <Link  to="/ExamQuestions">Exam Questions   </Link>

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
                        <Route path="/" element={<ProductShowcase Role={Role}/>}/>
                        <Route path="/CandidatesCRUD"  element={<CandidatesCRUD Role={Role}/>}/>
                        <Route path="/UsersCRUD" element={<UsersCRUD/>}/>
                        <Route path="/CertificateCRUD"   element={<CertificateCRUD Role={Role}/>}/>
                        <Route path="/Purchases"  element={<Purchases Role={Role} />}  />
                        <Route path="/CertificatesShowcase"  element={<CertificatesShowcase/>}/>
                        <Route path="/MarkExams"  element={<MarkExams/>}/>
                        <Route path="/ProductsCRUD"  element={<ProductsCRUD/>}/>
                        <Route path="/AdminHome"  element={<AdminHome/>}/>
                        <Route path="/ExamQuestions"  element={<ExamQuestions Role={Role}/>}/>

                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    </div>);
}