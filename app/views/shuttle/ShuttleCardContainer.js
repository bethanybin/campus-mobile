import React from 'react';
import {
	AppState
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import CardComponent from '../card/CardComponent';
import ShuttleCard from './ShuttleCard';

const logger = require('../../util/logger');

class ShuttleCardContainer extends CardComponent {
	componentDidMount() {
		logger.ga('Card Mounted: Shuttle');

		AppState.addEventListener('change', this._handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = (currentAppState) => {
		this.setState({ currentAppState });

		// check TTL and refresh weather data if needed
		if (currentAppState === 'active') {

		}
	}

	render() {
		const { closestStop, stopData, locationPermission } = this.props;

		return (<ShuttleCard
			stopData={stopData}
			permission={locationPermission}
			gotoShuttleStop={this.gotoShuttleStop}
			stopID={closestStop}
		/>);
	}

	gotoShuttleStop = (stopID) => {
		Actions.ShuttleStop({ stopID });
	}
}

function mapStateToProps(state, props) {
	return {
		location: state.location.position,
		locationPermission: state.location.permission,
		closestStop: state.shuttle.closestStop,
		stopData: state.shuttle.stops,
		arrivalData: (state.shuttle.closestStop !== -1) ? (state.shuttle.stops[state.shuttle.closestStop].arrivals) : (null),
	};
}

const mapDispatchToProps = (dispatch) => (
	{

	}
);

const ActualShuttleCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShuttleCardContainer);

export default ActualShuttleCard;