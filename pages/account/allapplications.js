import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import MyDocument from '@/components/MyDocument';
import Image from 'next/image';
import UserNav from '@/components/UserNav';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

const allapplications = () => {
  const [cvdata, setCvdata] = useState(null);

  useEffect(() => {
    // Fetch the profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api//user/allapplications`);
        setCvdata(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);
 
  if (!cvdata) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <UserNav />
     <div className="flex">
         {cvdata.map(profile => (
          <div key={profile._id} className="profile">
            <PDFDownloadLink document={<MyDocument profileData={profile} />} fileName="profile.pdf">
            {({ loading }) => (
              <div className="m-5">
                <Image src="/pdf.jpeg" alt="Download" width={50} height={50} />
                {loading ? 'Loading document...' : 'Download PDF'}
              </div>
            )}
            </PDFDownloadLink>
          </div>
        ))}
    </div>
    </>
   
    // <div>
    //   <h1>All Profiles</h1>
    //   <div>
    //     {cvdata.map(profile => (
    //       <div key={profile._id} className="profile">
    //         <h2>{profile.name}</h2>
    //         <p>Email: {profile.email}</p>
    //         <p>Age: {profile.age}</p>
    //         {/* Add other profile fields here */}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}

export default allapplications;
