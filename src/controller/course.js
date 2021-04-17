import Course from '../model/course';
import logger from '../utils/logger';
import Responses from "../helper/responses";

const create = async (req, res) => {
  try {
    const {id} = req.decoded
    if(!req.body.course_name) return res.status(400).send(400, 'course name is required')
    const course = await Course.create({ course_name: req.body.course_name, student_id: id })
    if(!course) return res.status(400).send(Responses.error(400, "unable to create course"));
    return res.status(201).send(Responses.success(201, "course created successfully", course));
  } catch (error) {
    logger.info(`Internal server error => ${error}`)
    return res.status(500).send(Responses.error(500, "Internal server error"));
  }
}

const view = async (req, res) => {
  try {
    const {id} = req.params
    const course = await Course.findById(id)
    if(!course) return res.status(400).send(Responses.error('course not found'))
    return res.status(200).send(Responses.success(200, 'course retrieved successfully', course));
  } catch (error) {
    logger.info(`Internal server error => ${error}`)
    return res.status(500).send(Responses.error(500, "Internal server error"));
  }
}

const list = async (req, res) => {
  try {
    const id = req.query.student_id
    const { q } = req.query;
    const search = q === undefined ? {}: { $text: { $search: `\"${q}\"` } };
    const criteria =  Object.assign({}, search, {student_id: id});
    const course = await Course.find(criteria)
    const count = await Course.count(criteria)
    if(!course) return res.status(400).send(Responses.error(400, 'course not found'))
    if(course.length === 0) return res.status(200).send(Responses.success(200, 'Record not found', course))
    return res.status(200).send(Responses.success(200, `You have ${count} enrollments`, course));
  } catch (error) {
    logger.info(`Internal server error => ${error}`)
    return res.status(500).send(Responses.error(500, "Internal server error"));
  }
}

const deleteCourse = async( req, res) => {
  try {
    const id = req.params.courseId
    if(!id) return res.status(400).send(Responses.error(400, 'course id is required'))
    const course = await Course.findByIdAndRemove({_id: id});
    return res.status(200).send(Responses.success(200, `course deleted`, course));
  } catch (error) {
    logger.info(`Internal server error => ${error}`)
    return res.status(500).send(Responses.error(500, "Internal server error"));
  }
}

export default { create, view, list, deleteCourse }