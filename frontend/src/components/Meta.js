import React from 'react'
import {Helmet} from 'react-helmet'
 
const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaulProps = {
    title: 'Welcome to Givt',
    description:'The future of ECommrece',
    keywords:'Best Personaly Made Gifts'
}

export default Meta
