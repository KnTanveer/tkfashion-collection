import { useState } from 'react';
import { ChevronUp, ChevronDown, RotateCcw, Check } from 'lucide-react';
import { SIZES_FILTER_LIST, FABRICS_FILTER_LIST, COLORS_FILTER_LIST } from '../data/products';

export default function SidebarFilter({
  selectedSizes,
  onToggleSize,
  selectedFabrics,
  onToggleFabric,
  selectedColors,
  onToggleColor,
  priceRange,
  onChangePriceRange,
  onClearAllFilters
}) {
  const [sizeOpen, setSizeOpen] = useState(true);
  const [fabricOpen, setFabricOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const hasActiveFilters =
    selectedSizes.length > 0 ||
    selectedFabrics.length > 0 ||
    selectedColors.length > 0 ||
    priceRange < 6000;

  return (
    <aside className="sidebar-filter">
      {hasActiveFilters && (
        <div className="filter-header-actions">
          <span className="active-filters-label">
            Filters ({selectedSizes.length + selectedFabrics.length + selectedColors.length})
          </span>
          <button className="clear-filters-btn" onClick={onClearAllFilters}>
            <RotateCcw size={13} /> Clear all
          </button>
        </div>
      )}

      {/* SIZE FILTER (Exact match to screenshot) */}
      <div className="filter-group">
        <button
          className="filter-group-header"
          onClick={() => setSizeOpen(!sizeOpen)}
          aria-expanded={sizeOpen}
        >
          <span className="filter-title">SIZE</span>
          {sizeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {sizeOpen && (
          <div className="filter-options-list size-options-list">
            {SIZES_FILTER_LIST.map((sizeItem) => {
              const isChecked = selectedSizes.includes(sizeItem.label);
              return (
                <label key={sizeItem.label} className="filter-checkbox-label">
                  <div className="checkbox-custom-wrap">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleSize(sizeItem.label)}
                      className="hidden-checkbox"
                    />
                    <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </span>
                  </div>
                  <span className="filter-name">
                    {sizeItem.label} <span className="filter-count">({sizeItem.count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* FABRIC FILTER */}
      <div className="filter-group">
        <button
          className="filter-group-header"
          onClick={() => setFabricOpen(!fabricOpen)}
          aria-expanded={fabricOpen}
        >
          <span className="filter-title">FABRIC</span>
          {fabricOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {fabricOpen && (
          <div className="filter-options-list">
            {FABRICS_FILTER_LIST.map((fabricItem) => {
              const isChecked = selectedFabrics.includes(fabricItem.label);
              return (
                <label key={fabricItem.label} className="filter-checkbox-label">
                  <div className="checkbox-custom-wrap">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleFabric(fabricItem.label)}
                      className="hidden-checkbox"
                    />
                    <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </span>
                  </div>
                  <span className="filter-name">
                    {fabricItem.label} <span className="filter-count">({fabricItem.count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* COLOR FILTER */}
      <div className="filter-group">
        <button
          className="filter-group-header"
          onClick={() => setColorOpen(!colorOpen)}
          aria-expanded={colorOpen}
        >
          <span className="filter-title">COLOR</span>
          {colorOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {colorOpen && (
          <div className="filter-options-list">
            {COLORS_FILTER_LIST.map((colorItem) => {
              const isChecked = selectedColors.includes(colorItem.label);
              return (
                <label key={colorItem.label} className="filter-checkbox-label">
                  <div className="checkbox-custom-wrap">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleColor(colorItem.label)}
                      className="hidden-checkbox"
                    />
                    <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </span>
                  </div>
                  <span
                    className="color-swatch-dot"
                    style={{ backgroundColor: colorItem.hex }}
                  />
                  <span className="filter-name">
                    {colorItem.label} <span className="filter-count">({colorItem.count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* PRICE RANGE FILTER */}
      <div className="filter-group">
        <button
          className="filter-group-header"
          onClick={() => setPriceOpen(!priceOpen)}
          aria-expanded={priceOpen}
        >
          <span className="filter-title">PRICE</span>
          {priceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {priceOpen && (
          <div className="filter-price-slider">
            <div className="price-values">
              <span>₹2,500</span>
              <span className="current-max-price">Up to ₹{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2500"
              max="6000"
              step="200"
              value={priceRange}
              onChange={(e) => onChangePriceRange(Number(e.target.value))}
              className="price-slider-input"
            />
          </div>
        )}
      </div>
    </aside>
  );
}

