import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, FormFeedback } from 'reactstrap'
import { EditIcon, DeleteIcon } from './icons'

function Clients() {
    const [clients, setClients] = useState([]);
    const [trainers, setTrainers] = useState([]);
	const [modalClient, setModalClient] = useState(false);

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [coachID, setCoachID] = useState(0);
    
    const [modalFlag, setModalFlag] = useState(false);

	function AddClient() {
		console.log(name, phone, coachID);

        if (phone.length === 0) setPhone(null);
        if (coachID === 0) setCoachID(null);

		axios.post('/api/Client',{
            FIO: name,
            Phone: phone,
            ID_Trainer: coachID,
        }).then(res => {console.log(res); console.log(res.data);})
        .catch(err => console.log(err));
		setModalClient(false);

        setName('');
        setPhone('');
        setCoachID(0);
	}
	
	function EditClient(client) {
		console.log(client);
		//axios.patch(...)
	}
	
	function DeleteClient(client) {
		console.log(client);
		//axios.delete(...) 
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
                onClick={_ =>setModalClient(true)}>Добавить клиента</button>
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
                                    <button type="button" className="btn btn-outline-info mr-1" onClick = {() => {setModalFlag(false); EditClient(client)}}>
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
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="form-control"></input>
                    Тренер
                    <Input type = "select" onChange={e => setCoachID(e.target.value)} className="form-control">
                        <option value="" disabled>Отсутствует</option>
                        {
                        trainers.map(e => <option value = {e.ID_Trainer}>{e.FIO}</option>)
                        }
                    </Input>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-outline-danger mr-1" onClick = {_ => setModalClient(!modalClient)}>Закрыть</button>
					<button className="btn btn-outline-success m-1 float-end" onClick = {_ => {modalClient ? AddClient() : EditClient()}}>{modalClient ? "Добавить клиента" : "Изменить клиента"}</button>
				</ModalFooter>
			</Modal>
            </div>
        </div>
    );
}

export default Clients;