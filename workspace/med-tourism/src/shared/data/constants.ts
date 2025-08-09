export type ProcedureOption = { value: string; label: string }

export const procedures: ProcedureOption[] = [
  { value: 'dental_implants', label: 'Dental Implants (single/multiple/All-on-4)' },
  { value: 'hip_replacement', label: 'Hip Replacement Surgery' },
  { value: 'knee_replacement', label: 'Knee Replacement Surgery' },
  { value: 'heart_bypass', label: 'Heart Bypass Surgery' },
  { value: 'cosmetic_surgery', label: 'Cosmetic Surgery (breast augmentation/tummy tuck/BBL)' },
  { value: 'cataract_surgery', label: 'Cataract Surgery' },
  { value: 'ivf_treatment', label: 'IVF Treatment' },
  { value: 'weight_loss_surgery', label: 'Weight Loss Surgery (gastric sleeve/bypass)' },
]

export const topCountries = [
  'Mexico', 'Turkey', 'Thailand', 'India', 'Costa Rica', 'Poland', 'Hungary', 'Colombia', 'Malaysia', 'Vietnam', 'Czech Republic'
]