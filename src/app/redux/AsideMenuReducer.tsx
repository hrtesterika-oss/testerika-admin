import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  asideMenu: [],
  asideMenuUrl:[],
  staffPermission:[],
  navItem:{
    item:string
  },
  questionBank:any[],
  examSectionQuestion:any[]
}

const initialState: CounterState = {
  asideMenu: [],
  asideMenuUrl:[],
  staffPermission:[],
  navItem:{
    item:""
  },
  questionBank:[],
  examSectionQuestion:[]
}

export const asideReducer = createReducer(initialState,{
    addAsideMenu: (state, action: PayloadAction<[]>) => {
      state.asideMenu=action.payload
    },
    addAsideMenuUrl: (state, action: PayloadAction<[]>) => {
      state.asideMenuUrl=action.payload
    },
    addStaffPermission: (state, action: PayloadAction<[]>) => {
      state.staffPermission=action.payload
    },
    setNavItemValue:(state,action:PayloadAction<string>)=>{
       state.navItem.item=action.payload
    },
    saveQuestionToQuestionBank:(state,action:PayloadAction<any>)=>{
      state.questionBank=[...state.questionBank,action.payload]
   },
   addExamSectionQuestions: (state, action: PayloadAction<[]>) => {
    state.examSectionQuestion=action.payload
  },
})

// Action creators are generated for each case reducer function
// export const { addAsideMenu} = CombineReducer.actions

export default asideReducer