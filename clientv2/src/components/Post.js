import { useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
const Post = ({title, text, deletePost, id,  coffees, updatePost, username, sessionUsername, savePost}) =>{
    const [options, setOptions] = useState(false)
    const [coffeesState, setCoffeesState] = useState({state:false, counter:coffees})
    const [saveState, setSaveState] = useState(false)
    //Handlers

    const handleDelete = () =>{
        deletePost(id)
    }
    const handleAddCoffee = () =>{
        if (coffees !== coffeesState.counter) {
            const newPost = {
                title,
                text,
                likes:coffeesState.counter
            }
            updatePost(id, newPost)
        }
    }

    const handleSavePost = () =>{
        savePost(id)
    }
    return(
            <div  className="card post ">
                <Link to={`post/${id}`} className="card-body" >
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">forum - {username}</h6>
                    <p className="card-text">{text}</p>
                </Link>
                <div className='btnContainer'>
                    <div>
                        <button onClick={() => setOptions(prev => (!prev))}>
                            <Icon.List/>
                        </button>
                        <div style={options ? {opacity:'1', transition:'.3s'} : {opacity:'0',transition:'.3s', visibility:'hidden'}}>
                            <ul className='btnOptionsContainer'>
                                <li>
                                    <button 
                                    onClick={handleSavePost} 
                                    className={saveState ? 'unsave' : 'save'}>
                                        {saveState
                                        ?<Icon.BookmarkFill/>
                                        :<Icon.Bookmark/>}
                                    </button>
                                </li>                     
                                <li style={username === sessionUsername ? {} : {display:'none'}}>
                                    <button onClick={handleDelete} className='delete'>
                                        <Icon.DashCircleFill/>
                                    </button>
                                </li>                     
                                <li style={username === sessionUsername ? {} : {display:'none'}}>
                                    <Link to={`post/${id}&editing`}>
                                        <button className='edit'>
                                            <Icon.PencilSquare/>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button 
                    onMouseLeave={handleAddCoffee} 
                    onClick={() => setCoffeesState(prevState => ({state:true, counter:prevState.counter + 1}))}
                    className={'Give-a-coffe mb-1'}>
                        <Icon.CupFill/>
                    <span className='Give-a-coffeCounter'> {coffeesState.counter > 0 ? coffeesState.counter : null} </span>
                    </button>
                </div>
            </div>
    )
}
 
export default Post;