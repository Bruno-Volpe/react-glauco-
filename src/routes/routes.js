import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/header'
import HomeUserMain from '../pages/logged/homeUserMain'
import HomeUser from '../pages/logged/homeUser'

import error404 from '../pages/404'

import adminHome from '../pages/admin/user/adminHome'
import adminUpdateUser from '../pages/admin/user/adminUpdateUser'
import adminCreateUser from '../pages/admin/user/adminCreateUser'
import adminDetailUser from '../pages/admin/user/adminDetailUser'

import adminQUestionsHome from '../pages/admin/question/adminQUestionsHome'
import adminQUestionUpdate from '../pages/admin/question/adminQUestionUpdate'
import adminQuestionCreate from '../pages/admin/question/adminQuestionCreate'

import loginHome from '../pages/login/home'

const Routes = () => {
    return (
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

                <Route exact path='/login' component={loginHome} />

                <Route path="*" component={error404} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes