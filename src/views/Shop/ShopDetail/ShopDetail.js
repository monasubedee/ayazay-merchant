import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { updateShopProfile, getShopProfile, successLoading, getLoading, cleanErrorMessage, initLoading } from '../../../store/shop/actions';
import { Grid } from '@material-ui/core';
import { FetchContext } from '../../../context/FetchContext';
import { ShopProfileImage } from './components/ShopProfileDetail';
import ShopInfo from './components/ShopInfo/ShopInfo';
import './ShopDetail.css';
import { fetchData } from 'store/action';


class ShopDetail extends React.Component {

    static contextType = FetchContext;

    constructor(props) {

        super(props);
        this.state = {
            "id": 0,
            "name": "",
            "gen_category_id": 1,
            "website_url": "",
            "facebook_url": "",
            "description": "",
            "address": "",
            "contact_phno": "",
            "email": "",
            "custom_url": "",
            "img_url": "",
            "timeline_image": "",
            "errormessage": '',
            "type": '',
            "types": ['Off line', 'On line'],
            "loading": '',
            "submitSuccess": '',
        }



    }

    uploadImageLoading = (load) => {
        this.setState({ submitSuccess: false })
        this.setState({ loading: load })

        setTimeout(() => {
            this.setState({ loading: false })
        }, [2500])

        this.setState({ submitSuccess: false })
    }

    getShop = () => {

        const id = this.props.match.params.id;
        this.setState({ id: id })
        this.props.fetchData(this.context.getShopWithId(id));

    }

    componentDidMount() {
        this.getShop();
        this.props.fetchData(this.context.getCategory());
    }


    uploadImage = (url) => {
        this.setState({ img_url: url });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const { name, gen_category_id, website_url, facebook_url, description, email, custom_url, img_url, timeline_image, type, address, contact_phno } = this.props.shop;

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
            this.setState({ contact_phno: contact_phno })
        }
        if (prevProps.shop.custom_url !== custom_url) {
            this.setState({ custom_url: custom_url })
        }
        if (prevProps.shop.img_url !== img_url) {
            console.log(img_url);
            this.setState({ img_url: img_url })
        }
        if (prevProps.shop.timeline_image !== timeline_image) {
            this.setState({ timeline_image: timeline_image })
        }
        if (prevProps.shop.type !== type) {
            this.setState({ type: type })
        }
    }

    render() {

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
                    <ShopProfileImage timeline={false} image={this.state.img_url} />
                    <ShopProfileImage timeline={true} image={this.state.timeline_image} />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={9}
                    xs={12}
                >
                    <ShopInfo categories={this.props.categories} id={this.props.match.params.id} shopInfo={this.state}></ShopInfo>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ shop, category }) => ({
    shop: shop.shopData,
    loading: shop.loading,
    submitSuccess: shop.submitSuccess,
    errorMessage: shop.errorMessage,
    categories: category.categories,
})

export default withRouter(connect(mapStateToProps, {
    updateShopProfile, getShopProfile, fetchData,
    successLoading, getLoading, cleanErrorMessage, initLoading
})(ShopDetail));
