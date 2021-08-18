import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { Page, Paginate } from 'components';
import { Header, ProjectCard } from './components';
import { fetchData } from '../../../store/action';
import { FetchContext } from '../../../context/FetchContext';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  results: {
    marginTop: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const IssueList = ({ fetchData, issueList }) => {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const fetchContext = useContext(FetchContext);
  console.log(issueList);

  useEffect(() => {
    const merchantInfo = JSON.parse(localStorage.getItem('merchantInfo'));
    console.log(merchantInfo.email);
    fetchData(fetchContext.getIssueList(merchantInfo.email));
  }, [fetchData, fetchContext]);

  const handleChangePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <Page className={classes.root} title="Project Management List">
      <Header />
      {/* <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      /> */}
      <div className={classes.results}>
        <Typography color="textSecondary" gutterBottom variant="body2">
          {issueList.length} Records found. Page {page + 1} of{' '}
          {Math.ceil(issueList.length / rowsPerPage)}
        </Typography>
        {issueList
          .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
          .map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
      </div>
      {issueList.length / rowsPerPage > 1 ? (
        <div className={classes.paginate}>
          <Paginate
            onPageChange={handleChangePage}
            pageCount={issueList.length / rowsPerPage}
            pageRangeDisplayed={rowsPerPage}
          />
        </div>
      ) : null}
    </Page>
  );
};

const mapStateToProps = ({ issue }) => {
  return {
    issueList: issue.issue
  };
};

export default connect(mapStateToProps, { fetchData })(IssueList);
