import React, { Fragment, useContext } from 'react'
import{ Route, Routes } from "react-router-dom"
import{ Login, Register, HomePage, MainPage } from "./pages/z-index"
import { MainPageContainer } from "./components/z-index"
import { SearchForm, AddJobs } from './dashboard/z-index'
// "proxy": "http://localhost:8080",


export function App_container() {
    


    return (
        <Fragment>
            <Routes>
                <Route path='/main-page' element={<MainPageContainer />}>   
                
                    <Route 
                        index
                        element={<MainPage />}
                    />

                    <Route 
                        path='all-jobs'
                        element=
                            {   
                                <Fragment>
                                    <SearchForm />
                                </Fragment>
                            }
                    />

                    <Route 
                        path='add-jobs'
                        element={<AddJobs />}
                    />

                    <Route 
                        path='profile'
                        element={<h1></h1>}
                    />

                    

                </Route>


                <Route 
                    path='/'
                    element={<HomePage />}
                />

                <Route 
                    path='/register' 
                    element={<Register />} 
                />

                <Route 
                    path='/login' 
                    element={<Login />} 
                />

            </Routes>
        </Fragment>
    )
}
