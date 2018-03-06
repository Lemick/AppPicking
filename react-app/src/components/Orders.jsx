import React from 'react';
import { Link, Route } from 'react-router-dom';


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

    getTotalWeight(order) {   
        var weigth = 0;
        var orderItem;
        for(orderItem in order['orderItem']) {
            weigth += orderItem['weigth']; 
        }
        return weigth;
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order =>
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id={'heading' + order.id}>
                                    <button className="btn btn-link" data-toggle="collapse" data-target={'#c' + order.id} aria-expanded="false" aria-controls={'c' + order.id}>
                                        <h5 className="mb-0">
                                            Commande #{order.id}
                                        </h5>
                                    </button>
                                    <span className="mb-0 float-right">
                                        Poids total : {this.getTotalWeight(order)}kg
                                    </span>
                                </div>

                                <div id={'c' + order.id} className="collapse" aria-labelledby={'heading' + order.id} data-parent="#accordion">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID Sous-Commande</th>
                                                <th scope="col">Produit</th>
                                                <th scope="col">Quantité</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order['orderItem'].map(orderItem =>
                                                    <tr>
                                                        <th scope="row">{orderItem.id}</th>
                                                        <td>{orderItem['product'].name}</td>
                                                        <td>x{orderItem.quantity}</td>
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
