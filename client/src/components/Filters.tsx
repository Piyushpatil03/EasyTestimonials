import { SetStateAction, useState } from "react";
import "./Filters.css";

const Filters = ({ value, setValue }: { value: String; setValue: any }) => {
  return (
    <div className="filters_container">
      <h3 className="h3">Filters</h3>

      <div>
        <input
          className="radio"
          type="radio"
          value="ALL"
          checked={value === "ALL"}
          onChange={(e) => setValue("ALL")}
        />
        <label className="radio_label">All Testimonials</label>
      </div>

      <div>
        <input
          className="radio"
          type="radio"
          value="FAVORITE"
          checked={value === "FAVORITE"}
          onChange={(e) => setValue("FAVORITE")}
        />
        <label className="radio_label">My Favorites</label>
      </div>

      <div>
        <input
          className="radio"
          type="radio"
          value="ORDERASC"
          checked={value === "ORDERASC"}
          onChange={(e) => setValue("ORDERASC")}
        />
        <label className="radio_label">Order by Stars (Asc)</label>
      </div>

      <div>
        <input
          className="radio"
          type="radio"
          value="ORDERDESC"
          checked={value === "ORDERDESC"}
          onChange={(e) => setValue("ORDERDESC")}
        />
        <label className="radio_label">Order by Stars (Desc)</label>
      </div>

      <div>
        <input
          className="radio"
          type="radio"
          value="DATEASC"
          checked={value === "DATEASC"}
          onChange={(e) => setValue("DATEASC")}
        />
        <label className="radio_label">Order by Date (Asc)</label>
      </div>

      <div>
        <input
          className="radio"
          type="radio"
          value="DATEDESC"
          checked={value === "DATEDESC"}
          onChange={(e) => setValue("DATEDESC")}
        />
        <label className="radio_label">Order by Date (Desc)</label>
      </div>
    </div>
  );
};

export default Filters;
