// buttons to submit changes to profile or 
// cancel the changes. 
export const ProfileButtons = ({ profileEdit, setProfileEdit, updateProfileEvent }) => {
    return (
        <div>
            <div style={{ marginTop: 20 }}>
                <button type="button" className="btn btn-md btn-success" onClick={updateProfileEvent}
                    style={{ marginRight: 20, backgroundColor: '#758E4F' }}>Submit</button>
                <button type="button" className="btn btn-md btn-danger"
                    style={{ backgroundColor: '#9E2A2B' }} onClick={() => setProfileEdit(!profileEdit)}>Cancel</button>
            </div>
        </div>
    )
};