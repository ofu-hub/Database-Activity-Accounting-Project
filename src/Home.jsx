import axios from 'axios';
import React, { useState, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';

function Home() {

    const [visits, setVisits] = useState([]);

    const userAttributes = []
    visits.map(visit=>{
        userAttributes.push({
            id: visit.ID_Subscription,
            date: visit.DateTime
        })
    });

    function DatatablePage() {
        const data = {
          columns: [
            {
              label: 'Номер абонемента',
              field: 'id',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Дата',
              field: 'date',
              sort: 'asc',
              width: 270
            }
          ],
          rows: userAttributes
        };

        return (
            <MDBDataTable
              entriesLabel={'Показать записи'}
              infoLabel={["Показано с", "по", "из", "записей"]}
              paginationLabel={['Предыдущая', 'Следующая']}
              searchLabel={'Поиск'}
              noRecordsFoundLabel={'Ничего не найдено'}
              scrollY
              maxHeight="200px"
              striped
              bordered
              small
              data={data}
            />
          );
    }

    useEffect(() =>{
        axios.get('/api/Visit/NowDate')
            .then(res => setVisits(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="m-2">
                <div className="pl-5 pr-5 pt-4">
                    <h3>Главная страница</h3>
                </div>
            </div>
            <div className="d-flex justify-content-sm-between m-2 p-3">
                <div className="flex-row align-items-center">
                    <h5>Таблица посещений на сегодня</h5>
                    {DatatablePage()}
                </div>
                <div className="pl-5 pr-5 flex-row align-items-center">
                    <div>
                    <h5>Немного об учете</h5>
                        <div>
                        <h8 className="center-block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis provident adipisci minus facilis natus molestiae harum commodi, deserunt optio dicta veritatis error vel aliquam dolorem beatae nemo ad perferendis eligendi?
                    Fugit consectetur placeat perspiciatis fuga aliquam sed facilis similique itaque, quia ab asperiores debitis vel harum nostrum eum nihil alias recusandae? Nemo dolore commodi corrupti dolorum cum necessitatibus voluptates enim.
                    Nesciunt in blanditiis repellat praesentium eaque hic tenetur reiciendis nisi facere nostrum possimus sunt, molestias debitis, odio consequatur. Quasi doloremque dicta illo numquam maxime quisquam totam nesciunt obcaecati voluptas quidem.</h8>
                        </div>
                    </div>
                </div>
                <div className="flex-row align-items-center">
                </div>
            </div>
        </div>
    );
}

export default Home;