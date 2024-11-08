function WorkExperience ({jobTitle,companyName,date,endDate, jobDesc})
{
    return <div className="workSection">
  

    <div className="workExperienceSection">
        <div className="jobTitle"><div>{jobTitle}</div> <div className="dateExperience">{date} {date && <span>-</span>} {endDate}</div></div>
        <div className="companyTitle">{companyName}</div>
        <div className="jobDescription">{jobDesc}</div>
    </div>



</div>;
}
export default WorkExperience;