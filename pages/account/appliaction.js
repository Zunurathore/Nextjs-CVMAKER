import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {React,useEffect } from 'react'
import { useState } from 'react'
import Link from "next/link";
import router from "next/router";
import Image from 'next/image'
import "react-toastify/dist/ReactToastify.css";
import styles from '../../styles/form.module.css'
import UserNav from '@/components/UserNav';

const application = () => {
  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [strabe, setStrabe] = useState('');
  const [hausnummer, setHausnummer] = useState('');
  const [PLZ, setPLZ] = useState('');
  const [Ort, setOrt] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [geburtsdatum, setGeburtsdatum] = useState('');
  const [ausgeübterBeruf, setAusgeübterBeruf] = useState('');
  const [arbeitgeber, setArbeitgeber] = useState('');
  const [income, setIncome] = useState('');
  const [photo, setPhoto] = useState(null);
  const [textarea1, setTextarea1] = useState('');
  const [textarea2, setTextarea2] = useState('');
  const [textarea3, setTextarea3] = useState('');
  const [textarea4, setTextarea4] = useState('');
  const [textarea5, setTextarea5] = useState('');

  const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setPhoto(files[0]);
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setSelectedImg(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
    }
    } else {
      if (name === 'vorname') setVorname(value);
      if (name === 'nachname') setNachname(value);
      if (name === 'strabe') setStrabe(value);
      if (name === 'hausnummer') setHausnummer(value);
      if (name === 'PLZ') setPLZ(value);
      if (name === 'email') setEmail(value);
      if (name === 'Ort') setOrt(value);
      if (name === 'tel') setTel(value);
      if (name === 'geburtsdatum') setGeburtsdatum(value);
      if (name === 'ausgeübterBeruf') setAusgeübterBeruf(value);
      if (name === 'arbeitgeber') setArbeitgeber(value);
      if (name === 'income') setIncome(value);
      if (name === 'textarea1') setTextarea1(value);
      if (name === 'textarea2') setTextarea2(value);
      if (name === 'textarea3') setTextarea3(value);
      if (name === 'textarea4') setTextarea4(value);
      if (name === 'textarea5') setTextarea5(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('vorname', vorname);
    formData.append('nachname', nachname);
    formData.append('strabe', strabe);
    formData.append('hausnummer', hausnummer);
    formData.append('PLZ', PLZ);
    formData.append('Ort', Ort);
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('geburtsdatum', geburtsdatum);
    formData.append('ausgeübterBeruf', ausgeübterBeruf);
    formData.append('arbeitgeber', arbeitgeber);
    formData.append('income', income);
    formData.append('textarea1', textarea1);
    formData.append('textarea2', textarea2);
    formData.append('textarea3', textarea3);
    formData.append('textarea4', textarea4);
    formData.append('textarea5', textarea5);
    formData.append('photo', photo);
    try {
      const res = await fetch('/api/user/application', {
        method: 'POST',
        body: formData,
      });

      const response = await res.json();
      if (response.success) {
        toast.success('Form submitted successfully!');
      } else {
        toast.error(`Form submission failed: ${response.error}`);
      }
    } catch (error) {
      toast.error('Form submission failed: An error occurred');
    }
  };
  const [selectedImg, setSelectedImg] = useState('/image.png');
  const [selectedRadio1,setSelectedRadio1] = useState(false);
  const [selectedRadio2, setSelectedRadio2] = useState(false);
  const [selectedRadio3, setSelectedRadio3] = useState(false);
  const [selectedRadio4, setSelectedRadio4] = useState(false);
  const [selectedRadio5, setSelectedRadio5] = useState(false);

  const radiohandle = (value, id) => {
        if (id === 'r1') {
            setSelectedRadio1(value);
        }
        if (id === 'r2') {
            setSelectedRadio2(value);
        }
        if (id === 'r3') {
            setSelectedRadio3(value);
        }
        if (id === 'r4') {
            setSelectedRadio4(value);
        }
        if (id === 'r5') {
            setSelectedRadio5(value);
        }
    };
  return (
    // <div>
    //   <ToastContainer />
    //   <form onSubmit={handleSubmit} encType="multipart/form-data">
    //     <div>
    //       <label htmlFor="name">Name:</label>
    //       <input type="text" id="name" name="name" value={vorname} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label htmlFor="photo">Photo:</label>
    //       <input type="file" id="photo" name="photo" onChange={handleChange} required />
    //     </div>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <div className="min-h-full">
        <UserNav />
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
            <form className={`${styles['form-paddingt']} `}  onSubmit={handleSubmit}  encType="multipart/form-data">
                <h1 className={`${styles['nav-link']} mt-4 mb-7`}>Persönliche Daten: Mieter 1</h1>
                <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
                    <div className="...">
                    <div className="input-field">
                        <input type="text" className={`${styles['form-input']} form-input `} id="vorname" name="vorname" placeholder="Vorname" value={vorname} onChange={handleChange} />
                    </div>
                    </div>
                    <div className="...">
                    <div className="input-field">
                        <input type="text" className={`${styles['form-input']} form-input `} id="nachname" name="nachname" placeholder="Nachname" value={nachname} onChange={handleChange} />
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <div className="...">
                    <div className={`${styles['file-input-container']} col-span-full`}>
                        <label htmlFor="inputfoto" className={`${styles['file-label']} `}>Foto</label>
                        <div className={`${styles['file-input-wrapper']}  `}>
                        <input 
                            type="file" 
                            className={styles['file-input2']} 
                            id="photo" 
                            name="photo" 
                            onChange={handleChange} 
                            placeholder="1234 Main St" 
                        />
                        <img 
                            src={`\ ${selectedImg}`} 
                            alt="Description of the image" 
                            width={37} 
                            height={37} 
                            className={styles['file-icon']} 
                        />
                        </div>
                        <input type="text" className={`${styles['form-input']}  `} readOnly placeholder="Wählen Sie eine Datei aus oder ziehen Sie sie hierher" />
                    </div>
                    </div>
                </div> 
                <div className="grid grid-cols-6 gap-4 mt-7">
                    <div className="col-span-5 ...">
                    <input type="text" className={`${styles['form-input']} form-control `} id="strabe" name="strabe" placeholder="Straße" value={strabe} onChange={handleChange} />
                    </div>
                    <div className="col-span-1 ...">
                    <input type="text" className={`${styles['form-input']} form-control `} id="hausnummer" name="hausnummer" placeholder="Hausnummer" value={hausnummer} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-4 mt-7">
                    <div className="col-span-1...">
                    <input type="text" className={`${styles['form-input']} form-control `} id="PLZ" name="PLZ" placeholder="PLZ" value={PLZ} onChange={handleChange} />
                    </div>
                    <div className="col-span-5 ...">
                    <input type="text" className={`${styles['form-input']} form-control `} id="Ort" name="Ort" placeholder="Ort" value={Ort} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <div className="...">
                    <input type="email" className={`${styles['form-input']} form-control `} id="email" name="email" placeholder="E-Mail" value={email} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <div className="...">
                    <input type="tel" className={`${styles['form-input']} form-control `} id="tel" name="tel" placeholder="Tel. Mobil" value={tel} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <div className="...">
                    <input type="date" className={`${styles['form-input']} form-control `} id="geburtsdatum" name="geburtsdatum" placeholder="Geburtsdatum" value={geburtsdatum} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="...">
                    <div className="input-field">
                        <input type="text" className={`${styles['form-input']} form-input `} id="ausgeübterBeruf" name="ausgeübterBeruf" placeholder="Ausgeübter Beruf" value={ausgeübterBeruf} onChange={handleChange} />
                    </div>
                    </div>
                    <div className="...">
                    <div className="input-field">
                        <input type="text" className={`${styles['form-input']} form-input `} id="arbeitgeber" name="arbeitgeber" placeholder="Arbeitgeber" value={arbeitgeber} onChange={handleChange} />
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <div className="...">
                    <input type="number" className={`${styles['form-input']} form-control `} id="income" name="income" placeholder="Höhe des monatlichen verfügbaren Nettoeinkommens (€)" value={income} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-8 mt-5">
                    <div className="col-span-6 ...">
                        <p className={`${styles['form-input']} form-control label-text `}>Besteht dein Beschäftigungsverhältnis länger als 6 Monate?</p>
                        <textarea
                            id="textarea1"
                            name="textarea1"
                            value={textarea1}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter your text here"
                            className={`${selectedRadio1 === 'Ja' ? "block"  : "hidden"} w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    <div className="col-span-1 flex items-baseline">
                        <input className={`${styles['form-check-input']} mr-2  `} type="radio" name="employee" id="employee1" value="Ja" onChange={() => radiohandle('Ja', 'r1')} checked={selectedRadio1 === 'Ja'}  />
                        <label className={` ${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio1 === 'Ja' ? styles['black']  : ''}`} onClick={() => radiohandle('Ja', 'r1')} htmlFor="employee1">
                        Ja
                        </label>
                    </div>
                    <div className="col-span-1 flex items-baseline">
                        <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="employee" id="employee2" value="Nein" onChange={() => radiohandle('Nein', 'r1')} checked={selectedRadio1 === 'Nein'} />
                        <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio1 === 'Nein' ? styles['black']  : ''}`} onClick={() => radiohandle('Nein', 'r1')} htmlFor="employee2">Nein</label>
                    </div>
                </div>
                <div className="grid grid-cols-8 mt-5">
                    <div className="col-span-6">
                    <p className={`${styles['form-input']} form-control label-text `}>Sollen außer ihnen noch weitere Personen die Wohnung beziehen?</p>
                    <textarea
                            id="textarea2"
                            name="textarea2"
                            value={textarea2}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter your text here"
                            className={`${selectedRadio2 === 'Ja' ? "block"  : "hidden"} w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="moveappartment" id="moveappartment1" value="Ja" onChange={() => radiohandle('Ja', 'r2')} checked={selectedRadio2 === 'Ja'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${styles['radio-btn']} ${selectedRadio2 === 'Ja' ? styles['black']  : ''}`}  onClick={() => radiohandle('Ja', 'r2')}  htmlFor="moveappartment1">Ja</label>
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="moveappartment" id="moveappartment2" value="Nein"  onChange={() => radiohandle('Nein', 'r2')} checked={selectedRadio2 === 'Nein'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${styles['radio-btn']} ${selectedRadio2 === 'Nein' ? styles['black']  : ''}`}  onClick={() => radiohandle('Nein', 'r2')} htmlFor="moveappartment2">Nein</label>
                    </div>
                </div>
                <div className="grid grid-cols-8 mt-5">
                    <div className="col-span-6 ...">
                    <p className={`${styles['form-input']} form-control label-text `}>Bestehen Mietrückstände aus bisherigen Mietverhältnissen?</p>
                    <textarea
                            id="textarea3"
                            name="textarea3"
                            value={textarea3}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter your text here"
                            className={`${selectedRadio3 === 'Ja' ? "block"  : "hidden"} w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="rentareas" id="rentareas1" value="Ja"  onChange={() => radiohandle('Ja', 'r3')} checked={selectedRadio3 === 'Ja'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio3 === 'Ja' ? styles['black']  : ''}`} onClick={() => radiohandle('Ja', 'r3')} htmlFor="rentareas1">Ja</label>
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="rentareas" id="rentareas2" value="Nein"  onChange={() => radiohandle('Nein', 'r3')} checked={selectedRadio3 === 'Nein'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio3 === 'Nein' ? styles['black']  : ''}`} onClick={() => radiohandle('Nein', 'r3')} htmlFor="rentareas2">Nein</label>
                    </div>
                </div>
                <div className="grid grid-cols-8 mt-5">
                    <div className="col-span-6 ...">
                    <p className={`${styles['form-input']} form-control label-text `}>Wurde in den letzten 5 Jahren Insolvenzverfahren gegen Sie eröffnet?</p>
                    <textarea
                            id="textarea4"
                            name="textarea4"
                            value={textarea4}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter your text here"
                            className={`${selectedRadio4 === 'Ja' ? "block"  : "hidden"} w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="proceedings" id="proceedings1" value="Ja" onChange={() => radiohandle('Ja', 'r4')} checked={selectedRadio4 === 'Ja'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio4 === 'Ja' ? styles['black']  : ''}`} onClick={() => radiohandle('Ja', 'r4')}  htmlFor="proceedings1">Ja</label>
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="proceedings" id="proceedings2" value="Nein" onChange={() => radiohandle('Nein', 'r4')} checked={selectedRadio4 === 'Nein'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio4 === 'Nein' ? styles['black']  : ''}`} onClick={() => radiohandle('Nein', 'r4')}  htmlFor="proceedings2">Nein</label>
                    </div>
                </div>
                <div className="grid grid-cols-8 mt-5">
                    <div className="col-span-6 ...">
                    <p className={`${styles['form-input']} form-control label-text `}>Ist eine gewerbliche Nutzung der Wohnung beabsichtigt?</p>
                    <textarea
                            id="textarea5"
                            name="textarea5"
                            value={textarea5}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter your text here"
                            className={`${selectedRadio5 === 'Ja' ? "block"  : "hidden"} w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="apartmentintended" id="apartmentintended1" value="Ja" onChange={() => radiohandle('Ja', 'r5')} checked={selectedRadio5 === 'Ja'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio5 === 'Ja' ? styles['black']  : ''}`} onClick={() => radiohandle('Ja', 'r5')}  htmlFor="apartmentintended1">Ja</label>
                    </div>
                    <div className="col-span-1 flex items-baseline">
                    <input className={`${styles['form-check-input']} mr-2 `} type="radio" name="apartmentintended" id="apartmentintended2" value="Nein" onChange={() => radiohandle('Nein', 'r5')} checked={selectedRadio5 === 'Nein'} />
                    <label className={`${styles['form-check-label']} ${styles['radio-btn']} ${selectedRadio5 === 'Nein' ? styles['black']  : ''}`} onClick={() => radiohandle('Nein', 'r5')}  htmlFor="apartmentintended2">Nein</label>
                    </div>
                </div>
                {/* <div className="grid grid-cols-8 mt-5">
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
                </div> */}
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
    </div>
  );
};

export default application;
