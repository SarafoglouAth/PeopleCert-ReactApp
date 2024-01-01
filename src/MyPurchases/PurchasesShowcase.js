import React, {useEffect, useRef, useState} from "react";
import MyPurchases from "./MyPurchases";
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from "axios";
import { Toast } from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import Exam from "./Tests/Exam";
const PurchasesShowcaseS = ({setTargetedExam}) => {
    let today= new Date();
     let emptyProduct = {
        ID: null,
        Title: "",
        ExamDate: today,
        };



    const toast = useRef(null); // Reference for toast messages
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
    const [showDatePickerDialog, SetShowDatePickerDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://api.mocki.io/v2/1e376031/Purchases");
                setProducts(response.data);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);
    const HandleTakeTest =  (id) => {
        setTargetedExam(id);
    };


    function LockSheduleDate() {

        console.log("Date logged for "+selectedProduct.Title+" with id "+ selectedProduct.ID +" is " + selectedProduct.ExamDate.toLocaleDateString() + " send it to back end and fetch again");
        setSubmitted(false);
        setSelectedProduct(emptyProduct);
        SetShowDatePickerDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Test Date : '+selectedProduct.ExamDate.toLocaleDateString()+ ' locked ', life: 3000 });
    }


    const ScheduleTest = (productID,productTitle,testDate) => {
        testDate ? testDate = new Date(testDate) : testDate = today;
        SetShowDatePickerDialog(true);
        setSelectedProduct({ ID: productID,Title:productTitle,ExamDate:testDate });
    };
    const HideDatePickerDialog = () => {
        SetShowDatePickerDialog(false);
        setSelectedProduct(emptyProduct);
    };

    const ScheduleTestFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times"severity="danger" outlined onClick={HideDatePickerDialog} />
            <Button label="Submit" icon="pi pi-check"  onClick={LockSheduleDate} />
        </React.Fragment>
    );
    return <>
    <div className="product-showcase">
        <Toast ref={toast}/>
        <h2>My Purchased Products</h2>
        <div className="products">
            {products.map((product) =>
                <div key={product.ID}>
                    <MyPurchases
                        title={product.Title}
                        image={product.image}
                        takeTheTest={() => HandleTakeTest(product.ID)}

                        ExamDate={product.ExamDate}
                        ScheduleTest={() => ScheduleTest(product.ID, product.Title, product.ExamDate)}
                        isTestTaken={product.isTestTaken}

                    />

                </div>)}
            <Dialog visible={showDatePickerDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} footer={ScheduleTestFooter}
                    header="Please select a Date" modal onHide={HideDatePickerDialog}>
                <div className="field">
                    <h4>{selectedProduct.Title}</h4>
                    <label htmlFor="TestDate" className="font-bold">
                        TestDate
                    </label>
                    <Calendar id="TestDate" value={selectedProduct.ExamDate}
                              onChange={(e) => setSelectedProduct({...selectedProduct, ExamDate: e.target.value})}
                              required minDate={today} dateFormat="dd/mm/yy" showIcon readOnlyInput/>
                    {submitted && !selectedProduct.ExamDate &&
                        <small className="p-error">BirthDate is required.</small>}
                </div>
            </Dialog>


        </div>
    </div>
</>;
};

export default PurchasesShowcaseS;
