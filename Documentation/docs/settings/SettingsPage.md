---
sidebar_position: 1
---

# Settings Page CSS
#### All the classes mentioned here can be found in sarakel\src\Settings\SettingPage.module.css

## .btn
:::tip[The Button]

![btn](./Screenshot%202024-04-16%20103318.png)

:::
```CSS
.active{
  color: black;
  border-bottom: solid 3px #0079d3 ;
}
```
```CSS
.btn {
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 14px;
  border: none;
  padding: 15px 12px 12px;
  margin: 0px 8px 0px 0px;
  cursor: pointer;
  color: #7c7c7c;
  background-color: white;
}
```
This styles the buttons that leads to the tabs(Account,Profile...etc.).

## .hide & .show

```CSS
.hide{
  z-index: -1; 
  visibility: collapse !important;
  position: fixed;
}
.show{
  visibility: visible;
  z-index: 1;
}
```
This is the class we use to show or hide the tabs(Account,Profile....etc.)

## .SettingsHeader

```CSS
.SettingHeader{
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding:  0px 0px 20px;
  margin: 0 auto;
  color: var(--newCommunityTheme-bodyText);
  fill: #fff;
}
```
Settings page header