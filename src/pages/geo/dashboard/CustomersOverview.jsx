import React from 'react';
import { MdPeople } from 'react-icons/md';
import { componentStyles } from '../../../theme';

const CustomersOverview = () => {
  const ds = componentStyles.geoPage.dashboard;

  return (
    <div className={ds.card}>
      <h2 className={ds.cardTitle}>Customers Overview</h2>
      
      <div className={ds.customerStat.container}>
        <div className={ds.customerStat.header}>
          <p className={ds.customerStat.label}>Customers Added Today</p>
          <div className={ds.customerStat.icon.green}>
            <MdPeople />
          </div>
        </div>
        <h3 className={ds.customerStat.value}>3</h3>
        <div className={ds.customerStat.trend}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>3</span>
          <span className="text-gray-500">more than yesterday</span>
        </div>
      </div>
      
      <div className={ds.customerStat.container}>
        <div className={ds.customerStat.header}>
          <p className={ds.customerStat.label}>Customers Served Today</p>
          <div className={ds.customerStat.icon.purple}>
            <MdPeople />
          </div>
        </div>
        <h3 className={ds.customerStat.value}>2</h3>
        <div className={ds.customerStat.trend}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>2</span>
          <span className="text-gray-500">more than yesterday</span>
        </div>
      </div>
    </div>
  );
};

export default CustomersOverview;