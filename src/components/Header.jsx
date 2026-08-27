import { useState } from 'react';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, Heart } from 'lucide-react';
import { CATEGORIES_NAV } from '../data/products';
import LiveSalesToast from './LiveSalesToast';

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  activeCategory,
  onSelectCategory,
  onOpenAccountModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <header className="site-header">
      {/* Main Top Header Bar */}
      <div className="header-container">
        {/* Left: Mobile Menu Toggle & Search */}
        <div className="header-left">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <button
            className="header-icon-btn search-btn"
            onClick={onOpenSearch}
            aria-label="Search"
          >
            <Search size={22} strokeWidth={1.75} />
            <span className="search-hint-text">Search Pakistani suits, kurtis...</span>
          </button>
        </div>

        {/* Center: Brand Logo */}
        <div className="header-center">
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); onSelectCategory('eid-2026'); }}>
            <span className="brand-title">RAFAA</span>
            <span className="brand-subtitle">TK FASHION COLLECTION</span>
          </a>
        </div>

        {/* Right: Social proof ticker, Account, Wishlist & Cart */}
        <div className="header-right">
          {/* Real-time Sales Toast in Header (matching screenshot) */}
          <div className="header-toast-container">
            <LiveSalesToast />
          </div>

          <button
            className="header-icon-btn account-btn"
            onClick={onOpenAccountModal}
            aria-label="Account"
            title="My Account"
          >
            <User size={22} strokeWidth={1.75} />
          </button>

          <button
            className="header-icon-btn mobile-wishlist-btn"
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart size={22} strokeWidth={1.75} />
            {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
          </button>

          <button
            className="header-icon-btn cart-btn"
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            title="Shopping Cart"
          >
            <ShoppingBag size={22} strokeWidth={1.75} />
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a
              href="#home"
              className={`nav-link ${activeCategory === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onSelectCategory('home'); }}
            >
              HOME
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#bestseller"
              className={`nav-link ${activeCategory === 'bestseller' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onSelectCategory('bestseller'); }}
            >
              BEST SELLER
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#eid-2026"
              className={`nav-link ${activeCategory === 'eid-2026' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onSelectCategory('eid-2026'); }}
            >
              EID 2026
            </a>
          </li>
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
              SHOP BY CATEGORY <ChevronDown size={14} className="dropdown-arrow" />
            </a>

            {/* Dropdown Menu */}
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
                        onSelectCategory(cat.slug);
                        setCategoryDropdownOpen(false);
                      }}
                    >
                      <span className="dropdown-cat-name">{cat.name}</span>
                      <span className="dropdown-cat-count">{cat.count} items</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li className="nav-item">
            <a
              href="#unstitched"
              className={`nav-link ${activeCategory === 'unstitched' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onSelectCategory('unstitched'); }}
            >
              UNSTITCH
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#luxe"
              className={`nav-link ${activeCategory === 'luxe' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onSelectCategory('luxe'); }}
            >
              RAFAA LUXE
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#clearance"
              className={`nav-link ${activeCategory === 'clearance' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onSelectCategory('clearance'); }}
            >
              CLEARENCE
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <span className="brand-title">RAFAA</span>
              <button
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mobile-nav-body">
              <div className="mobile-nav-links">
                <a
                  href="#home"
                  className="mobile-nav-link"
                  onClick={() => { onSelectCategory('home'); setMobileMenuOpen(false); }}
                >
                  HOME
                </a>
                <a
                  href="#bestseller"
                  className="mobile-nav-link"
                  onClick={() => { onSelectCategory('bestseller'); setMobileMenuOpen(false); }}
                >
                  BEST SELLER
                </a>
                <a
                  href="#eid-2026"
                  className="mobile-nav-link active"
                  onClick={() => { onSelectCategory('eid-2026'); setMobileMenuOpen(false); }}
                >
                  EID 2026
                </a>
                <div className="mobile-nav-section-title">SHOP BY CATEGORY</div>
                <div className="mobile-subcategories">
                  {CATEGORIES_NAV.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`#${cat.slug}`}
                      className="mobile-sub-link"
                      onClick={() => {
                        onSelectCategory(cat.slug);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {cat.name} ({cat.count})
                    </a>
                  ))}
                </div>
                <a
                  href="#unstitched"
                  className="mobile-nav-link"
                  onClick={() => { onSelectCategory('unstitched'); setMobileMenuOpen(false); }}
                >
                  UNSTITCH
                </a>
                <a
                  href="#luxe"
                  className="mobile-nav-link"
                  onClick={() => { onSelectCategory('luxe'); setMobileMenuOpen(false); }}
                >
                  RAFAA LUXE
                </a>
                <a
                  href="#clearance"
                  className="mobile-nav-link"
                  onClick={() => { onSelectCategory('clearance'); setMobileMenuOpen(false); }}
                >
                  CLEARENCE
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

