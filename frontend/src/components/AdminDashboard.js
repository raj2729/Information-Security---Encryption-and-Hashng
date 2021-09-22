import React,  { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import { List, ListItem, Drawer } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserTable from "./AdminUsers";
import InstructorTable from "./AdminInstructors";
import OrdersTable from "./AdminOrders";


// actions
import { getAllUsers, getAllInstructors, getCoursesSummary, getAllOrders } from "../actions/adminActions";
import CourseTable from "./AdminCourses";

function AdminDashboard() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    useEffect(() => {
      dispatch(getAllUsers());
      dispatch(getAllInstructors())
      dispatch(getCoursesSummary())
      dispatch(getAllOrders())
    }, [])
    const [mode, setMode] = useState("dashboard")

    const list = ()=> (
        <div onClick={()=>{setOpen(false)}}>
          <List>
            <ListItem><Button onClick = {()=>setMode("dashboard")}><h4><i className="fa fa-th-large"></i> Dashboard</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("courses")}><h4><i className="fa fa-play-circle"></i> Courses</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("users")}><h4><i className="fa fa-users"></i> Students</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("instructors")}><h4><i className="fa fa-bar-chart"></i> Instructors</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("orders")}><h4><i className="fa fa-money"></i> Orders</h4></Button></ListItem>
          </List>
        </div>
      )

    return (
        <div>
            <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"black"}}>
                <Button  style={{ textDecoration: "none", color: "white" }} onClick={()=>{setOpen(true)}}><MenuIcon/>Admin Panel</Button>
                <Button  style={{ textDecoration: "none", color: "white" }} onClick={()=>{alert('Log out implement karna hai')}}>Logout<ExitToAppIcon/></Button>
            </div>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={()=>{setOpen(false)}}
            >
                {list()}
            </Drawer>
            {mode==="dashboard" && <h1>Admin Panel Dashboard</h1>}
            {mode==="courses" && <CourseTable/>}
            {mode==="users" && <UserTable/>}
            {mode==="instructors" && <InstructorTable/>}
            {mode==="orders" && <OrdersTable/>}
        </div>
     );
}

export default AdminDashboard;