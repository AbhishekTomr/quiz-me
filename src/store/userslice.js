import {createSlice} from "@reduxjs/toolkit"


let userSlice = createSlice({
    name : 'UserInfo',
    initialState : [],
    reducers: {
        setData : (state,action) => {
            state.push({
            id : state.length+1,
            uname : action.payload.newUser.uname,
            questions : action.payload.newUser.questions?action.payload.newUser.questions:10,
            gameState : action.payload.newUser.gameState,
            questionsList : action.payload.newUser.questionsList
            }
            )    
        },
        changeAns : (state,action) => {
            state[action.payload.user].questionsList[action.payload.id].ans = action.payload.isAns;
        },
        changeCorrect : (state,action) => {
            state[action.payload.user].questionsList[action.payload.id].correct = action.payload.isCorrect;
        }
    }
    }
)


let UserActions = userSlice.actions;
export {userSlice};
export default UserActions;