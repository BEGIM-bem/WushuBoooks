import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'newss',
  initialState: {
  },
  reducers: {

  },
})


// Action creators are generated for each case reducer function
export const {
  incrementByAmount,
  setLogin,
  setRole,
  addOneActList,
  deleteOneActList,
  resetActList } = counterSlice.actions

// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount))
//     }, 1000)
// }

export default counterSlice.reducer