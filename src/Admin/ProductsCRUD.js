import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axios from "axios";
import { Image } from 'primereact/image';

export default function ProductsCRUD() {
    let emptyProduct = {
        ExamID: null,
        Title: '',
        Image: null,
        Description: '',
        Price: 0
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://api.mocki.io/v2/1e376031/ProductsEshop');
                setProducts(response.data); // Set the fetched product data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        // do some stuff
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };




    const exportCSV = () => {
        dt.current.exportCSV();
    };



    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, Title) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${Title}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, Title) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${Title}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const ImageBodyTemplate = (rowData) => {
        return <Image src={rowData.Image} alt="Image" width="250" preview />;
    };







    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };




    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products}
                           dataKey="ExamID"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" >
                    <Column field="ExamID" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="Title" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="Image" header="Image" preview  body={ImageBodyTemplate}></Column>
                    <Column field="Description" header="Description" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="Price" header="Price $"  sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.Image && <Image src={product.Image} alt="Image" width="250" preview />}
                <div className="field">
                    <label htmlFor="Image" className="font-bold">
                        Image
                    </label>
                    <InputText id="Image" value={product.Image} onChange={(e) => onInputChange(e, 'Image')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.Image })} />
                    {submitted && !product.Image && <small className="p-error">Image is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Title" className="font-bold">
                        Title
                    </label>
                    <InputText id="Title" value={product.Title} onChange={(e) => onInputChange(e, 'Title')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.Title })} />
                    {submitted && !product.Title && <small className="p-error">Title is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="Description" value={product.Description} onChange={(e) => onInputChange(e, 'Description')} required rows={3} cols={20} />
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="Price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="Price" value={product.Price} onValueChange={(e) => onInputNumberChange(e, 'Price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.Title}</b>?
                        </span>
                    )}
                </div>
            </Dialog>


        </div>
    );
}
