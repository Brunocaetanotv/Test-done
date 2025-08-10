import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TimePickerField from '@/components/TimePickerField'
import { renderWithForm } from '@/test/__utils__/renderWithForm'


type FormModel = { start: string }

describe('TimePickerField (unit)', () => {
  it('renders with empty initial value and allows time selection', async () => {
    const user = userEvent.setup()
    renderWithForm<FormModel>((methods) => (
      <TimePickerField control={methods.control} name="start" label="Start" description="Select a time" />
    ), { defaultValues: { start: '' } })

    const input = screen.getByLabelText('Start', { selector: 'input' }) as HTMLInputElement
    expect(input.value).toBe('')

    await user.type(input, '09:30')
    expect(input.value).toBe('09:30')
  })

  it('shows error when provided', () => {
    renderWithForm<FormModel>((methods) => (
      <TimePickerField
        control={methods.control}
        name="start"
        label="Start"
        error={{ type: 'manual', message: 'Invalid time' } as any}
      />
    ))
    expect(screen.getByText('Invalid time')).toBeInTheDocument()
  })

  it('shows description when there is no error', () => {
    renderWithForm<FormModel>((methods) => (
      <TimePickerField
        control={methods.control}
        name="start"
        label="Start"
        description="24h format"
      />
    ))
    expect(screen.getByText('24h format')).toBeInTheDocument()
  })
})
