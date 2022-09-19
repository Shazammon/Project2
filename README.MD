# NATIONAL PARK EXPERIENCES

## App Description
Users will be able to favorite national park, write entries on their experiences in a national park, and share tips for positive experiences. 

## API
I will use the US National Park Services API - https://www.nps.gov/subjects/developer/api-documentation.htm#/amenities/parksplaces/getAmenitiesParksplaces.

## User stories
- As a user, I want to search for national parks and related landmarks at that park
- As a user, I want to add national parks to my favorites list
- As a user, I want to be able to view my profile, my favorited national parks, and written experiences
- As a user, I want to add parks to my visited list.
- As a user, I want to document my experiences at a national park. 
- As a user, I want to read other users' experiences

## ERD
![](ERD.png)

## Wire Frames
### Home page - List of all National Parks
![](home_page_wireframe.png)

### Park page - individual park
![](park_page_wireframe.png)

## RESTful routes

### Users
| HTTP METHOD (_Verb_) | URL (_Nouns_)            | CRUD | Response                                       | Notes |
| -------------------- | -------------            | ---- | --------                                       | ----- |
| GET                  | /users/new               | R    | a form for creating a new user                 |       |
| POST                 | /users               | C    | create new user                                |       |
| GET                  | /users/:profile               | R    | show user's profile                            |       |
| GET                  | /users/:profile/edit               | R    | a form for editing the user's profile                            |       |
| PUT                  | /users/:profile               | U    | edit the user's profile                        |       |
| GET                  | /users/login               | R    | show a login form                         |       |
| POST                  | /users/login               | C    | show a login form                         |       |
| GET                  | /users/logout               | R    | show a login form                         |       |

### National Parks
| HTTP METHOD (_Verb_) | URL (_Nouns_)            | CRUD | Response                                          | Notes |
| -------------------- | -------------            | ---- | --------                                          | ----- |
| GET                  | /parks                   | R    | show all national parks                           |       |
| GET                  | /parks/:parkCode               | R    | show a specific national park and all experiences |       |
| POST                 | /parks/favorite/:parkCode/:id     | C    | add to favorites list                             |       |
| DELETE               | /parks/favorite/:parkCode/:id     | D    | remove from favorites list                        |       |

### Experiences
| HTTP METHOD (_Verb_) | URL (_Nouns_)            | CRUD | Response                                              | Notes |
| -------------------- | -------------            | ---- | --------                                              | ----- |
| GET                  | /experiences             | R    | show form to write an experience about national park  |       |
| POST                 | /experiences/:id         | C    | a new experience is created                           |       |
| GET                  | /experiences/:id         | R    | read a specific experience                            |       |
| POST                 | /experiences/:id         | U    | update an experience                                  |       |
| DELETE               | /experiences/:id         | D    | delete an experience                                  |       |

## MVP
- Set up sequelize ORM models and tables
- Set up national park API
- Set up express package with all RESTful routes
- Clean HTML, CSS, and back-end code
- Deploy online

## Stretch Goals
- Add a like counter on each park
- User can update their password
- Add activities to do in each park


## todo list:
- add an unfavorite button and logic
- unfavorite a national park - need to do a join on the favorite table 

