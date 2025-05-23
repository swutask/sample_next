import React,{useEffect} from 'react'
import { HeroUIProvider} from "@heroui/react";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  return (
    <SessionProvider session={session}>
    <HeroUIProvider>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" hideProgressBar={true}/>
    </HeroUIProvider>
    </SessionProvider>
  )
}

export default MyApp
