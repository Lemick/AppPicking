import React from 'react';
import { Link, Route } from 'react-router-dom';


class PickingGenerator extends React.Component {

    constructor(props) {
        super(props);
        let match = props.match;
        this.state = {
            userSelected: null,
            availableUsers : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
        var value = this.state.availableUsers.filter(function(item) {
            return item.id == e.target.value
          })
        this.setState({ userSelected :  value[0] });
    }

    logout(e) {
        this.setState({ userSelected: null })
    }

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(availableUsers => this.setState({ availableUsers }));  

    }

    render() {
        if (this.state.userSelected == null) {
            return (
                <div className="container body-content">
                    <span className="text-center">
                        <h1>Sélection du profil :</h1>
                    </span>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="form-group">
                                <select className="form-control"  onChange={this.handleChange}>
                                    <option disabled selected="true"> -- Veuillez sélectionner un utilisateur -- </option>
                                    { this.state.availableUsers.map(user => <option key={user.id} value={user.id}>{user.name} {user.surname}</option>) }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="row body-content">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header text-center">
                                <h5>Fiche de génération de picking de {this.state.userSelected.name} {this.state.userSelected.surname}</h5>
                            </div>
                            <div className="card-body">
                                <p>Vous pouvez génerer un nouveau groupement de commandes si vous n'en avez déja pas un d'affecté</p>
                                <div className="row">
                                    <div className="mx-auto">
                                        <button className="mx-2 btn btn-primary">Génerer un picking</button>
                                        <button className="mx-2 btn btn-danger" onClick={this.logout}>Deconnexion du profil</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PickingGenerator;   
