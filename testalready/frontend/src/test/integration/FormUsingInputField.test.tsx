import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from '@/components/InputField'
import { render } from '@testing-library/react'

type FormModel = { email: string; pwd: string }

function TestForm({ onSubmit }: { onSubmit: SubmitHandler<FormModel> }) {
  const methods = useForm<FormModel>({ defaultValues: { email: '', pwd: '' } })
  const { handleSubmit, control } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField name="email" control={control} label="E-mail" autocomplete="email" />
      <InputField name="pwd" control={control} label="Senha" type="password" />
      <button type="submit">Enviar</button>
    </form>
  )
}

describe('Form integration with InputField', () => {
  it('preenche campos e envia com os valores corretos', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<TestForm onSubmit={onSubmit} />)

    const email = screen.getByPlaceholderText('E-mail')
    const pwd = screen.getByPlaceholderText('Senha')

    await user.type(email, 'user@test.dev')
    await user.type(pwd, '123456')

    // testa toggle do password pra garantir integração
    const toggle = screen.getByRole('button')
    await user.click(toggle)
    expect((pwd as HTMLInputElement).type).toBe('text')

    await user.click(screen.getByText('Enviar'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0]).toEqual({ email: 'user@test.dev', pwd: '123456' })
  })
})
