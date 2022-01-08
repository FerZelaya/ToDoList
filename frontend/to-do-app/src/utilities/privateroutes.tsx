import React from 'react'
import {Route} from 'react-router-dom'


export const PrivRoute:React.FC = (props: any) => {
    const {component: CustomComponent, auth, ...rest} = props

    return(
        <Route
            {...rest}
            component={
                (props: JSX.IntrinsicAttributes) => {
                    return(
                        <CustomComponent {...props} auth={auth}/>
                    )
                }
            }
        
        />
    )
}