import React from 'react'
import { Link } from 'react-router-dom';

const footer = () => {
  const footerWrapper = {
    alignSelf: 'flex-end',
    width: '100%',
    textAlign: 'center'
  }
  return(<p style={footerWrapper}>
        <Link to="/" className="text-black-50">Omedale</Link>
      </p>)
}

export default footer;