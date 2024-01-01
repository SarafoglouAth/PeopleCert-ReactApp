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
export default function Nav() {
    const [Role, setRole] = useState("Admin");
    const [usernameLogged, setUsernameLogged] = useState("Admin");

    return (<div className="Application">
        <BrowserRouter>
            <nav >
                        <Link  to="/">ProductShowcase    </Link>
                        <Link  to="/CandidatesCRUD" >My CandidatesCRUD   </Link>
                        <Link  to="/UsersCRUD">UsersCRUD     </Link>
                        <Link  to="/CertificateCRUD" >CertificateCRUD    </Link>
                        <Link  to="/CertificatesShowcase">CertificatesShowcase   </Link>
                        <Link  to="/Purchases">Purchases   </Link>
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
                        <Route path="/" element={<ProductShowcase/>}/>
                        <Route path="/CandidatesCRUD"  element={<CandidatesCRUD Role={Role}/>}/>
                        <Route path="/UsersCRUD" element={<UsersCRUD/>}/>
                        <Route path="/CertificateCRUD"   element={<CertificateCRUD Role={Role}/>}/>
                        <Route path="/Purchases"  element={<Purchases/>}/>
                        <Route path="/CertificatesShowcase"  element={<CertificatesShowcase/>}/>
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    </div>);
}