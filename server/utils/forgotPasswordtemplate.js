const forgotPaswordTemplate = ({name, otp})=>{
    return `
    <div>
    <p>Dear, ${name}<p>
    <p> reset password otp <p>
    <div>
       ${otp}
    </div>
    <p>otp valid for 1hr</p>
    <br/>
    </br>
    <p>junglBook</p>
    </div>
    
    
    `
}

export default forgotPaswordTemplate