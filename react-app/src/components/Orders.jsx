import React from 'react';
import { Link, Route } from 'react-router-dom';

// Date formatting
import Moment from 'moment';

class Orders extends React.Component {

    constructor(props) {
        super(props);
        let match = props.match;
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        fetch('/order/')
            .then(res => res.json())
            .then(orders => this.setState({ orders }));
    }

    getOrderWeight(order) {
        var weight = 0;
        var orderItem;

        order['orderItem'].forEach(function (orderItem) {
            weight += orderItem['product']['weight'];
        });
        return weight.toFixed(2);
    }

    dateFormat(date) {
        if (!date)
            return '';
        return Moment(date).format('DD/MM/YYYY hh:mm:ss');
    }

    getAssignationHTML(order) {
        if (order.isProcessed == 1) {
            return (
                <span><i className="fa fa-circle" style={{ color: 'green' }} /> Assigné à Joe Todo </span>
            );
        } else {
            return (
                <span><i className="fa fa-circle" style={{ color: 'red' }} /> Non assigné </span>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="my-3">
                    <span className="text-center">
                        <h3 className="text-center">Liste des commandes</h3>
                    </span>
                </div>
                {
                    this.state.orders.map(order =>
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id={'heading' + order.id}>
                                    <button className="btn btn-link orderLeftBtn" data-toggle="collapse" data-target={'#c' + order.id} aria-expanded="false" aria-controls={'c' + order.id}>
                                        <h5 className="mb-0">
                                            Commande #{order.id} 
                                        </h5>
                                        <span><i>{this.dateFormat(order.date)}</i></span>
                                    </button>
                                    <span className="orderState">
                                        {this.getAssignationHTML(order)}
                                    </span>
                                    <span className="mb-0 float-right">
                                        Poids total : {this.getOrderWeight(order)}kg
                                    </span>
                                </div>

                                <div id={'c' + order.id} className="collapse" aria-labelledby={'heading' + order.id} data-parent="#accordion">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID sous-commande</th>
                                                <th scope="col">Produit</th>
                                                <th scope="col">Quantité</th>
                                                <th scope="col">Poids sous-commande</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order['orderItem'].map(orderItem =>
                                                    <tr>
                                                        <td>{orderItem.id}</td>
                                                        <td>{orderItem['product'].name}</td>
                                                        <td>x{orderItem.quantity}</td>
                                                        <td>{orderItem['product'].weight * orderItem.quantity}kg</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}
export default Orders;   
