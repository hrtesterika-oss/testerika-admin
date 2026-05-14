import React, {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  active: string
}

const SettingsName: FC<Props> = ({active}) => {
  const Navigate = useNavigate()
  const dispatch=useDispatch()
  const {asideMenuUrl}=useSelector((state:any)=>state?.reducerData)
  const settings = [
    asideMenuUrl?.some((url: string) => url.includes("general")) ? {name: 'general', icon: '001'} : null,
    asideMenuUrl?.some((url: string) => url.includes("company-information")) ? {name: 'company-information', icon: '002'} : null,
    asideMenuUrl?.some((url: string) => url.includes("localization")) ? {name: 'localization', icon: '003'} : null,
    asideMenuUrl?.some((url: string) => url.includes("email")) ? {name: 'email', icon: '004'} : null,
    asideMenuUrl?.some((url: string) => url.includes("finance")) ? {name: 'finance', icon: '005'} : null,
    asideMenuUrl?.some((url: string) => url.includes("payment-gateways")) ? {name: 'payment-gateways', icon: '006'} : null,
    asideMenuUrl?.some((url: string) => url.includes("customers")) ? {name: 'customers', icon: '007'} : null,
    asideMenuUrl?.some((url: string) => url.includes("PDF")) ? {name: 'PDF', icon: '008'} : null,
    asideMenuUrl?.some((url: string) => url.includes("SMS")) ? {name: 'SMS', icon: '009'} : null,
    asideMenuUrl?.some((url: string) => url.includes("cron-jobs")) ? {name: 'cron-jobs', icon: '010'} : null,
    asideMenuUrl?.some((url: string) => url.includes("misc")) ? {name: 'misc', icon: '011'} : null,
    asideMenuUrl?.some((url: string) => url.includes("cash-bonus")) ? {name: 'cash-bonus', icon: '012'} : null,
    asideMenuUrl?.some((url: string) => url.includes("wallet-minimun-balance")) ? {name: 'wallet-minimun-balance', icon: '013'} : null,
    asideMenuUrl?.some((url: string) => url.includes("app-current-version")) ? {name: 'app-current-version', icon: '014'} : null,
    asideMenuUrl?.some((url: string) => url.includes("spin-the-wheel")) ? {name: 'spin-the-wheel', icon: '015'} : null,
    asideMenuUrl?.some((url: string) => url.includes("quizophy-AWS-settings")) ? {name: 'quizophy-AWS-settings', icon: '016'} : null,
    asideMenuUrl?.some((url: string) => url.includes("aside-menu-status")) ? {name: 'aside-menu-status', icon: '017'} : null,
  ].filter(Boolean) as {name: string, icon: string}[]
  return (
    <div className='flex-column flex-lg-row-auto w-100 w-lg-275px mb-10 mb-lg-0'>
      <div
        className='card card-flush'>
        <div className='card-body' id='kt_chat_contacts_body'>
          <div className='menu menu-column menu-rounded menu-state-bg menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary mb-10'>
            {settings?.map((item, i) => (
              <div
                key={i}
                className='menu-item mb-3'
                onClick={() => {
                  if(item?.name==="general") dispatch({type:"setNavItemValue",payload:"General"})
                  if(item?.name==="company-information") dispatch({type:"setNavItemValue",payload:"Company Information"})
                  if(item?.name==="localization") dispatch({type:"setNavItemValue",payload:"Localization"})
                  if(item?.name==="email") dispatch({type:"setNavItemValue",payload:"Email"})
                  if(item?.name==="finance") dispatch({type:"setNavItemValue",payload:"Finance"})
                  if(item?.name==="payment-gateways") dispatch({type:"setNavItemValue",payload:"Payment Gateways"})
                  if(item?.name==="PDF") dispatch({type:"setNavItemValue",payload:"PDF"})
                  if(item?.name==="SMS") dispatch({type:"setNavItemValue",payload:"SMS"})
                  if(item?.name==="cron-jobs") dispatch({type:"setNavItemValue",payload:"Cron Jobs"})
                  if(item?.name==="misc") dispatch({type:"setNavItemValue",payload:"Misc"})
                  if(item?.name==="cash-bonus") dispatch({type:"setNavItemValue",payload:"Cash Bonus"})
                  if(item?.name==="wallet-minimun-balance") dispatch({type:"setNavItemValue",payload:"Wallet Minimun Balance"})
                  if(item?.name==="app-current-version") dispatch({type:"setNavItemValue",payload:"App Current Version"})
                  if(item?.name==="spin-the-wheel") dispatch({type:"setNavItemValue",payload:"Spin The Wheel"})
                  if(item?.name==="quizophy-AWS-settings") dispatch({type:"setNavItemValue",payload:"Quizophy AWS Settings"}) 
                  if(item?.name==="aside-menu-status") dispatch({type:"setNavItemValue",payload:"Aside Menu Status"}) 
                  Navigate(`/settings/${item?.name}`)
                }}
              >
                <span className={`menu-link ${active == item?.name ? 'active' : ''}`}>
                  <span className='menu-icon'>
                    <span className='svg-icon svg-icon-2 me-3'>
                      <KTSVG
                        path={`/media/icons/duotune/general/gen${item?.icon}.svg`}
                        className='svg-icon-2'
                      />
                    </span>
                  </span>
                  <span className='menu-title' style={{textTransform: 'capitalize'}}>
                    {item?.name?.replace(/-/g, ' ')}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export {SettingsName}
