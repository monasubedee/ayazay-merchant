import React from 'react';
import ClipLoader from 'react-spinners/PuffLoader';

const Spinner = ({ loading }) => (

  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '13rem' }}>
    <ClipLoader
      size={150}
      color="red"
      loading={loading}
    />
  </div>
);

export default Spinner;
