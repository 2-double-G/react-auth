import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.css';

const links = [
    {to: '/', label: 'Login', exact: true},
    {to: '/logout', label: 'Logout', exact: false},
    {to: '/filter', label: 'Filter', exact: false},
]

export default class Navigation extends Component {
    state = {}
    
    renderLinks() {
        return (
            links.map((link, index) => {
                return (
                    <li key={index + link.label}>
                        <NavLink
                            to={link.to}
                            exact={link.exact}
                        >
                            {link.label}
                        </NavLink>
                    </li>
                )
            })
        )
    }

    render() {
        return (
            <nav className={classes.Navigation}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}