import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { ForgetEmail, UpdatePassword } from './components'
const ForgetPassword = (props) => {
  const [route, setRoute] = useState('');

  useEffect(() => {
    const type = queryString.parse(props.location.search);
    setRoute(type.type);
  }, [props]);

  const renderRoute = (value) => {
    if (value === 'updatePassword') {
      return <UpdatePassword />;
    }
    return <ForgetEmail />;
  };

  return (
    <div>
      {renderRoute(route)}
    </div>
  );
};
export default ForgetPassword;
