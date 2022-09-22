import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Seeker from './Seeker';

function Header() {


    const navigate = useNavigate()


    return (
        <header>



            <ul className='d-flex flex-column flex-sm-row justify-content-around align-items-center gap-3'>

                <li>
                    <Link className='links' to="/">List</Link>
                </li>

                <li>
                    <Link className='links' to="favs">Favs</Link>
                </li>

                <li>
                    <Seeker />
                </li>


            </ul>


        </header>
    )
}

export default Header;