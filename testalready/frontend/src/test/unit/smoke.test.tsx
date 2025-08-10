import { render, screen } from '@testing-library/react'

function Hello() {
  return <h1>hello</h1>
}

test('smoke', () => {
  render(<Hello />)
  expect(screen.getByText('hello')).toBeInTheDocument()
})
