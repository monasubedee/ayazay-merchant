import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
     Card,
     CardContent,
     CardHeader,
     Grid,
     Divider,
     TextField,
     Button,
     InputLabel,
     Select,
     MenuItem
} from '@material-ui/core';
import { indigo, purple } from '@material-ui/core/colors';


const ColorButton = withStyles((theme) => ({
     root: {
          marginTop: '10px',
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: indigo[500],
          '&:hover': {
               backgroundColor: indigo[500],
               textDecoration: 'underline',
               textDecorationColor: indigo[500]
          },

          textDecoration: 'underline',
          textDecorationColor: indigo[500]
     },
}))(Button);

const useStyles = makeStyles(theme => ({
     root: {

          marginTop: theme.spacing(5),
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1)
     }
}));

const ShopInfo = props => {
     const { id, shopInfo, categories, match, className, ...rest } = props;
     const classes = useStyles();


     return (
          <Card
               {...rest}
               className={clsx(classes.root, className)}
          >
               <CardHeader title="Shop Detail" />
               <Divider />
               <CardContent>
                    <Grid
                         container
                         spacing={4}
                    >
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   label="Name"
                                   name="merchant_name"
                                   required
                                   disabled={true}
                                   value={shopInfo.name}
                                   variant="outlined"
                              />
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   label="Phone number"
                                   name="merchant_ph_no"
                                   required
                                   disabled={true}
                                   value={shopInfo.contact_phno}
                                   variant="outlined"
                              />
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   label="Email"
                                   name="email"
                                   required
                                   disabled={true}
                                   value={shopInfo.email}
                                   variant="outlined"
                              />
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   rows={2}
                                   multiline
                                   label="Address"
                                   name="address"
                                   type="text"
                                   required
                                   disabled={true}
                                   value={shopInfo.address}
                                   variant="outlined"
                              />
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   label="Webstie url"
                                   name="website_url"
                                   type="text"
                                   disabled={true}
                                   value={shopInfo.website_url}
                                   variant="outlined"
                              >
                              </TextField>
                         </Grid>

                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   label="Facebook url"
                                   name="facebook_url"
                                   type="text"
                                   disabled={true}
                                   value={shopInfo.facebook_url}
                                   variant="outlined"
                              />
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                              style={{ marginTop: '20px' }}
                         >
                              <TextField
                                   fullWidth
                                   label="Custom url"
                                   name="custom_url"
                                   disabled={true}
                                   value={shopInfo.custom_url}
                                   variant="outlined"
                              />
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >

                              <InputLabel id="gen_label" disabled={true} style={{ fontSize: '12px', paddingBottom: '3px' }}>Category</InputLabel>
                              <Select fullWidth
                                   labelId="gen_label"
                                   id="gen_select"
                                   name="gen_category_id"
                                   variant="outlined"
                                   disabled={true}
                                   value={shopInfo.gen_category_id}
                                   style={{ marginTop: '5px' }}
                              >
                                   <MenuItem value={0}>Select Category</MenuItem>
                                   {categories.length > 0
                                        ? categories.map(b => (
                                             <MenuItem
                                                  key={b.id}
                                                  value={b.id}
                                             >{b.name_english}</MenuItem>
                                        ))
                                        : null}
                              </Select>
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   label="Type"
                                   name="type"
                                   disabled={true}
                                   type="text"
                                   value={shopInfo.type}
                                   variant="outlined"
                              />
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <TextField
                                   fullWidth
                                   label="Description"
                                   name="description"
                                   rows={8}
                                   multiline
                                   required
                                   disabled={true}
                                   type="text"
                                   value={shopInfo.description}
                                   variant="outlined"
                              >
                              </TextField>
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <a href={`/admin/shops/list`}>
                                   <ColorButton style={{ display: 'flex' }} color="primary" variant="contained">View List</ColorButton>
                              </a>
                         </Grid>
                         <Grid
                              item
                              md={5}
                              xs={12}
                         >
                              <a href={`/admin/shops/edit/${id}`}>
                                   <ColorButton style={{ display: 'flex' }} color="primary" variant="contained">Edit</ColorButton>
                              </a>
                         </Grid>
                    </Grid>
               </CardContent>
               <Divider />
          </Card>
     );
};

export default ShopInfo;



