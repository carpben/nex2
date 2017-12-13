import {fireDB} from '../fire.js'

export const createUserState = (userId) =>
   (dispatch) => {
      const userNotsDBRef = fireDB.ref('notifications/' + userId);
      // userNotsDBRef.set({}) //empty userDB
      userNotsDBRef.once('value').then ( snapshot => {
         const userData = snapshot.val()
         console.log('here is a snapshot of userDb ', userData)
         const notificationsStore = userData
         for (let key in notificationsStore){
            notificationsStore[key].date = new Date(notificationsStore[key].date)
         }
         dispatch ({
            type: "CREATE_USER_STATE",
            notificationsStore,
         })
         dispatch (displayToday())
      })
   }

export const displayToday = () => ({
   type: "DISPLAY_TODAY"
})

export const addNewNotification = () =>
   (dispatch, getState) => {
      // const userId = getState().user && getState().user.uid;
      const userId = getState().user.uid;

      const newNotification = {
         importance:3,
         title:"",
         next:"",
         details:"",
         date: new Date(),
         completed: false
      }
      const notKey = fireDB.ref(`notifications/${userId}`).push(newNotification).key;
      newNotification.date=""
      newNotification.notKey = notKey
      dispatch ({
       type: 'ADD_NOTIFICATION',
       newNotification
     })
   }


export const deleteNotification = (notKey) =>
   (dispatch, getState) => {
      console.log("deleteNotificationAction runs")
      console.log("notKey is ", notKey)
      // const userId = getState().user && getState().user.uid;
      const userId = getState().user.uid;
      fireDB.ref(`notifications/${userId}/${notKey}`).remove();
      console.log("deleteNotification send to DB")
      dispatch ({
        type: 'DELETE_NOTIFICATION',
        notKey
      })
      console.log("Delte Dispatched")
   }


export const toggleComplete = (notKey, oldCompleted) =>
   (dispatch, getState) => {
      const userId = getState().user.uid;
      const newCompleted = !oldCompleted
      fireDB.ref(`notifications/${userId}/${notKey}/completed`).set(newCompleted)
      dispatch({
         type: 'TOGGLE_COMPLETE',
         notKey
      })
   }


export const refreshTable = () => {
   return {type: 'REFRESH_TABLE'}
}

export const editField = (notKey, field, text) =>
   (dispatch, getState) => {
      console.log("editField runs")
      const userId = getState().user.uid;
      fireDB.ref(`notifications/${userId}/${notKey}/${field}`).set(text)
      dispatch({
         type:'EDIT_FIELD',
         notKey,
         field,
         text
      })
   }

export const changeImportance = (notKey, newImportanceValue) =>
   (dispatch, getState) => {
      console.log("newImportanceValue", newImportanceValue)
      const userId = getState().user.uid;
      fireDB.ref(`notifications/${userId}/${notKey}/importance`).set(newImportanceValue)
      dispatch({
         type: 'CHANGE_IMPORTANCE_VALUE',
         notKey,
         newImportanceValue
      })
   }

export const changeDate = (notKey, newDate) =>
   (dispatch, getState) => {
      console.log("changeDate runs, ", newDate)
      const userId = getState().user.uid;
      const newTimeStamp = newDate.getTime()
      fireDB.ref(`notifications/${userId}/${notKey}/date`).set(newTimeStamp)
      dispatch ({
         type: 'CHANGE_DATE',
         notKey,
         newDate
      })
   }

export const editMessage = (newMessage) => {
   return {
      type: "EDIT_MESSAGE",
      newMessage
   }
}

export const setUser = (user) => ({
   type:'SET_USER',
   user
})

export const setDisplayMode = (val) => {
   return {
      type: "SET_DISPLAY_MODE",
      val: val
   }
}

export const toggleAboutDraw = () => ({
   type: "TOGGLE_ABOUT_DRAW"
})
