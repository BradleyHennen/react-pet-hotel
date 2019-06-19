import React, { Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import HomeIcon from '@material-ui/icons/Home'
import PetIcon from '@material-ui/icons/Pets'
const moment = require('moment')



class PetRow extends Component {

  state = {
    checkIn: false
  }

  componentDidMount = () => {
    this.isCheckedIn()
  }

  isCheckedIn = () => {
    let pet = this.props.pet;
    if ( pet.status ){
      this.setState({
        checkIn: true
      })
    }
    else if ( pet.status == null ){
      this.setState({
        checkIn: false
      })
    }
  }

  handleDelete = (id) => {
    console.log('in handleDelete', id)
    this.props.dispatch({ type: 'DELETE_PET', payload: id })
  }


  handleCheckIn = (id) => {
    console.log('in handleCheckIn', id)
    let payload = {
      id,
      date: moment().format('YYYY-MM-DD')
    }
    this.props.dispatch({ type: 'UPDATE_STATUS', payload: payload })
    this.setState({
      checkIn: !this.state.checkIn
    })
  }

  handleCheckOut = (id) => {
    let payload={
      id,
      date: null
    }
    this.props.dispatch({ type: 'UPDATE_STATUS', payload: payload })
    this.setState({
      checkIn: !this.state.checkIn
    })
    }

  render() {
    const {classes} = this.props
    console.log(`in render status `, this.state.checkIn);
    
    return (
      <TableRow key={this.props.pet.pet_id} hover={true} >
      
      <TableCell value={this.props.pet.owner_id}>
          {this.props.pet.first_name}
      </TableCell>
         
      <TableCell >
        {this.props.pet.pet_name}
          
      </TableCell>
      
      <TableCell>
        {this.props.pet.breed}
  
      </TableCell>

      <TableCell>
        {this.props.pet.color}
      </TableCell>

     
      <TableCell >
        {this.props.pet.status && moment(this.props.pet.status).format('YYYY-MM-DD')}
      </TableCell>

      <TableCell>

        <Button className={classes.actionButton} onClick={()=>this.handleDelete(this.props.pet.pet_id)} value={this.props.pet.pet_id}><DeleteIcon/> Delete</Button>
        {this.state.checkIn ? 
          <Button className={classes.actionButton} onClick={()=>this.handleCheckOut(this.props.pet.pet_id)}><HomeIcon/>Check Out</Button> 
          :
          <Button className={classes.actionButton} onClick={()=>this.handleCheckIn(this.props.pet.pet_id)}><PetIcon/>Check In</Button>
        }
      </TableCell>

      </TableRow>


    );
  }
}

const styles = theme => ({
  actionButton:{
    marginRight: '10px',
  }
  })



const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(PetRow));