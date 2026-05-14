import React, { useState } from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useAuth } from '../core/Auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { verify, resend } from '../core/_requests'
import OtpInput from 'react-otp-input';
import { errrorMessage, successMessage } from './ToastComp'



const VerifyOtp = (props) => {
    const { state } = useLocation()
    const { saveAuth, setCurrentUser, auth } = useAuth()
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState()
  const navigate=useNavigate()

    const submit = async (e) => {
        setLoading(true)
        try {
            const { data } = await verify(state.phone_number, otp)
            if(data?.success){
                successMessage(data?.message)
                setCurrentUser(state)
                setLoading(false)              
               navigate("/dashboard")
            }else{
                errrorMessage(data?.message)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
            saveAuth(undefined)
            setLoading(false)
        }
    }

    const resendOtp = async () => {
        setStatus()
        try {
            const { data } = await resend(state.phone_number)
            if(data?.success){
                setStatus(data?.data)
              successMessage(data?.message)
            }else{
                errrorMessage(data?.message)
            }
        } catch (error) {
            console.log(error)
            setStatus(error)
        }
    }

    return (
        <div className="">
            {/* <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: toAbsoluteUrl('assets/media/illustrations/sketchy-1/14.png')}}> */}
            {/* <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20"> */}
            {/* <a href="../../demo1/dist/index.html" className="mb-12">
                        <img alt="Logo" src="assets/media/logos/logo-1.svg" className="h-40px" />
                    </a> */}
            {/* <div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto"> */}
            {/* <form className="form w-100" noValidate id="kt_login_signin_form" onSubmit={submit}> */}
            <div className="text-center mb-10">
                <img alt="Logo" className="mh-125px" src={toAbsoluteUrl('/media/svg/misc/smartphone.svg')} />
            </div>
            <div className="text-center mb-10">
                <h1 className="text-dark mb-3">Two Step Verification</h1>
                <div className="text-muted fw-bold fs-5 mb-5">Enter the verification code we sent to</div>
                <div className="fw-bolder text-dark fs-3" style={{ letterSpacing: 3 }}>+91{state?.phone_number}</div>
            </div>
            <div className="mb-10">
                <div className="fw-bolder text-start text-dark fs-6 mb-1 ms-1">Type your 6 digit security code</div>
                <div className="d-flex flex-wrap flex-stack">
                    <OtpInput
                        value={otp}
                        onChange={(otp) => { setOtp(otp); setStatus() }}
                        numInputs={6}
                        shouldAutoFocus={true}
                        separator={<span> </span>}
                        inputStyle={'form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2'}
                    />
                    {/* <input type="text" data-inputmask="'mask': '9', 'placeholder': ''" maxLength="1" className="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" />
                        <input type="text" data-inputmask="'mask': '9', 'placeholder': ''" maxLength="1" className="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" />
                        <input type="text" data-inputmask="'mask': '9', 'placeholder': ''" maxLength="1" className="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" />
                        <input type="text" data-inputmask="'mask': '9', 'placeholder': ''" maxLength="1" className="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" />
                        <input type="text" data-inputmask="'mask': '9', 'placeholder': ''" maxLength="1" className="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" />
                        <input type="text" data-inputmask="'mask': '9', 'placeholder': ''" maxLength="1" className="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" /> */}
                </div>
                <div style={{ color: status?.type == 'error' ? 'red' : 'green', fontSize: 13 }}>{status?.message}</div>
            </div>
            <div className="text-center">
                <button type='button'
                    onClick={submit}
                    id="kt_sign_in_submit"
                    className="btn btn-lg btn-primary fw-bolder"
                    disabled={(otp.length < 6) || loading}>
                    {!loading && <span className="indicator-label"><i className="fas fa-user-check fs-2"></i> Verify OTP</span>}
                    {loading && <span className="indicator-progress" style={{ display: 'block' }}>Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
                </button>
            </div>
            {/* </form> */}
            <div className="text-center mt-5 fw-bold fs-5">
                <span className="text-muted me-1">Didn’t get the code ?</span>
                <button onClick={resendOtp} className="link-primary fw-bolder fs-5 me-1 border-0" style={{ backgroundColor: '#fff' }}>Resend</button>
                {/* <span className="text-muted me-1">or</span>
                <a href="#" className="link-primary fw-bolder fs-5">Call Us</a> */}
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* <div className="d-flex flex-center flex-column-auto p-10">
                    <div className="d-flex align-items-center fw-bold fs-6">
                        <a href="https://keenthemes.com" className="text-muted text-hover-primary px-2">About</a>
                        <a href="mailto:support@keenthemes.com" className="text-muted text-hover-primary px-2">Contact</a>
                        <a href="https://1.envato.market/EA4JP" className="text-muted text-hover-primary px-2">Contact Us</a>
                    </div>
                </div> */}
            {/* </div> */}
        </div >
    )
}

export default VerifyOtp