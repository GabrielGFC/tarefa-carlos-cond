import React from 'react';

interface StepperNavProps {
  step: number;
  categories: string[];
}

export default function StepperNav({ step, categories }: StepperNavProps) {
  return (
    <div className="stepper">
      {categories.map((label, index) => (
        <div key={label} className={`step ${step === index ? 'active' : ''}`}>
          <span>{index + 1}. {label}</span>
        </div>
      ))}
    </div>
  );
}