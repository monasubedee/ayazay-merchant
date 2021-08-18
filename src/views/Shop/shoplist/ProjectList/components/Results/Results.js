import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FetchContext } from '../../../../../../context/FetchContext';
import { fetchData } from '../../../../../../store/action';
import { Paginate } from 'components';
import { ProjectCard } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Projects = props => {
  const { className, fetchData, shops, ...rest } = props;

  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const fetchContext = useContext(FetchContext);
  const [rowsPerPage] = useState(12);
  const [page, setPage] = useState(0);


  useEffect(() => {
    fetchData(fetchContext.getShops());
  }, [fetchData, fetchContext])

  useEffect(() => {
    setProjects(shops);
  }, [shops])

  const handleChangePage = ({ selected }) => {
    setPage(selected);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.header}>
        <Typography
          className={classes.title}
          variant="h5"
        >
          {
            projects.length > 1 ? `Showing ${projects.length} shops ` :
              projects.length < 1 ? `Shop not found.` : `Showing ${projects.length} shop `
          }
          {page + 1} of{' '}
          {Math.ceil(projects.length / rowsPerPage)}
        </Typography>
      </div>

      <Grid
        container
        spacing={3}
      >


        {
          projects.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((data, i) => (

            <Grid
              item
              key={i}
              md={4}
              sm={4}
              xl={3}
              xs={10}

            >
              <ProjectCard
                id={data.id}
                img={data.img_url}
                key={i}
                shopName={data.name}
              />
            </Grid>
          ))
        }

      </Grid>
      {
        (projects.length / rowsPerPage) > 1 ?
          < div className={classes.paginate}>
            <Paginate pageCount={projects.length / rowsPerPage} onPageChange={handleChangePage} pageRangeDisplayed={rowsPerPage} />
          </div> :
          null
      }

      {/* <Menu
        anchorEl={sortRef.current}
        className={classes.menu}
        onClose={handleSortClose}
        open={openSort}
      >
        {['Most recent', 'Popular', 'Price high', 'Price low', 'On sale'].map(
          option => (
            <MenuItem
              className={classes.menuItem}
              key={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu> */}
    </div >
  );
};

Projects.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = ({ shop }) => {
  return {
    shops: shop.shopArray
  }
}

export default connect(mapStateToProps, { fetchData })(Projects);
