import React, {FC} from 'react'
import {KTSVG} from '../../../_metronic/helpers'

type Props = {
  templates: any
  onClose: any
  onCreate: any
}

const TemplateModal: FC<Props> = ({templates, onClose, onCreate}) => {
  return (
    <>
      <div
        className='modal fade show d-block'
        id='exampleModalScrollable'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='staticBackdrop'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-scrollable' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Create a new Quiz
              </h5>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={onClose}
                style={{cursor: 'pointer'}}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
            </div>
            <div className='modal-body' style={{height: 300}}>
              <div className='row'>
                <div
                  className='col-md-6 mx-auto'
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h4>New Quiz</h4>
                  <button className='btn btn-sm btn-primary' onClick={onClose}>
                    Create
                  </button>
                </div>
                {templates?.map((item: any, i: any) => (
                  <div
                    key={i}
                    className='col-md-6 mx-auto'
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <h4>{item.name}</h4>
                    <button className='btn btn-sm btn-primary' onClick={() => onCreate(item)}>
                      Create
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-light-primary font-weight-bold'
                data-dismiss='modal'
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}
export {TemplateModal}
