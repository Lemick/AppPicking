import React from 'react';
import { Link, Route } from 'react-router-dom';




class PickingGenerator extends React.Component {

    constructor(props) {
        super(props);
        let match = props.match;
        this.state = { user: null };
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log('Onchange executed : ' + e.target.name + ' ' + e.target.value);
        this.state.user = e.target.value;
    }

    logout(e) {
        this.setState({ user: null })
    }

    render() {
        if (this.state.user == null) {
            return (
                <div className="container body-content">
                    <span className="text-center">
                        <h1>Sélection du profil :</h1>
                    </span>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="form-group">
                                <select className="form-control" onChange={this.handleChange}>
                                    <option disabled defaultValue value> -- Veuillez sélectionner un utilisateur -- </option>
                                    <option value="1">John</option>
                                    <option value="2">Mary</option>
                                    <option value="3">Zoe</option>
                                    <option value="4">Mike</option>
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
                                <h5>Fiche de génération de picking de {this.state.user}</h5>
                            </div>
                            <div className="card-body">
                                <p>Vous pouvez génerer un nouveau groupement si vous n'en avez déja pas un d'affecté</p>
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
