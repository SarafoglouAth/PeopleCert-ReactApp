import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import UsersCRUD from "../Admin/UsersCRUD";
import CandidatesCRUD from "../Admin/CandidatesCRUD";
import ProductShowcase from "../Products/ProductShowcase"
import CertificateCRUD  from "../Admin/CertificateCRUD";
export default function Nav() {

    return (<div className="Application">
        <BrowserRouter>
            <nav>
                        <Link to="/">ProductShowcase</Link>
                        <Link to="/CandidatesCRUD">My CandidatesCRUD</Link>
                        <Link to="/UsersCRUD">UsersCRUD</Link>
                        <Link to="/CertificateCRUD">CertificateCRUD</Link>
            </nav>

            <Routes>
                        <Route path="/" element={<ProductShowcase/>}/>
                        <Route path="/CandidatesCRUD" element={<CandidatesCRUD/>}/>
                        <Route path="/UsersCRUD" element={<UsersCRUD/>}/>
                        <Route path="/CertificateCRUD" element={<CertificateCRUD/>}/>
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    </div>);
}