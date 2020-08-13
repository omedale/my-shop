import React from 'react'

const footer = () => {
  const footerWrapper = {
    alignSelf: 'flex-end',
    width: '100%',
    textAlign: 'center'
  }
  return(<p style={footerWrapper}>
        <span className="text-black-50">Omedale</span>
      </p>)
}

export default footer;