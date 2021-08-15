import React from 'react'

const Error = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
        {props.children}
      </div>
    )
}

export default Error

// className={`alert alert-${error.variant || 'info'} `}