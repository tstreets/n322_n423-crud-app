import React from 'react';

const GlobalContext = React.createContext();

export const GlobalProvider = GlobalContext.Provider;

export default function useGlobalValues() {
	return React.useContext(GlobalContext);
}
