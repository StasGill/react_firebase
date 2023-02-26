import { useNavigate, useParams } from "react-router-dom";
import "./filter.css";

export const Filters = ({ filters, urlParam }) => {
  const { categoryID } = useParams();
  const navigate = useNavigate();

  const checkCategory = (category) => {
    if (category === categoryID) {
      return "active_category";
    } else {
      return "category";
    }
  };

  const changeCategory = (category) => {
    navigate(`../${urlParam}/${category}`, { replace: true });
  };

  return (
    <div className="category_container">
      <span
        className={checkCategory(undefined)}
        onClick={() => changeCategory("")}
      >
        all
      </span>
      {filters.map((item) => (
        <span
          key={item.id}
          className={checkCategory(item.name)}
          onClick={() => changeCategory(item.name)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};
