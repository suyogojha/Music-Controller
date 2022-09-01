import React, {Component} from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {Grid, Button, ButtonGroup, Typography} from '@material-ui/core';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.setState = {
            roomCode : null
        };
    }

    async componentDidMount(){
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                roomCode: data.code
            })
        })
    }

    renderHomePage(){
        return (
            <Grid container spacing={3}>
            <Grid item xs = {12} align="center">
                <Typography variant='h3' compact='h3'>
                    Silent DJ
                </Typography>
            </Grid>
            <Grid item xs = {12} align="center">
                <ButtonGroup disableElevation variant='contained' color='primary'>
                    <Button color="primary" to="/join" component={Link}>Join A Room</Button>
                    <Button color="secondary" to="/create" component={Link}>Create A Room</Button>
                </ButtonGroup>
            </Grid>
            </Grid>
        );
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.renderHomePage()}
                    </Route>
                    <Route path="/join" component={RoomJoinPage}/>
                    <Route path="/create" component={CreateRoomPage}/>
                    <Route path="/room/:roomCode" component={Room}/>
                </Switch>
            </Router>
        );
    }
}