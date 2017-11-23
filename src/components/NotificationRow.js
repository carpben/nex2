import React from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import 'react-datepicker/dist/react-datepicker.css'
import ReactStars from 'react-stars'
import { withStyles } from 'material-ui/styles';
import StyledTextField from './StyledTextField'


class NotificationRow extends React.Component {
   constructor (props){
      super (props)
   }

   onStarValueChange = (newRating) => {this.props.changeImportance(this.props.id, newRating)}
   onDatePickerChange = (newDate) =>   this.props.changeDate(this.props.id, newDate)

   render (){
      const {id, date, importance, title, nextAction, details, completed, toggleComplete, deleteNotification, editField} = this.props

      const notificationDoneclass = completed? 'notificationDone' : '' ;

      return (
         <tr >
           <td  className="date-column">
             <DatePicker selected={date} onChange={this.onDatePickerChange} dateFormat='DD MMM YY'/>
           </td>
           <td className="importance-column">
             <ReactStars count={5} size={19} color2={'#ffd700'} value={importance} onChange={this.onStarValueChange} />
           </td>
           <td className="title-column">
              <StyledTextField
                  txt = {title}
                  field = "title"
                  editField = {editField}
                  id={id}
               />
           </td>
           <td className="next-column">
              <StyledTextField
                 txt = {nextAction}
                 field = "nextAction"
                 editField = {editField}
                 id={id}
              />
          </td>
          <td className="details-column">

            <StyledTextField
               txt = {details}
               field = "details"
               editField = {editField}
               id={id}
            />
          </td>
           <td><span className={"notification-done glyphicon glyphicon-ok " + notificationDoneclass } onClick={(e)=>toggleComplete(id)} ></span></td>
           <td><span className="notification-remove glyphicon glyphicon-remove" onClick={(e)=>deleteNotification(id)}></span></td>
         </tr>
      )
   }
}


export default NotificationRow