
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import axios from "axios";

export default function UsersDemo() {
    let emptyUser = {
        ID: null,
        UserName: '',
        PassWord: '',
        Role_ID: 4,
    };

    const [Users, setUsers] = useState([]);
    const [UserDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [User, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const url = 'https://api.mocki.io/v2/1e376031/AdminCRUDUsers';
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(url);
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching User data:', error);
            }
        };

        fetchUserData();
    }, []);


    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };


    const saveUser = () => {
        setSubmitted(true);

        if (User.UserName.trim()) {
            let _Users = [...Users];
            let _User = { ...User };

            if (User.ID) {
                const index = findIndexById(User.ID);

                _Users[index] = _User;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            } else {
                // axios.post(url, _User) and do stuff
                _Users.push(_User);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }

            setUsers(_Users);
            setUserDialog(false);
            setUser(emptyUser);
        }
    };

    const editUser = (User) => {
        setUser({ ...User });
        setUserDialog(true);
    };

    const confirmDeleteUser = (User) => {
        setUser(User);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        let _Users = Users.filter((val) => val.id !== User.id);

        setUsers(_Users);
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < Users.length; i++) {
            if (Users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };



    const exportCSV = () => {
        dt.current.exportCSV();
    };




    const onCategoryChange = (e) => {
        let _User = { ...User };

        _User["Role_ID"] = e.value;
        setUser(_User);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _User = { ...User };

        _User[`${name}`] = val;

        setUser(_User);
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





    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    };


    const UserDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser} />
        </React.Fragment>
    );
    const deleteUserDialogFooter = (
        <React.Fragment >
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteUser} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={Users} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                           dataKey="ID"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
                           loading={loading}>
                    <Column  field="ID" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column  field="UserName" header="UserName" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column  field="PassWord" header="PassWord" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column  field="Role_ID" header="Role_ID" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column  body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={UserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="User Details" modal className="p-fluid" footer={UserDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="UserName" className="font-bold">
                        UserName
                    </label>
                    <InputText id="UserName"  value={User.UserName} onChange={(e) => onInputChange(e, 'UserName')} required autoFocus className={classNames({ 'p-invalid': submitted && !User.UserName })} />
                    {submitted && !User.UserName && <small className="p-error">UserName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="PassWord" className="font-bold">
                        PassWord
                    </label>
                    <Password  toggleMask id="PassWord" value={User.PassWord} onChange={(e) => onInputChange(e, 'PassWord')} required  className={classNames({ 'p-invalid': submitted && !User.PassWord })} />
                    {submitted && !User.PassWord && <small className="p-error">PassWord is required.</small>}
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="role1" name="Role_ID" value={1} onChange={onCategoryChange} checked={User.Role_ID === 1} />
                            <label htmlFor="role1">QualityControl</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="role2" name="Role_ID" value={2} onChange={onCategoryChange} checked={User.Role_ID === 2} />
                            <label htmlFor="role2">Marker</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="role3" name="Role_ID" value={3} onChange={onCategoryChange} checked={User.Role_ID === 3} />
                            <label htmlFor="role3">Admin</label>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {User && (
                        <span>
                            Are you sure you want to delete <b>{User.UserName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>


        </div>
    );
}
