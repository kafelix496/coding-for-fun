'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dropdown } from '@/elements/root/dropdown/dropdown'
import { RadioGroup } from '@/elements/root/radio-group/radio-group'

export default function Page() {
  const [radioValue, setRadioValue] = useState('3')
  const [dropdownRadioValue, setDropdownRadioValue] = useState('3')
  const values = [
    {
      value: '1',
      label: 'Test 1'
    },
    {
      value: '2',
      label: 'Test 2'
    },
    {
      value: '3',
      label: 'Test 3'
    }
  ]

  return (
    <div>
      {/* <Button variant="contained" /> */}
      {/* <Button variant="outlined" /> */}

      <h4>radio group example</h4>
      <div className="mt-3"></div>
      <RadioGroup
        className="flex-col"
        value={radioValue}
        onValueChange={setRadioValue}
        values={values}
      />

      <h4>dropdown example</h4>
      <div className="mt-3"></div>
      <Dropdown
        type="radio"
        data={{
          groups: [{ label: 'test', items: values }],
          value: dropdownRadioValue,
          onValueChange: setDropdownRadioValue
        }}
      >
        <Button>Dropdown</Button>
      </Dropdown>
    </div>
  )
}
