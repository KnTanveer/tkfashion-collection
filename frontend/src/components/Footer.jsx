import { ShieldCheck, Truck, RotateCcw, Award, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Value Propositions / Trust Highlights */}
      <div className="footer-highlights">
        <div className="highlight-item">
          <Truck size={28} strokeWidth={1.5} />
          <div>
            <h4>Free Express Shipping</h4>
            <p>On all prepaid orders across India</p>
          </div>
        </div>
        <div className="highlight-item">
          <ShieldCheck size={28} strokeWidth={1.5} />
          <div>
            <h4>Cash On Delivery</h4>
            <p>Available on 19,000+ PIN codes</p>
          </div>
        </div>
        <div className="highlight-item">
          <RotateCcw size={28} strokeWidth={1.5} />
          <div>
            <h4>Easy 7-Day Exchange</h4>
            <p>Hassle-free size replacement</p>
          </div>
        </div>
        <div className="highlight-item">
          <Award size={28} strokeWidth={1.5} />
          <div>
            <h4>100% Authentic Quality</h4>
            <p>Handcrafted Pakistani threadwork</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-col brand-col">
          <span className="footer-logo">TK FASHION</span>
          <p className="footer-desc">
            TK Fashion Collection brings you genuine Pakistani suits, bridal formals, chikankari anarkalis, and handcrafted festive wear for Eid 2026.
          </p>
          <div className="footer-contact">
            <div className="contact-row">
              <Phone size={15} /> <span>+91 9969454909</span>
            </div>
            <div className="contact-row">
              <Mail size={15} /> <span>support@tkfashioncollection.com</span>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">COLLECTIONS</h4>
          <ul className="footer-links">
            <li><a href="#eid-2026">Eid 2026 Edit</a></li>
            <li><a href="#pakistani-suits">Pakistani Embroidered Suits</a></li>
            <li><a href="#palazzo-sets">Embroidered Palazzo Sets</a></li>
            <li><a href="#velvet-specials">Micro Velvet 9000</a></li>
            <li><a href="#shararas-ghararas">Farshi Ghararas</a></li>
            <li><a href="#clearance">Clearance Sale (Up to 60% OFF)</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">CUSTOMER CARE</h4>
          <ul className="footer-links">
            <li><a href="#track-order">Track Your Order</a></li>
            <li><a href="#shipping-policy">Shipping & COD Policy</a></li>
            <li><a href="#return-exchange">Return & Exchange</a></li>
            <li><a href="#size-guide">Size Measurement Guide</a></li>
            <li><a href="#faqs">Frequently Asked Questions</a></li>
            <li><a href="#contact">Contact Us / WhatsApp Support</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© 2026 TK Fashion Collection. All Rights Reserved.</p>
        <p className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a> • <a href="#terms">Terms of Service</a> • <a href="#refund">Refund Policy</a>
        </p>
      </div>
    </footer>
  );
}

