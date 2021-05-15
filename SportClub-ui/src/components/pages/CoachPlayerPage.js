import React, {Component} from "react";
import axios from 'axios';
import CoachPlayerCard from './CoachPlayerCard';
import Footer from "../menu/Footer";


const url = "http://localhost:8080/appUsers";



export default class CoachPlayerPage extends Component{


    constructor(props) {
        super(props);
        this.state = {
            players:[],
            coaches: []
        }
        this.dataChange = this.dataChange.bind(this);

    }


    async componentWillMount() {

        await axios.get(url)
            .then(response => {
                const players = response.data._embedded.appUserList.filter(user => user.appUserRole == "PLAYER");
                const coaches = response.data._embedded.appUserList.filter(user => user.appUserRole == "COACH");
                this.setState({players: players});
                this.setState({coaches: coaches});
            }).catch(error => {
                console.log(error);
            })



    }

    dataChange()
    {
        this.componentWillMount();
    }


    render() {
        return(
            <div>
                <ul>
                    {
                        this.state.players.map((player)=> {return <CoachPlayerCard key={player.id} player={player}  coaches={this.state.coaches} action={this.stateChange} />  })
                    }
                </ul>
                <Footer/>
            </div>

        )

    }

}
