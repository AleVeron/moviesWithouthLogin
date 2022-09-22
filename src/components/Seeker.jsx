import { useNavigate } from 'react-router-dom';



export default function Seeker() {

    const navigate = useNavigate()
    

    const handleChange = (e) => {
        const key = e.target.value.trim().toLowerCase()

        if (key.length !== 0 && key.length > 4) {
            navigate(`/results?keyword=${key}`)
        } else {
            navigate("/")
        }
    }

    return (

        <div>
            <input onKeyUp={handleChange} className="form-control" type="text" name="key" placeholder="Search Here" />
        </div>


    )
}