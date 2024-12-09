import { FaThLarge, FaList } from 'react-icons/fa'; // Import icons for grid and list views

export default function FilterBar() {
  return (
    <div className="filter-bar">
      <span className="filter-results">Showing all 12 results</span>
      <div className="filter-controls">
        <div className="view-buttons">
        <h1>Views:</h1>
          <button className="grid-view">
            <FaThLarge size={14} />
          </button>
          <button className="list-view">
            <FaList size={14} />
          </button>
        </div>
        <select className="sort-dropdown">
          <option value="popularity">Popularity</option>
          <option value="latest">Latest</option>
          <option value="rating">Rating</option>
        </select>
        <button className="filter-button">Filter</button>
      </div>
    </div>
  );
}
