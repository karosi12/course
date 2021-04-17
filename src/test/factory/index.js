import FactoryGirl from 'factory-girl';
import User from '../../model/user';
import Course from '../../model/course';
import faker from 'faker';


FactoryGirl.define('User', User, {
    first_name: faker.name.findName(),
    last_name: faker.name.findName(),
    email: 'adeyemi@example.com',
    password: 'password1234!'
});

FactoryGirl.define('Course', Course, {
    course_name: faker.lorem.word()
});

export default FactoryGirl