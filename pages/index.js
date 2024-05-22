import Head from "next/head";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

import React, { useState } from 'react';
import HomeContent from "@/components/HomeContent";




const Home = () => {
  return (
   <>
      <Head>
      <title>CV Maker</title>
      <meta name="description" content="cvmaker.com - CV  Maker"/>
      </Head>

      <Nav/>
      <HomeContent/>
      <Footer />
   </>
  );
}
export default Home