import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import icon from './google-logo-9808.png'
import can from './red-trash-can-icon.png'
import mock from 'C:/Users/Khaled/Documents/GitHub/FrontEnd/sarakel/src/mock.json';
export default function Account() {
    let Google
    let UserId 
    let SavedGender
    let UserEmail
    let Country
    let Pass
    let saveEmail
    let SavePass
    const [toggle1, setToggle1] = React.useState(false)
    if(toggle1 === true){
        saveEmail = "Save"
    }else{
        saveEmail = "Change"
    }
    
    const [toggle2, setToggle2] = React.useState(false)
    if(toggle2 === true){
        SavePass = "Save"
    }else{
        SavePass = "Change"
    }


mock.users.map((user) => {
    if(user.LoggedIn === 1){
        UserId = user.id
        SavedGender = user.gender
        Google = user.google
        UserEmail = user.email
        Country = user.Country
        Pass = user.pass
        return
    }
})  
    const [Password, setPass] = React.useState(`${Pass}`)
    const [gender, setGender] = React.useState(SavedGender)
    const [value, setValue] = React.useState(Google)
    const [Email, setEmail] = React.useState(`${UserEmail}`)
    const GenderHandler = (g) =>{
        mock.users.map((user) =>{
            if(user.id === UserId ){
                user.gender = g
                
            }
        })
        
    }
    const GoogleHandler = (g) =>{
        mock.users.map((user) =>{
            if(user.id === UserId ){
                user.google = g
            }
        })
        
    }
    const secArray = []
    for(let i=0;i<2;i++){
        if (i===value){
        secArray.push(`${classes.show}`)
        }
        else{
        secArray.push(`${classes.hide}`)
        }
    }

    const AddEmail = () => {
        mock.users.map((user) =>{
            if(user.id === UserId ){
                user.email = Email
                return
            }
        })
    }
    const changeEmail = event =>{
        setEmail(event.target.value)

    }
    const AddPass = () => {
        mock.users.map((user) =>{
            if(user.id === UserId ){
                user.pass = Password
                return
            }
        })
    }
    const changePass = event =>{

        setPass(event.target.value)

    }
       
    
    return(
        <div className={`${classes.tab}`}>
            <div className='holder'>
                <h2 className={`${classes.header}`}>Account Settings</h2>
                <h3 className={`${classes.Subheaders}`}>ACCOUNT PREFERENCES <hr className='mt-2'></hr></h3>
                <div className={`${classes.box}`}>
                    <div >
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Email address</h3>
                        <p className={`${classes.Subtext}`}>{UserEmail}</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                    <a href="#" className={`${classes.Change} ${classes.font}`} onClick={() => {setToggle1(!toggle1); AddEmail()}} >{saveEmail}</a>
                    </div>
                </div>
                {toggle1 &&(<div className={`${classes.mb}`} >
                    <div className={`${classes.BlockUserDiv}`}>
                        <div className={`${classes.w80} ${classes.InputTextDiv}`}>
                            <input type="text"  placeholder={UserEmail}  className={`${classes.w100} ${classes.Inputbox}`} onChange={changeEmail}></input>
                        </div>
                    </div>
                </div>)}
                <div className={`${classes.box}`}>
                    <div >
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Change password</h3>
                        <p className={`${classes.Subtext}`}>Password must be at least 8 characters long</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                    <a href="#" className={`${classes.Change} ${classes.font}`} onClick={() => {setToggle2(!toggle2); AddPass()}} Toggle State>{SavePass}</a>
                    </div>
                </div>
                {toggle2 &&(<div className={`${classes.mb}`} >
                    <div className={`${classes.BlockUserDiv}`}>
                        <div className={`${classes.w80} ${classes.InputTextDiv}`}>
                            <input type="text" placeholder=' New Password'  className={`${classes.w100} ${classes.Inputbox}`} onChange={changePass}></input>
                        </div>
                    </div>
                </div>)}
                <div className={`${classes.box}`}>
                    <div>
                    <h3 className={`${classes.SettingTopics}`}>Gender</h3>
                    <p className={`${classes.Subtext} ${classes.font}`}>This information may be used to improve your recommendations and ads.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <div className={`${classes.dropdown}`}>
                            <button className={`${classes.dropbtn} `}><span className={`${classes.font}`}>{gender}</span></button>
                            <div className={`${classes.dropdownContent} ${classes.font}`}>
                                <a  onClick={() => {setGender("Male"); GenderHandler("Male")}}>Male</a>
                                <a  onClick={() => {setGender("Woman"); GenderHandler("Woman")}}>Woman</a>
                                <a  onClick={() => {setGender("Non-Bianry"); GenderHandler("Non-Bianry")}}>Non-Binary</a>
                                <a  onClick={() => {setGender("I prefer not to say"); GenderHandler("I prefer not to say")}}>I Prefer Not To Say</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Content Languages</h3>
                        <p className={`${classes.Subtext}`}>Add languages you’d like to see posts, community recommendations, and other content in</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                    <a href="#" className={`${classes.Change} ${classes.font}`}>Change</a>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Local customization</h3>
                        <p className={`${classes.Subtext}`}>Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data</p>
                    </div>
                    <div className={`${classes.box}`}>
                    <select name="country" className={`${classes.CountryDrpDwn}`} id="country">
                        <option value="0" label={Country + '....'} selected="selected" ></option>
                        <optgroup id="country-optgroup-Africa" label="Africa" className={`${classes.Blue}`}>
                            <option value="DZ" label="Algeria">Algeria</option>
                            <option value="AO" label="Angola">Angola</option>
                            <option value="BJ" label="Benin">Benin</option>
                            <option value="BW" label="Botswana">Botswana</option>
                            <option value="BF" label="Burkina Faso">Burkina Faso</option>
                            <option value="BI" label="Burundi">Burundi</option>
                            <option value="CM" label="Cameroon">Cameroon</option>
                            <option value="CV" label="Cape Verde">Cape Verde</option>
                            <option value="CF" label="Central African Republic">Central African Republic</option>
                            <option value="TD" label="Chad">Chad</option>
                            <option value="KM" label="Comoros">Comoros</option>
                            <option value="CG" label="Congo - Brazzaville">Congo - Brazzaville</option>
                            <option value="CD" label="Congo - Kinshasa">Congo - Kinshasa</option>
                            <option value="CI" label="Côte d’Ivoire">Côte d’Ivoire</option>
                            <option value="DJ" label="Djibouti">Djibouti</option>
                            <option value="EG" label="Egypt">Egypt</option>
                            <option value="GQ" label="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="ER" label="Eritrea">Eritrea</option>
                            <option value="ET" label="Ethiopia">Ethiopia</option>
                            <option value="GA" label="Gabon">Gabon</option>
                            <option value="GM" label="Gambia">Gambia</option>
                            <option value="GH" label="Ghana">Ghana</option>
                            <option value="GN" label="Guinea">Guinea</option>
                            <option value="GW" label="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="KE" label="Kenya">Kenya</option>
                            <option value="LS" label="Lesotho">Lesotho</option>
                            <option value="LR" label="Liberia">Liberia</option>
                            <option value="LY" label="Libya">Libya</option>
                            <option value="MG" label="Madagascar">Madagascar</option>
                            <option value="MW" label="Malawi">Malawi</option>
                            <option value="ML" label="Mali">Mali</option>
                            <option value="MR" label="Mauritania">Mauritania</option>
                            <option value="MU" label="Mauritius">Mauritius</option>
                            <option value="YT" label="Mayotte">Mayotte</option>
                            <option value="MA" label="Morocco">Morocco</option>
                            <option value="MZ" label="Mozambique">Mozambique</option>
                            <option value="NA" label="Namibia">Namibia</option>
                            <option value="NE" label="Niger">Niger</option>
                            <option value="NG" label="Nigeria">Nigeria</option>
                            <option value="RW" label="Rwanda">Rwanda</option>
                            <option value="RE" label="Réunion">Réunion</option>
                            <option value="SH" label="Saint Helena">Saint Helena</option>
                            <option value="SN" label="Senegal">Senegal</option>
                            <option value="SC" label="Seychelles">Seychelles</option>
                            <option value="SL" label="Sierra Leone">Sierra Leone</option>
                            <option value="SO" label="Somalia">Somalia</option>
                            <option value="ZA" label="South Africa">South Africa</option>
                            <option value="SD" label="Sudan">Sudan</option>
                            <option value="SZ" label="Swaziland">Swaziland</option>
                            <option value="ST" label="São Tomé and Príncipe">São Tomé and Príncipe</option>
                            <option value="TZ" label="Tanzania">Tanzania</option>
                            <option value="TG" label="Togo">Togo</option>
                            <option value="TN" label="Tunisia">Tunisia</option>
                            <option value="UG" label="Uganda">Uganda</option>
                            <option value="EH" label="Western Sahara">Western Sahara</option>
                            <option value="ZM" label="Zambia">Zambia</option>
                            <option value="ZW" label="Zimbabwe">Zimbabwe</option>
                        </optgroup>
                        <optgroup id="country-optgroup-Americas" label="Americas">
                            <option value="AI" label="Anguilla">Anguilla</option>
                            <option value="AG" label="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="AR" label="Argentina">Argentina</option>
                            <option value="AW" label="Aruba">Aruba</option>
                            <option value="BS" label="Bahamas">Bahamas</option>
                            <option value="BB" label="Barbados">Barbados</option>
                            <option value="BZ" label="Belize">Belize</option>
                            <option value="BM" label="Bermuda">Bermuda</option>
                            <option value="BO" label="Bolivia">Bolivia</option>
                            <option value="BR" label="Brazil">Brazil</option>
                            <option value="VG" label="British Virgin Islands">British Virgin Islands</option>
                            <option value="CA" label="Canada">Canada</option>
                            <option value="KY" label="Cayman Islands">Cayman Islands</option>
                            <option value="CL" label="Chile">Chile</option>
                            <option value="CO" label="Colombia">Colombia</option>
                            <option value="CR" label="Costa Rica">Costa Rica</option>
                            <option value="CU" label="Cuba">Cuba</option>
                            <option value="DM" label="Dominica">Dominica</option>
                            <option value="DO" label="Dominican Republic">Dominican Republic</option>
                            <option value="EC" label="Ecuador">Ecuador</option>
                            <option value="SV" label="El Salvador">El Salvador</option>
                            <option value="FK" label="Falkland Islands">Falkland Islands</option>
                            <option value="GF" label="French Guiana">French Guiana</option>
                            <option value="GL" label="Greenland">Greenland</option>
                            <option value="GD" label="Grenada">Grenada</option>
                            <option value="GP" label="Guadeloupe">Guadeloupe</option>
                            <option value="GT" label="Guatemala">Guatemala</option>
                            <option value="GY" label="Guyana">Guyana</option>
                            <option value="HT" label="Haiti">Haiti</option>
                            <option value="HN" label="Honduras">Honduras</option>
                            <option value="JM" label="Jamaica">Jamaica</option>
                            <option value="MQ" label="Martinique">Martinique</option>
                            <option value="MX" label="Mexico">Mexico</option>
                            <option value="MS" label="Montserrat">Montserrat</option>
                            <option value="AN" label="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="NI" label="Nicaragua">Nicaragua</option>
                            <option value="PA" label="Panama">Panama</option>
                            <option value="PY" label="Paraguay">Paraguay</option>
                            <option value="PE" label="Peru">Peru</option>
                            <option value="PR" label="Puerto Rico">Puerto Rico</option>
                            <option value="BL" label="Saint Barthélemy">Saint Barthélemy</option>
                            <option value="KN" label="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="LC" label="Saint Lucia">Saint Lucia</option>
                            <option value="MF" label="Saint Martin">Saint Martin</option>
                            <option value="PM" label="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="VC" label="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                            <option value="SR" label="Suriname">Suriname</option>
                            <option value="TT" label="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="TC" label="Turks and Caicos Islands">Turks and Caicos Islands</option>
                            <option value="VI" label="U.S. Virgin Islands">U.S. Virgin Islands</option>
                            <option value="US" label="United States">United States</option>
                            <option value="UY" label="Uruguay">Uruguay</option>
                            <option value="VE" label="Venezuela">Venezuela</option>
                        </optgroup>
                        <optgroup id="country-optgroup-Asia" label="Asia">
                            <option value="AF" label="Afghanistan">Afghanistan</option>
                            <option value="AM" label="Armenia">Armenia</option>
                            <option value="AZ" label="Azerbaijan">Azerbaijan</option>
                            <option value="BH" label="Bahrain">Bahrain</option>
                            <option value="BD" label="Bangladesh">Bangladesh</option>
                            <option value="BT" label="Bhutan">Bhutan</option>
                            <option value="BN" label="Brunei">Brunei</option>
                            <option value="KH" label="Cambodia">Cambodia</option>
                            <option value="CN" label="China">China</option>
                            <option value="GE" label="Georgia">Georgia</option>
                            <option value="HK" label="Hong Kong SAR China">Hong Kong SAR China</option>
                            <option value="IN" label="India">India</option>
                            <option value="ID" label="Indonesia">Indonesia</option>
                            <option value="IR" label="Iran">Iran</option>
                            <option value="IQ" label="Iraq">Iraq</option>
                            <option value="IL" label="Israel">Israel</option>
                            <option value="JP" label="Japan">Japan</option>
                            <option value="JO" label="Jordan">Jordan</option>
                            <option value="KZ" label="Kazakhstan">Kazakhstan</option>
                            <option value="KW" label="Kuwait">Kuwait</option>
                            <option value="KG" label="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="LA" label="Laos">Laos</option>
                            <option value="LB" label="Lebanon">Lebanon</option>
                            <option value="MO" label="Macau SAR China">Macau SAR China</option>
                            <option value="MY" label="Malaysia">Malaysia</option>
                            <option value="MV" label="Maldives">Maldives</option>
                            <option value="MN" label="Mongolia">Mongolia</option>
                            <option value="MM" label="Myanmar [Burma]">Myanmar [Burma]</option>
                            <option value="NP" label="Nepal">Nepal</option>
                            <option value="NT" label="Neutral Zone">Neutral Zone</option>
                            <option value="KP" label="North Korea">North Korea</option>
                            <option value="OM" label="Oman">Oman</option>
                            <option value="PK" label="Pakistan">Pakistan</option>
                            <option value="PS" label="Palestinian Territories">Palestinian Territories</option>
                            <option value="YD" label="People's Democratic Republic of Yemen">People's Democratic Republic of Yemen</option>
                            <option value="PH" label="Philippines">Philippines</option>
                            <option value="QA" label="Qatar">Qatar</option>
                            <option value="SA" label="Saudi Arabia">Saudi Arabia</option>
                            <option value="SG" label="Singapore">Singapore</option>
                            <option value="KR" label="South Korea">South Korea</option>
                            <option value="LK" label="Sri Lanka">Sri Lanka</option>
                            <option value="SY" label="Syria">Syria</option>
                            <option value="TW" label="Taiwan">Taiwan</option>
                            <option value="TJ" label="Tajikistan">Tajikistan</option>
                            <option value="TH" label="Thailand">Thailand</option>
                            <option value="TL" label="Timor-Leste">Timor-Leste</option>
                            <option value="TR" label="Turkey">Turkey</option>
                            <option value="TM" label="Turkmenistan">Turkmenistan</option>
                            <option value="AE" label="United Arab Emirates">United Arab Emirates</option>
                            <option value="UZ" label="Uzbekistan">Uzbekistan</option>
                            <option value="VN" label="Vietnam">Vietnam</option>
                            <option value="YE" label="Yemen">Yemen</option>
                        </optgroup>
                        <optgroup id="country-optgroup-Europe" label="Europe">
                            <option value="AL" label="Albania">Albania</option>
                            <option value="AD" label="Andorra">Andorra</option>
                            <option value="AT" label="Austria">Austria</option>
                            <option value="BY" label="Belarus">Belarus</option>
                            <option value="BE" label="Belgium">Belgium</option>
                            <option value="BA" label="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="BG" label="Bulgaria">Bulgaria</option>
                            <option value="HR" label="Croatia">Croatia</option>
                            <option value="CY" label="Cyprus">Cyprus</option>
                            <option value="CZ" label="Czech Republic">Czech Republic</option>
                            <option value="DK" label="Denmark">Denmark</option>
                            <option value="DD" label="East Germany">East Germany</option>
                            <option value="EE" label="Estonia">Estonia</option>
                            <option value="FO" label="Faroe Islands">Faroe Islands</option>
                            <option value="FI" label="Finland">Finland</option>
                            <option value="FR" label="France">France</option>
                            <option value="DE" label="Germany">Germany</option>
                            <option value="GI" label="Gibraltar">Gibraltar</option>
                            <option value="GR" label="Greece">Greece</option>
                            <option value="GG" label="Guernsey">Guernsey</option>
                            <option value="HU" label="Hungary">Hungary</option>
                            <option value="IS" label="Iceland">Iceland</option>
                            <option value="IE" label="Ireland">Ireland</option>
                            <option value="IM" label="Isle of Man">Isle of Man</option>
                            <option value="IT" label="Italy">Italy</option>
                            <option value="JE" label="Jersey">Jersey</option>
                            <option value="LV" label="Latvia">Latvia</option>
                            <option value="LI" label="Liechtenstein">Liechtenstein</option>
                            <option value="LT" label="Lithuania">Lithuania</option>
                            <option value="LU" label="Luxembourg">Luxembourg</option>
                            <option value="MK" label="Macedonia">Macedonia</option>
                            <option value="MT" label="Malta">Malta</option>
                            <option value="FX" label="Metropolitan France">Metropolitan France</option>
                            <option value="MD" label="Moldova">Moldova</option>
                            <option value="MC" label="Monaco">Monaco</option>
                            <option value="ME" label="Montenegro">Montenegro</option>
                            <option value="NL" label="Netherlands">Netherlands</option>
                            <option value="NO" label="Norway">Norway</option>
                            <option value="PL" label="Poland">Poland</option>
                            <option value="PT" label="Portugal">Portugal</option>
                            <option value="RO" label="Romania">Romania</option>
                            <option value="RU" label="Russia">Russia</option>
                            <option value="SM" label="San Marino">San Marino</option>
                            <option value="RS" label="Serbia">Serbia</option>
                            <option value="CS" label="Serbia and Montenegro">Serbia and Montenegro</option>
                            <option value="SK" label="Slovakia">Slovakia</option>
                            <option value="SI" label="Slovenia">Slovenia</option>
                            <option value="ES" label="Spain">Spain</option>
                            <option value="SJ" label="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="SE" label="Sweden">Sweden</option>
                            <option value="CH" label="Switzerland">Switzerland</option>
                            <option value="UA" label="Ukraine">Ukraine</option>
                            <option value="SU" label="Union of Soviet Socialist Republics">Union of Soviet Socialist Republics</option>
                            <option value="GB" label="United Kingdom">United Kingdom</option>
                            <option value="VA" label="Vatican City">Vatican City</option>
                            <option value="AX" label="Åland Islands">Åland Islands</option>
                        </optgroup>
                        <optgroup id="country-optgroup-Oceania" label="Oceania">
                            <option value="AS" label="American Samoa">American Samoa</option>
                            <option value="AQ" label="Antarctica">Antarctica</option>
                            <option value="AU" label="Australia">Australia</option>
                            <option value="BV" label="Bouvet Island">Bouvet Island</option>
                            <option value="IO" label="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="CX" label="Christmas Island">Christmas Island</option>
                            <option value="CC" label="Cocos [Keeling] Islands">Cocos [Keeling] Islands</option>
                            <option value="CK" label="Cook Islands">Cook Islands</option>
                            <option value="FJ" label="Fiji">Fiji</option>
                            <option value="PF" label="French Polynesia">French Polynesia</option>
                            <option value="TF" label="French Southern Territories">French Southern Territories</option>
                            <option value="GU" label="Guam">Guam</option>
                            <option value="HM" label="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
                            <option value="KI" label="Kiribati">Kiribati</option>
                            <option value="MH" label="Marshall Islands">Marshall Islands</option>
                            <option value="FM" label="Micronesia">Micronesia</option>
                            <option value="NR" label="Nauru">Nauru</option>
                            <option value="NC" label="New Caledonia">New Caledonia</option>
                            <option value="NZ" label="New Zealand">New Zealand</option>
                            <option value="NU" label="Niue">Niue</option>
                            <option value="NF" label="Norfolk Island">Norfolk Island</option>
                            <option value="MP" label="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="PW" label="Palau">Palau</option>
                            <option value="PG" label="Papua New Guinea">Papua New Guinea</option>
                            <option value="PN" label="Pitcairn Islands">Pitcairn Islands</option>
                            <option value="WS" label="Samoa">Samoa</option>
                            <option value="SB" label="Solomon Islands">Solomon Islands</option>
                            <option value="GS" label="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                            <option value="TK" label="Tokelau">Tokelau</option>
                            <option value="TO" label="Tonga">Tonga</option>
                            <option value="TV" label="Tuvalu">Tuvalu</option>
                            <option value="UM" label="U.S. Minor Outlying Islands">U.S. Minor Outlying Islands</option>
                            <option value="VU" label="Vanuatu">Vanuatu</option>
                            <option value="WF" label="Wallis and Futuna">Wallis and Futuna</option>
                        </optgroup>
                    </select>
                    </div>
                </div>
                <h3 className={`${classes.Subheaders}`}>CONNECTED ACCOUNTS <hr className='mt-2'></hr> </h3>
                <div >
                    <div className={`${classes.BoxText}`}>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Connect to twitter</h3>
                        <p className={`${classes.Subtext}`}>Connect a Twitter account to enable the choice to tweet your new posts and display a link on your profile. We will never post to Twitter without your permission.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                    <a href="#" className={`${classes.ConnectTwitter} ${classes.font}`}><span href="#" class="fa fa-twitter" id={`${classes.apple}`}></span>Connect with twitter</a>
                    </div><br></br>
                    <div className={`${classes.box} ${classes.disabled}`}>
                    <div className={`${classes.faded}`}>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Show link on profile</h3>
                        <p className={`${classes.Subtext} `} >You can show a link to your Twitter account on your profile</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <a type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                </div>
                <div className={`${classes.box}`}>
                    <div >
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Connect to Apple</h3>
                        <p className={`${classes.Subtext}`}>Connect account to log in to Reddit with Apple</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                    <a href="#" className={`${classes.ConnectApple} ${classes.font}`}><span href="#" class="fa fa-apple" id={`${classes.apple}`}></span>Connect With Apple</a>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div >
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Connect to Google</h3>
                        <p className={`${classes.Subtext}`}>Connect account to log in to Reddit with Google</p>
                    </div>
                    <div className={`${classes.SettingToggles} `}>
                    <a href="#" className={`${classes.ConnectGoogle} ${classes.font} ${secArray[0]} `} onClick={() => {setValue(1) ; GoogleHandler(1)}}><span href="#" className={`${classes.google}`}><img src={icon} className={`${classes.google}`}></img></span>Connect to Google</a>
                    <span className={`${classes.left} ${secArray[1]}`} onClick={() => {setValue(0) ; GoogleHandler(0)}}>(<a href='#' >Disconnect</a>)</span>
                    </div>
                </div>
                <h3 className={`${classes.Subheaders}`}>BETA TESTS <hr className='mt-2'></hr> </h3>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Opt into beta tests</h3>
                        <p className={`${classes.Subtext}`}>See the newest features from Reddit and join the r/beta community</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Opt out of the redesign</h3>
                        <p className={`${classes.Subtext}`}>Revert back to old Reddit for the time being</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <h3 className={`${classes.Subheaders}`}>DELETE ACCOUNT<hr className='mt-2'></hr> </h3>
                <div className={`${classes.box}`}>
                    <div className={`${classes.SettingToggles}`}>
                        <a href='#' className={`${classes.DeleteAcc}`}><img src={can} className={`${classes.delete}`}></img>DELETE ACCOUNT</a>
                    </div>
                </div>
            </div>
            
        </div>
    )


}