import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Example = () => {
    const [columns, setColumns] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        axios.get('/api/column').then(response => {
            setColumns(response.data)
        }).catch(errors => {
            console.log(errors);
        })
        axios.get('/api/data').then(response => {
            setData(response.data)
        }).catch(errors => {
            console.log(errors);
        })
    }, [])

    console.log(data);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">
                            I'm an example component! Fe
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Example;

if (document.getElementById("root")) {
    ReactDOM.render(<Example />, document.getElementById("root"));
}
