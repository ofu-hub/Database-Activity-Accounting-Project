import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap'
import { EditIcon, DeleteIcon } from './icons'

function Clients() {
    const [clients, setClients] = useState([]);
    const [trainers, setTrainers] = useState([]);
	const [modalClient, setModalClient] = useState(false);

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [coachID, setCoachID] = useState(0);
    const [editingID, setEditingID] = useState(0);
    
    const [modalFlag, setModalFlag] = useState(false);

	function AddClient() {
		console.log(name, phone, coachID);

        if (name.length === 0) return;

        axios.post('/api/Client',{
            FIO: name,
            Phone: phone.length !== 0 ? phone : null,
            ID_Trainer: coachID !== 0 ? coachID : null,
        })
			.then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));
    
        RefreshList();
		setModalClient(false);
	}

    function RefreshList() {
        setName('');
        setPhone('');
        setCoachID(0);
        setEditingID(0);

        axios.get('/api/Client')
            .then(res => {
                alert("Действие успешно выполнено!"); 
                setClients(res.data)})
            .catch(err => console.log(err));
    }

    function PrepareEdit(client) {
        console.log(client);

		setModalFlag(false);

		setName(client.FIO);
		setPhone(client.Phone);
		setCoachID(client.ID_Trainer);
		setEditingID(client.ID_Client);

		setModalClient(true);
	}
	
	function EditClient() {
        console.log(editingID, name, phone, coachID);

		axios.put('api/Client', {
            ID_Client: editingID,
			FIO: name,
            Phone: phone !== 0 ? phone : null,
            ID_Trainer: coachID !== 0 ? coachID : null
		})
            .then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));

        RefreshList();
        setModalClient(false);
	}
	
	function DeleteClient(client) {
		console.log(client);
		axios.delete(`/api/Client/${client.ID_Client}`)
            .then(res => {console.log(res); console.log(res.data);})
            .catch(err => console.log(err));
        
        RefreshList();
	}
	

    useEffect(() =>{
        axios.get('/api/Client')
            .then(res => setClients(res.data))
            .catch(err => console.log(err));
        
        axios.get('/api/Trainer')
            .then(res => setTrainers(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="pl-5 pr-5 pt-4">
            <div className="d-flex align-items-center m-2">
                <h3>База данных клиентов</h3>
                <button type="button" className="btn btn-outline-success m-1"
                data-bs-toggle="modal" data-bs-target="exampleModal"
                onClick={_ =>{setModalClient(true); setModalFlag(true)}}>Добавить клиента</button>
            </div>
            <div>
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>
                                №
                            </th>
                            <th>
                                ФИО
                            </th>
                            <th>
                                Номер телефона
                            </th>
                            <th>
                                Тренер
                            </th>
                            <th>
                                Опции
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client =>
                            <tr key={client.ID_Client}>
                                <td>{client.ID_Client}</td>
                                <td>{client.FIO}</td>
                                <td>{client.Phone ?? "Отсутствует"}</td>
                                <td>{client.ID_Trainer ?? "Отсутствует"}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-info mr-1" onClick = {() => PrepareEdit(client)}>
                                        <EditIcon />
                                    </button>
                                    <button type="button"
                                    className="btn btn-outline-danger mr-1" onClick = {() => DeleteClient(client)}>
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>

                <Modal isOpen = {modalClient} toggle = {_ => setModalClient(!modalClient)}>
				<ModalHeader>{modalFlag ? "Добавление клиента" : "Изменение клиента"}</ModalHeader>
				<ModalBody className="d-flex flex-column">
                    ФИО
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" invalid={(name.length === 0).toString()}></input>
                    {name.length === 0 && <FormFeedback style={{display: "block"}}>
                        Поле ФИО не может быть пустым!
                    </FormFeedback>}
                    Номер телефона
                    <input value={phone || ''} onChange={e => setPhone(e.target.value)} type="text" className="form-control"></input>
                    Тренер
                    <select defaultValue={coachID || ""} onChange={e => setCoachID(e.target.value)} className="form-control">
                        <option value="">Отсутствует</option>
                        {
                        trainers.map(e => <option key = {e.ID_Trainer} value = {e.ID_Trainer}>{e.FIO}</option>)
                        }
                    </select>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-outline-danger mr-1" onClick = {_ => setModalClient(!modalClient)}>Закрыть</button>
					<button className="btn btn-outline-success m-1 float-end" onClick = {_ => {modalFlag ? AddClient() : EditClient()}}>{modalFlag ? "Добавить клиента" : "Изменить клиента"}</button>
				</ModalFooter>
			</Modal>
            </div>
        </div>
    );
}

export default Clients;