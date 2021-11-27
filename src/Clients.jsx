import axios from 'axios';
import React, { useState, useEffect } from "react";

function Clients() {
    const [clients, setClients] = useState([]);

    useEffect(() =>{
        axios.get('/api/Clients')
            .then(res => setClients(res.data))
            .catch(err => console.log(err));
    })

    return (
        <div>
            <h3>База данных клиентов</h3>
            <div>
                <table className="table table-striped>">
                    <thead>
                        <tr>
                            <th>
                                ФИО
                            </th>
                            <th>
                                Номер телефона
                            </th>
                            <th>
                                Тренер
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Clients;