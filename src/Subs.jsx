import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap'
import { EditIcon } from './icons'

function Subs() {
    const [subs, setSubs] = useState([]);
    const [halls, setHalls] = useState([]);
    const [clients, setClients] = useState([]);

    const [modalClient, setModalClient] = useState(false);

    const [desc, setDesc] = useState('');
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [hall, setHall] = useState(0);
    const [client, setClient] = useState(0);
    const [frozen, setFrozen] = useState(true);
    const [editingID, setEditingID] = useState(0);

    const [modalFlag, setModalFlag] = useState(false);

    function AddSubs() {
        setEndDate(end_date.setDate(end_date.getDate() + 30));
        console.log(editingID, desc, start_date, end_date, price, hall, client, frozen);

        if (desc.length === 0) return;

        axios.post('/api/Subscription',{
            Description: desc,
            StartDate: start_date,
            EndDate: end_date,
            Price: price,
            ID_Hall: hall,
            ID_Client: client,
            Frozen: frozen
        })
			.then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));
    
        RefreshList();
		setModalClient(false);
	}

    function RefreshList() {
        setDesc('');
        setStartDate(new Date());
        setEndDate(new Date());
        setPrice('');
        setHall(0);
        setClient(0);
        setFrozen(true);
        setEditingID(0);

        axios.get('/api/Subscription')
            .then(res => {
                alert("Действие успешно выполнено!"); 
                setSubs(res.data)})
            .catch(err => console.log(err));
    }
    
    function PrepareEdit(sub) {
        console.log(sub);

		setModalFlag(false);

		setDesc(sub.Description);
        setStartDate(sub.StartDate);
        setEndDate(sub.EndDate);
        setPrice(sub.Price);
        setHall(sub.ID_Hall);
        setClient(sub.ID_Client);
        setFrozen(sub.Frozen);
		setEditingID(sub.ID_Subscription);

		setModalClient(true);
	}

    function EditSubs() {
        console.log(editingID, desc, start_date, end_date, price, hall, client, frozen);

		axios.put('api/Subscription', {
            ID_Subscription: editingID,
			Description: desc,
            StartDate: start_date,
            EndDate: end_date,
            Price: price,
            ID_Hall: hall,
            ID_Client: client,
            Frozen: frozen
		})
            .then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));

        RefreshList();
        setModalClient(false);
	}

    useEffect(() =>{
        axios.get('/api/Subscription')
            .then(res => setSubs(res.data))
            .catch(err => console.log(err));
        axios.get('/api/Hall')
            .then(res => setHalls(res.data))
            .catch(err => console.log(err));
        axios.get('/api/Client')
            .then(res => setClients(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="m-2">
                <div className="row pl-5 pr-5 pt-4">
                    <h3>Абонементы</h3>
                    <button type="button" className="btn btn-outline-success m-1"
                    data-bs-toggle="modal" data-bs-target="exampleModal"
                    onClick={_ =>{setModalClient(true); setModalFlag(true)}}>Добавить абонемент</button>
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
                                Описание
                            </th>
                            <th>
                                Начало
                            </th>
                            <th>
                                Конец
                            </th>
                            <th>
                                Цена
                            </th>
                            <th>
                                Номер зала
                            </th>
                            <th>
                                Клиент
                            </th>
                            <th>
                                Статус
                            </th>
                            <th>
                                Опции
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subs.map(sub =>
                            <tr key={sub.ID_Subscription}>
                                <td>{sub.ID_Subscription}</td>
                                <td>{sub.Description}</td>
                                <td>{sub.StartDate}</td>
                                <td>{sub.EndDate}</td>
                                <td>{sub.Price}</td>
                                <td>{sub.ID_Hall}</td>
                                <td>{sub.ID_Client}</td>
                                <td>{sub.Frozen ? "Действителен" : "Заморожен"}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-info mr-1" onClick = {() => PrepareEdit(sub)}>
                                        <EditIcon />
                                    </button>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>

                <Modal isOpen = {modalClient} toggle = {_ => setModalClient(!modalClient)}>
				    <ModalHeader>{modalFlag ? "Добавление абонемента" : "Изменение абонемента"}</ModalHeader>
                    <ModalBody className="d-flex flex-column">
                        Описание
                        <input value={desc} onChange={e => setDesc(e.target.value)} type="text" className="form-control" invalid={(desc.length === 0).toString()}></input>
                        {desc.length === 0 && <FormFeedback style={{display: "block"}}>
                            Поле не может быть пустым!
                        </FormFeedback>}
                        Дата начала
                        <input value={start_date} onChange={e => setStartDate(e.target.value)} type="date" className="form-control" invalid={(start_date.length === 0).toString()}></input>
                        {start_date.length === 0 && <FormFeedback style={{display: "block"}}>
                            Поле не может быть пустым!
                        </FormFeedback>}
                        Цена
                        <input value={price} onChange={e => setPrice(e.target.value)} type="text" className="form-control" invalid={(price.length === 0).toString()}></input>
                        {price.length === 0 && <FormFeedback style={{display: "block"}}>
                            Поле не может быть пустым!
                        </FormFeedback>}
                        Номер зала
                        <select defaultValue={hall || ""} onChange={e => setHall(e.target.value)} className="form-control">
                            <option value="">Отсутствует</option>
                            {
                            halls.map(e => <option key = {e.ID_Hall} value = {e.ID_Hall}>{e.Name}</option>)
                            }
                        </select>
                        Клиент
                        <select defaultValue={client || ""} onChange={e => setClient(e.target.value)} className="form-control">
                            <option value="">Отсутствует</option>
                            {
                            clients.map(e => <option key = {e.ID_Client} value = {e.ID_Client}>{e.FIO}</option>)
                            }
                        </select>
                        Статус
                        <input value={frozen} onChange={e => setFrozen(e.target.value)} type="checkbox" className="form-control"></input>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-outline-danger mr-1" onClick = {_ => setModalClient(!modalClient)}>Закрыть</button>
                        <button className="btn btn-outline-success m-1 float-end" onClick = {_ => {modalFlag ? AddSubs() : EditSubs()}}>{modalFlag ? "Добавить абонемент" : "Изменить абонемент"}</button>
                    </ModalFooter>
			    </Modal>
            </div>
        </div>
    );
}

export default Subs;