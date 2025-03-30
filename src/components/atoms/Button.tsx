export interface ButtonProps {
  type?: 'submit' | 'button' | 'reset'
  text: string | JSX.Element
  onClick?: () => void
  className?: string
  loading?: boolean
  disabled?: boolean
  form?: string
}

export const Button = ({
  type = 'button',
  text,
  onClick,
  className = '',
  loading,
  disabled,
  form,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`nes-btn !px-8 ${className} ${disabled ? 'is-disabled' : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={form}
      {...rest}
    >
      {!loading && text}
    </button>
  )
}
