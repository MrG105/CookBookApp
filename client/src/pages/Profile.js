import React from 'react' 
import RecipeList from '../components/RecipeList'
import User from '../server/models/User'

const Profile  = () => {
    return( 
        <div>
            <h4>{User.username}</h4>

        </div>
    )
}