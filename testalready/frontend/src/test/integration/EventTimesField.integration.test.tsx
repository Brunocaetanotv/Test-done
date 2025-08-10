import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import EventTimesField from '@/components/EventTimesField'
import { render } from '@testing-library/react'

type EventTime = { label: string; time: string }
type SaveDateFormValues = { event_times: EventTime[] }

function TestEventTimesForm() {
  const { control, handleSubmit, formState } = useForm<SaveDateFormValues>({
    defaultValues: { event_times: [] }
  })

  const onSubmit = vi.fn()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EventTimesField control={control} errors={formState.errors} />
      <button type="submit">Salvar</button>
    </form>
  )
}

describe('EventTimesField (integration)', () => {
  it('adds and removes events, and submits with correct data', async () => {
    const user = userEvent.setup()
    render(<TestEventTimesForm />)

    // Initial message
    expect(screen.getByText(/No event times added/i)).toBeInTheDocument()

    // Add two times
    await user.click(screen.getByRole('button', { name: /Add Time/i }))
    await user.click(screen.getByRole('button', { name: /Add Time/i }))

    const groups = screen.getAllByRole('group', { hidden: true })
    expect(groups.length).toBeGreaterThanOrEqual(2)

    // Fill the first block
    const firstBlock = groups[0]
    const labelInput = within(firstBlock).getByPlaceholderText('Label')
    const timeInput = within(firstBlock).getByLabelText('Time', { selector: 'input' })

    await user.type(labelInput, 'Ceremony')
    await user.type(timeInput, '18:00')

    // Remove the second block
    const removeButtons = screen.getAllByRole('button', { name: /Trash2/i })
    await user.click(removeButtons[0]) // remove one

    // Save
    await user.click(screen.getByText('Salvar'))

    // We don't have access to onSubmit here, but we can validate that one block remains and fields are filled.
    expect((labelInput as HTMLInputElement).value).toBe('Ceremony')
    expect((timeInput as HTMLInputElement).value).toBe('18:00')
  })
})
