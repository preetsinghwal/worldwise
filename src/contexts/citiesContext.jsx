import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const data = await fetch(`${BASE_URL}/cities`);
        const formattedData = await data.json();
        setCities(formattedData);
      } catch {
        alert("There is some error to fetch cities data ...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
        setIsLoading(true);
        const data = await fetch(`${BASE_URL}/cities/${id}`);
        const formattedData = await data.json();
        setCurrentCity(formattedData);
      } catch {
        alert("There is some error to fetch cities data ...");
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

export { CitiesProvider, useCities };
