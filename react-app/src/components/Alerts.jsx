import React from 'react';
import { Link, Route } from 'react-router-dom';

// Date formatting
import Moment from 'moment';

// Boostrap
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Boostrap dynamic table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Alerts extends React.Component {

    constructor(props) {
        super(props);
        let match = props.match;
        Moment.locale('fr');
        this.state = {
            alerts: [],
            alertsFiltered: []
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        fetch('/alert/ishandled')
            .then(res => res.json())
            .then((alerts) => this.setState({
                alerts: alerts,
                alertsFiltered: alerts
            }));
    }

    handleSearchChange(e) {
        var query = e.target.value;
        var filtered = this.state.alerts.filter(function (item) {
            return (
                item.id.toString().toLowerCase().search(query.toLowerCase()) > -1 ||
                item['product'].name.toLowerCase().search(query.toLowerCase()) > -1 ||
                item.creationTime.toLowerCase().search(query.toLowerCase()) > -1
            )
        });
        this.setState({ alertsFiltered: filtered });
    }

    showId(cell, row) {
        return cell.id;
    }

    showProductDescription(cell, row) {
        return cell.id + ' (' + cell.name + ')';
    }

    showWeight(cell, row) {
        return cell.weight + 'kg';
    }

    showStock(cell, row) {
        return cell.stock;
    }

    showOriginUser(cell, row) {
        return cell.id + ' (' + cell.name + ' ' + cell.surname + ')';
    }

    dateFormat(cell, row) {
        if (!cell)
            return '';
        return Moment(cell).format('DD/MM/YYYY hh:mm:ss');
    }

    sortFunc(a, b, order) {
        if (order === 'desc') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    }

    buttonFormatted(cell, row) {
        return (
            <a className="btn btn-primary" href="#" onClick={this.removealert(cell)}>
                <i className="fa fa-remove" aria-hidden="true"></i>
            </a>);
    }

    removealert(id) {
        console.log('clicked');
        fetch('/alert/' + id + '/handled');
    }



    render() {
        return (
            <div>
                <div className="my-3">
                    <span className="text-center">
                        <h3 className="text-center">Liste des alertes</h3>
                    </span>
                    <div className="row justify-content-md-center">
                        <div className="input-group col-sm-12 col-xl-6">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="searchi"><i className="fa fa-search" /></span>
                            </div>
                            <input type="text" name="name" placeholder="Filtrer les alertes" className="form-control" aria-describedby="searchi" onChange={this.handleSearchChange} />
                        </div>
                    </div>

                </div>

                <div className="list-group">
                    <BootstrapTable data={this.state.alertsFiltered} version='4'>
                        <TableHeaderColumn width='6%' isKey dataField='id' dataSort>Référence</TableHeaderColumn>
                        <TableHeaderColumn dataField='creationTime' dataFormat={this.dateFormat} dataSort>Date de création</TableHeaderColumn>
                        <TableHeaderColumn dataField='modificationTime' dataFormat={this.dateFormat}>Date de derniére modification</TableHeaderColumn>
                        <TableHeaderColumn dataField='product' dataFormat={this.showProductDescription}>Produit</TableHeaderColumn>
                        <TableHeaderColumn width='6%' dataField='product' dataFormat={this.showStock}>Stock</TableHeaderColumn>
                        <TableHeaderColumn width='6%' dataField='product' dataFormat={this.showWeight}>Poids</TableHeaderColumn>
                        <TableHeaderColumn dataField='userPicker' dataFormat={this.showOriginUser} dataSort sortFunc={this.sortFunc}>Origine de l'alerte</TableHeaderColumn>
                        <TableHeaderColumn width='5%' dataField='edit' dataFormat={this.buttonFormatted.bind(this)} >Action</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div >
        )
    }
}
export default Alerts;   
