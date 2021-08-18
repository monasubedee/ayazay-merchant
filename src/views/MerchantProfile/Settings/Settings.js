import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import { FetchContext } from '../../../context/FetchContext';
import { AuthContext } from '../../../context/AuthContext';
import { LoadingContext } from '../../../context/LoadingContext';
import { fetchData } from '../../../store/action';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

import { Page } from 'components';
import {
  Header,
  Profile,
  Subscription,
  Notifications,
  Security
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const Settings = props => {

  const classes = useStyles();
  const { match, history, merchantInfo, fetchData, status } = props;
  const { tab } = match.params;
  const [passObj, setpassObj] = useState({
    password: '',
    new_password: '',
    confirm_password: '',
    passwordError: '',
    new_passwordError: '',
    confirm_passwordError: ''
  });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const fetchContext = useContext(FetchContext);
  const loadingContext = useContext(LoadingContext);
  const authContext = useContext(AuthContext);
  let myDisable = true;

  useEffect(() => {
    setEmail(authContext.authState.merchantInfo.email);
  }, [authContext])

  useEffect(() => {

    if (merchantInfo.merchant_name === '') {
      loadingContext.changeLoading(true);
      fetchData(fetchContext.getMerchant());
    } else {
      loadingContext.changeLoading(false);
      setProfile(merchantInfo);
    }

  }, [merchantInfo, fetchData, fetchContext, loadingContext]);

  useEffect(() => {
    if (status === 'Success') {
      props.enqueueSnackbar('Successfully password changed.', { variant: 'success' });
      setpassObj({
        ...passObj,
        password: '',
        new_password: '',
        confirm_password: ''
      })
      fetchData(fetchContext.cleanEthic());
      setTimeout(() => {
        setLoading(false);
      }, [3000])
    }

    if (status === 'Error') {
      props.enqueueSnackbar('Something wrong(Please check your old password)!', { variant: 'error' });
      fetchData(fetchContext.cleanEthic());
      setTimeout(() => {
        setLoading(false);
      }, [3000])
    }
  }, [status])

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const handlerUpdatePassword = (event) => {
    const { name, value } = event.target;
    const error = name + "Error";

    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (value.length < 1) {
      setpassObj({
        ...passObj,
        [name]: value,
        [error]: `${name.toUpperCase().replace(/_/g, " ")} is required !`
      })
    }

    else if (name === "new_password") {
      let result = pattern.test(value);


      if (result) {
        setpassObj({
          ...passObj,
          [name]: value,
          [error]: ''
        })
        if (passObj.confirm_password === value && result) {
          setpassObj({
            ...passObj,
            [name]: value,
            [error]: '',
            confirm_passwordError: ''
          })
        }

        else if (passObj.confirm_password !== value && result && passObj.confirm_password !== "") {
          setpassObj({
            ...passObj,
            [name]: value,
            [error]: '',
            confirm_passwordError: 'Confirm password must be same with new password.'
          })
        }
      }


      else if (passObj.confirm_password !== value && !result && passObj.confirm_password !== '') {
        setpassObj({
          ...passObj,
          [name]: value,
          [error]: 'Password must contain at least one upper and lower characters, one numbers',
          confirm_passwordError: 'Confirm password must be same with new password'
        })
      }

      else {
        setpassObj({
          ...passObj,
          [name]: value,
          [error]: 'Password must contain at least one upper and lower characters, one numbers'
        })
      }

    }

    else if (name === 'confirm_password') {

      if (passObj.new_password === value) {
        setpassObj({
          ...passObj,
          [name]: value,
          [error]: ''
        })
      } else {
        setpassObj({
          ...passObj,
          [name]: value,
          [error]: 'Confirm password must be same with new password.'
        })
      }

    }


    else {
      setpassObj({
        ...passObj,
        [name]: value,
        [error]: ''
      })
    }


  }

  const updatePassword = () => {

    const data = {
      email: `${email}`,
      tmp_password: `${passObj.password}`,
      password: `${passObj.confirm_password}`
    }

    console.log(data);
    fetchData(fetchContext.postMerchantUpdatePassword(data));
    setLoading(true);
  }

  const tabs = [
    { value: 'profile', label: 'Profile' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' }
  ];

  if (passObj.password.length > 0 &&
    passObj.passwordError === '' &&
    passObj.new_password.length > 0 &&
    passObj.new_passwordError === '' &&
    passObj.confirm_password.length > 0 &&
    passObj.confirm_passwordError === '' &&
    passObj.new_password === passObj.confirm_password) {
    myDisable = false;
    console.log(passObj);
  }
  else {
    myDisable = true;
  }

  return (

    <Page
      className={classes.root}
      title="Settings"
    >
      <Header />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === 'profile' && <Profile profileInfo={profile} />}
        {tab === 'subscription' && <Subscription profileInfo={profile} />}
        {tab === 'notifications' && <Notifications />}
        {tab === 'security' && <Security
          handlerChange={handlerUpdatePassword}
          loading={loading}
          passObj={passObj}
          disable={myDisable}
          updatePassword={updatePassword}
        />}
      </div>
    </Page>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};


const mapStateToProps = ({ merchant }) => {
  return {
    merchantInfo: merchant.merchantUser,
    status: merchant.status
  };
};


export default connect(mapStateToProps, { fetchData })(withSnackbar(Settings));
