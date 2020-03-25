Alter table users add profImgExists BOOLEAN default false;
Alter table users add googleId VARCHAR(60);
Alter table users drop password;
Alter table users add password char(60) default null;