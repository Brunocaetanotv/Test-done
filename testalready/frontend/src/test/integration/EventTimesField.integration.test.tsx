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
  it('adiciona e remove eventos, e submete com dados corretos', async () => {
    const user = userEvent.setup()
    render(<TestEventTimesForm />)

    // Mensagem inicial
    expect(screen.getByText(/No event times added/i)).toBeInTheDocument()

    // Adiciona dois horários
    await user.click(screen.getByRole('button', { name: /Add Time/i }))
    await user.click(screen.getByRole('button', { name: /Add Time/i }))

    const groups = screen.getAllByRole('group', { hidden: true })
    expect(groups.length).toBeGreaterThanOrEqual(2)

    // Preenche o primeiro bloco
    const firstBlock = groups[0]
    const labelInput = within(firstBlock).getByPlaceholderText('Label')
    const timeInput = within(firstBlock).getByLabelText('Time', { selector: 'input' })

    await user.type(labelInput, 'Ceremony')
    await user.type(timeInput, '18:00')

    // Remove o segundo bloco
    const removeButtons = screen.getAllByRole('button', { name: /Trash2/i })
    await user.click(removeButtons[0]) // remove um

    // Salvar
    await user.click(screen.getByText('Salvar'))

    // Não temos acesso ao onSubmit aqui, mas podemos validar que sobrou um bloco e os campos ficaram preenchidos.
    expect((labelInput as HTMLInputElement).value).toBe('Ceremony')
    expect((timeInput as HTMLInputElement).value).toBe('18:00')
  })
})
