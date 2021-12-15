import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap'
import { EditIcon, DeleteIcon } from './icons'

function Trainers() {
    const [trainers, setTrainers] = useState([]);
	const [modalClient, setModalClient] = useState(false);

    const [name, setName] = useState('');
    const [editingID, setEditingID] = useState(0);

    const [modalFlag, setModalFlag] = useState(false);

    function AddTrainer() {
		console.log(name);

        if (name.length === 0) return;

        axios.post('/api/Trainer',{
            FIO: name
        })
			.then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));
    
        RefreshList();
		setModalClient(false);
	}

    function RefreshList() {
        setName('');
        setEditingID(0);

        axios.get('/api/Trainer')
            .then(res => {
                alert("Действие успешно выполнено!"); 
                setTrainers(res.data)})
            .catch(err => console.log(err));
    }

    function PrepareEdit(trainer) {
        console.log(trainer);

		setModalFlag(false);

		setName(trainer.FIO);;
		setEditingID(trainer.ID_Trainer);

		setModalClient(true);
	}
	
	function EditTrainer() {
        console.log(editingID, name);

		axios.put('api/Trainer', {
            ID_Trainer: editingID,
			FIO: name
		})
            .then(res => {console.log(res); console.log(res.data);})
        	.catch(err => console.log(err));

        RefreshList();
        setModalClient(false);
	}
	
	function DeleteTrainer(trainer) {
		console.log(trainer);
		axios.delete(`/api/Trainer/${trainer.ID_Trainer}`)
            .then(res => {console.log(res); console.log(res.data);})
            .catch(err => console.log(err));
        
        RefreshList();
	}
	

    useEffect(() =>{
        axios.get('/api/Trainer')
            .then(res => setTrainers(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="m-2">
                <div className="row pl-5 pr-5 pt-4">
                    <h3>База данных тренеров</h3>
                    <button type="button" className="btn btn-outline-success m-1"
                    data-bs-toggle="modal" data-bs-target="exampleModal"
                    onClick={_ =>{setModalClient(true); setModalFlag(true)}}>Добавить тренера</button>
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
                                Опции
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map(trainer =>
                            <tr key={trainer.ID_Client}>
                                <td>{trainer.ID_Trainer}</td>
                                <td>{trainer.FIO}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-info mr-1" onClick = {() => PrepareEdit(trainer)}>
                                        <EditIcon />
                                    </button>
                                    <button type="button"
                                    className="btn btn-outline-danger mr-1" onClick = {() => DeleteTrainer(trainer)}>
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>

                <Modal isOpen = {modalClient} toggle = {_ => setModalClient(!modalClient)}>
				    <ModalHeader>{modalFlag ? "Добавление тренера" : "Изменение тренера"}</ModalHeader>
                    <ModalBody className="d-flex flex-column">
                        ФИО
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" invalid={(name.length === 0).toString()}></input>
                        {name.length === 0 && <FormFeedback style={{display: "block"}}>
                            Поле ФИО не может быть пустым!
                        </FormFeedback>}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-outline-danger mr-1" onClick = {_ => setModalClient(!modalClient)}>Закрыть</button>
                        <button className="btn btn-outline-success m-1 float-end" onClick = {_ => {modalFlag ? AddTrainer() : EditTrainer()}}>{modalFlag ? "Добавить тренера" : "Изменить тренера"}</button>
                    </ModalFooter>
			    </Modal>
            </div>
            </div>
        </div>
    );
}

export default Trainers;