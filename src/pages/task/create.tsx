import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Grid, Button } from "semantic-ui-react";

type TaskIprops = {
  title: string;
  description: string;
};

const CreateTask: React.FC = () => {
  const router = useRouter();

  const [task, setTask] = useState<TaskIprops>({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<TaskIprops>({
    title: "",
    description: "",
  });

  const handleValidate = () => {
    const errors: any = {};

    if (!task.title) errors.title = "Title is required";
    if (!task.description)
      errors.description = "Description is required";

    return errors;
  };

  const handleChange = (e: any) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = handleValidate();

    if (Object.keys(error).length > 0) {
      return setErrors(error);
    }

    if (router.query.id) {
      await handleUpdateTask();
    } else {
      await handleCreateTask();
    }

    router.push("/");
  };

  const handleUpdateTask = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/task/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTask = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/task/${router.query.id}`
      );
      const data = await res.json();
      setTask({
        title: data.title,
        description: data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      handleGetTask();
    } else {
      setTask({
        title: "",
        description: "",
      });
    }
  }, [router]);

  return (
    <Grid
      verticalAlign="middle"
      centered
      columns={2}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{router.query.id ? "Update Task" : "Create Task"}</h1>
          <Form>
            <Form.Input
              name="title"
              label="Title"
              placeholder="Title"
              value={task.title}
              onChange={handleChange}
              error={
                errors?.title
                  ? {
                      content: "Please enter a title",
                    }
                  : null
              }
            />
            <Form.TextArea
              name="description"
              label="Description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
              error={
                errors?.description
                  ? {
                      content: "Please enter a description",
                    }
                  : null
              }
            />
            <Button primary onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;
