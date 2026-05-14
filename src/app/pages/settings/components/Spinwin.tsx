/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../_metronic/partials'
import {API_URL} from './ApiUrl'
import {Button} from './Button'
import {SettingsName} from './SettingsName'

const Spinwin: FC = () => {
  const [values, setValue] = useState<any>({
    background: '',
    nob: '',
    circle: '',
    circle_border: '',
    circle_border_gif: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/spin-the-wheel`)
      .then((data: AxiosResponse<any>) => {
        if (data.data != null) {
          const newvalues = JSON.parse(data.data.value)
          setValue(newvalues)
        }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const uploadImage = async (e: any) => {
    const {name} = e.currentTarget
    const file = e.currentTarget.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await axios
      .post(`${API_URL}/upload`, fd)
      .then((data: AxiosResponse<any>) => {
        setValue({...values, [name]: data.data})
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const onChange = (e: any) => {
    const {name, value} = e.target
    setValue({...values, [name]: value})
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'spin-the-wheel'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form'>
            <div className='fv-row w-100 mb-10'>
              <label className='d-block form-label'>Spin Wheel Background Image</label>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <img
                  src={
                    values.background != ''
                      ? values.background
                      : toAbsoluteUrl('/media/svg/avatars/blank.svg')
                  }
                  alt='avatar'
                  className='image-input-wrapper w-225px h-225px'
                />
                <label
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  title='Change avatar'
                >
                  <i className='bi bi-pencil-fill fs-7'></i>
                  <input
                    type='file'
                    name='background'
                    accept='.png, .jpg, .jpeg'
                    onChange={uploadImage}
                  />
                  <input type='hidden' name='avatar_remove' />
                </label>
                {values.background != '' && (
                  <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={() => setValue({...values, background: ''})}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                )}
              </div>
              <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            </div>
            <div className='fv-row w-100 mb-10'>
              <label className='d-block form-label'>Spin Wheel Nob Image</label>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <img
                  src={
                    values.nob != '' ? values.nob : toAbsoluteUrl('/media/svg/avatars/blank.svg')
                  }
                  alt='avatar'
                  className='image-input-wrapper w-225px h-225px'
                />
                <label
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  title='Change avatar'
                >
                  <i className='bi bi-pencil-fill fs-7'></i>
                  <input
                    type='file'
                    name='nob'
                    accept='.png, .jpg, .jpeg'
                    onChange={uploadImage}
                  />
                  <input type='hidden' name='avatar_remove' />
                </label>
                {values.nob != '' && (
                  <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={() => setValue({...values, nob: ''})}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                )}
              </div>
              <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            </div>
            <div className='fv-row w-100 mb-10'>
              <label className='d-block form-label'>Spin Wheel Circle Image</label>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <img
                  src={
                    values.circle != ''
                      ? values.circle
                      : toAbsoluteUrl('/media/svg/avatars/blank.svg')
                  }
                  alt='avatar'
                  className='image-input-wrapper w-225px h-225px'
                />
                <label
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  title='Change avatar'
                >
                  <i className='bi bi-pencil-fill fs-7'></i>
                  <input
                    type='file'
                    name='circle'
                    accept='.png, .jpg, .jpeg'
                    onChange={uploadImage}
                  />
                  <input type='hidden' name='avatar_remove' />
                </label>
                {values.circle != '' && (
                  <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={() => setValue({...values, circle: ''})}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                )}
              </div>
              <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            </div>
            <div className='fv-row w-100 mb-10'>
              <label className='d-block form-label'>Spin Wheel Circle Border Image</label>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <img
                  src={
                    values.circle_border != ''
                      ? values.circle_border
                      : toAbsoluteUrl('/media/svg/avatars/blank.svg')
                  }
                  alt='avatar'
                  className='image-input-wrapper w-225px h-225px'
                />
                <label
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  title='Change avatar'
                >
                  <i className='bi bi-pencil-fill fs-7'></i>
                  <input
                    type='file'
                    name='circle_border'
                    accept='.png, .jpg, .jpeg'
                    onChange={uploadImage}
                  />
                  <input type='hidden' name='avatar_remove' />
                </label>
                {values.circle_border != '' && (
                  <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={() => setValue({...values, circle_border: ''})}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                )}
              </div>
              <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            </div>
            <div className='fv-row w-100 mb-5'>
              <label className='d-block form-label'>Spin Wheel Circle Border GIF Image</label>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <img
                  src={
                    values.circle_border_gif != ''
                      ? values.circle_border_gif
                      : toAbsoluteUrl('/media/svg/avatars/blank.svg')
                  }
                  alt='avatar'
                  className='image-input-wrapper w-225px h-225px'
                />
                <label
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  title='Change avatar'
                >
                  <i className='bi bi-pencil-fill fs-7'></i>
                  <input
                    type='file'
                    name='circle_border_gif'
                    accept='.png, .jpg, .jpeg, .gif'
                    onChange={uploadImage}
                  />
                  <input type='hidden' name='avatar_remove' />
                </label>
                {values.circle_border_gif != '' && (
                  <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={() => setValue({...values, circle_border_gif: ''})}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                )}
              </div>
              <div className='form-text'>Allowed file types: png, jpg, jpeg, gif.</div>
            </div>
            <Button  />
          </form>
        </div>
      </div>
    </div>
  )
}

export {Spinwin}
