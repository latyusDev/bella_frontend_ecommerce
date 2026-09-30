import React from 'react'
import {PersonalInfo} from './PersonalInfo'
import { useOrderStore } from '@/store/useOrderStore'
import { Profile } from './Profile'
import { useUserProfile } from '@/hooks/useProfile'
import Order from '../order/Order'
import Orders from '../order/Orders'

export const CurrentTab = () => {
    const {orderTab} = useOrderStore()
      const {data,isLoading} = useUserProfile();
    

    switch(orderTab){
        case 'profile-info':
            return <Profile user={data?.user} isLoading={isLoading}/>
        case 'orders':
            return <Orders orders={data?.orders}/>
        case 'wishlist':
            return <div>Wishlist</div>
        case 'notifications':
            return <div>Notifications</div>
        default:
            return <Profile user={data?.user} isLoading={isLoading}/>


    }
 
}
