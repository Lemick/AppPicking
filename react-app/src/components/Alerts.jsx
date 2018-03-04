import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Alerts = ({ match }) => {


    return (
        <div>
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-success">Dapibus ac facilisis in</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-info">Cras sit amet nibh libero</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-warning">Porta ac consectetur ac</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-danger">Vestibulum at eros</a>
            </div>
        </div>
    )
}
export default Alerts;   
