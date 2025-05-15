import React from "react";

export default function Background({imageUrl}){

    const BackgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
    }

    return <div style={BackgroundStyle}/>
}