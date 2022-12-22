import React from "react";

export default function Container({ id, text, setContainerData }) {
  // fetch container data from server
  const containerOnClick = (id) => {
    const apiURL = process.env.API_URL || "http://127.0.0.1:8081";

    fetch(`${apiURL}/api/v1/containers/${id}/stats`)
      .then((response) => response.json())
      .then((data) => {
        setContainerData(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button
        onClick={() => containerOnClick(id)}
        className="btn btn-outline btn-accent min-w-full"
      >
        {text}
      </button>
    </>
  );
}
