import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from './App'
import { rollD6 } from './random'

jest.mock('./random', () => ({ rollD6: jest.fn() }))

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  rollD6.mockReturnValue(3) // par défaut : aucun 6, aucun 1
  act(() => { ReactDOM.render(<App />, container) })
})
afterEach(() => {
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
})

const click = el => act(() => { el.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
const btn = text => [...container.querySelectorAll('button')].find(b => b.textContent.trim() === text)
const setInput = (id, value) => {
  const input = container.querySelector('#' + id)
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
  act(() => {
    setter.call(input, String(value))
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}
const val = id => container.querySelector('#' + id).value
const diceCount = () => container.querySelectorAll('.die').length
const toggle = () => act(() => { container.querySelector('input[type=checkbox]').click() })

it('le niveau de stress = nombre de dés de stress dans la pool', () => {
  setInput('stress', 3)
  click(btn('Lancer'))
  expect(diceCount()).toBe(3)
  expect(container.querySelectorAll('.die').length).toBe(3)
})

it('pousser : stress +1, dé de stress +1, et une seule fois', () => {
  setInput('base', 2)
  setInput('stress', 1)
  click(btn('Lancer'))
  expect(diceCount()).toBe(3)
  click(btn('Pousser'))
  expect(val('stress')).toBe('2')
  expect(diceCount()).toBe(4)
  expect(btn('Pousser').disabled).toBe(true)
})

it('facehugger : pas de push, jet de panique automatique', () => {
  rollD6.mockReturnValue(1)
  setInput('base', 1)
  setInput('stress', 1)
  click(btn('Lancer'))
  expect(btn('Pousser').disabled).toBe(true)
  expect(container.querySelector('.panic-result').textContent).toContain('2') // 1 + stress 1
})

it('pas de facehugger : pas de panique', () => {
  setInput('base', 1)
  setInput('stress', 1)
  click(btn('Lancer'))
  expect(container.querySelector('.panic')).toBeNull()
})

it('jet passif : pas de dés de stress, pas de push, niveau conservé', () => {
  setInput('base', 2)
  setInput('stress', 2)
  toggle()
  click(btn('Lancer'))
  expect(diceCount()).toBe(2)
  expect(btn('Pousser').disabled).toBe(true)
  toggle()
  expect(val('stress')).toBe('2')
  click(btn('Lancer'))
  expect(diceCount()).toBe(4)
})

it('jets classiques : D6, 2D6 et D66', () => {
  rollD6.mockReturnValueOnce(4)
  click(btn('D6'))
  expect(container.querySelector('.classic-result').textContent).toBe('4')

  rollD6.mockReturnValueOnce(3).mockReturnValueOnce(5)
  click(btn('2D6 (2-12)'))
  expect(container.querySelector('.classic-total').textContent).toBe('8')

  rollD6.mockReturnValueOnce(3).mockReturnValueOnce(5)
  click(btn('D66'))
  expect(container.querySelector('.classic-total').textContent).toBe('35')

  click(container.querySelector('[aria-label="Réinitialiser les dés classiques"]'))
  expect(container.querySelector('.classic-result')).toBeNull()
})
