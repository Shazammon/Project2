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

RESTful routes

### User

Users
| HTTP METHOD (_Verb_) | URL (_Nouns_)            | CRUD | Response                                       | Notes |
| -------------------- | -------------            | ---- | --------                                       | ----- |
| GET                  | /users                   | R    | a form for creating a new user                 |       |
| POST                 | /users                   | C    | create new user                                |       |
| GET                  | /users/:id               | R    | show user's profile                            |       |
| PUT                  | /users/:id               | U    | edit the user's profile                        |       |

National Parks
| HTTP METHOD (_Verb_) | URL (_Nouns_)            | CRUD | Response                                          | Notes |
| -------------------- | -------------            | ---- | --------                                          | ----- |
| GET                  | /parks                   | R    | show all national parks                           |       |
| GET                  | /parks/:id               | R    | show a specific national park and all experiences |       |
| POST                 | /parks/:favorite:/id     | C    | add to favorites list                             |       |
| DELETE               | /parks/:favorite:/id     | D    | remove from favorites list                        |       |

Experiences
| HTTP METHOD (_Verb_) | URL (_Nouns_)            | CRUD | Response                                              | Notes |
| -------------------- | -------------            | ---- | --------                                              | ----- |
| GET                  | /experiences             | R    | show form to write an experience about national park  |       |
| POST                 | /experiences/:id         | C    | a new experience is created                           |       |
| GET                  | /experiences/:id         | R    | read a specific experience                            |       |
| POST                 | /experiences/:id         | U    | update an experience                                  |       |
| DELETE               | /experiences/:id         | D    | delete an experience                                  |       |

## MVP
- 

## Stretch Goals
- Add activities
