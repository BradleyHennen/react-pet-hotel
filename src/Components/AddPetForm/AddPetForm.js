import React, { Component} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PetTable from '../PetTable/PetTable';
import Typography from '@material-ui/core/Typography';




class AddPetForm extends Component {

    state ={
        newPet: {
            owner_id: '',
            pet_name: '',
            breed: '',
            color: '',
            status: null,
        }
    }

    componentDidMount() {
        this.props.dispatch({type:'GET_OWNER'});
        this.props.dispatch({type:'GET_PET'});

    }

    handleChange = propertyName => {
        return(event) =>{
        this.setState({
            newPet: {
                ...this.state.newPet,
                [propertyName]: event.target.value,
                status: null,
            }
        });
      }
    }
    

    handleSubmit = event => {
        event.preventDefault();
        console.log('in handleSubmit');
          this.props.dispatch({type:'ADD_PET', payload: this.state.newPet});
          this.setState({
            newPet: {
                owner_id: '',
                pet_name: '',
                breed: '',
                color: '',
                status: '',
            }
        })
     
    }


  render() {
    const {classes} = this.props;
    console.log(this.state.newPet)
    return (
        <section>
            <form className={classes.petForm}>
                <Typography variant="h3" style={{marginTop:'25px'}}>Add Pet</Typography>
                <FormControl className={classes.petFormControlTextField}>
                <TextField label="Pet Name" variant="outlined" color="primary"
                    value={this.state.newPet.pet_name}
                    onChange={this.handleChange('pet_name')}
                    required
                    type="text"
                    style = {{width: 200}}
                    >
                </TextField>
                </FormControl>

                <FormControl className={classes.petFormControlTextField}>
                <TextField label="Pet Color" variant="outlined" color="primary"
                    value={this.state.newPet.color}
                    onChange={this.handleChange('color')}
                    required
                    type="text"
                    style = {{width: 200}}
                    >
                </TextField>
                </FormControl>

                <FormControl className={classes.petFormControlTextField}>
                <TextField label="Pet Breed" variant="outlined" color="primary"
                    value={this.state.newPet.breed}
                    onChange={this.handleChange('breed')}
                    required
                    type="text"
                    style = {{width: 200}}
                    >
                </TextField>
                </FormControl>

                <FormControl variant="outlined" className={classes.petFormControl}>
              <TextField
                    id="owner_id"
                    select
                    label="Owner Name"
                    value={this.state.newPet.owner_id}
                    onChange={this.handleChange('owner_id')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                    style = {{width: 200}}
                    required
                  >
                    <MenuItem disabled>Select an Owner</MenuItem>
                    {this.props.reduxState.ownerReducer.map( owner =>
                          <MenuItem value={owner.id} key={owner.id}>{owner.first_name}</MenuItem>
                          )}
                        
                  </TextField>
            </FormControl>

            <FormControl className={classes.petFormControlButton}>
                    <Button variant="outlined" onClick={this.handleSubmit}>Submit</Button>
                </FormControl>
              
            </form>
            <div className={classes.imageDiv}>
                <img src="/images/pug-portrait.png" className={classes.image}></img>
                <img src="/images/cat.png" className={classes.image}></img>
                <img src="/images/littledog.png" className={classes.image}></img>
                <img src="/images/blacklab.png" className={classes.image}></img>
              
            </div>
            
            <div>
            <PetTable/>
            </div>
                
        </section>
    );
  }
}

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
        marginTop: '60px'
    },
    image:{
        marginRight: '25px',
    },
    imageDiv:{
        margin: '0 auto',
        textAlign: 'center',
    }
    })





const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AddPetForm));