import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
    const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        console.log(localStorage.getItem("user"));
        setCurrentUser("");
      };

    return(
        <div className="App-dashboard">
            <div className="App-logout-button">
                {isLoggedIn ? (
                    <>
                        <form className="App-form">
                            {currentUser}
                            <input type="button" value="Log Out" onClick={handleLogout} />
                        </form>
                </>
                ): null}
            </div>
            <h2>Dashboard</h2>
        </div>
    );
   
}

export default Dashboard;