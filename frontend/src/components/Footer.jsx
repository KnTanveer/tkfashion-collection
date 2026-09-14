import { SiGooglemaps, SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Value Propositions / Trust Highlights */}
      {/* 
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
      </div> */}

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-col brand-col">
          <span className="footer-logo">TK FASHION</span>
          <div className="quote-row">
            <span>“Handpicked, Not Mass-Produced.”</span>
          </div>
          <p className="footer-desc">
            Handpicked ethnic wear for the modern Indian woman, curated in Mumbai and shipped across India.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Connect</h4>
          <ul className="footer-links">
            <div className="connect-row">
              <SiInstagram size={15} /> <li><a href="https://www.instagram.com/tk_fashioncollection?stkn=ZDNlZDc0MzIxNw==">Instagram</a></li>
            </div>
            <div className="connect-row">
              <SiWhatsapp size={15} /> <li><a href="https://whatsapp.com/channel/0029VbCT8qT65yD4NaYDsd3l">Whatsapp Channel</a></li>
            </div>
            <div className="connect-row">
              <SiGooglemaps size={15} /> <li><a href="">Vikhroli, Mumbai, Maharashtra</a></li>
            </div>
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

