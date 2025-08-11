import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => (
  <div className="border p-4 rounded shadow">
    <h2 className="text-xl font-semibold">{property.title}</h2>
    <p>{property.location}</p>
    <p>₹ {property.price}</p>
    <Link to={`/property/${property._id}`} className="text-blue-600">View Details</Link>
  </div>
);

export default PropertyCard;
