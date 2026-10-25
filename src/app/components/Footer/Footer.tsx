export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-social">
        <p>Social Links</p>
      </div>
      <div>
        <div className="footer-links grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p>
              Rajanigandha International
              <br />
              Eastern Commercial Complex 73 kakrail,
              <br />
              5th floor, Room no- 5\14, Dhaka-1000, Bangladesh
            </p>
          </div>
          <div>
            <p>Useful Links</p>
          </div>
          <div>
            <p>Contact</p>
          </div>
        </div>
      </div>

      <div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Rajanigandha International</p>
        </div>
      </div>
    </footer>
  );
}
