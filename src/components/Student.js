import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {SEMESTER_LIST} from '../constants.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddStudent from './AddStudent';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

// properties year, semester required
//  
//  NOTE: because SchedList is invoked via <Route> in App.js  
//  props are passed in props.location

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  } 
  
    // Add student
  addStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');
 
    fetch(`${SERVER_URL}/student`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        body: JSON.stringify(student)
      })
    .then(res => {
        if (res.ok) {
          toast.success("Student successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
        } else {
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
  } 

  
  render() {
  
  return(
      <div>
          <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  { 'Schedule ' + this.props.location.year + ' ' +this.props.location.semester }
                </Typography>
            </Toolbar>
          </AppBar>
		  <div className="App">
		   <Grid container>
              <Grid item>
			    <ButtonGroup>
                  <AddStudent addStudent={this.addStudent}  />
				</ButtonGroup>
				<Button component={Link} 
                      to={{pathname:'/' }} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Back
              </Button>
              </Grid>
            </Grid>
			
			<ToastContainer autoClose={1500} />   
		</div>
	  </div>
      ); 
  }
}

export default Student;