import styles from './index.module.scss';

export default function Resources() {
    return (
        <>
           <h2 align="center">Resources</h2>
    <p>Master CRM's resource hub is your go-to for best practices, tips, and insights on customer relationship and enterprise resource management. Stay informed and inspired to get the most out of our CRM platform.</p>
	
	<div  className={styles['feature-container']}>
        <div className={styles['feature-card']}>
            <div className={styles['card-header']}>User Guides</div>
            <div className={styles['card-content']}>
            <p>Explore our comprehensive user guides and manuals to master the functionality and features of Master CRM.</p> 
            </div>
			</div>
			<div className={styles['feature-card']}>
			<div className={styles['card-header']}>Case Studies</div>
            <div className={styles['card-content']}>
            <p>Read success stories from businesses like yours that have transformed their operations with Master CRM.</p>                  
            </div>
			</div>
			<div className={styles['feature-card']}>
			<div className={styles['card-header']}>Blog</div>
            <div className={styles['card-content']}>
            <p>Stay up to date with the latest trends in CRM, sales, marketing, and more with articles from our expert team.</p>        
            </div> </div>

			<div className={styles['feature-card']}>
			<div className={styles['card-header']}>Webinars</div>
            <div className={styles['card-content']}>
            <p>Join our interactive webinars to learn best practices and get your questions answered by our product experts.</p>    
            </div>
			 </div>
        </div>
    <footer align="center">
    <p>Looking for more? Visit our Help Center or reach out to our support team for personalized assistance.</p>
    </footer>
    </>
    )
}