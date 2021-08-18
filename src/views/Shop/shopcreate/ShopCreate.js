import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { successLoading, getLoading, cleanErrorMessage } from '../../../store/shop/actions';
import { Grid, Button } from '@material-ui/core';
import { FetchContext } from '../../../context/FetchContext';
import { ShopProfileImage, ShopProfileTimeLine } from './components/ShopProfileCreate';
import ShopInfo from './components/ShopInfo';
import { fetchData } from 'store/action';
import { withStyles } from '@material-ui/styles';
import { withSnackbar } from 'notistack';
import phoneNumberValidation from 'myanmar-phonenumber';
import { purple, indigo } from '@material-ui/core/colors';

class ShopCreate extends React.Component {

    static contextType = FetchContext;

    constructor(props) {

        super(props);
        this.state = {
            "name": "",
            "gen_category_id": 0,
            "website_url": "",
            "facebook_url": "",
            "description": "",
            "address": "",
            "phone_number": "",
            "email": "",
            "custom_url": "",
            "img_url": "",
            "timeline_image": "",
            "errormessage": '',
            "type": 0,
            "types": '',
            "submitSuccess": '',

            "nameError": "",
            "gen_category_idError": "",
            "website_urlError": "",
            "facebook_urlError": "",
            "descriptionError": "",
            "addressError": "",
            "phone_numberError": "",
            "emailError": "",
            "custom_urlError": "",
            "img_urlError": "",
            "typeError": "",
            "imageLimitError": "",
            "imageTypeError": "",
            "imageTimeLimitError": "",
            "imageTimeTypeError": "",
            "loading": false,
            "passButton": true,
            "disable": true,
        }
    }

    ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(purple[500]),
            backgroundColor: indigo[500],
            '&:hover': {
                backgroundColor: indigo[500]
            },

        },
    }))(Button);

    componentWillMount() {
        this.props.fetchData(this.context.getCategory());
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

        if (prevProps.status === 'Success') {
            this.props.enqueueSnackbar('Successfully Created.', { variant: 'success' });
            this.props.fetchData(this.context.cleanEthic());
            this.props.history.push("/admin/shops/list");
        }

        if (prevProps.status === 'Error') {
            this.props.enqueueSnackbar('Please Try Again! (something wrong)', { variant: 'error' })
            this.props.fetchData(this.context.cleanEthic());
        }
    }

    uploadImageLoading = (load) => {

        this.setState({ loading: load })

        setTimeout(() => {
            this.setState({ loading: false })
        }, [2500])

    }

    uploadImage = (url) => {
        this.setState({ img_url: url });
    }

    uploadTimeLineImage = (url) => {
        this.setState({ timeline_image: url });
    }

    errorCleanHandler = (name, value, error) => {

        this.setState({
            [name]: value,
            [error]: "",
        })

    }

    errorValidateHandler = (name, value, error) => {
        this.setState({
            [name]: value,
            [error]: `${name.toUpperCase().replace(/_/g, " ")} is not validate !`
        })
    }

    errorRequiredHandler = (name, value, error) => {
        this.setState({
            [name]: value,
            [error]: `${name.toUpperCase().replace(/_/g, " ")} is required !`
        });
    }

    errorCharacterValidation = (name, value, error, length) => {
        this.setState({
            [name]: value,
            [error]: `Characters should be ${length} characters or less.`
        });
    }

    handlerChange = (e) => {

        console.log(e.target.value);

        const { name, value } = e.target;
        const error = name + 'Error';

        let pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value.length < 1 &&
            ((name === "name") ||
                (name === "address") ||
                (name === "email") ||
                (name === "phone_number") ||
                (name === "description"))) {
            this.errorRequiredHandler(name, value, error);
        }

        else if (value.length > 50 &&
            ((name === "name") ||
                (name === "website_url") ||
                (name === "custom_url"))) {
            this.errorCharacterValidation(name, value, error, 50);
        }

        else if (value.length > 100 &&
            (name === "facebook_url")) {
            this.errorCharacterValidation(name, value, error, 100);
        }

        else if (value.length > 100 && (name === "address")) {
            this.errorCharacterValidation(name, value, error, 100);
        }

        else if (name === "description" && value.length > 300) {
            this.errorCharacterValidation(name, value, error, 300);
        }

        else if (
            value !== "" &&
            ((name === "email") ||
                (name === "phone_number") ||
                (name === "gen_category_id") ||
                (name === "type"))) {

            if (name === "email" && value !== "") {

                let result = pattern.test(value);

                if (result) {
                    this.setState({
                        [name]: value,
                        [error]: "",
                    })
                } else {
                    this.errorValidateHandler(name, value, error);
                }

            }

            if (name === "phone_number" && value !== "") {
                let result1 = phoneNumberValidation.isValidMMPhoneNumber(value);

                if (result1 === false && value.length > 0 ||
                    result1 === true && value.length === 10) {
                    this.errorValidateHandler(name, value, error);
                } else {
                    this.errorCleanHandler(name, value, error)
                }

            }

            if (name === "gen_category_id" && value !== "") {

                if (parseInt(value) === 0) {
                    this.errorRequiredHandler(name, value, error)
                } else {
                    this.errorCleanHandler(name, value, error)
                }
            }

            if (name === "type" && value !== "") {
                if (parseInt(value) === 0) {
                    this.setState({ types: '' })
                    this.errorRequiredHandler(name, value, error)
                } else {
                    if (parseInt(value) === 1) {
                        this.setState({ types: 'ONLINE' })
                        this.errorCleanHandler(name, value, error)
                    }
                    else if (parseInt(value) === 2) {
                        this.setState({ types: 'OFFLINE' })
                        this.errorCleanHandler(name, value, error)
                    }
                }
            }

        } else {
            this.errorCleanHandler(name, value, error)
        }

    }

    createShopProfile = async (e) => {

        const { name, gen_category_id, website_url, facebook_url, description, address,
            phone_number, email, custom_url, img_url, timeline_image, types } = this.state;

        this.setState({ submitSuccess: false });

        const data = {
            name: `${name}`,
            gen_category_id: parseInt(gen_category_id),
            website_url: `${website_url}`,
            facebook_url: `${facebook_url}`,
            description: `${description}`,
            address: `${address}`,
            contact_phno: `${phone_number}`,
            email: `${email}`,
            custom_url: `${custom_url}`,
            img_url: `${img_url}`,
            timeline_image: `${timeline_image}`,
            type: `${types}`
        }


        this.props.fetchData(this.context.createShop(data));
        this.setState({ loading: true })

        setTimeout(() => {
            this.setState({ loading: false })
        }, [3500])
    }

    render() {

        const { gen_category_id, description, custom_url, facebook_url, website_url,
            address, phone_number, email, img_url, timeline_image, type, types, disable, name } = this.state;

        let mydisable = disable;

        if (
            (name.length > 0 && name.length <= 50) &&
            (description.length > 0 && description.length <= 300) &&
            (email.length && this.state.emailError === "") > 0 &&
            (phone_number.length && this.state.phone_numberError === "") > 0 &&
            img_url.length > 0 &&
            timeline_image.length > 0 &&
            (custom_url.length === 0 || custom_url.length <= 50) &&
            (facebook_url.length === 0 || facebook_url.length <= 100) &&
            (website_url.length === 0 || website_url.length <= 50) &&
            (address.length > 0 && address.length <= 100) &&
            (types.length > 0 && type > 0) &&
            gen_category_id > 0) {
            mydisable = false;

        } else {
            mydisable = true;

        }

        return (

            <Grid
                container
            >
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                >
                    <ShopProfileImage imgLoading={this.uploadImageLoading} image={this.state.image_url} uploadImage={this.uploadImage} />
                    <ShopProfileTimeLine imgLoading={this.uploadImageLoading} timeLine={this.state.timeline_image} uploadTimeLine={this.uploadTimeLineImage} />
                </Grid>

                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={9}
                    xs={12}
                >
                    <ShopInfo
                        categories={this.props.categories}
                        shopInfo={this.state}
                        disable={mydisable}
                        loading={this.state.loading}
                        handlerChange={this.handlerChange}
                        createShop={this.createShopProfile}></ShopInfo>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ shop, category }) => ({
    status: shop.status,
    loading: shop.loading,
    submitSuccess: shop.submitSuccess,
    errorMessage: shop.errorMessage,
    categories: category.categories,
})

export default withRouter(connect(mapStateToProps, {
    fetchData,
    successLoading, getLoading, cleanErrorMessage
})(withSnackbar(ShopCreate)));
