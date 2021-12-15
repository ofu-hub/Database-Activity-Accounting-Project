import axios from 'axios';
import React, { useState, useEffect } from "react";

function Visits() {
    const [visits, setVisits] = useState([]);
    const [subs, setSubs] = useState([]);

    useEffect(() =>{
        axios.get('/api/Visit')
            .then(res => setVisits(res.data))
            .catch(err => console.log(err));
        axios.get('/api/Subscription')
            .then(res => setSubs(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="m-2">
                <div className="pl-5 pr-5 pt-4">
                    <h3>Посещения</h3>
                </div>
            </div>
            <div>
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>
                                Номер абонемента/Подробнее
                            </th>
                            <th>
                                Дата
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visits.map(v => {
                            let sub = subs.find(e => e.ID_Subscription === v.ID_Subscription) ?? {};
                            return ( 
                                <tr key={v.ID_Subscription}>
                                    <td>№{v.ID_Subscription}
                                    <details>
                                        <div className="col-md-3 text-left">
                                            <tr>Описание:{sub.Description}</tr>
                                            <tr>Дата начала:{sub.EndDate}</tr>
                                            <tr>Дата конца:{sub.StartDate}</tr>
                                            <tr>Зал:{sub.ID_Hall}</tr>
                                            <tr>Клиент:{sub.ID_Client}</tr>
                                            <tr>Статус:{sub.Frozen ? "Действителен" : "Заморожен"}</tr>
                                        </div>
                                    </details>
                                    </td>
                                    <td>{v.DateTime}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Visits;