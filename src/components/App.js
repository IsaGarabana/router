import "../styles/App.scss";
import { useState, useEffect } from "react";
import callToApi from "../services/Api";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import ls from "../services/localStorage";

function App() {
	const getTitle = (text) => <h1>{text}</h1>;

	const [charactersData, setCharactersData] = useState([]);
	useEffect(() => {
		callToApi().then((characterApiData) => {
			setCharactersData(characterApiData);
		});
	}, []);

	const routeData = useRouteMatch("/character-details/:characterId");
	const characterId = routeData !== null ? routeData.params.characterId : null;
	const characterDetails = charactersData.find((eachCharacter) => {
		return eachCharacter.id === parseInt(characterId);
	});
	console.log(characterDetails);
	const HTMLcharacterDetails = () => {
		return (
			<ul key={characterDetails.id}>
				<li>{characterDetails.name} </li>
				<li>
					<img
						src={characterDetails.image}
						alt={characterDetails.name}
						title={characterDetails.name}
					></img>
				</li>
				<li>{characterDetails.status}</li>
				<li>{characterDetails.gender}</li>
				<li>{characterDetails.species}</li>
			</ul>
		);
	};

	const HTMLCharacterList = charactersData.map((eachCharacter) => {
		return (
			<li key={eachCharacter.id}>
				<Link to={`/character-details/${eachCharacter.id}`}>{eachCharacter.name}</Link>
			</li>
		);
	});
	return (
		<>
			<div className="app">{getTitle("Repaso de Router")}</div>
			<section>
				<Switch>
					<Route exact path="/">
						<ul>{HTMLCharacterList}</ul>
					</Route>
					<Route exact path="/character-details/:characterId">
						{HTMLcharacterDetails}
					</Route>
				</Switch>
			</section>
		</>
	);
}

export default App;
