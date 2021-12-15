import React from "react";

function Home() {
    return (
        <div>
            <div className="m-2">
                <div className="pl-5 pr-5 pt-4">
                    <h3>Главная страница</h3>
                </div>
            </div>
            <div className="d-flex justify-content-between m-2 p-3">
                <div className="d-flex align-items-center">
                    <h5>Таблица посещений на сегодня</h5>
                </div>
                <div className="d-flex align-items-center">
                    <h5>Немного об учете</h5>
                </div>
                <div className="d-flex align-items-center">
                    <h5>О программе</h5>
                </div>
            </div>
        </div>
    );
}

export default Home;