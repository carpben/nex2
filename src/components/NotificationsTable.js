import React from 'react'
import NotificationRow from './NotificationRow.js'
import '../styles/NotificationTable.css'
import FloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
  color: 'white',
  fontSize:30
};

const NotificationsTable = ({notificationsStore, notificationsToDisplay, addNewNotification, refreshTable, toggleComplete, deleteNotification, editField, changeImportance, changeDate, user}) => (
   <div>

        <table className="table NotificationsTable">

        <thead>
         <tr>
           <th className="title-column">Title</th>
           <th className="importance-column">Importance</th>
           <th className="next-column">Next Action</th>
           <th className="details-column">More Details</th>
           <th className="date-column"></th>
           <th className="icon-1-column"></th>
           <th className="icon-2-column"></th>
         </tr>
        </thead>
        <tbody>
         {
             notificationsToDisplay.map(
                 (notKey) => <NotificationRow notKey={notKey} key={notKey} {...notificationsStore[notKey]} toggleComplete={toggleComplete} deleteNotification={deleteNotification} editField={editField} changeImportance={changeImportance} changeDate={changeDate}/>
             )
         }
        </tbody>
        </table>


   </div>
    )

export default NotificationsTable
