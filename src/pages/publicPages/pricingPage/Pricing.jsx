import styles from './index.module.scss';

export default function Pricing() {
    return (
        <>
            <div className={styles['pricing-header']}>
                <h1 align="center">Pricing Plans</h1>
                <p align="center">All plans include 30+ advanced tools and features to boost your Business. Choose the best plan to fit your needs.</p>
            </div>
            <div className={styles['pricing-container']}>
                <div className={styles['pricing-card']}>
                    <h2>Basic</h2>
                    <p>A simple start for everyone</p>
                    <h3>$15/month</h3>
                    <ul align="left">
                        <li>Lead Management.</li>
                        <li>Contact management.</li>
                        <li>Vendor management.</li>
                        <li>Quotes.</li>
                        <li>Deals.</li>
                        <li>Tasks.</li>
                        <li>Meatings.</li>
                        <li>Scheduler.</li>
                    </ul>
                    <button>Your Current Plan</button>
                </div>
                {/* <div className={styles['pricing-card popular']}>  */}
                <div className={`${styles['pricing-card']} ${styles['popular']}`}>
                    <h2>Standard</h2>
                    <p>For small to medium businesses</p>
                    <h3>$25/month</h3>
                    <ul align="left">
                        <li>Lead Management.</li>
                        <li>Contact management.</li>
                        <li>Vendor management.</li>
                        <li>Quotes.</li>
                        <li>Deals.</li>
                        <li>Tasks.</li>
                        <li>Meatings.</li>
                        <li>Scheduler.</li>
                        <li>Accounts/Customer Management.</li>
                        <li>HR- Resource Management.</li>

                    </ul>
                    <button>Upgrade</button>
                </div>
                <div className={styles['pricing-card']}>
                    <h2>Enterprise</h2>
                    <p>Solution for big organizations</p>
                    <h3>$35/month</h3>
                    <ul align="left">
                        <li>Lead Management.</li>
                        <li>Contact management.</li>
                        <li>Vendor management.</li>
                        <li>Quotes And Deals Management</li>
                        <li>Tasks,Meatings And Scheduler .</li>
                        <li>Accounts/Customer Management.</li>
                        <li>HR- Resource Management.</li>
                        <li>Product Management.</li>
                        <li>Inventory And Warehouse Management.</li>
                        <li>Profit And Loss Intractive live Analytics</li>
                        <li>Customizable Reports</li>
                        <li>AI Driven Predictive and Behavioural Analytics</li>
                    </ul>
                    <button>Upgrade</button>
                </div>
            </div>
        </>
    )
}