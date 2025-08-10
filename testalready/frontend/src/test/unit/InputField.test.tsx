import { render, screen } from '@testing-library/react'

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  Controller: ({ render, name, control }: any) => {
    return render({ 
      field: { 
        value: '', 
        onChange: vi.fn(), 
        onBlur: vi.fn(), 
        name 
      } 
    })
  },
  useForm: () => ({
    control: {
      register: vi.fn(),
      unregister: vi.fn(),
      getFieldState: vi.fn(),
      _names: {
        array: new Set(),
        mount: new Set(),
        unMount: new Set(),
        watch: new Set(),
        focus: '',
        watchAll: false
      },
      _subjects: {
        watch: vi.fn(),
        array: vi.fn(),
        state: vi.fn(),
        remove: vi.fn(),
        reset: vi.fn()
      },
      _formState: {
        isDirty: false,
        isValidating: false,
        isSubmitting: false,
        isSubmitted: false,
        isSubmitSuccessful: false,
        errors: {}
      }
    }
  })
}))

// Mock the Input component
vi.mock('../../components/ui/input', () => ({
  Input: ({ placeholder, ...props }: any) => <input placeholder={placeholder} {...props} />
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Eye: () => <span data-testid="eye-icon">👁️</span>,
  EyeOff: () => <span data-testid="eye-off-icon">🙈</span>
}))

// Import after mocks
import InputField from '../../components/InputField'

// Create a mock control object
const mockControl = {
  register: vi.fn(),
  unregister: vi.fn(),
  getFieldState: vi.fn(),
  _names: {
    array: new Set(),
    mount: new Set(),
    unMount: new Set(),
    watch: new Set(),
    focus: '',
    watchAll: false
  },
  _subjects: {
    watch: vi.fn(),
    array: vi.fn(),
    state: vi.fn(),
    remove: vi.fn(),
    reset: vi.fn()
  },
  _formState: {
    isDirty: false,
    isValidating: false,
    isSubmitting: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    errors: {}
  }
} as any

test('renders with label and input', () => {
  render(<InputField name="testField" control={mockControl} label="Test Label" />)
  
  expect(screen.getByPlaceholderText('Test Label')).toBeInTheDocument()
})

test('displays description when provided', () => {
  render(<InputField name="testField" control={mockControl} label="Test Label" description="Test description" />)
  
  expect(screen.getByText('Test description')).toBeInTheDocument()
})

test('displays error message when provided', () => {
  render(<InputField name="testField" control={mockControl} label="Test Label" error="Test error" />)
  
  expect(screen.getByText('Test error')).toBeInTheDocument()
})

test('renders password input with toggle button when type is password', () => {
  render(<InputField name="testField" control={mockControl} label="Test Label" type="password" />)
  
  const input = screen.getByPlaceholderText('Test Label')
  expect(input).toHaveAttribute('type', 'password')
  
  const toggleButton = screen.getByRole('button')
  expect(toggleButton).toBeInTheDocument()
})

test('sets autocomplete attribute when provided', () => {
  render(<InputField name="testField" control={mockControl} label="Test Label" autocomplete="email" />)
  
  const input = screen.getByPlaceholderText('Test Label')
  expect(input).toHaveAttribute('autocomplete', 'email')
})