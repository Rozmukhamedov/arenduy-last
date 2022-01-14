import "../../style/footer.css";
import { FaFacebook, FaInstagramSquare, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="footer-box">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h5>Наш офис</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                voluptate iure odit voluptas sunt nisi molestiae consequatur
                accusamus? Quia non asperiores placeat quos laudantium nobis!
              </p>
            </div>
            <div>
              <h5>Соц. сеть</h5>
              <div className="footer-icons">
                <FaFacebook className="footer-icon"></FaFacebook>
                <FaInstagramSquare className="footer-icon"></FaInstagramSquare>
                <FaTelegram className="footer-icon"></FaTelegram>
              </div>
            </div>
            <div>
              <h5>O нас</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                voluptate iure odit voluptas sunt nisi molestiae consequatur
                accusamus? Quia non asperiores placeat quos laudantium nobis!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
