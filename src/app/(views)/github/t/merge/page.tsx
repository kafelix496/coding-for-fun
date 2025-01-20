'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Stepper } from '@/elements/root/stepper/stepper'

import { PullsByRepo } from '@/components/github/root/pulls-by-repo/pulls-by-repo'
import { PullsSortTable } from '@/components/github/root/pulls-sort-table/pulls-sort-table'

import { useFilterChange } from '@/contexts/github/root/filter-provider/filter-provider'

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
  const { installationFilteredRepos } = useFilterChange()
  const [currentStep, setCurrentStep] = useState(0)
  const handlePrevClick = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleNextClick = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Button onClick={handlePrevClick}>Prev</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
      <Stepper currentStep={currentStep} steps={steps} />
      {currentStep === 0 && <PullsByRepo repos={installationFilteredRepos} />}
      {currentStep === 1 && (
        <PullsSortTable repos={installationFilteredRepos} />
      )}
    </div>
  )
}
