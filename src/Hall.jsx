import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap'
import { EditIcon, DeleteIcon } from './icons'

function Hall() {
    const [halls, setHalls] = useState([]);
    const [modalClient, setModalClient] = useState(false);

    const [name, setName] = useState('');
    const [editingID, setEditingID] = useState(0);

    const [modalFlag, setModalFlag] = useState(false);

    function AddHall() {
		console.log(name);

        if (name.length === 0) return;

        axios.post('/api/Hall',{
            Name: name
        })
			.then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));
    
        RefreshList();
		setModalClient(false);
	}

    function RefreshList() {
        setName('');
        setEditingID(0);

        axios.get('/api/Hall')
            .then(res => {
                alert("Действие успешно выполнено!"); 
                setHalls(res.data)})
            .catch(err => console.log(err));
    }
    
    function PrepareEdit(hall) {
        console.log(hall);

		setModalFlag(false);

		setName(hall.Name);
		setEditingID(hall.ID_Hall);

		setModalClient(true);
	}

    function EditHall() {
        console.log(editingID, name);

		axios.put('api/Hall', {
            ID_Hall: editingID,
			Name: name
		})
            .then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));

        RefreshList();
        setModalClient(false);
	}
	
	function DeleteHall(hall) {
		console.log(hall);
		axios.delete(`/api/Hall/${hall.ID_Hall}`)
            .then(res => {console.log(res); console.log(res.data);})
            .catch(err => console.log(err));
        
        RefreshList();
	}
	

    useEffect(() =>{
        axios.get('/api/Hall')
            .then(res => setHalls(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="m-2">
                <div className="row pl-5 pr-5 pt-4">
                    <h3>База данных залов</h3>
                    <button type="button" className="btn btn-outline-success m-1"
                    data-bs-toggle="modal" data-bs-target="exampleModal"
                    onClick={_ =>{setModalClient(true); setModalFlag(true)}}>Добавить зал</button>
                </div>
            </div>
            <div>
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>
                                №
                            </th>
                            <th>
                                Название
                            </th>
                            <th>
                                Опции
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {halls.map(hall =>
                            <tr key={hall.ID_Hall}>
                                <td>{hall.ID_Hall}</td>
                                <td>{hall.Name}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-info mr-1" onClick = {() => PrepareEdit(hall)}>
                                        <EditIcon />
                                    </button>
                                    <button type="button"
                                    className="btn btn-outline-danger mr-1" onClick = {() => DeleteHall(hall)}>
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>

                <Modal isOpen = {modalClient} toggle = {_ => setModalClient(!modalClient)}>
				    <ModalHeader>{modalFlag ? "Добавление зала" : "Изменение зала"}</ModalHeader>
                    <ModalBody className="d-flex flex-column">
                        Название
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" invalid={(name.length === 0).toString()}></input>
                        {name.length === 0 && <FormFeedback style={{display: "block"}}>
                            Поле не может быть пустым!
                        </FormFeedback>}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-outline-danger mr-1" onClick = {_ => setModalClient(!modalClient)}>Закрыть</button>
                        <button className="btn btn-outline-success m-1 float-end" onClick = {_ => {modalFlag ? AddHall() : EditHall()}}>{modalFlag ? "Добавить зал" : "Изменить зал"}</button>
                    </ModalFooter>
			    </Modal>
            </div>
        </div>
    );
}

export default Hall;