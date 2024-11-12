function PersonalDetail({name,email,phoneNumber,social})
{
    return <div className="personalSection">
        <h2 className ="name">{name}</h2>

        <div className="contactSection">
        <div>{email}</div>
        <div>{phoneNumber}</div>
        <div>{social}</div>
        </div>   
    </div>
}
export default PersonalDetail;