import React, {useEffect, useState} from "react";
import axios from "axios";
import SearchForm from './Components/SearchForm';
import GifList from "./Components/GifList";

function App() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("candy");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=V3ell0N4nqlJKGm7wTkJirmHA8C1Y4Ua&limit=24&rating=g`)
    .then(response =>  {
    // handle success
    if (activeFetch) {
      setGifs(response.data.data);
      setLoading(false);
    }
    })
    .catch(error => {
    // handle error
    console.log("error fetching and parsing dattta", error);
  })
    // fetch("https://api.giphy.com/v1/gifs/search?q=&api_key=V3ell0N4nqlJKGm7wTkJirmHA8C1Y4Ua&limit=24&rating=g")
    //   .then(response => response.json())
    //   .then(responseData => setGifs(responseData.data))
    //   .catch(error => console.log("error fetching and parsing dattta", error));
  }, [query]);

  const handleQueryChange = searchText => {
    setQuery(searchText);
  }

  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm changeQuery={handleQueryChange} />
        </div>
      </div>
      <div className="main-content">
          {
            (loading) ? <p>Loading...</p> : <GifList data={gifs} />
          }
      </div>
    </div>
  );
}

export default App;
