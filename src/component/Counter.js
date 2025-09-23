import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
} from '../features/counter/counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Compteur Redux</h2>
      <div className="flex justify-center items-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className="flex justify-center space-x-2">
        <input
          className="border rounded px-2 py-1 w-20"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
        >
          Ajouter
        </button>
      </div>
    </div>
  )
}