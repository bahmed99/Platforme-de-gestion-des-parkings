import React from 'react'
import '../assets/css/LogoutButton.css'
export default function LogoutButton() {

    const logout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        window.location.reload();

    }
  return (
    <button class="custom-btn btn-7" onClick={logout}><span>Déconnexion</span>
    </button>
  )
}
