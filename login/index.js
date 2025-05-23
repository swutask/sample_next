import React from 'react'
import styles from '../../styles/Login.module.css'
import Seo from '../../components/seo'
import {TextInput} from '../../components/form/inputs'
import {Rounded} from '../../components/buttons'
import Image from 'next/image'
import Validations from '../../services/validation'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import RingLoader from "react-spinners/RingLoader";
import Link from 'next/link'
import { Checkbox} from "@heroui/react";
import App from 'components/modal/third-party'
import FilterOptions from 'components/filter'

const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null

class Login extends React.Component {

  componentDidMount() {
    new WOW().init()
      // const router = useRouter()
  }

  state ={
    username:'',
    errorUsername:'',
    btnLoading:false,

    password:'',
    errorPassword:'',
    type:'password',
  }

  handleSubmit(){
    this.setState({errorPassword:'',errorUsername:''});
    let error =  false;
      if(Validations.isEmpty(this.state.username)){
        this.setState({errorUsername:'Email cannot be blank.'})
        error=true;
      }else if(!Validations.isEmail(this.state.username)){
        this.setState({errorUsername:'Enter a valid email address.'})
        error=true;
      }

      if(Validations.isEmpty(this.state.password)){
        this.setState({errorPassword:'Password cannot be blank.'})
        error=true;
      }
      

      if(!error){
        this.login();
      }

  }

  async login(){
    this.setState({btnLoading:true});
    let response = await signIn("credentials", { username: this.state.username, password: this.state.password,redirect:false});
       
    if(!response.ok){     
    this.setState({btnLoading:false});

      this.setState({errorPassword:'Invalid Username Or Password!'})
    }else{
      localStorage.setItem('startDate','');
      localStorage.setItem('endDate','');
      
       this.props.router.push('/dashboard')
    }
  }
  

 render() {
  return (
    <div className={styles.container}>
     <Seo title={'Semart - Login'} description={'Login'} />

      <main className={'d-flex'}>
       <section className={styles.row}>
          {console.log(process.env.HOST_URL)}
       </section>
       <section className={`wow zoomIn ${styles.form}`}>
        <Image src={'/logo.png'} width={170} height={50} layout="fixed" alt='image' />
          <form style={{paddingTop:10}} >
              <TextInput label={'Email ID*'} placeholder={'yourname@company.com'} error={this.state.errorUsername} onChange={(username)=>{this.setState({username,errorUsername:''})}}/>
              <TextInput label={'Password*'} showPassword={(type)=>{this.setState({type})}} placeholder={'*********'} type={this.state.type} error={this.state.errorPassword} onChange={(password)=>{this.setState({password,errorPassword:''})}}/>
              <div className={'d-flex justify-content-between'}>
                <div className={styles.checkbox}>
                  <Checkbox size='sm' defaultSelected={false} >
                    Keep me signed in
                  </Checkbox>
                </div>
                <Link  href="/forgot" className={styles.p}>Forgot Password?</Link>
                </div>
                <div className={styles.btnContainer}>
                  <Rounded isLoading={this.state.btnLoading} label={'Login'} onClick={()=>this.handleSubmit()}/>
                </div>
                <div className='d-flex mt-4 justify-content-center'>
                <p className={styles.p} style={{paddingRight:10}}>Don&apos;t have an account? </p> 
                {/* <a  href="https://semart.my/product-category/subscription/" target="__blank" style={{color:'#7f63f4'}}>Create an Account</a> */}
                <Link href="/signUp" className={styles.p}>
                  Create an Account
                </Link>
                </div>
          </form>
       </section>
      </main>
    </div>
  )
 }
}



const  LoginScreen = (props)=>{
  const router = useRouter()
  const { data: session, status } = useSession()
  React.useEffect(()=>{
    if(status!='loading') {
    if(status=='authenticated'){
      router.push('/dashboard')
    }
  }
  },[status])

  return (status!='authenticated' && status!='loading') && <Login  {...props} router={router}/> ||
  (<div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
  <RingLoader

      color={'#0058ff'}
      loading={true}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>)
}
export default LoginScreen;
