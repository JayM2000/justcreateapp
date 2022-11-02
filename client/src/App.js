import React,{useEffect} from 'react';
import { Route, Routes,BrowserRouter as Bt } from "react-router-dom";
import Land from './compo/layout/landing.js';
import Navb from './compo/layout/navbar.js';
import Login from './compo/login-reg/login';
import Reg from './compo/login-reg/reg';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux__appli/store';
import Alert from './compo/layout/alerts';
import setauth from './redux__appli/utils/setauthtoken';
import {loads} from './redux__appli/action/auth';
import Dash from './compo/dashboard/dashh';
import Pr from './compo/layout/privater';
import Profilecre from './compo/profile-create/profilecreate';
import Addexperience from './compo/profile-create/exp';
import Addeducation from './compo/profile-create/eduction';
import Proff from './compo/profileUI/profile';
import DevProf from './compo/profile_developers/profile';
import Posts from './compo/posts/posts';
import Post from './compo/post/post';
import Upld from './compo/uploadpic/upl';
import Newone from './compo/devconnect/devconn';

const App = () =>{

  useEffect(() => {
    
    if(localStorage.token){
      setauth(localStorage.token);
    }
    
    store.dispatch(loads());
  },[]);

return (
  <Provider store={store}>
    <Bt>
      <Navb />
      <Alert />
        <Routes>
          <Route path='/' element={<Land />} />
          <Route path='/uploadpic' element={<Upld />} />
          
          <Route path='/reg' element={<Reg />} />
          <Route path='/log' element={<Login />} />
          <Route path='/dev' element={<Login />} />
          <Route
            path='/devprof/:ids'
            element={<Pr component={DevProf} />}
          />
          <Route
            path='/connecteddevop/:ids'
            element={<Pr component={Newone} />}
          />
          <Route
            path='/dashb'
            element={<Pr component={Dash} />}
          />
          <Route
            path='/creprofile'
            element={<Pr component={Profilecre} />}
          />
          <Route
            path='/editprofile'
            element={<Pr component={Profilecre} />}
          />
          <Route
            path='/addexperience'
            element={<Pr component={Addexperience} />}
          />
          <Route
            path='/addeducation'
            element={<Pr component={Addeducation} />}
          />
          <Route
            path='/profiles'
            element={<Pr component={Proff} />}
          />
          <Route
            path='/posts'
            element={<Pr component={Posts} />}
          />
          <Route
            path='/post/:id'
            element={<Pr component={Post}/>}
          />
        </Routes>
    </Bt>
  </Provider>
)
};

export default App;
