
import React,{useState,useEffect} from 'react'
import { Outlet,Navigate, useLocation } from 'react-router-dom'
 

export default function Protector() {
  return (
        localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />
  )
}