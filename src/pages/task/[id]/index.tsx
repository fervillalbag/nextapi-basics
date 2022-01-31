import React, { useState } from "react";
import { Grid, Button, Confirm } from "semantic-ui-react";
import Error from "next/error";
import { useRouter } from "next/router";

export const getServerSideProps = async ({
  query,
}: {
  query: any;
}) => {
  const res = await fetch(
    `http://localhost:3000/api/task/${query.id}`
  );
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid ID",
      },
    },
  };
};

const TaskDetail = ({ task, error }: { task: any; error: any }) => {
  const {
    query: { id },
    push,
  } = useRouter();

  const [confirm, setConfirm] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleOpen = () => setConfirm(true);
  const handleClose = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    handleClose();

    try {
      await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

    push("/");
  };

  if (error && error.statusCode)
    return (
      <Error statusCode={error.statusCode} title={error.statusText} />
    );

  return (
    <Grid verticalAlign="middle" centered style={{ height: "80vh" }}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>

          <div>
            <Button
              color="red"
              onClick={handleOpen}
              loading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Confirm
        header="Please confirm"
        open={confirm}
        onCancel={handleClose}
        onConfirm={handleDelete}
      />
    </Grid>
  );
};

export default TaskDetail;
