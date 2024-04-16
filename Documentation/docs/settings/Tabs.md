# Tabs(Account, Profile....etc.)
#### Every class mentioned here can be find at src/Settings/Components/Tabs.module.css
## .box
:::tip[box]

![btn](./Screenshot%202024-04-16%20103048.png)

:::
```CSS
  .box{
      margin-bottom: 32px;
      display: flex;
      flex-direction: row;
  }
  
.SettingTopics{
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: var(--newCommunityTheme-bodyText);
    display: -ms-flexbox;
    display: flex;
    letter-spacing: 1px;
    color: #1c1c1c;
    margin-bottom: 4px;
}

.SettingToggles{
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    flex-flow: row;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-pack: end;
    justify-content: flex-end;
    margin-bottom: 1rem;
}
```
.box is the CSS for the container that includes the .SettingsTopics which is the CSS for "Change Password" and includes also .SettingToggles which can include either a change button or a dropdown or a slider
## .slider
:::tip[The Slider]

![btn](./Screenshot%202024-04-16%20103127.png)

:::

```CSS
.switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 24px;
  }
  
  .switch input { 
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e2e2e2 ;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 23px;
    width: 22px;
    left: 1px;
    bottom: 1px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(1rem);
    -ms-transform: translateX(1rem);
    transform: translateX(1.325rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 20px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
```

## .change

:::tip[Button]

![btn](./Screenshot%202024-04-16%20113100.png)

:::

```CSS
.Change {
    color: #0079d3;
    text-decoration: none;
    background-color: transparent;
    border-radius: 20px;
    border: solid 1px #0079d3 !important;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    min-height: 32px;
    min-width: 32px;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
  }

  .Change:hover{
      background-color: rgb(239, 250, 249);
  }
  ```

## .dropdwn
:::tip[Dropdown]

![btn](.//Screenshot%202024-04-16%20113744.png)

:::
```CSS
  .dropbtn {
    background-color: transparent;
    color: #0079d3;
    border: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .5px;
    line-height: 24px;
  }
  
  .dropdown {
    position: relative;
    overflow:visible;
  }
  
  .dropdownContent {
    display: none;
    position:absolute;
    background-color: #ffffff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    padding: 8px;
  }
  
  .dropdownContent a {
    padding:8px;
    text-decoration: none;
    display: block;
    float : none;
    color: #7c7c7c ;
  }
  
  .dropdownContent a:hover {
    background-color: rgb(239, 250, 249);
    color: black;
  }
  .dropdown:hover .dropdownContent {
    display: block;
  }
  ```
  ## LinkedAccounts
:::tip[.]

![btn](./Screenshot%202024-04-16%20114349.png)

:::

  ```CSS
    .ConnectApple{
    color: #ffffff;
    text-decoration: none;
    background-color: #000000 ;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    min-height: 32px;
    min-width: 32px;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
  }
  .ConnectTwitter{
    color: #ffffff;
    text-decoration: none;
    background-color: #5baeee ;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    min-height: 32px;
    min-width: 32px;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
  }
  .ConnectGoogle{
    color: #0079d3;
    text-decoration: none;
    background-color: #ffffff ;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    min-height: 32px;
    min-width: 32px;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    border:solid 1px #0079d3;
  }
  ```
  ## Delete Account

:::tip[Delete]

![btn](./Screenshot%202024-04-16%20114922.png)

:::

```CSS
.delete{
    fill: #ff585b;
    -ms-flex: none;
    flex: none;
    margin-right: 4px;
    width: 20px;
  }
  .DeleteAcc{
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .5px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ff585b;
    display: -ms-flexbox;
    display: flex;
    text-decoration: none;
  }
  ```

  ## Text Boxes

:::tip[Text Box]

![btn](./Screenshot%202024-04-16%20115210.png)

:::
```CSS
 .SmTextBox{
    background-color: var(--newCommunityTheme-body);;
    color: var(--newCommunityTheme-bodyText);
    box-sizing: border-box;
    height: 48px;
    margin-bottom: 8px;
    border-image: initial;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    font-family: inherit;
    border-style: groove;
    border: 1px solid rgb(118, 118, 118) ;
  }
  .BgTextBox{
    background-color: var(--newCommunityTheme-body);
    border: 1px solid var(--newCommunityTheme-line);
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--newCommunityTheme-bodyText);
    display: block;
    width: 100%;
    padding: 8px;
    border-style:groove;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
    border-width: 1px;
  }
```
## SocialsButtons

:::tip[Social Links]

![btn](./Screenshot%202024-04-16%20115605.png)

:::

```CSS

.AddLinks{
    color: #000000;
    text-decoration: none;
    background-color: #edeff1;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 16px;
    text-transform: unset;
    min-height: 32px;
    min-width: 32px;
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    cursor: pointer;
}
```