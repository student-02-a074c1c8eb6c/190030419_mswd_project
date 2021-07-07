import React, {Component} from "react";
import {Card, ListGroup} from "react-bootstrap";
import {connect} from "react-redux";

class WeatherHistoryPanel extends Component {
    state = {
        history: [
            {
                "timestamp": "7/27/2020, 11:10:33 PM",
                "city": "Fort Worth",
                "zipcode": "76108",
                "temperature": 82.13,
                "description": "clear sky"
            },
            {
                "timestamp": "7/27/2020, 11:10:36 PM",
                "city": "Redmond",
                "zipcode": "98052",
                "temperature": 73.67,
                "description": "clear sky"
            }
        ]
    }

    createHistoryList = () => {
        let historyComponents = [];
        let historyList = this.props.history;
        // Listing history of zip code submissions in "most recent" order
        for (let i = historyList.length - 1; i >= 0; i--) {
            let infoCard = this.getInfoListItem(historyList[i]);
            historyComponents.push(infoCard);
        }

        return (
            <Card>
                <ListGroup variant="flush">
                    {historyComponents}
                </ListGroup>
            </Card>
        );
    }

    getInfoListItem = (info) => {
        return (
            <ListGroup.Item key={info.timestamp}><b>{info.timestamp}</b> -
                [{info.city}, {info.zipcode}]:[{info.temperature}, {info.description}]</ListGroup.Item>
        );
    }

    render() {
        return (
            <section className="weather-history-panel">
                {!!this.state.history.length ? this.createHistoryList() : "No History!"}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
};

export default connect(mapStateToProps)(WeatherHistoryPanel);