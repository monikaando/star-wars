import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const { id } = useParams();
  // add state
  // make the fetch
  return (
    <div>
      <h1>Profile: {id}</h1>
      <Link data-cy="link-home" to="/">
        Home
      </Link>
    </div>
  );
}
