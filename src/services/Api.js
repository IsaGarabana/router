const callToApi = () => {
	return fetch("https://rickandmortyapi.com/api/character")
		.then((response) => response.json())
		.then((dataFromApi) => {
			const cleanData = dataFromApi.results.map((character) => {
				return {
					id: character.id,
					name: character.name,
					image: character.image,
					status: character.status,
					gender: character.gender,
					species: character.species,
				};
			});
			return cleanData;
		});
};
export default callToApi;
