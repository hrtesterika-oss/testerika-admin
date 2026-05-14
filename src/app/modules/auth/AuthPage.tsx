/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import VerifyOtp from './components/VerifyOtp'
import { ResetPassword } from './components/ResetPassword'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid'>
      <div
        className='d-flex flex-column flex-lg-row-auto w-xl-600px positon-xl-relative'
        style={{backgroundColor: '#F2C98A'}}
      >
        <div className='d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y'>
          <div className='d-flex flex-row-fluid flex-column text-center p-10 pt-lg-20'>
            <a href='../../demo1/dist/index.html' className='py-9 mb-5'>
              <img alt='Logo' src={toAbsoluteUrl('/media/logos/app-icon.png')} className='h-60px' />
            </a>
            <h1 className='fw-bolder fs-2qx pb-5 pb-md-10' style={{color: '#986923'}}>
              Welcome to Testerika
            </h1>

            <p className='fw-bold fs-2' style={{color: '#986923'}}>
              Manage your dashboard
              <br />
              after login here
            </p>
          </div>
          {/* <div
            className='d-flex flex-row-auto'
            style={{
              backgroundImage: `url(${toAbsoluteUrl}('/media/illustrations/sketchy-1/13.png'))`,
              position: 'absolute',
              backgroundSize: 'cover',
            }}
          ></div> */}
          						<div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" style={{backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/13.png')})`}}></div>

        </div>
      </div>
      <div className='d-flex flex-column flex-lg-row-fluid py-10'>
        <div className='d-flex flex-center flex-column flex-column-fluid'>
          <div className='w-lg-500px p-10 p-lg-15 mx-auto'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>

    // <div
    //   className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
    //   style={{
    //     backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
    //   }}
    // >
    //   {/* begin::Content */}
    //   <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
    //     {/* begin::Logo */}
    //     {/* <a href='#' className='mb-12'>
    //       <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo-1.svg')} className='h-45px' />
    //     </a> */}
    //     {/* end::Logo */}
    //     {/* begin::Wrapper */}
    //     <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
    //       <Outlet />
    //     </div>
    //     {/* end::Wrapper */}
    //   </div>
    //   {/* end::Content */}
    //   {/* begin::Footer */}
    //   <div className='d-flex flex-center flex-column-auto p-10'>
    //     <div className='d-flex align-items-center fw-bold fs-6'>
    //       {/* <a href='#' className='text-muted text-hover-primary px-2'>
    //         About
    //       </a> */}

    //       {/* <a href='#' className='text-muted text-hover-primary px-2'>
    //         Contact
    //       </a> */}

    //       {/* <a href='#' className='text-muted text-hover-primary px-2'>
    //         Contact Us
    //       </a> */}
    //     </div>
    //   </div>
    //   {/* end::Footer */}
    // </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      {/* <Route path='registration' element={<Registration />} /> */}
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />

      <Route path='verify-otp' element={<VerifyOtp />} />
      <Route index element={<Login />} />
      <Route path="*" element={<Login />} />

    </Route>
  </Routes>
)

export {AuthPage}
