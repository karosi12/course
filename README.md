# course enrollment

API service to enrollment student into a course of their choice

##

API documentation Endpoint: https://documenter.getpostman.com/view/10646382/TzJsexHH


# Technologies Used

- Backend: Node/Express
- MongoDB
- Mongoose
- Libaries: Es6, Babel-CLI, eslint, supertest, express

# Features

- Student can create an account and log in
- Authenticated student create course.
- Authenticated student should be able get all his/her course list.
- Authenticated student should be able view course.
- Authenticated student should be able delete course.

## API Endpoints

| Endpoint                                          | Functionality                       |
| ------------------------------------------------- | ----------------------------------- |
| POST /api/signup                                  | Register a user                     |
| POST /api/login                                   | Login a user                        |
| GET /api/users                                    | List all user                       |
| POST /api/course                       | add course                   |
| GET /api/courses                       | List all course                  |
| GET /api/courses?q=lorem                       | Search for course                  |
| GET /api/course/\<id>                      | View a course                  |
| DELETE /api/course/\<course_Id>                      | Delete a course                  |

[Course documentation](https://documenter.getpostman.com/view/10646382/TzJsexHH)

# To Install

- Download or clone
- Open terminal inside the root directory of clone folder
- Type `npm install` to install all dependencies
- `npm start` to run the app
- `npm run dev` to run development environment
- `npm test` to run the test suits on the app


## AUTHOR

[Kayode Adeyemi](https://github.com/karosi12)
