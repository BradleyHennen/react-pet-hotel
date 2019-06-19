import React, { Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import OwnerTable from '../OwnerTable/OwnerTable';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    petFormControl: {
        margin: '25px',
    },
    petFormControlTextField:{
        marginLeft: '25px',
        marginRight: '25px',
        marginTop: '41px'
    },
    petForm:{
        margin: '0 auto',
        textAlign: 'center',
    },
    petFormControlButton:{
        marginLeft: '25px',
        marginRight: '25px',
        marginTop: 50
    },
})

class AddOwnerForm extends Component {

    state ={
        newOwner: {
            first_name: '',
        }
    }

    handleChange = propertyName => {
        return(event) =>{
        this.setState({
            newOwner: {
                ...this.state.newOwner,
                [propertyName]: event.target.value,
            }
        });
      }
    }
    

    handleSubmit = event => {
        event.preventDefault();
        console.log('in handleSubmit');
          this.props.dispatch({type:'ADD_OWNER', payload: this.state.newOwner});
          this.setState({
            newOwner: {
                first_name: '',
            }
        })
     
    }
  render() {
    const {classes} = this.props;
    console.log(this.state.newOwner)
    return (
        <section>
            <form className={classes.petForm}>
            <Typography variant="h3" style={{marginTop:'25px'}}>Add Owner</Typography>
                <FormControl>
                <TextField label="Owner Name" variant="outlined" color="primary"
                    value={this.state.newOwner.first_name}
                    onChange={this.handleChange('first_name')}
                    className={classes.petFormControlTextField}
                    required
                    type="text"
                    style = {{width: 600}}
                    >
                </TextField>
                </FormControl>
                <FormControl>
                    <Button 
                        onClick={this.handleSubmit}
                        className={classes.petFormControlButton}
                        variant="outlined"
                    >
                        Submit
                    </Button>
                </FormControl>
              
            </form>
            <div>
                <OwnerTable/>
            </div>
        </section>
    );
  }
}


AddOwnerForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AddOwnerForm));