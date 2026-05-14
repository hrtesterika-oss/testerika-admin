import React from 'react'
import { CSVLink } from 'react-csv'
import {KTSVG} from '../../../../../_metronic/helpers'

export const ExportReactCSV = ({ csvData, fileName }) => {
    return (
        <button type='button' className='btn btn-light-primary me-3'>
            <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
        </button>

    )
}