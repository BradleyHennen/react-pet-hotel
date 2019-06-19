import React, { Component} from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';
import PetRow from './PetRow';



class PetTable extends Component {



  render() {
    const {classes}=this.props
    return (
      <div className={classes.petTableContainer}>
          <Table className={classes.petTable}>
            <TableHead >
                <TableRow>
                  <TableCell>Owner</TableCell>
                  <TableCell>Pet</TableCell>
                  <TableCell>Breed</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Checked In</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.petReducer.map( (pet) =>
                  <PetRow key={pet.pet_id} pet={pet}/> 
              )}
            </TableBody>
        </Table>   
      </div>          
    );
  }
}

const styles = theme => ({
  petTable:{
    width: '80%',
    margin: '0 auto',
    marginBottom: '50px',
    
    
  },
  petTableContainer:{
    marginTop: '50px',
  }
  })





const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(PetTable));