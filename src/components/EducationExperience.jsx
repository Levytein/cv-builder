function EducationExperience ({title,orgName,date,endDate, eduDesc})
{
    return <div className="workSection">
  

    <div className="workExperienceSection">
        <div className="jobTitle"><div>{orgName}</div> <div className="dateExperience">{date} {date && <span>-</span>} {endDate}</div></div>
        <div className="companyTitle">{title}</div>
        <div className="jobDescription">{eduDesc}</div>
    </div>



</div>;
}
export default EducationExperience;