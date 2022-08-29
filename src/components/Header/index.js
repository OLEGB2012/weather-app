import React from "react";
import "./index.css";
import Logo from "../../assets/AppIogo.png";
import SearchIcon from "../../assets/search_icon.png";

const Header = (props) => {
  return (
    <div className="headNavbar">
      <div className="logo_container">
        {/*div Consists logo of App*/}
        <img className="logo" src={Logo} alt="logo" />
        <h2 className="logo_name">Weather</h2>
      </div>
      <div className="searchBar">
        <div className="search-container">
          <img className="search_icon" src={SearchIcon} alt="SearchIcon" />
          <input
            list="browsers"
            name="browser"
            className="search_field"
            onChange={props.handleChange}
          />
          <datalist id="browsers">
            <option value="Current location" />
            <option value="Minsk" />
            <option value="Brest" />
            <option value="Hrodna" />
            <option value="Gomel" />
            <option value="Mogilev" />
            <option value="Vitebsk" />
          </datalist>
        </div>
        <button
          className="search_button"
          type="submit"
          onClick={props.handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default Header;
