import React from 'react';
import { Link, Route } from 'react-router-dom';


class Orders extends React.Component {

    constructor(props) {
        super(props);
        let match = props.match;
        this.state = {
            orders: [],
            products: []
        };
    }


    componentDidMount() {
        fetch('/order/')
            .then(res => res.json())
            .then(orders => this.setState({ orders }, () => {
                // Callback
                for (var i = 0; i < this.state.orders.length; i++) {
                    fetch('/order/' + this.state.orders[i].id + '/products')
                        .then(res => res.json())
                        .then(function(products, i) {
                            var ArrProducts = this.state.products;
                            ArrProducts = products;
                            this.setState({ ArrProducts});
                        }.bind(this))
                        
                }
            }));   
    }

    render() {
        return (
            <div> {console.log('products length ' + this.state.products.length)}
                {
                    this.state.orders.map(order =>
                        <div id="accordion">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target={ '#c' + order.id} aria-expanded="true" aria-controls="collapseOne">
                                            Commande #{order.id}
                                        </button>
                                    </h5>
                                </div>

                                <div id={ '#c' + order.id} class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First</th>
                                                <th scope="col">Last</th>
                                                <th scope="col">Handle</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Larry</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                            </tr>
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
