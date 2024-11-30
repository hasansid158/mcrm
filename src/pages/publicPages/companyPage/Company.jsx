import styles from './index.module.scss';

export default function Company() {
    return (
        <>
          {/* <div  className={styles['header']}>
        <h1 align="center"> MASTERCRM - Our Company</h1>
    </div> */}
    <div  className={styles['container']}>
        <div className={styles['content-section']}>
            <h2>About MasterCRM</h2>
            <p>MasterCRM has been at the forefront of CRM innovation, providing advanced solutions to manage customer relations and enterprise resources efficiently. With a commitment to quality and user-centric design, we ensure businesses of all sizes can harness the power of CRM to drive growth and customer satisfaction.</p>
        </div>
        <div className={styles['content-section']}>
            <h2>Our Vision and Mission</h2>
            <p>Our vision is to empower businesses with intuitive CRM tools that make customer relationship management a breeze. Our mission is to be the go-to CRM solution provider, enhancing customer engagement and operational efficiency through cutting-edge technology and outstanding support.</p>
        </div>
        <div className={styles['content-section']}>
            <h2>Core Values</h2>
            <p>At MasterCRM, we are driven by innovation, customer success, integrity, and teamwork. We believe in creating value for our clients through continuous improvement and a proactive approach to solving business challenges.</p>
        </div>
        <div className={styles['content-section']}>
            <h2>Meet Our Team</h2>
            <p>Our team of experts in CRM technology, customer support, and business processes is dedicated to delivering the best experience for our customers. Get to know the people behind MasterCRM who are committed to your success.</p>
        </div>
    </div>
        {/* <footer className={styles['footer']}>
        <p align="center">&copy; 2024 MasterCRM. All rights reserved.</p>
    </footer> */}
    </>
    )
}