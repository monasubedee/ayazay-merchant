import React, { useState, useEffect } from 'react';
import { Page } from 'components';
import { makeStyles } from '@material-ui/styles';
import { AboutProject } from './components';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { uploadImage } from 'store/action';
import api from 'utils/publicFetch';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import phonevalidate from 'myanmar-phonenumber';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5, 6, 5)
  },
  aboutProject: {
    marginTop: theme.spacing(5)
  },
  actions: {
    textAlign: 'end',
    marginTop: theme.spacing(3)
  }
}));

const IssueCreate = ({ history }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    name: '',
    phone: '',
    issue: '',
    images: []
  });
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [issueError, setIssueError] = useState(null);

  const style = useStyles();

  useEffect(() => {
    const merchantInfo = JSON.parse(localStorage.getItem('merchantInfo'));
    setEmail(merchantInfo.email);
  }, []);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
    console.log(event.target.name);
    if (event.target.name === 'phone') {
      console.log('phone', event.target.value);
      const phonevali = phonevalidate.isValidMMPhoneNumber(event.target.value);
      if (
        (phonevali === false && event.target.value.length > 5) ||
        (phonevali === true && event.target.value.length === 10)
      ) {
        setPhoneError('Please correct your phone number');
      } else {
        setPhoneError(null);
      }
    }
    if (event.target.name === 'name') {
      if (event.target.value.length <= 5) {
        setNameError('Your name is too short');
      } else {
        setNameError(null);
      }
      if (event.target.value.length < 1) {
        setNameError(null);
      }
    }
    if (event.target.name === 'issue') {
      if (event.target.value.length > 70) {
        setIssueError('Your characters is too long');
      } else if (event.target.value.length < 5) {
        setIssueError('Your characters is not long enough');
      } else {
        setIssueError(null);
      }
      if (event.target.value.length < 1) {
        setIssueError(null);
      }
    }
  };

  const validate = () => {
    let name = null;
    let phone = null;
    let issue = null;
    if (data.name === '') {
      name = 'Name is Required';
    }
    if (data.phone === '') {
      phone = 'Phone is Required';
    }
    if (data.issue === '') {
      issue = 'Reason is Required';
    }
    if (name !== null || phone !== null || issue !== null) {
      setNameError(name);
      setPhoneError(phone);
      setIssueError(issue);
      return true;
    }
    return false;
  };

  const handleChangeFile = async files => {
    let dataimages = [];
    for (let j = 0; j < files.length; j++) {
      let file = files[j];
      const url = await uploadImage(file);
      console.log(url, 'url');
      dataimages.push(url);
    }
    setData({ ...data, images: dataimages });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const apidata = {
      name: data.name,
      email_address: email,
      phone_number: data.phone,
      issue: data.issue,
      images: data.images
    };
    console.log(apidata);
    if (
      !validate() &&
      apidata.phone_number.length > 5 &&
      phoneError === null &&
      nameError === null &&
      issueError === null
    ) {
      try {
        const response = await api.post('/issue-tracker', apidata);
        if (response.status === 201) {
          setNameError(null);
          setPhoneError(null);
          setIssueError(null);
          setTimeout(() => {
            history.push('/admin/issue/list');
          }, 1500);
          enqueueSnackbar('Successfully Created', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right'
            }
          });
        }
      } catch (e) {
        enqueueSnackbar('Please Try Again', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        });
      }
    } else {
      console.log('error');
      enqueueSnackbar('Something Went Wrong', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
    }
  };
  console.log(data.images);

  return (
    <Page className={style.root}>
      <Typography component="h1" variant="h3">
        Issue Create
      </Typography>
      <AboutProject
        className={style.aboutProject}
        data={data}
        issueError={issueError}
        nameError={nameError}
        onchange={handleChange}
        onchangeFile={handleChangeFile}
        phError={phoneError}
      />
      <div className={style.actions}>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </div>
    </Page>
  );
};
export default withRouter(IssueCreate);
