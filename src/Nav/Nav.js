import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import UsersCRUD from "../Admin/UsersCRUD";
import CandidatesCRUD from "../Admin/CandidatesCRUD";
import ProductShowcase from "../Products/ProductShowcase"
import CertificateCRUD  from "../Admin/CertificateCRUD";
import Tester from "../Admin/Tester";
export default function Nav() {

    return (<div className="Application">
        <BrowserRouter>
            <nav>
                        <Link to="/">ProductShowcase</Link>
                        <Link to="/CandidatesCRUD">My CandidatesCRUD</Link>
                        <Link to="/UsersCRUD">UsersCRUD</Link>
                        <Link to="/CertificateCRUD">CertificateCRUD</Link>
                        <Link to="/Tester">Tester</Link>
            </nav>

            <Routes>
                        <Route path="/" element={<ProductShowcase/>}/>
                        <Route path="/CandidatesCRUD" element={<CandidatesCRUD/>}/>
                        <Route path="/UsersCRUD" element={<UsersCRUD/>}/>
                        <Route path="/CertificateCRUD" element={<CertificateCRUD/>}/>
                        <Route path="/Tester" element={<Tester/>}/>
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    </div>);
}