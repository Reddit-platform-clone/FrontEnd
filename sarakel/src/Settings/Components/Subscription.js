import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 

export default function Subscription(){
    return(
        <div className={`${classes.tab}`}>
        <div >
            <h2 className={`${classes.header}`}>Reddit Premium</h2>
            <p className={`${classes.BoxText} ${classes.Subtext} ${classes.mb}`}>Reddit Premium is a subscription membership that upgrades your account with extra features.</p>
            <h3 className={`${classes.SubheadersSpcl}`}>SUBSCRIPTION STATUS<hr className='mt-2'></hr></h3>
            <p className={`${classes.BoxText} ${classes.Subtext} ${classes.mb}`}>Get Reddit Premium and help support Reddit.</p>
            
        </div>
    </div>
    )

}