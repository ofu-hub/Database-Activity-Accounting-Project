import axios from 'axios';
import React, { useState, useEffect } from "react";

function Payment() {
    const [payments, setPayments] = useState([]);

    useEffect(() =>{
        axios.get('/api/Payment')
            .then(res => setPayments(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="m-2">
                <div className="row pl-5 pr-5 pt-4">
                    <h3>Выписки</h3>
                </div>
            </div>
            <div>
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>
                                Номер абонемента
                            </th>
                            <th>
                                Дата
                            </th>
                            <th>
                                Цена
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(pay =>
                            <tr key={pay.ID_Subscription}>
                                <td>{pay.ID_Subscription}</td>
                                <td>{pay.Date}</td>
                                <td>{pay.Price}</td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Payment;