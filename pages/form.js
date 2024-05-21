import React from 'react'
import { useState } from 'react'
import Link from "next/link";
import router from "next/router";
import Image from 'next/image'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/form.module.css'

export const Form = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };
    
    // logout method
    const logOut = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/logout`, {
            method: "POST", // Change method to POST
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            // Logout successful, redirect or perform any other action
            router.push('http://localhost:3000/login')
            console.log("Logout successful");
          } else {
            // Handle error response
            console.error("Logout failed");
          }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    // const [isChecked, setIsChecked] = useState(false);

    // const handleChange = (event) => {
    //     setIsChecked(event.target.checked);
    // };

    const [formData, setFormData] = useState({
        vorname: '',
        nachname: '',
        strabe: '',
        hausnummer: '',
        PLZ: '',
        Ort: '',
        email: '',
        tel: '',
        geburtsdatum: '',
        ausgeübterBeruf: '',
        arbeitgeber: '',
        income: '',
      });
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
      };
      

      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/saveprofile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
            toast.success('Form Submitted Successfully!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            router.push(`${process.env.NEXT_PUBLIC_HOST}/pdf`)
            console.log('data saved')
        }
        else{
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
    }
    const [selectedRadio1, setSelectedRadio1] = useState("Ja");
    const radiohandle = (value, id) => {
        if (id === 'r1') {
            setSelectedRadio1(value);
        }
    };
    const [selectedRadio2, setSelectedRadio2] = useState(false);

    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href={"/"}
                                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
                                Home
                            </Link>                       
                            <Link
                                href={"/dashboard"}
                                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
                                Dashboard
                            </Link>   
                        </div>
                    </div>
                    </div>
                    <div className="md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        <div className="relative ml-3">
                        <div>
                            <button onClick={toggleMenu}  type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </button>
                        </div>

                        {isMenuVisible && (
                            <div
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabIndex="-1"
                            >
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                            <a href="#" onClick={logOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                
                </div>
                </div>
            </nav> 
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
            <div className="mt-7">
                <ul className={`nav ${styles['nav-progress']} flex justify-around`}>
                    <li className="nav-item">
                    <a className={`${styles['nav-link']} nav-link active` } aria-current="page" href="#">1</a>
                    </li>
                    <li>
                    <img src="/arrow.png" />
                   
                    </li>
                    <li className="nav-item">
                    <a className={`${styles['nav-link']} nav-link`} href="#">2</a>
                    </li>
                    <li>
                    <img src="/arrow.png" />
                    </li>
                    <li className="nav-item">
                    <a className={`${styles['nav-link']} nav-link`} href="#">3</a>
                    </li>
                    <li >
                    <img src="/arrow.png" />
                    </li>
                    <li className="nav-item">
                    <a className={`${styles['nav-link']} nav-link`}>4</a>
                    </li>
                    <li>
                    <img src="/arrow.png" />
                    </li>
                    <li className="nav-item">
                        <a className={`${styles['nav-link']} nav-link`}>5</a>
                    </li>
                    <li>
                    <img src="/arrow.png" />
                    </li>
                    <li className="nav-item">
                        <a className={`${styles['nav-link']} nav-link`}>6</a>
                    </li>
                    <li>
                    <img src="/arrow.png" />
                    </li>
                    <li className="nav-item">
                        <a className={`${styles['nav-link']} nav-link`}>7</a>
                    </li>
                    <li>
                    <img src="/arrow.png" />
                    </li>
                    <li className="nav-item">
                        <a className={`${styles['nav-link']} nav-link`}>8</a>
                    </li>
                </ul>
            </div>
            <div className="py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <form className={`${styles['form-paddingt']} `}  onSubmit={handleSubmit}>
                    <h1 className={`${styles['nav-link']} mt-4 mb-7`}>Persönliche Daten: Mieter 1</h1>
                    <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
                        <div className="...">
                        <div className="input-field">
                            <input type="text" className={`${styles['form-input']} form-input `} id="vorname" placeholder="Vorname" value={formData.vorname} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="...">
                        <div className="input-field">
                            <input type="text" className={`${styles['form-input']} form-input `} id="nachname" placeholder="Nachname" value={formData.nachname} onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-5">
                        <div className="...">
                        <div className={`${styles['file-input-container']} col-span-full`}>
                            <label htmlFor="inputfoto" className={`${styles['file-label']} `}>Foto</label>
                            <div className={`${styles['file-input-wrapper']}  `}>
                            <input type="file" className={`${styles['file-input2']}  `} id="inputfoto" placeholder="1234 Main St" />
                            <img src="/image.png" alt="Description of the image" width={37} height={37} className={`${styles['file-icon']} `} />
                            </div>
                            <input type="text" className={`${styles['form-input']}  `} readOnly placeholder="Wählen Sie eine Datei aus oder ziehen Sie sie hierher" />
                        </div>
                        </div>
                    </div> 
                    <div className="grid grid-cols-6 gap-4 mt-7">
                        <div className="col-span-5 ...">
                        <input type="text" className={`${styles['form-input']} form-control `} id="strabe" placeholder="Straße" value={formData.strabe} onChange={handleChange} />
                        </div>
                        <div className="col-span-1 ...">
                        <input type="text" className={`${styles['form-input']} form-control `} id="hausnummer" placeholder="Hausnummer" value={formData.hausnummer} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-7">
                        <div className="col-span-1...">
                        <input type="text" className={`${styles['form-input']} form-control `} id="PLZ" placeholder="PLZ" value={formData.PLZ} onChange={handleChange} />
                        </div>
                        <div className="col-span-5 ...">
                        <input type="text" className={`${styles['form-input']} form-control `} id="Ort" placeholder="Ort" value={formData.Ort} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-5">
                        <div className="...">
                        <input type="email" className={`${styles['form-input']} form-control `} id="email" placeholder="E-Mail" value={formData.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-5">
                        <div className="...">
                        <input type="tel" className={`${styles['form-input']} form-control `} id="tel" placeholder="Tel. Mobil" value={formData.tel} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-5">
                        <div className="...">
                        <input type="date" className={`${styles['form-input']} form-control `} id="geburtsdatum" placeholder="Geburtsdatum" value={formData.geburtsdatum} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                        <div className="...">
                        <div className="input-field">
                            <input type="text" className={`${styles['form-input']} form-input `} id="ausgeübterBeruf" placeholder="Ausgeübter Beruf" value={formData.ausgeübterBeruf} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="...">
                        <div className="input-field">
                            <input type="text" className={`${styles['form-input']} form-input `} id="arbeitgeber" placeholder="Arbeitgeber" value={formData.arbeitgeber} onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-5">
                        <div className="...">
                        <input type="number" className={`${styles['form-input']} form-control `} id="income" placeholder="Höhe des monatlichen verfügbaren Nettoeinkommens (€)" value={formData.income} onChange={handleChange} />
                        </div>
                    </div>
                     <div className="grid grid-cols-8 mt-5">
                        <div className="col-span-6 ...">
                             <p className={`${styles['form-input']} form-control label-text `}>Besteht dein Beschäftigungsverhältnis länger als 6 Monate?</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <input className={`${styles['form-check-input']} mr-2  `} type="radio" name="employee" id="employee1" value="Ja" onChange={() => radiohandle('Ja', 'r1')} checked={selectedRadio1 === 'Ja'}  />
                            <label className={` ${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio1 === 'Ja' ? styles['black']  : 'bg-white text-black'}`} onClick={() => radiohandle('Ja', 'r1')} htmlFor="employee1">
                            Ja
                            </label>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="employee" id="employee2" value="Nein" onChange={() => radiohandle('Nein', 'r1')} checked={selectedRadio1 === 'Nein'} />
                            <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio1 === 'Nein' ? styles['black']  : 'bg-white text-black'}`} onClick={() => radiohandle('Nein', 'r1')}   htmlFor="employee2">Nein</label>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 mt-5">
                        <div className="col-span-6">
                        <p className={`${styles['form-input']} form-control label-text `}>Sollen außer ihnen noch weitere Personen die Wohnung beziehen?</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="moveappartment" id="moveappartment1" value="Ja" checked={formData.moveappartment === 'Ja'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="moveappartment1">Ja</label>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="moveappartment" id="moveappartment2" value="Nein" checked={formData.moveappartment === 'Nein'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="moveappartment2">Nein</label>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 mt-5">
                        <div className="col-span-6 ...">
                        <p className={`${styles['form-input']} form-control label-text `}>Bestehen Mietrückstände aus bisherigen Mietverhältnissen?</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="rentareas" id="rentareas1" value="Ja" checked={formData.rentareas === 'Ja'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="rentareas1">Ja</label>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="rentareas" id="rentareas2" value="Nein" checked={formData.rentareas === 'Nein'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="rentareas2">Nein</label>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 mt-5">
                        <div className="col-span-6 ...">
                        <p className={`${styles['form-input']} form-control label-text `}>Wurde in den letzten 5 Jahren Insolvenzverfahren gegen Sie eröffnet?</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="proceedings" id="proceedings1" value="Ja" checked={formData.proceedings === 'Ja'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="proceedings1">Ja</label>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="proceedings" id="proceedings2" value="Nein" checked={formData.proceedings === 'Nein'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="proceedings2">Nein</label>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 mt-5">
                        <div className="col-span-6 ...">
                        <p className={`${styles['form-input']} form-control label-text `}>Ist eine gewerbliche Nutzung der Wohnung beabsichtigt?</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="apartmentintended" id="apartmentintended1" value="Ja" checked={formData.apartmentintended === 'Ja'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="apartmentintended1">Ja</label>
                        </div>
                        <div className="col-span-1 flex items-center">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="apartmentintended" id="apartmentintended2" value="Nein" checked={formData.apartmentintended === 'Nein'} onChange={handleChange} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']}`} htmlFor="apartmentintended2">Nein</label>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 gap-4 mt-9">
                        <div className="mt-9">
                        <input type="text" className="form-control form-input signature-field" id="signature" placeholder="Unterschrift" value={formData.signature} onChange={handleChange} />
                        </div>
                    </div> */}
                    <div className="grid grid-cols-8 mt-9">
                        <div className="col-span-6 ..."></div>
                        <div className="col-span-2 mt-9 ...">
                        <input type="submit" className={`${styles['form-input']} form-control `} id={`${styles['submit']}`} value="Weiter" />
                        </div>
                    </div>
                </form>
                
                </div>
            </div>
            </main>
        </div>
    )
}

export default Form