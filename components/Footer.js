import React from 'react'
import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer className="footer-site py-8 pt-20" >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-4 border-b border-solid border-gray-300 md:p-0 p-4">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5  mb-8">
                <h3 className={`${styles['footer-sec-h3']} mb-2`}>Company </h3>
                <ul className={`${styles['footer-sec-p']}`}>
                    <li>About</li>
                    <li>Affiliate</li>
                    <li>Careers & Culture</li>
                    <li>Blog</li>
                    <li>Press</li>
                </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5  mb-8">
                <h3 className={`${styles['footer-sec-h3']} mb-2`}> About Us</h3>
                <ul className={`${styles['footer-sec-p']} `}>
                    <li> Support Center</li>
                    <li> Customer Support</li>
                    <li>About Us</li>
                </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/2  mb-8">
                <h3 className={`${styles['footer-sec-h3']} mb-2`}> Our Information</h3>
                <ul className={`${styles['footer-sec-p']} `}>
                    <li>Return Policy </li>
                    <li>Return Policy </li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2  mb-1 lg:flex items-center">
                <img src="/images/footer logo.svg" alt="" />
                <p className={`${styles['footer-sec-p']} `}>Copyright by 2024 YourName, Inc</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2 mb-1 lg:block md:flex md:justify-end items-end">
                <ul className={`${styles['footer-sec-p']} flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse justify-end`}>
                    <li>Home</li>
                    <li>Adversite</li>
                    <li>Supports</li>
                    <li>Marketing</li>
                    <li>FAQ</li>
                </ul>
            </div>
        </div>
        </div>
    </footer>
  )
}
export default Footer;
