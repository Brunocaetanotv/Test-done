import { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

type Options<T> = RenderOptions & {
  defaultValues?: T
}

export function renderWithForm<T extends Record<string, any>>(
  ui: (methods: ReturnType<typeof useForm<T>>) => ReactNode,
  { defaultValues, ...options }: Options<T> = {}
) {
  function Wrapper() {
    const methods = useForm<T>({ defaultValues })
    return <FormProvider {...methods}>{ui(methods)}</FormProvider>
  }

  return render(<Wrapper />, options)
}
