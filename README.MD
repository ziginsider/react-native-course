# Homework Module 4 - Third-Party libs

## Description

Create todo app. Integrate camera and geolocation libs into existing todo app. Add persist storage for todos. Add animation. Add big list with images.

## Acceptance criteria

As a user, I can

Storage:
 - [x] See markers on map on separate screen when I tap “Markers” button.
 - [x] Attach photo to some task

Animation:
 - [x] Drag & drop square
 - [x] Change color of square if I tap twice on square
 - [x] Increase size (+10 per second) if I hold down the square when it’s green
 - [x] Decrease size (-10 per second) if I hold down the square when it’s red

## Subtasks
 
Storage:
 - [x] When user create new task, current user location should be stored with this task
 - [x] Create new screen with map where user can see markers where he/she created notes
 - [x] Create new screen where user can take a photo

Animation:
 - [x] Create new screen with animated green square (size 50x50)
 - [x] Change color (red or green) of square with double tap
 - [x] Implement Drag & drop 

List: 
 - [x] Create list with 10 000+ items
 - [x] Each item should include random image and serial number
 - [x] List should scroll smoothly

## Evaluation criteria

 - [x] Task match with all acceptance criteria

## To fix react-native-vision-camera issues for iOS see

- https://github.com/mrousavy/react-native-vision-camera/issues/195#issuecomment-879422807

## Animation 

- see demo video https://youtube.com/shorts/3xy6ZBTwpM0

## CATs list

- 

## Camera
</br>
<img alt="todo app" src="./img/app.gif" width="300">
