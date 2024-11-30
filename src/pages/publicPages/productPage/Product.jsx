import styles from './index.module.scss';
export default function Product() {
    return (
        <>
 <div className={styles['body']}>


      <div className={styles['feature-container']}>
    <div className={styles['card']}>
        <div  className={styles['card-header']}>Lead Management</div>
        <ul  className={styles['card-content']}>
            <p>Add new leads manually or import leads from external sources.</p>
            <p>View a lead details, including contact information and lead source.</p>
            <p>Modify lead information and status based on interactions.</p>
            <p>Remove irrelevant or duplicate leads.</p>
            <p>Associations quotes, deals.</p>
        </ul>
    </div>
    <div className={styles['card']}>
        <div className={styles['card-header']}>Contact Management</div>
        <ul className={styles['card-content']}>
            <p>Add new contacts and associate them with relevant accounts.</p>
            <p>Access comprehensive contact profiles with communication history.</p>
            <p>Modify contact details and preferences.</p>
            <p>Remove obsolete contacts and Interactive filterable dashboard.</p>
            <p>Meeting scheduling, Task, Activities, Powered by Interactive Calendar.</p>
        </ul>
    </div>
	
	  <div className={styles['card']}>
        <div className={styles['card-header']}>Deal Pipeline</div>
        <ul className={styles['card-content']}>
            <p>Add new deals with relevant details, such as deal stage and expected revenue.</p>
            <p>Monitor the status and progress of each deal in the pipeline.</p>
			<p>Move deals through different stages and update deal information.</p>
            <p>Remove deals that are no longer relevant.</p>
            <p>Relationship to Leads, quotes, contact, meetings, Customers.</p>

        </ul>
    </div>
	  <div className={styles['card']}>
        <div className={styles['card-header']}>Quotes</div>
        <ul className={styles['card-content']}>
            <p>Generate quotes for products or services.</p>
            <p>View and compare multiple quotes.</p>
            <p>Modify quote details based on negotiations.</p>
            <p>Remove outdated or cancelled quotes.</p>
			<p>Associated to Products, Deals and Services.</p>
        </ul>
    </div>
	  
	  <div className={styles['card']}>
        <div className={styles['card-header']}>Project And Customer Management</div>
        <ul className={styles['card-content']}>
            <p>Add new customer Projects and organizations</p>
            <p>Access detailed account profiles, including transaction history.</p>
            <p>Modify account information and preferences.</p>
            <p>Deactivate or remove obsolete project and Customers.</p>
			<p>360 Degree association all activities related to the account.</p>
        </ul>
    </div>
	  <div className={styles['card']}>
        <div className={styles['card-header']}>Orders Management</div>
        <ul className={styles['card-content']}>
            <p>Generate Sales, Work, Purchase orders for products or services.</p>
            <p>Access order details, including quantities, pricing, and status.</p>
            <p>Modify order details based on changes or negotiations..</p>
            <p>Cancel or remove unnecessary orders.</p>
			<p>Relationship to products, services, and invoices.</p>
        </ul>
    </div>
	<div className={styles['card']}>
        <div className={styles['card-header']}>Product Management</div>
        <ul className={styles['card-content']}>
        <p>Add new products or services to the catalogues.</p>
            <p>View detailed product information and specifications.</p>
            <p>Modify product details, pricing, availability and Remove obsolete or discontinued products.</p>
            <p>Associate with Assets, quotes, orders, and invoice.</p>
			<p>Vendor Management.</p>
			<p>HR-(New resource Creation, allocating to Categories, Task Assignment)</p>
        </ul>
    </div>
	  <div className={styles['card']}>
        <div className={styles['card-header']}>Inventory And Warehouse Management</div>
        <ul className={styles['card-content']}>
            <p>Add new inventory items, brands and Products </p>
            <p>Access real-time information on inventory, product stock levels.</p>
            <p>Modify stock quantities, update product information, and manage orders.</p>
            <p>Remove obsolete inventory items or discontinued products.</p>
			<p>Asset Processing (receiving, testing, Grading, and storing).</p>
			<p>Associates with products, Assets, Stock, Orders tracking, warehouses.</p>		
        </ul>
    </div>
</div>
</div>
    </>
    )
}