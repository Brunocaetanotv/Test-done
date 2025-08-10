import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => cleanup())

vi.mock('lucide-react', () => {
  const Mock = (props: any) => <svg data-testid="icon" {...props} />
  return new Proxy({}, { get: () => Mock })
})