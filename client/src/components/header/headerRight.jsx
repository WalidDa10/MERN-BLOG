import { Link } from 'react-router-dom';
import {useSelector} from "react-redux"
const HeaderRight = () => {
    const {user} = useSelector(state => state.auth)
    return (
        <div className="header-right">
                {user ? 
                <>
                <div className="header-right-user-info">
                    <span className="header-right-username">
                        {user?.user}
                    </span> 
                    <img src={user?.profilePhoto.url}
                    alt="" 
                    className='header-right-user-photo'
                    />
                    <div className="header-right-dropdown">
                        <Link className='header-dropdown-item' ></Link>
                    </div>
                </div>

                </> : (
                   <>
                        <Link to="/Login" className="header-right-link">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Login</span>
                        </Link>
                        <Link to="/Register" className="header-right-link">
                            <i className="bi bi-person-plus"></i>
                            <span>Register</span>
                        </Link>
                   
                   </> 
                )
                }
            </div>
    );
};

export default HeaderRight;