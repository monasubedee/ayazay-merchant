import publicFetch from '../utils/publicFetch';
/**
 * @param  {} data is array includes
 * Promise
 * Type for success 
 * Type for error
 */
export const fetchData = (data) => async dispatch => {
  try {
    const response = await data[0];
    console.log('RESPONSE', response.data);
    dispatch({
      type: data[1],
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: data[2]
    });
  }
};

/**
 * @param  {} data is array includes
 * Type of sucsss
 * response data
 */
export const changeData = (data) => ({ type: data[0], payload: data[1] });


/**
 * @param  {} file upload to bucket
 */
export const uploadImage = async (file) => {
  let path = null;

  let fileExtension = file.type.split('/').pop();

  if (process.env.NODE_ENV !== 'production') {
    path = 'aya-zay/merchant';
  } else {
    path = 'test-aya-zay/merchant';
  }

  const signURLRESPONSE = await publicFetch.get(`/image/signurl?path=${path}&image_type=${fileExtension.toLowerCase()}`);
  console.log('SIGN URL', signURLRESPONSE);
  const response = await publicFetch.put(signURLRESPONSE.data.url, file, {
    headers: { 'Content-Type': `image/${fileExtension}` },
  });
  console.log('RES URL', response);
  try {
    return response.status === 200 ? signURLRESPONSE.data.key : null;
  } catch (error) {
    return null;
  }
};
