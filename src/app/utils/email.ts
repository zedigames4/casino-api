import Keys from '../keys';

export default class emailMocks {
  static verifyAccount(firstName: string, token: string) {
    return `
        <div style="width:85%;margin:auto;">
            <p style="font-family: 'Roboto', sans-serif;font-size: 1.2em;font-weight: 400;line-height: 1.55;color: #222222;margin: 10px 0 30px;padding: 44px 34px 44px 34px;background-color: #ffffff;border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 210, 190, 129);">
                Hi <span>${firstName}</span>,<br><br>
                Welcome to Play in rwanda, PLAY & GAIN REWARDS FREE, FUN & FAIR REWARD FOR EVERYONE!!<br /> <br />
                You have access to popular games, <br />
                Activate your account to get started. <br />
                <a href="${
                  Keys.FRONT_END_URL || Keys.HOST
                }/activate?key=${token}" style="text-decoration:none; border: none;color: white;padding: 10px; text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;background-color: #4CAF50;">Click Here</a>
                <br />
                <br />
                Welcome again! Kindly confirm your registration as soon as possible! <br><br>
                Best Wishes,
                <br />
                <p>Play in rwanda</p>
            </p>
        </div>
      `;
  }

  static forgetPassword(token: string) {
    const url = `${
      Keys.FRONT_END_URL || Keys.HOST
    }/reset-password?key=${token}`;
    return `
        <div style="width:85%;margin:auto;">
            <p style="font-family: 'Roboto', sans-serif;font-size: 1.2em;font-weight: 400;line-height: 1.55;color: #222222;margin: 10px 0 30px;padding: 44px 34px 44px 34px;background-color: #ffffff;border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 210, 190, 129);">
               Hello, <br><br>
               No worries humans forget, you are missing in the Play in rwanda :-( <br />
               Straight forward use this link to catch up and access your account <br />
               as usual with Play in rwanda <br />
               <b style="color:#2E86C1"><a href="${url}" style="color:#4CAF50">click here</a></b><br>
            <strong>NB:</strong><span style="color:OrangeRed">  remember that this link will be expired not too Long </span>
                <br />
                <br />                
                Best,
                <br>
                <p>Play in rwanda</p>
            </p>
        </div>
      `;
  }
}
