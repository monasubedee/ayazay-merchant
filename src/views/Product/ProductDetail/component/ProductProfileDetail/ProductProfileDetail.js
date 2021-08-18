import React, { useEffect, useState } from 'react';
import ProductInfo from '../ProductInfo/ProductInfo';
import ProductVariantDetail from '../ProductVariantDetail/ProductVariantDetail';


const ProductProfileDetail = ({ proInfo }) => {

  const [productInfo, setproductInfo] = useState({
    name_english: '',
    name_myanmar: '',
    category: '',
    categorymm: '',
    sub_categorymm: '',
    sub_category: '',
    brand: '',
    price: '',
    qty: '',
    size: '',
    color: '',

  });

  const [variants, setVariants] = useState([]);
  const [des, setDes] = useState({
    desMM: '',
    desEN: '',
  });

  useEffect(() => {

    if (Object.keys(proInfo).length > 0) {

      setproductInfo({
        ...productInfo,
        name_english: `${proInfo.name_english !== undefined ? proInfo.name_english : 'Name english not found'}`,
        name_myanmar: `${proInfo.name_myanmar !== undefined ? proInfo.name_myanmar : 'Name myanmar not found'}`,
        category: `${proInfo.category.name_english !== undefined ? proInfo.category.name_english : 'Category not found'}`,
        categorymm: `${proInfo.category.name_myanmar !== undefined ? proInfo.category.name_myanmar : 'Category mm not found '}`,
        sub_categorymm: `${proInfo.subcategory.name_myanmar !== undefined ? proInfo.subcategory.name_myanmar : 'Sub category mm not found '}`,
        sub_category: `${proInfo.subcategory.name_english !== undefined ? proInfo.subcategory.name_english : 'Sub category not found'}`,
        brand: `${proInfo.brand.name !== undefined ? proInfo.brand.name : 'Brand not found'}`,

      })

      setVariants(proInfo.variants)
      setDes({
        ...des,
        desMM: proInfo.description_myanmar,
        desEN: proInfo.description_english
      })
    }

  }, [proInfo])

  console.log("PRO ", proInfo.variants);

  return (
    <div>
      <ProductInfo proInfo={productInfo} />
      <ProductVariantDetail
        des={des}
        proVariants={variants}
      />

    </div>
  );
};



export default ProductProfileDetail;
