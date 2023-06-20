import { act, render, screen } from "@testing-library/react";
import { Form } from "./Form";
import userEvent from "@testing-library/user-event";

describe('Form', () => {
  describe('Phone input validation:', () => {
    it('Prohibits unwanted characters', async () => {
      render(<Form />)
      const emailInput = screen.getByLabelText('携帯電話番号')

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(() => userEvent.type(emailInput, 'qwerty123'))

      expect(emailInput).toHaveValue('123')
    })

    it('Enforces maximum character length', async () => {
      render(<Form />)
      const emailInput = screen.getByLabelText('携帯電話番号')

      await act(() => userEvent.type(emailInput, '111-1111-1111444'))

      expect(emailInput).toHaveValue('111-1111-1111')
    })
  })

  it('Displays errors after submission with incorrect data', async () => {
    render(<Form />)

    await act(() => userEvent.type(screen.getByLabelText('メールアドレス'), 'incorrect@email'))

    await act(() => userEvent.click(screen.getByTestId('credentials-submit-button')))

    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument()
  })
});