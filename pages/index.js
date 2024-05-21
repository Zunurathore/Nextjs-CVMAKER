import Head from "next/head";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import styles from '../styles/home.module.css'
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import Signup from "@/components/Signup";

const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

   const toggleSignupModal = () => {
      setIsSignupModalOpen(!isSignupModalOpen);
    };

   const toggleModal = () => {
     setIsModalOpen(!isModalOpen);
   };
   const toggleLoginModal = () => {
      setIsLoginModalOpen(!isLoginModalOpen);
      setIsModalOpen(false);
   };

   const [firstname, setFirstName] = useState('')
   const [lastname, setLastName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')


   const handleChange = (e) => {
      if (e.target.name === 'firstname') {
          setFirstName(e.target.value);
      } 
      else if (e.target.name === 'lastname') {
          setLastName(e.target.value);
      }
      else if (e.target.name === 'email') {
          setEmail(e.target.value);
       }
  }

  const handleLoginChange = (e) => {
     console.log(e.target.name)
   if (e.target.name === 'email') {
      setEmail(e.target.value);
   } 
   else if (e.target.name === 'password') {
      setPassword(e.target.value);
   }
   
}
  

  
   const handleSubmit = async (e)=>{
      e.preventDefault();
      const data = {firstname, lastname, email}
      console.log(data)
      const res =  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
         method: "POST",
         headers: {
         "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });
        let response = await res.json()
        console.log(response)
        
      if (response.status === 'success') {
          // Show success message
          toast.success(response.msg, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      } else {
          // Show error message from response
          toast.error(response.msg, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      }
      setIsLoginModalOpen(false);
      setFirstName('')
      setLastName('')
      setEmail('') 
   }

   const handleLoginSubmit = async (e) => {
      e.preventDefault()
      const data = {email, password}

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()

      setEmail('')
      setPassword('')
      if(response.success) {
      //   localStorage.setItem('token', response.token)
      toast.success('Successfully Login!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        router.push(`${process.env.NEXT_PUBLIC_HOST}/dashboard`)
        
      }else{
        toast.error(response.error, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
  };

  return (
   <>
      <Head>
      <title>CV Maker</title>
      <meta name="description" content="cvmaker.com - CV  Maker"/>
      </Head>
      <ToastContainer
         position="top-center"
         autoClose={2000}
         newestOnTop
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colors"
      />
      <Nav/>
      <div className="container mx-auto mt-10 first-sec">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" p-4">
               <h1 className={`${styles['first-sec-h1']} mt-20 ${styles['mobile-heading-h1']}`}>Garantierte <br/> Besichtigungen dank <br/> unserer Berwerbermappe</h1>
               <p className={`${styles['first-sec-p']} mt-5 ${styles['mobile-heading-p']}`}>Einfach schneller zur Traumwohnung: Mit Wohnungs Guru erstellst du in wenigen Klicks deine komplette, geprüfte  digitale Bewerbermappe.</p>
               <button onClick={toggleSignupModal} type="button" className={`${styles['jetzt-btn']} mt-10`}>
        Jetzt Erstellen1
      </button>

      {isSignupModalOpen && <Signup onClose={toggleSignupModal} />}
               <button onClick={toggleModal} type="button" className={`${styles['jetzt-btn']} mt-10`}>Jetzt Erstellen</button>
               {isModalOpen && (
                  <div id="default-modal" aria-hidden="true" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white" >
                  <div className="relative p-4 w-full max-w-2xl max-h-full">
                     <div className="relative bg-white rounded-lg shadow bg-white-700 text-gray-900">
                        <div className="p-4 md:p-5 rounded-t bg-white-700">
                        <button onClick={toggleModal} type="button" className={`${styles['btn-zuruck']}`} >
                        <i className="fa fa-angle-left"></i> <span className={`${styles['btn-text']}`}>Zurück</span> 
                        </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                           <h3 className={`${styles['modal-h3']}`}>Personalisieren Sie Ihren Lebenslauf, um loszulegen</h3>

                           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" novalidate>
                              <div className="col-span-2">
                              <p className={`${styles['modal-p']}`}>Geben Sie Ihre Daten ein, um ein personalisiertes Erlebnis zu erhalten und Ihren Lebenslauf in Ihrem eigenen Dashboard zu speichern.</p>
                              </div>
                              <div className="col-span-2 md:col-span-1">
                              <label htmlFor="firstname" className={`${styles['form-label']} form-label`}>Vorname</label>
                              <input onChange={handleChange} value={firstname} id="firstname" name="firstname" type="text" className={`${styles['modalform-input']} mt-2`}  placeholder='Max' required />
                              </div>
                              <div className="col-span-2 md:col-span-1">
                              <label htmlFor="lastname" className={`${styles['form-label']} form-label`}>Nachname</label>
                              <input onChange={handleChange} value={lastname} id="lastname" name="lastname" type="text" className={`${styles['modalform-input']} mt-2`} placeholder='Mustermann' required />
                              </div>
                              <div className="col-span-2">
                              <label htmlFor="email" className={`${styles['form-label']} form-label`}>E-Mail</label>
                              <input onChange={handleChange} value={email} id="email" name="email" type="email" className={`${styles['modalform-input']} mt-2`} required />
                              </div>
                              <div className="col-span-2">
                              <p className={`${styles['modal-p']}`}>Indem Sie auf „Zur Lebenslauf-App" klicken, erstellen Sie ein Konto und stimmen unseren <strong>allgemeinen Geschäftsbedingungen</strong> und der <strong>Datenschutzerklärung</strong> zu.</p>
                              <p className={`${styles['modal-p']}`}><strong>Sie haben bereits ein Konto? <span className="text-red-500"><button onClick={toggleLoginModal}>Jetzt einloggen</button></span></strong></p>
                              </div>
                              <div className="col-span-2 flex justify-end">
                              <button className={`${styles['modal-submit-button']} btn`} type="submit">Zur Bewerbermappe</button>
                              </div>
                           </form>

                        </div>
                        
                     </div>
                  </div>
                  </div>
               )}
               {isLoginModalOpen && (
                  <div id="login-modal" aria-hidden="true" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white">
                     <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow bg-white-700 text-gray-900">
                        <div className="p-4 md:p-5 rounded-t bg-white-700">
                           <button onClick={toggleLoginModal} type="button" className={`${styles['btn-zuruck']}`}>
                              <i className="fa fa-angle-left"></i> <span className={`${styles['btn-text']}`}>Zurück</span>
                           </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                           <h3 className={`${styles['modal-h3']}`}>Einloggen</h3>

                           <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                              <div>
                              <label htmlFor="login-email" className={`${styles['form-label']} form-label`}>E-Mail</label>
                              <input onChange={handleLoginChange} value={email} id="login-email" name="email" type="email" className={`${styles['modalform-input']} mt-2`} required />
                              </div>
                              <div>
                              <label htmlFor="login-password" className={`${styles['form-label']} form-label`}>Passwort</label>
                              <input onChange={handleLoginChange} value={password} id="login-password" name="password" type="password" className={`${styles['modalform-input']} mt-2`} required />
                              </div>
                              <div className="flex justify-end">
                              <button className={`${styles['modal-submit-button']} btn`} type="submit">Einloggen</button>
                              </div>
                           </form>
                        </div>
                        </div>
                     </div>
                  </div>
               )}             
               <div className="mg:pl-5 pl-0 lg:mt-10 mt-3 md:space-x-1 space-x-0 lg:flex md:block items-center">
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <p className={`${styles['first-star-p']} lg:pl-4`}>Ausgezeichent,<strong>4.5</strong> auf <strong>Trustpilot</strong> </p>
               </div>
            </div>
            <div className="p-4">
               <img src="/images/img.png" width="100%" alt="" />
            </div>
         </div>
      </div>

      <div className="container mx-auto md:mt-20 mt-10 md:mb-28 mb-10">
         <div className="text-center p-4">
            <h1 className={`${styles['second-div-h1']} ${styles['mobile-heading-h1']}`}>Ihr Wohntraum beginnt hier.</h1>
            <p className={`${styles['second-div-p']} mt-2 ${styles['mobile-heading-p']}`}>Wir helfen Ihnen bei jedem Schritt auf Ihrem weg zur Traumwohnung.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:mt-20  md:mt-10 sm:mt-10 mt-6 ">
            <div className="p-4 md:col-span-1 lg:col-span-1">
               <img src="/images/Group 61.png" alt="" />
               <h1 className={`${styles['imagebox-h1']}`}>Fast Performance</h1>
               <p className={`${styles['imagebox-p']}`}>See where you’re making and spending money in real.</p>
            </div>
            <div className="p-4 md:col-span-1 lg:col-span-1">
               <img src="/images/Group 62 .png" alt="" />
               <h1 className={`${styles['imagebox-h1']}`}>Best Strategy</h1>
               <p className={`${styles['imagebox-p']}`}>Send money with three clicks by wire, check, or ACH.</p>
            </div>
            <div className="p-4 md:col-span-1 lg:col-span-1">
               <img src="/images/Group 63.png" alt="" />
               <h1 className={`${styles['imagebox-h1']}`}>Boost Performance</h1>
               <p className={`${styles['imagebox-p']}`}>Choose the right tone and fast formality level.</p>
            </div>
            <div className="p-4 md:col-span-1 lg:col-span-1">
               <img src="/images/Group 64 .png" alt="" />
               <h1 className={`${styles['imagebox-h1']}`}>Award history</h1>
               <p className={`${styles['imagebox-p']}`}>Keep secure with fluent 2-factor authentication full activity.</p>
            </div>
         </div>
      </div>

      <div className={`${styles['threed-sec-con']} pb-16 lg:pb-28 pt-16 sm:mt-10 lg:pl-12`}>
         <div className={`${styles['threed-sec']} ml-4 lg:ml-36 mr-4 lg:mr-24 md:pt-20 pt-8 lg:p-16 md:p-4 p-0`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4">
                  <h1 className={`${styles['threed-sec-h1']} mt-20 ${styles['mobile-heading-h1']}`}>In nur 8 Schritten <br/> zur fertigen Mappe</h1>
                  <p className={`${styles['threed-sec-p']} lg:mt-14 mt-4  ${styles['mobile-heading-p']}`}>Quickly see how each post is performing, with unique benchmarks for each of your social media accounts and post types, including videos, images, stories, and more.</p>
                  <button className={`${styles['starte-btn']} mt-10`}>STARTE JETZT</button>
               </div>
               <div className="p-4">
                  <img src="/images/img.png" width="100%" alt="" />
               </div>
            </div>
         </div>
      </div>

      <div className="mb-20">
         <div className="container mx-auto md:mt-24  mt-10 text-center p-4">
            <h1 className={`${styles['four-div-h1']} ${styles['mobile-heading-h1']}`}>Wählen Sie aus den besten Vorlagen aus</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-10 gap-2 pt-2">
               <div className="p-4 md:col-span-1 lg:col-span-3">     
               </div>
               <div className=" md:col-span-1 lg:col-span-4">
                  <p className={`${styles['four-div-p']} ${styles['mobile-heading-p']}`}>Wählen Sie aus über 4 professionellen und unverwechselbaren Bewerbermappen. Von Experten entworfen und für jeden geeignet. Erhöhen Sie Ihre Chancen auf ihre Wohnungssuche erheblich und erstellen Sie Ihre Mappe in einer der professionell gestalteten Vorlagen.</p>
               </div>
               <div className=" md:col-span-1 lg:col-span-3">
               </div>
            </div>
         </div>
         <div className={`${styles['four-div-imagsec']} md:mt-20 mt-0 text-center`}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-2 pt-2">
               <div className=" md:col-span-1 lg:col-span-1">     
               </div>
               <div className=" grid md:col-span-1 lg:col-span-5">
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 pt-2">
                     <img className="p-6" src="/images/Rectangle 1660.png" width="100%" alt="" />
                     <img className="p-6" src="/images/Rectangle 1660.png" width="100%" alt="" />
                     <img className="p-6" src="/images/Rectangle 1660.png" width="100%" alt="" />
                  </div>
               </div>
            </div>
         </div>
         <div className="text-center mt-5">
            <button className={`${styles['bewerbe-btn']}  mt-10 `}> BEWERBERMAPPE STARTEN</button>
         </div>
      </div>

      <div className={`${styles['threed-sec-con']}`} >
         <div className="container mx-auto md:pb-32  pt-16 pb-16">
            <div className="text-center p-4">
               <h1 className={`${styles['five-div-h1']} ${styles['mobile-heading-h1']}`}>Amazing useful features</h1>
               <p className={`${styles['five-div-p']} mt-2 ${styles['mobile-heading-p']}`}>Focus only on the meaning, we take care of the design. As soon as the meeting <br/> end you can export in one click into your preferred format.</p>
            </div>
            <div className="flex flex-wrap md:mt-24 mt-6 p-4">
               <div className="w-full md:w-1/2">
                  <div className="flex flex-wrap">
                     <div className="w-full md:w-1/5">
                        <img src="/images/Group 63.png" alt="" />
                     </div>
                     <div className="w-full md:w-3/4">
                        <h1 className={`${styles['imagebox-h1']}`}>Fast Performance</h1>
                        <p className={`${styles['imagebox-p']}`}>Let’s just get this out of the way - there will always be a kit version of Eduflow. Built by educators, we believe in equiting education for all. Paid subscriptions allow us to continue helping learners around the world.</p>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-1/2 md:mt-0 mt-8">
                  <div className="flex flex-wrap">
                     <div className="w-full md:w-1/5">
                        <img src="/images/Group 63.png" alt="" />
                     </div>
                     <div className="w-full md:w-3/4">
                        <h1 className={`${styles['imagebox-h1']}`}>Pro Subscription</h1>
                        <p className={`${styles['imagebox-p']}`}>We believe it’s important for everyone to have access to software – especially when it comes to digital learning tools. Eduflow is built with WCAG standards in mind and can easily be navigated by keyboard and screen readers.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap md:mt-10 mt-0 p-4">
               <div className="w-full md:w-1/2">
                  <div className="flex flex-wrap">
                     <div className="w-full md:w-1/5">
                        <img src="/images/Group 63.png" alt="" />
                     </div>
                     <div className="w-full md:w-3/4">
                        <h1 className={`${styles['imagebox-h1']}`}>Partnership Deal</h1>
                        <p className={`${styles['imagebox-p']}`}>Let’s just get this out of the way - there will always be a kit version of Eduflow. Built by educators, we believe in equiting education for all. Paid subscriptions allow us to continue helping learners around the world.</p>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-1/2 md:mt-0 mt-8">
                  <div className="flex flex-wrap">
                     <div className="w-full md:w-1/5">
                        <img src="/images/Group 63.png" alt="" />
                     </div>
                     <div className="w-full md:w-3/4">
                        <h1 className={`${styles['imagebox-h1']}`}>Customer Support</h1>
                        <p className={`${styles['imagebox-p']}`}>We believe it’s important for everyone to have access to software – especially when it comes to digital learning tools. Eduflow is built with WCAG standards in mind and can easily be navigated by keyboard and screen readers.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="">
         <div className="container mx-auto pt-16 lg:pb-36 pb-16">
            <div className="text-center p-4">
               <h1 className={`${styles['six-div-h1']} ${styles['mobile-heading-h1']}`}>Das ist in deiner Bewerbermappe</h1>
               <p className={`${styles['six-div-p']} mt-2 ${styles['mobile-heading-p']}`}>Alles was dein Vermieter/Makler sehen will</p>
            </div>
            <div className="flex flex-col md:flex-row md:mt-32 mt-16">
               <div className="w-full md:w-1/4">
               </div>
               <div className="w-full md:w-1/2 flex items-center justify-center lg:justify-start  md:justify-end">
                  <img className={`${styles['six-div-img']}`} src="/images/Oval.svg" alt="" />
                  <h1 className="six-div-img-h1 pl-10">Mieterselbstauskunft</h1>
               </div>
               <div className="w-full md:w-1/4">
               </div>
            </div>
            <div className="flex flex-wrap mt-10">
               <div className="w-full md:w-1/3">
               </div>
               <div className="w-full md:w-1/2 flex justify-center items-center">
                  <h1 className={`${styles['six-div-img-h1']} pr-10`}>Identitäsnachweis</h1>
                  <img className={`${styles['six-div-img']}`} src="/images/Oval.svg" alt="" />
               </div>
               <div className="w-full md:w-1/6">
               </div>
            </div>
            <div className="flex flex-col md:flex-row mt-10">
               <div className="w-full md:w-1/4">
               </div>
               <div className="w-full md:w-1/2 flex items-center justify-center lg:justify-start  md:justify-end">
                  <img className={`${styles['six-div-img']}`} src="/images/Oval.svg" alt="" />
                  <h1 className={`${styles['six-div-img-h1']} pl-10`}>Mietschulden <br/> freiheitsbescheinigung</h1>
               </div>
               <div className="w-full md:w-1/4">
               </div>
            </div>
            <div className="flex flex-wrap mt-10">
               <div className="w-full md:w-1/3">
               </div>
               <div className="w-full md:w-1/2 flex justify-center items-center">
                  <h1 className={`${styles['six-div-img-h1']} pr-16`}>Schufaauskunft</h1>
                  <img className={`${styles['six-div-img']}`} src="/images/Oval.svg" alt="" />
               </div>
               <div className="w-full md:w-1/6">
               </div>
            </div>
            <div className="flex flex-col md:flex-row mt-10">
               <div className="w-full md:w-1/4">
               </div>
               <div className="w-full md:w-1/2 flex items-center justify-center lg:justify-start  md:justify-end">
                  <img className={`${styles['six-div-img']}`} src="/images/Oval.svg" alt="" />
                  <h1 className={`${styles['six-div-img-h1']} pl-10`}>Einkommensnachweis</h1>
               </div>
               <div className="w-full md:w-1/4">
               </div>
            </div>
         </div>
      </div>

      <div className={`${styles['four_sec']} container mx-auto mt-10`}>
         <div className="lg:px-14 px-4 pt-14">
            <div className="lg:flex items-center">
               <h1 className={`${styles['seven-div-h1']}`}>"Hervorragend"</h1>
               <div className="md:pl-5 md:space-x-1 space-x-0 pl-0 lg:mt-0 mt-3">
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
               </div>
            </div>
            <p className={`${styles['seven-div-p']} mt-3`}>Bewertung <strong>4.5</strong> von <strong>11645 Bewertungen</strong> auf    <span className="fa fa-star"></span><strong>Trustpilot</strong>  </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 lg:p-14 md:pt-8 p-4 md:pb-10">
            <div className="p-4 md:col-span-1 lg:col-span-1 bg-white p-6 rounded-md">
               <div className="pt-2 md:space-x-1 space-x-0">
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
               </div>
               <h1 className={`${styles['testimonialbox-h1']} mt-8`}>Fast Performance</h1>
               <p className={`${styles['testimonialbox-p']} mt-2`}>See where you’re making and spending money in real.</p>
               <div className="mt-20">
                  <p className={`${styles['testimonialbox-p']}`}>Lorem ipsum dolor -16 hour ago</p>
               </div>
            </div>
            <div className="p-4 md:col-span-1 lg:col-span-1 bg-white p-6 rounded-md">
               <div className="pt-2 md:space-x-1 space-x-0">
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
               </div>
               <h1 className={`${styles['testimonialbox-h1']} mt-8`}>Fast Performance</h1>
               <p className={`${styles['testimonialbox-p']} mt-2`}>See where you’re making and spending money in real.</p>
               <div className="mt-20">
                  <p className={`${styles['testimonialbox-p']}`}>Lorem ipsum dolor -16 hour ago</p>
               </div>
            </div>
            <div className="p-4 md:col-span-1 lg:col-span-1 bg-white p-6 rounded-md">
               <div className="pt-2 md:space-x-1 space-x-0">
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
               </div>
               <h1 className={`${styles['testimonialbox-h1']} mt-8`}>Fast Performance</h1>
               <p className={`${styles['testimonialbox-p']} mt-2`}>See where you’re making and spending money in real.</p>
               <div className="mt-20">
                  <p className={`${styles['testimonialbox-p']}`}>Lorem ipsum dolor -16 hour ago</p>
               </div>
            </div>
            <div className="p-4 md:col-span-1 lg:col-span-1 bg-white p-6 rounded-md">
               <div className="pt-2 md:space-x-1 space-x-0">
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
                  <span className={`${styles['checked']} fa fa-star`}></span>
               </div>
               <h1 className={`${styles['testimonialbox-h1']} mt-8`}>Fast Performance</h1>
               <p className={`${styles['testimonialbox-p']} mt-2`}>See where you’re making and spending money in real.</p>
               <div className="mt-20">
                  <p className={`${styles['testimonialbox-p']}`}>Lorem ipsum dolor -16 hour ago</p>
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto lg:mt-24 mt-12 mb-8">
         <div className="text-center p-4">
            <h1 className={`${styles['eight-div-h1']} ${styles['mobile-heading-h1']}`}>Do you have any quesiton</h1>
            <p className={`${styles['eight-div-p']} mt-2 ${styles['mobile-heading-p']}`}>Our support team ready to help you, please contact with them</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-9 gap-2 mt-5 pt-2">
            <div className=" md:col-span-1 lg:col-span-2">     
            </div>
            <div className=" md:col-span-1 lg:col-span-5">
               <div className="">
               
                  <div className='flex  via-red-300 to-indigo-500 '>
                     <div className='w-full py-8 mx-auto  rounded-lg '>
                        <details className="w-full bg-white border-b  border-E5ECF4  cursor-pointer mb-3">
                           <summary className={`${styles['eight-faq-sec-h3']} w-full bg-white text-dark flex px-4 py-3  before:content-['+']`}>How to contact with riders emergency ?</summary>
                           <p className={`${styles['eight-faq-sec-p']} px-4 py-3`}>
                              Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home.
                           </p>
                        </details>
                        <details className="w-full bg-white border-b  border-E5ECF4  cursor-pointer mb-3">
                           <summary className={`${styles['eight-faq-sec-h3']} w-full bg-white text-dark flex px-4 py-3  before:content-['+']`}>App installation failed, how to update system information?</summary>
                           <p className={`${styles['eight-faq-sec-p']} px-4 py-3`}>
                              Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home.
                           </p>
                        </details>
                        <details className="w-full bg-white border-b  border-E5ECF4  cursor-pointer mb-3">
                           <summary className={`${styles['eight-faq-sec-h3']} w-full bg-white text-dark flex px-4 py-3  before:content-['+']`}>Website reponse taking time, how to improve?</summary>
                           <p className={`${styles['eight-faq-sec-p']} px-4 py-3`}>
                              Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home collect a sample from management news. Get your blood tests delivered at the home.
                           </p>
                        </details>
                     </div>
                  </div>
                  <div className="p-4 md:col-span-1 lg:col-span-2">
                  </div>
               </div>
            </div>
            <div className="p-4 md:col-span-1 lg:col-span-2">     
            </div>
         </div>
      </div>
   
      <Footer />
   </>
  );
}
export default Home