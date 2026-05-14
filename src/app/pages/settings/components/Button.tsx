import axios, {AxiosResponse} from 'axios'
import React, {FC} from 'react'
import Swal from 'sweetalert2'
import {API_URL} from './ApiUrl'

const Button: FC = () => {
  return (
    <div className='d-flex flex-stack pt-15'>
      <div className='mr-2'></div>
      <button type='submit' className='btn btn-lg btn-primary me-3'>
        <span className='indicator-label'>Save Setting</span>
      </button>
    </div>
  )
}
export {Button}
