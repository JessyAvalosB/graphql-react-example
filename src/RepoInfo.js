import classNames from 'classnames';
import React from 'react'

const RepoInfo = (props) => {
    const { repo } = props;
    let license;
    const viewerSubscriptionClass = classNames(
        'btn',
        'px-1',
        'py-1',
        'ms-1',
        'btn-sm',
        'd-inline-block', {
        'btn-success': repo.viewerSubscription === 'SUBSCRIBED',
        'btn-outline-secondary': repo.viewerSubscription !== 'SUBSCRIBED',
    });

    const licenseClass = [
        'btn',
        'px-1',
        'py-0',
        'ms-1',
        'btn-sm',
        'd-inline-block',
    ];

    switch (repo.licenseInfo?.spdxId) {
        case undefined:
            license = (
                <span className={classNames('btn-danger', licenseClass)} style={{ fontSize: '.6em' }}>
                    NO LICENSE
                </span>
            )
            break;
        case 'NOASSERTION':
            license = (
                <span className={classNames('btn-warning', licenseClass)} style={{ fontSize: '.6em' }}>
                    {repo.licenseInfo.spdxId}
                </span>
            )
            break;
        default:
            license = (
                <span className={classNames('btn-outline-success', licenseClass)} style={{ fontSize: '.6em' }}>
                    {repo.licenseInfo.spdxId}
                </span>
            )
            break;
    }
    return (
        <li className='list-group-item' key={repo.id.toString()}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-column'>
                    <a className='h5 mb-0 text-decoration-none' href={repo.url} target='_blank' rel='noreferrer'>
                        {repo.name}
                    </a>
                    <p className='small'>{repo.description}</p>
                </div>
                <div className='text-nowrap ms-3'>
                    {license}
                    <span className={viewerSubscriptionClass} style={{ fontSize: '.6em' }}>
                        {repo.viewerSubscription}
                    </span>
                </div>
            </div>
        </li>
    )
}

export default RepoInfo;
