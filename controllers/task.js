import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error)
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const task = await Task.find({ user: userid });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const taskid = req.params.id;
    // const {id} = req.params; above and this both are same
    const task = await Task.findById(taskid);

    //   if (!task)
    //     return res.status(404).json({
    //       success: false,
    //       message: "invalid id",
    //     });

    //   above error handing csn be done in this way also
    //   if (!task) return next(new Error("Id galat hai bro"));

    // by using Error Handler class
    if (!task) return next(new ErrorHandler("Task Not found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
 try {
     const taskid = req.params.id;
     const task = await Task.findById(taskid);

     //   if (!task)
     //     return res.status(404).json({
     //       success: false,
     //       message: "invalid id",
     //     });

     // by using Error Handler class
     if (!task) return next(new ErrorHandler("Task Not found", 404));

     await task.deleteOne();

     res.status(201).json({
       success: true,
       message: "Task Deleted",
     });
 } catch (error) {
  next(error);  
 }
};
