import './errorPopup.css';


export const ErrorPopup = ({ error }) => {

    // this is intented to get the first 
    // key of the return response from
    // the server so to show the error
    // by specifing the key in the error
    // object return. 
    const errorKey = Object.keys(error)[0]

    // If an error has occur in the profile
    // this will change the display property of
    // the errorPopup to 'none'
    const removeErrorPopup = () => {
        document.getElementById(error[errorKey]).style.display = 'none';
    }

    return (
        <div className="popup_content_wrap" id={error[errorKey]} style={{ display: 'block' }}>
            <div id="popup_content">
                {error && <p className='mt-5' id='errorPopupText'>{error[errorKey]}</p>}
                <button className="btn mb-5" id='continueButton' onClick={removeErrorPopup}>Continue</button>
            </div>
        </div>
    )
};