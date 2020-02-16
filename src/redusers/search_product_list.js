const searchList = (state = [], action)  => {
  switch (action.type) {
    case 'SET_LIST_CITIES_OF_SERVER': {
      return {
        ...state,
        listCities: action.listCities,
      };
    }

    default:
      return state;
  }
};

export default searchList;