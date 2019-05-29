import React from 'react';
import '../Uploader/Uploader.css';


const Uploader = (props) => {
    
 const  upload = (file) => {
        let reader = new FileReader();
        
        reader.readAsDataURL(file.files[0]); 
        reader.onload = () => {
            props.action(reader.result);
        }
    }

    return(
        <div className='uploader'>
            <label htmlFor="File">Add Image</label>
            <input type="file" id='File' onChange={(event) => {
                upload(event.target)
            }}/>
            { props.imageUrl ? <img className='imgAvatar' src={ props.imageUrl } alt="avatar" />  : null}
        </div>
    ) 
    
}

export default Uploader;