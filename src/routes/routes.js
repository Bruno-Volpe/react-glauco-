import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomeUserMain from '../pages/homeUserMain'
import Header from '../components/header'
import HomeUser from '../pages/homeUser'

import error404 from '../pages/404'

import adminHome from '../pages/adminHome'
import adminUpdateUser from '../pages/adminUpdateUser'
import adminCreateUser from '../pages/adminCreateUser'
import adminDetailUser from '../pages/adminDetailUser'

import adminQUestionsHome from '../pages/adminQUestionsHome'
import adminQUestionUpdate from '../pages/adminQUestionUpdate'
import adminQuestionCreate from '../pages/adminQuestionCreate'

const Routes = () => {
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/' component={HomeUserMain} />
                <Route exact path='/user/:answear' component={HomeUser} />

                <Route exact path='/admin' component={adminHome} />
                
                <Route exact path='/admin/update/:id' component={adminUpdateUser} />
                <Route exact path='/admin/create' component={adminCreateUser} />
                <Route exact path='/admin/detailUser/:id' component={adminDetailUser} />
                
                <Route exact path='/admin/questions' component={adminQUestionsHome} />
                <Route exact path='/admin/createQestion' component={adminQuestionCreate} />
                <Route exact path='/admin/updateQuestion/:id' component={adminQUestionUpdate} />

                <Route path="*" component={error404} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes