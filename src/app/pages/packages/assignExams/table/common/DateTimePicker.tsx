import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "./css/index.css"
import dayjs, { Dayjs } from 'dayjs';

export default function DateTimePickerComponent({getDateAndTyme,dateValue}:any) {
    const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateTimePicker'
        ]}
      >
          <DateTimePicker value={value}
           onChange={(e:any)=>{
              setValue(dayjs(dateValue) || null)
              getDateAndTyme(e?.$d)
           }}
          />     
      </DemoContainer>
    </LocalizationProvider>
  );
}