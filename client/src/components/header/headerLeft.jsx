import React from 'react';

const HeaderLeft = ({toggle , settogggle}) => {
    return (
        <div className="header-left">
                <div className="header-logo">
                    <strong>BLOG</strong>
                    <i className="bi bi-pencil"></i>
                </div>
                <div onClick={()=>settogggle(prev => !prev)  } className="header-menu">
                    {toggle ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i> }
                </div>
            </div>
    );
};

export default HeaderLeft;