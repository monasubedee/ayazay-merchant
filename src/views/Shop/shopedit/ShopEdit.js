import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { updateShopProfile, getShopProfile, successLoading, getLoading, cleanErrorMessage, initLoading } from '../../../store/shop/actions';
import { Grid, Button } from '@material-ui/core';
import { ShopProfileEditImage, ShopProfileEditTimeLine } from './components/ShopProfileEdit';
import ShopInfo from './components/ShopInfo';
import { FetchContext } from '../../../context/FetchContext';
import './Shopedit.css';
import updateOperatorCheck from '../../../utils/updateOperatorChecker';
import { withSnackbar } from 'notistack';
import { fetchData } from 'store/action';
import { withStyles } from '@material-ui/styles';
import { purple, indigo } from '@material-ui/core/colors';
import phoneNumberValidation from 'myanmar-phonenumber';

class ShopEdit extends React.Component {

    static contextType = FetchContext;

    constructor(props) {

        super(props);
        this.state = {
            "name": "",
            "gen_category_id": 1,
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
            "type": '',
            "types": ['Off line', 'On line'],
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

    getShop = () => {

        const id = this.props.match.params.id;
        this.props.fetchData(this.context.getShopWithId(id));

    }

    componentDidMount() {
        this.getShop();
        this.props.fetchData(this.context.getCategory());
    }

    uploadImage = (url) => {
        if (this.state.passButton === true) {
            this.setState({ passButton: false })
        }
        this.setState({ img_url: url });
    }

    uploadImageLoading = (load) => {

        this.setState({ loading: load })

        setTimeout(() => {
            this.setState({ loading: false })
        }, [2500])

        this.setState({ submitSuccess: false })
    }


    uploadTimeImage = (url) => {
        if (this.state.passButton === true) {
            this.setState({ passButton: false })
        }
        this.setState({ timeline_image: url });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const { name, gen_category_id, website_url, facebook_url, description, email, custom_url, img_url, timeline_image, type, address, contact_phno } = this.props.shop;


        if (prevProps.status === 'Success') {
            this.props.enqueueSnackbar('Successfully Updated.', { variant: 'success' });
            this.props.fetchData(this.context.cleanEthic());
            this.props.history.push("/admin/shops/list");

        }

        if (prevProps.status === 'Error') {
            this.props.enqueueSnackbar('Please Try Again! (something wrong)', { variant: 'error' })
            this.props.fetchData(this.context.cleanEthic());
        }

        if (prevProps.shop.name !== name) {
            this.setState({ name: name })
        }
        if (prevProps.shop.gen_category_id !== gen_category_id) {
            this.setState({ gen_category_id: gen_category_id })
        }
        if (prevProps.shop.website_url !== website_url) {
            this.setState({ website_url: website_url })
        }
        if (prevProps.shop.facebook_url !== facebook_url) {
            this.setState({ facebook_url: facebook_url })
        }
        if (prevProps.shop.description !== description) {
            this.setState({ description: description })
        }
        if (prevProps.shop.email !== email) {
            this.setState({ email: email })
        }
        if (prevProps.shop.address !== address) {
            this.setState({ address: address })
        }
        if (prevProps.shop.contact_phno !== contact_phno) {
            this.setState({ phone_number: contact_phno })
        }
        if (prevProps.shop.custom_url !== custom_url) {
            this.setState({ custom_url: custom_url })
        }
        if (prevProps.shop.img_url !== img_url) {
            console.log(img_url);
            this.setState({ img_url: img_url })
        }
        if (prevProps.shop.timeline_image !== timeline_image) {
            console.log(img_url);
            this.setState({ timeline_image: timeline_image })
        }
        if (prevProps.shop.type !== type) {
            this.setState({ type: type })
        }
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

        const { name, value } = e.target;
        const error = name + 'Error';
        this.setState({ passButton: false })

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
                (name === "custom_url") ||
                (name === "website_url"))) {
            this.errorCharacterValidation(name, value, error, 50);
        }

        else if (value.length > 100 && (name === "facebook_url")) {
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
                (name === "gen_category_id")) ||
            (name === "type")) {

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
                }
                else {
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

                if (value === "Select Type") {
                    this.errorRequiredHandler(name, value, error)
                } else {
                    this.errorCleanHandler(name, value, error)
                }
            }

        } else {
            this.errorCleanHandler(name, value, error)
        }

    }


    updateShop = async (e) => {

        const { name, gen_category_id, website_url, facebook_url, description, address,
            phone_number, email, custom_url, img_url, timeline_image, type } = this.state;


        this.setState({ submitSuccess: false });
        console.log(img_url)

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
            type: `${type}`,
            id: this.props.match.params.id
        }

        this.props.fetchData(this.context.updateShop(data));
        this.setState({ loading: true })

        setTimeout(() => {
            this.setState({ loading: false })
        }, [3500])
    }

    render() {

        const { gen_category_id, description, custom_url, facebook_url, website_url,
            address, phone_number, email, img_url, timeline_image, type, passButton, disable, name } = this.state;

        let mydisable = disable;

        if (passButton === false &&
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
            (type === 'ONLINE' || type === 'OFFLINE') &&
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
                    <ShopProfileEditImage shopInfo={this.state} uploadImage={this.uploadImage}
                        imgLoading={this.uploadImageLoading} />
                    <ShopProfileEditTimeLine imgLoading={this.uploadImageLoading} shopInfo={this.state} uploadImage={this.uploadTimeImage} />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={9}
                    xs={12}
                >
                    <ShopInfo
                        id={this.props.match.params.id}
                        categories={this.props.categories}
                        shopInfo={this.state}
                        disable={mydisable}
                        loading={this.state.loading}
                        handlerChange={this.handlerChange}
                        shopEdit={this.updateShop}></ShopInfo>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ shop, category }) => ({
    shop: shop.shopData,
    status: shop.status,
    loading: shop.loading,
    submitSuccess: shop.submitSuccess,
    errorMessage: shop.errorMessage,
    categories: category.categories,
})

export default withRouter(connect(mapStateToProps, {
    updateShopProfile, getShopProfile, fetchData,
    successLoading, getLoading, cleanErrorMessage, initLoading
})(withSnackbar(ShopEdit)));
