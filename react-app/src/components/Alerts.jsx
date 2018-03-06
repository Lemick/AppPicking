import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Alerts extends React.Component {

    constructor(props) {
        super(props);
        let match = props.match;
        this.state = {
            alerts: [],
            alertsFiltered: []
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        fetch('/alert/')
            .then(res => res.json())
            .then((alerts) => this.setState({
                 alerts : alerts, 
                 alertsFiltered : alerts
             }));
    }

    handleSearchChange(e) {
        var query = e.target.value;
        var filtered = this.state.alerts.filter(function(item){
            return (
                item.id.toString().toLowerCase().search(query.toLowerCase()) > -1   ||
                item['product'].name.toLowerCase().search(query.toLowerCase()) > -1 ||
                item.creationTime.toLowerCase().search(query.toLowerCase()) > -1
            )
        });
        this.setState({alertsFiltered : filtered});
    }

    render() {
        return (
            <div>
                <div className="my-3">
                    <span className="text-center">
                        <h3 className="text-center">Liste des alertes (todo add les X derniéres)</h3>
                    </span>
                    <input type="text" name="name" onChange={this.handleSearchChange}/>
                </div>

                <div className="list-group">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Référence</th>
                                <th scope="col">Date de création</th>
                                <th scope="col">Date dernière de modification</th>
                                <th scope="col">Produit</th>
                                <th scope="col">Stock enregistré</th>
                                <th scope="col">Poids</th>
                                <th scope="col">Origine de l'alerte</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.alertsFiltered.map(alertElem =>
                                    <tr key={alertElem.id} className="table-success cell-marked" >
                                        <td>{alertElem.id}</td>
                                        <td>{alertElem.creationTime}</td>
                                        <td>{alertElem.modificationTime}</td>
                                        <td>#{alertElem['product'].id} ({alertElem['product'].name})</td>
                                        <td>{alertElem['product'].stock}</td>
                                        <td>{alertElem['product'].weigth}kg</td>
                                        <td>#{alertElem.userPicker.id} ({alertElem.userPicker.name} {alertElem.userPicker.surname})</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}
export default Alerts;   
