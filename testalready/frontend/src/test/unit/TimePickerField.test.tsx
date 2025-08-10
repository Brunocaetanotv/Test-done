import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TimePickerField from '@/components/TimePickerField'
import { renderWithForm } from '@/test/__utils__/renderWithForm'


type FormModel = { start: string }

describe('TimePickerField (unit)', () => {
  it('renderiza com valor inicial vazio e permite selecionar horário', async () => {
    const user = userEvent.setup()
    renderWithForm<FormModel>((methods) => (
      <TimePickerField control={methods.control} name="start" label="Início" description="Selecione um horário" />
    ), { defaultValues: { start: '' } })

    const input = screen.getByLabelText('Início', { selector: 'input' }) as HTMLInputElement
    expect(input.value).toBe('')

    await user.type(input, '09:30')
    expect(input.value).toBe('09:30')
  })

  it('mostra erro quando fornecido', () => {
    renderWithForm<FormModel>((methods) => (
      <TimePickerField
        control={methods.control}
        name="start"
        label="Início"
        error={{ type: 'manual', message: 'Horário inválido' } as any}
      />
    ))
    expect(screen.getByText('Horário inválido')).toBeInTheDocument()
  })

  it('mostra descrição quando não há erro', () => {
    renderWithForm<FormModel>((methods) => (
      <TimePickerField
        control={methods.control}
        name="start"
        label="Início"
        description="Formato 24h"
      />
    ))
    expect(screen.getByText('Formato 24h')).toBeInTheDocument()
  })
})
