'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Stepper } from '@/elements/root/stepper/stepper'

import { PullsByRepo } from '@/components/github/root/pulls-by-repo/pulls-by-repo'
import { PullsSortTable } from '@/components/github/root/pulls-sort-table/pulls-sort-table'

const steps = [
  {
    value: 1,
    label: 'Select what you want to merge'
  },
  {
    value: 2,
    label: 'Sort the list and then submit'
  }
]

// just using a client component not to think too much about it
export default function Page() {
  const [currentStep, setCurrentStep] = useState(0)
  const handlePrevClick = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Button onClick={handlePrevClick}>Prev</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
      <Stepper currentStep={currentStep} steps={steps} />
      {currentStep === 0 && <PullsByRepo />}
      {currentStep === 1 && <PullsSortTable />}
    </div>
  )
}
