import{BrowserRouter as Wrap}from'react-router-dom'
import'react-phone-number-input/style.css'
import{ToastContainer as T}from'react-toastify';
import Router from'router/Router'
import AuthRedux from'./redux/AuthRedux'
import{memo}from'react'
export default memo(():React.JSX.Element=><AuthRedux><Wrap><Router/><T/></Wrap></AuthRedux>)