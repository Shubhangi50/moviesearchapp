import { NavLink, useParams } from "react-router-dom";


const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);

  
  return (
    <div>Single page{id}</div>
  );
};

export default SingleMovie;