import React from 'react';
import Header from '../headers/Header';

const Layout = ({ children }: any) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Layout