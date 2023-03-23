import React, { useEffect, useState } from "react";

const App = () => {
  const CAT_ENDPOINT_IMAGE_URL = `https://caas.com/cat/says/${"firstWord"}?size=50&color=red&json=true`;
  const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
  const [fact, setFact] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

        const threeFirstWords = fact.split(" ", 3).join(" ");
        fetch(
          `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
        )
          .then((res) => res.json())
          .then((response) => {
            console.log(threeFirstWords);
            console.log(response);
            const { url } = response;
            setImage(url);
          });
      });
  }, []);
  return (
    <div>
      <h1>Fact App Cat</h1>
      {image && (
        <img
          src={`https://cataas.com/${image}`}
          alt="Image extracted using an API"
        />
      )}
      {fact && <p>{fact}</p>}
    </div>
  );
};

export default App;
