import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_PATH } from '../app/constants';

const NotFound = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  }}>
    <h1>404 - Not Found!</h1>
    <Link to={BASE_PATH}>
      Go Home
    </Link>
  </div>
);

export default NotFound;
