import React from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F4F5F8',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '15px 26px 15px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '10px 10px ',
    '&:first-child': {
      marginLeft:0,
    },
  },
  nrc:{
    display:'flex',
    width:'100%',
  },
  option:{
    backgroundColor: '#F4F5F8',
    color:'#394358'
  }
}));

const NRC = ({handleState,state,nricConfigs,township,townshipArray,type,handletype,handletownship})=>{

  const classes = useStyles();

  return(
    <div className={classes.nrc}>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          input={<BootstrapInput />}
          onChange={handleState}
          required
          value={state}
        >
          <option
            aria-label="None"
            className={classes.option}
            value=""
          >State</option>
          {nricConfigs.NRIC.state.map(item=>
            <option value={item.value}>{item.value}</option>
          )
          }
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          input={<BootstrapInput />}
          onChange={handletownship}
          required
          value={township}
        >
          <option
            aria-label="None"
            className={classes.option}
            value=""
          >Township</option>
          {townshipArray.map(item=>
            <option value={item.value}>{item.value}</option>
          )
          }
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          input={<BootstrapInput />}
          onChange={handletype}
          required
          value={type}
        >
          <option
            aria-label="None"
            className={classes.option}
            value=""
          >Type</option>
          {nricConfigs.NRIC.type.map(item=>
            <option value={item.value}>{item.value}</option>
          )
          }
        </NativeSelect>
      </FormControl>
    </div>
  )
}

export default NRC