export const ProfileUpdater = ({ profileEdit, userLoggedInDecoded }) => {

    // this is the fields name e.g: 
    // name or email
    const styleForKeys = {
        color: 'white',
        textDecoration: 'underline',

    };

    // this is the fields value e.g:
    // Juan & 7862222222
    const styleForValues = {
        color: 'white',
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row">
                            <div className="col-6">
                                <label><p style={styleForKeys}>First Name</p></label>
                            </div>
                            <div className="col-6">
                                {
                                    !profileEdit ?
                                        <p style={styleForValues}>{userLoggedInDecoded.first_name}</p> :
                                        <input type="text" className="form-control" placeholder={`${userLoggedInDecoded.first_name}`}
                                            id='first_name' autoComplete="off" defaultValue={userLoggedInDecoded.first_name} />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label><p style={styleForKeys}>Last Name</p></label>
                            </div>
                            <div className="col-6">
                                {
                                    !profileEdit ?
                                        <p style={styleForValues}>{userLoggedInDecoded.last_name}</p> :
                                        <input type="text" className="form-control" placeholder={`${userLoggedInDecoded.last_name}`}
                                            id='last_name' autoComplete="off" defaultValue={userLoggedInDecoded.last_name} />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label><p style={styleForKeys}>Email</p></label>
                            </div>
                            <div className="col-6">
                                {
                                    !profileEdit ?
                                        <p style={styleForValues}>{userLoggedInDecoded.email}</p> :
                                        <input type='email' className="form-control" placeholder={userLoggedInDecoded.email}
                                            id='email' autoComplete="off" defaultValue={userLoggedInDecoded.email} />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label><p style={styleForKeys}>Phone</p></label>
                            </div>
                            <div className="col-6">
                                {
                                    !profileEdit ?
                                        <p style={styleForValues}>{userLoggedInDecoded.phone_number}</p> :
                                        <input type='tel' className="form-control" placeholder={userLoggedInDecoded.phone_number}
                                            id='phone_number' autoComplete="off" defaultValue={userLoggedInDecoded.phone_number} />
                                }

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label><p style={styleForKeys}>Profession</p></label>
                            </div>
                            <div className="col-6">
                                {
                                    !profileEdit ?
                                        <p style={styleForValues}>{userLoggedInDecoded.profession}</p> :
                                        <input type='tel' className="form-control" placeholder={userLoggedInDecoded.profession}
                                            id='profession' autoComplete="off" defaultValue={userLoggedInDecoded.profession} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};