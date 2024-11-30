import React from 'react';
import styles from './index.module.scss';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacy}>
      <h3>Privacy Policy</h3>

      <p>Your privacy is important to us at MasterCRM. This Privacy Policy outlines how we collect, use, and safeguard your personal information. By using our services, you agree to the terms of this policy.</p>

      <ul>
        <li><strong>Data Collection:</strong> We collect necessary user information to provide our SaaS services effectively.</li>
        <li><strong>Usage Information:</strong> We may gather data on how you interact with our platform for continuous improvement.</li>
        <li><strong>Security:</strong> We implement industry-standard security measures to protect your data from unauthorized access.</li>
        <li><strong>Third-Party Integration:</strong> We may integrate third-party services for enhanced functionality, always ensuring your data's security.</li>
        <li><strong>Communication:</strong> We may contact you for service-related updates, but we won't spam your inbox.</li>
        <li><strong>Data Retention:</strong> Your data is retained only for the necessary period and deleted securely when no longer needed.</li>
        <li><strong>Policy Updates:</strong> We may update our Privacy Policy, and any changes will be communicated to you.</li>
        <li><strong>Company Values:</strong> Our commitment to transparency, integrity, and user trust guides our privacy practices.</li>
      </ul>

      <p>At MasterCRM, we prioritize your privacy and are committed to maintaining the confidentiality of your information. If you have any questions or concerns, please contact us.</p>
    </div>
  );
}

export default PrivacyPolicy;
