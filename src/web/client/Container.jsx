import React from "react";

export default function Container({ id, text, setContainerData, intervalRef }) {
  // fetch container data from server
  const containerOnClick = (id) => {
    fetch(`http://localhost:8081/api/v1/containers/${id}/stats`)
      .then((response) => response.json())
      .then((data) => {
        console.log("tick");
        console.log(intervalRef.local);
        setContainerData(data);
      })
      .catch((err) => console.log(err));
  };

  const setContainerInteveral = (id) => {
    clearInterval(intervalRef.local);
    console.log("cleared interval", intervalRef.local);
    containerOnClick(id);
    console.log("new interval", intervalRef.local);
    intervalRef.local = setInterval(() => {
      containerOnClick(id);
    }, 5000);
  };
  return (
    <>
      <button
        onClick={() => setContainerInteveral(id)}
        className="btn btn-outline btn-accent min-w-full"
      >
        {text}
      </button>
    </>
  );
}
