import React from 'react';
import styles from './index.module.scss';

const Terms = () => {
  return (
    <div className={styles.terms}>
      <h2>Contact Us</h2>

      <address>
          <p><strong>Chief Engineer</strong></p>
          <p>Email: <a href="mailto:Basan@MasterCRM.COM.AU">Basan@MasterCRM.com.au</a></p>
          <p>Sydney, Australia</p>
      </address>

      <p>If you have any inquiries or require assistance, feel free to reach out to our Chief Engineer. We are committed to providing quality and outstanding SaaS platform services at a very effective price. Your satisfaction is our priority, and we look forward to assisting you on your journey with MasterCRM.</p>

      <p>Thank you for choosing MasterCRM.</p>
    </div>
  );
}

export default Terms;
