import Link from 'next/link';
import { Component } from 'react';

class Footer extends Component {
  render() {
    const current_year = new Date().getFullYear();
    return (
      <div id="section_footer">
        <div className="text-center py-4">
          <Link
            href="https://1manstartup.com/privacy-policy"
            target="_blank"
            className="btn btn-link"
          >
            Privacy Policy
          </Link>
          <span>|</span>
          <Link
            href="https://1manstartup.com/terms-and-conditions"
            target="_blank"
            className="btn btn-link"
          >
            Terms and Condition
          </Link>
          <span>|</span>
          <Link
            href="mailto:Roads<dave@1manstartup.com>"
            className="btn btn-link"
          >
            Contact
          </Link>
          <span>|</span>
          <Link
            href="mailto:Roads<dave@1manstartup.com>"
            className="btn btn-link"
          >
            Refund Policy
            <span>|</span>
            <span>Copyright © {current_year},. All Rights Reserved.</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Footer;
