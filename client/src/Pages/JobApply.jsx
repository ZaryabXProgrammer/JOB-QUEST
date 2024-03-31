import {useLocation} from 'react-router-dom'


const JobApply = () => {

    const location = useLocation()

    const id = location.pathname.split('/')[2];

    console.log(location.pathname)
    return (
        <div>

            <h1>this is the job apply page</h1>
            <h2>{id}</h2>

        </div>
    )
}

export default JobApply
