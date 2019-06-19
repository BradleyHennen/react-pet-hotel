import React, { Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import OwnerRow from './OwnerRow';

const styles = theme => ({
  petTable:{
    width: '80%',
    margin: '0 auto',
  },
  petTableContainer:{
    marginTop: '50px',
  }
})

class OwnerTable extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'GET_OWNER'});
  }


  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.petTableContainer}>
          <Table className={classes.petTable}>
            <TableHead >
                <TableRow>
                  <TableCell>Owner Name</TableCell>
                  <TableCell>Number of Pets</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.ownerReducer.map( (owner) =>
                  <OwnerRow key={owner.id} owner={owner}/> 
              )}
            </TableBody>
        </Table>   
      </div>   
    );
  }
}

OwnerTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(OwnerTable));