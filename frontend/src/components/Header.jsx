import { useState } from 'react';
import { Search, ChevronDown, Menu, X, Heart } from 'lucide-react';

export default function Header({
  wishlistCount,
  onOpenWishlist,
  onOpenSearch,
  activeCategory,
  onSelectCategory,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const selectCategory = (category) => {
    onSelectCategory(category);
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* Main Top Header Bar */}
      <div className="header-container">

        {/* Left: Mobile Menu */}
        <div className="header-left">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu aria-hidden="true" />
          </button>
        </div>

        {/* Center: Brand Logo */}
        <div className="header-center">
          <a
            href="/"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              selectCategory('eid-2026');
            }}
          >
            <span className="brand-title">TK FASHION</span>
            <span className="brand-subtitle">COLLECTION</span>
          </a>
        </div>

        {/* Right: Search & Wishlist */}
        <div className="header-right">

          <button
            type="button"
            className="header-icon-btn search-btn"
            onClick={onOpenSearch}
            aria-label="Search"
          >
            <Search aria-hidden="true" />
            <span className="search-hint-text">
              Search Pakistani suits, kurtis...
            </span>
          </button>

          <button
            type="button"
            className="header-icon-btn mobile-wishlist-btn"
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart aria-hidden="true" />

            {wishlistCount > 0 && (
              <span className="icon-badge">
                {wishlistCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="header-nav">
        <ul className="nav-list">

          <li className="nav-item">
            <a
              href="#home"
              className={`nav-link ${
                activeCategory === 'home' ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                selectCategory('home');
              }}
            >
              HOME
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#bestseller"
              className={`nav-link ${
                activeCategory === 'bestseller' ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                selectCategory('bestseller');
              }}
            >
              BEST SELLER
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#eid-2026"
              className={`nav-link ${
                activeCategory === 'eid-2026' ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                selectCategory('eid-2026');
              }}
            >
              EID 2026
            </a>
          </li>

          {/* Shop By Category */}
          <li
            className="nav-item has-dropdown"
            onMouseEnter={() => setCategoryDropdownOpen(true)}
            onMouseLeave={() => setCategoryDropdownOpen(false)}
          >
            <a
              href="#shop-by-category"
              className="nav-link dropdown-toggle"
              onClick={(e) => e.preventDefault()}
            >
              <span>SHOP BY CATEGORY</span>
              <ChevronDown
                className="dropdown-arrow"
                aria-hidden="true"
              />
            </a>

            {categoryDropdownOpen && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-grid">
                  {CATEGORIES_NAV.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`#${cat.slug}`}
                      className="dropdown-link"
                      onClick={(e) => {
                        e.preventDefault();
                        selectCategory(cat.slug);
                      }}
                    >
                      <span className="dropdown-cat-name">
                        {cat.name}
                      </span>

                      <span className="dropdown-cat-count">
                        {cat.count} items
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li className="nav-item">
            <a
              href="#unstitched"
              className={`nav-link ${
                activeCategory === 'unstitched' ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                selectCategory('unstitched');
              }}
            >
              UNSTITCH
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#luxe"
              className={`nav-link ${
                activeCategory === 'luxe' ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                selectCategory('luxe');
              }}
            >
              RAFAA LUXE
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#clearance"
              className={`nav-link ${
                activeCategory === 'clearance' ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                selectCategory('clearance');
              }}
            >
              CLEARANCE
            </a>
          </li>

        </ul>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Drawer Header */}
            <div className="mobile-nav-header">
              <div>
                <span className="brand-title">TK FASHION</span>
                <span className="brand-subtitle">COLLECTION</span>
              </div>

              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="mobile-nav-body">
              <div className="mobile-nav-links">

                <a
                  href="#home"
                  className={`mobile-nav-link ${
                    activeCategory === 'home' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCategory('home');
                  }}
                >
                  HOME
                </a>

                <a
                  href="#bestseller"
                  className={`mobile-nav-link ${
                    activeCategory === 'bestseller' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCategory('bestseller');
                  }}
                >
                  BEST SELLER
                </a>

                <a
                  href="#eid-2026"
                  className={`mobile-nav-link ${
                    activeCategory === 'eid-2026' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCategory('eid-2026');
                  }}
                >
                  EID 2026
                </a>

                <div className="mobile-nav-section-title">
                  SHOP BY CATEGORY
                </div>

                <div className="mobile-subcategories">
                  {CATEGORIES_NAV.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`#${cat.slug}`}
                      className="mobile-sub-link"
                      onClick={(e) => {
                        e.preventDefault();
                        selectCategory(cat.slug);
                      }}
                    >
                      {cat.name} ({cat.count})
                    </a>
                  ))}
                </div>

                <a
                  href="#unstitched"
                  className={`mobile-nav-link ${
                    activeCategory === 'unstitched' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCategory('unstitched');
                  }}
                >
                  UNSTITCH
                </a>

                <a
                  href="#luxe"
                  className={`mobile-nav-link ${
                    activeCategory === 'luxe' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCategory('luxe');
                  }}
                >
                  RAFAA LUXE
                </a>

                <a
                  href="#clearance"
                  className={`mobile-nav-link ${
                    activeCategory === 'clearance' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCategory('clearance');
                  }}
                >
                  CLEARANCE
                </a>

              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}