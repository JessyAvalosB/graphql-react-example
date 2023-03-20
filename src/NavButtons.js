import classNames from 'classnames';
import React from 'react'

const NavButtons = ({ navConfig }) => {
    const { start, end, next, previous, onPageChange } = navConfig;

    const NavButtonsClass = classNames(
        'd-flex',
        'justify-content-center',
        'my-2',
    )

    const PrevNextButtonClass = [
        'btn',
        'mx-1',
        'btn-sm',
        'btn-primary',
        'bi',
    ]

    return (
        <div className={NavButtonsClass}>
            {previous && (
                <button className={classNames('bi-arrow-left', PrevNextButtonClass)} onClick={() => onPageChange('last', `before: "${start}"`)}></button>
            )}
            {next && (
                <button className={classNames('bi-arrow-right', PrevNextButtonClass)} onClick={() => onPageChange('first', `after: "${end}"`)}></button>
            )}
        </div>
    )
}

export default NavButtons
